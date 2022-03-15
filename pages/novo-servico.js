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
  const [tipo, setTipo] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [loading, setLoading] = useState(false);

  const addServico = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.post(
        "/servico",
        {
          tipo_servico: tipo,
          descricao: descricao,
          valor: valor
        },
        {
          "Content-Type": "application/json",
        }
      );
    } catch (e) {
      setLoading(false);
      return e;
    } finally {
      if (response.status === 200) {
        router.push("/servicos");
      }
    }
  }, [tipo, descricao, valor]);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/servicos">Voltar</TopButton>
        <Title>Novo serviço</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="Tipo de serviço"
            onChange={(evt) => setTipo(evt.target.value)}
          />
          <Input
            title="Descrição"
            onChange={(evt) => setDescricao(evt.target.value)}
          />
          <Input
            title="Valor do serviço"
            onChange={(evt) => setValor(evt.target.value)}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => addServico()}>
              Adicionar
            </BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
