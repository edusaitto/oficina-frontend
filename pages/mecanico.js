import { useEffect, useCallback, useState } from "react";
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
  const [mecanicoId, setMecanicoId] = useState();
  const [orcamentoId, setOrcamentoId] = useState();
  const [mecanicos, setMecanicos] = useState();
  const [loading, setLoading] = useState(false);

  function getMecanicoId(id) {
    setMecanicoId(id);
  }

  function getOrcamentoId(id) {
    setOrcamentoId(id);
  }

  const updateOrcamento = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.put(
        "/orcamento/mecanico",
        {
          orcamento_id: orcamentoId,
          mecanico_id: mecanicoId,
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
        router.push("/");
      }
    }
  }, [mecanicoId, orcamentoId]);

  useEffect(() => {
    api.get("/mecanico").then((res) => {
      setMecanicos(res.data);
    });
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/">Voltar</TopButton>
        <Title>Adicionar mecânico</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="ID do orçamento"
            onChange={(evt) => getOrcamentoId(evt.target.value)}
          />
          <Input
            title="Mecânico"
            options={mecanicos}
            type="selectMecanico"
            onChange={getMecanicoId}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => updateOrcamento()}>
              Salvar
            </BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
