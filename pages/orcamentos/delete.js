import { useCallback, useEffect, useState } from "react";
import api from "../api/connection";
import Input from "../components/Input";
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
} from "../styles";

export default function Home() {
  const router = useRouter();
  const [orcamentoId, setOrcamentoId] = useState();
  const [orcamentos, setOrcamentos] = useState();
  const [loading, setLoading] = useState(false);

  function getOrcamentoId(id) {
    setOrcamentoId(id);
  }

  const deleteOrcamento = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.delete(`/orcamento/${orcamentoId}`, {
        "Content-Type": "application/json",
      });
    } catch (e) {
      setLoading(false);
      return e;
    } finally {
      if (response.status === 200) {
        router.push("/");
      }
    }
  }, [orcamentoId]);

  useEffect(() => {
    api.get("/orcamento").then((res) => {
      setOrcamentos(res.data);
    });
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/">Voltar</TopButton>
        <Title>Excluir orçamento</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="ID do orçamento"
            type="selectOrcamento"
            options={orcamentos}
            onChange={getOrcamentoId}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => deleteOrcamento()}>
              Excluir
            </BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
