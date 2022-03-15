import { useCallback, useState } from "react";
import api from "./api/connection";
import Input from "./components/Input";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import {
  Title,
  ContentContainer,
  TopButton,
  TopRowInputScreen,
  ContainerInputScreen,
  BottomButton,
  CreateScreenContainer,
} from "./styles";

export default function Home() {
  const router = useRouter();
  const [servicoId, setServicoId] = useState();
  const [loading, setLoading] = useState(false);

  const deleteServico = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.delete(`/servico/${servicoId}`, {
        "Content-Type": "application/json",
      });
    } catch (e) {
      setLoading(false);
      return e;
    } finally {
      if (response.status === 200) {
        router.push("/servicos");
      }
    }
  }, [servicoId]);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/servicos">Voltar</TopButton>
        <Title>Excluir serviço</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="ID do serviço"
            onChange={(evt) => setServicoId(evt.target.value)}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => deleteServico()}>
              Excluir
            </BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
