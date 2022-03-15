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
  const [clientes, setClientes] = useState();
  const [veiculos, setVeiculos] = useState();
  const [clienteId, setClienteId] = useState();
  const [veiculoId, setVeiculoId] = useState();
  const [loading, setLoading] = useState(false);

  function getVeiculos(id) {
    api.get(`/veiculo/cliente/${id}`).then((res) => {
      setVeiculos(res.data);
    });
    setClienteId(id);
  }

  function getVeiculoId(id) {
    setVeiculoId(id);
  }

  const createOrcamento = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.post(
        "/orcamento",
        {
          cliente_id: clienteId,
          veiculo_id: veiculoId,
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
  }, [clienteId, veiculoId]);

  useEffect(() => {
    api.get("/cliente").then((res) => {
      setClientes(res.data);
    });
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/">Voltar</TopButton>
        <Title>Novo orçamento</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="Cliente"
            options={clientes}
            type="selectCliente"
            onChange={getVeiculos}
          />
          <Input
            title="Veículo"
            options={veiculos}
            type="selectVeiculo"
            onChange={getVeiculoId}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => createOrcamento()}>
              Salvar
            </BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
