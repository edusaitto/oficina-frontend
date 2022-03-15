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
  const [servicoId, setServicoId] = useState();
  const [orcamentoId, setOrcamentoId] = useState();
  const [servicos, setServicos] = useState();
  const [loading, setLoading] = useState(false);

  function getServicoId(id) {
    setServicoId(id);
  }

  function getOrcamentoId(id) {
    setOrcamentoId(id);
  }

  const addServico = useCallback(
    async (type) => {
      setLoading(true);
      let response;
      try {
        response = await api.post(
          "/servico/orcamento",
          {
            orcamento_id: orcamentoId,
            servico_id: servicoId,
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
          if (type === 1) {
            router.push("/servicos");
          } else {
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }
        }
      }
    },
    [servicoId, orcamentoId]
  );

  useEffect(() => {
    api.get("/servico").then((res) => {
      setServicos(res.data);
    });
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/servicos">Voltar</TopButton>
        <Title>Adicionar serviço à orçamento</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="ID do orçamento"
            onChange={(evt) => getOrcamentoId(evt.target.value)}
          />
          <Input
            title="Serviço"
            options={servicos}
            type="selectServico"
            onChange={getServicoId}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <>
              <BottomButton onClick={() => addServico(0)}>
                Adicionar mais
              </BottomButton>
              <BottomButton onClick={() => addServico(1)}>
                Adicionar e voltar
              </BottomButton>
            </>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
