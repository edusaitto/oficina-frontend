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

export default function NovoVeiculo() {
  const router = useRouter();
  const [clientes, setClientes] = useState();
  const [cliente, setCliente] = useState();
  const [placa, setPlaca] = useState();
  const [modelo, setModelo] = useState();
  const [modelos, setModelos] = useState();
  const [ano, setAno] = useState();
  const [loading, setLoading] = useState(false);

  function getClienteId(id) {
    setCliente(id);
  }

  function getModeloId(id) {
    setModelo(id)
  }

  const addVeiculo = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.post(
        "/veiculo",
        {
          cliente_id: cliente,
          modelo_id: modelo,
          placa: placa,
          ano: ano,
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
        router.push("/veiculos");
      }
    }
  }, [cliente, placa, modelo, ano]);

  useEffect(() => {
    api.get("/cliente").then((res) => {
      setClientes(res.data);
    });
    api.get("/modelo").then((res) => {
      setModelos(res.data);
    })
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/veiculos">Voltar</TopButton>
        <Title>Novo veículo</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="Cliente"
            options={clientes}
            type="selectCliente"
            onChange={getClienteId}
          />
          <Input 
            title="Modelo"
            options={modelos}
            type="selectModelo"
            onChange={getModeloId}
          />
          <Input
            title="Placa"
            onChange={(evt) => setPlaca(evt.target.value)}
          />
          <Input
            title="Ano"
            onChange={(evt) => setAno(evt.target.value)}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => addVeiculo()}>Adicionar</BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
