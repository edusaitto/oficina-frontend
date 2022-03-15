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
  const [clienteId, setClienteId] = useState();
  const [loading, setLoading] = useState(false);

  const deleteCliente = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.delete(`/cliente/${clienteId}`, {
        "Content-Type": "application/json",
      });
    } catch (e) {
      setLoading(false);
      return e;
    } finally {
      if (response.status === 200) {
        router.push("/clientes");
      }
    }
  }, [clienteId]);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/clientes">Voltar</TopButton>
        <Title>Excluir cliente</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="ID do cliente"
            onChange={(evt) => setClienteId(evt.target.value)}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => deleteCliente()}>
              Excluir
            </BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
