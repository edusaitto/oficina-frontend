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
  const [veiculos, setVeiculos] = useState();
  const [veiculo, setVeiculo] = useState();
  const [cliente, setCliente] = useState();
  const [clientes, setClientes] = useState();
  const [clienteId, setClienteId] = useState();
  const [placa, setPlaca] = useState();
  const [marca, setMarca] = useState();
  const [modelo, setModelo] = useState();
  const [ano, setAno] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState(false);

  const getClientes = useCallback(async () => {
    const response = await api.get("/cliente");
    setClientes(response.data);
  }, []);

  const getVeiculos = useCallback(async () => {
    const response = await api.get("/veiculo");
    setVeiculos(response.data);
  }, []);

  const getClienteId = useCallback((id) => {
    setClienteId(id)
  }, [])

  const getFields = useCallback(async (veiculo_id) => {
    setLoadingFields(true);
    setVeiculo(veiculo_id);
    let response;
    try {
      response = await api.get(`/veiculo/${veiculo_id}`);
    } catch (e) {
      return e;
    } finally {
      setClienteId(response.data[0].cliente_id);
      setPlaca(response.data[0].placa);
      setMarca(response.data[0].marca);
      setModelo(response.data[0].modelo);
      setAno(response.data[0].ano);
      setLoadingFields(false);
    }
  }, []);

  const editVeiculo = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.put(
        "/veiculo",
        {
          veiculo_id: veiculo,
          cliente_id: clienteId,
          placa: placa,
          marca: marca,
          modelo: modelo,
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
  }, [veiculo, clienteId, placa, marca, modelo, ano]);

  useEffect(() => {
    getVeiculos();
    getClientes();
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/veiculos">Voltar</TopButton>
        <Title>Editar veículo</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="Qual veículo deseja editar?"
            type="selectVeiculo"
            options={veiculos}
            onChange={getFields}
          />
          {loadingFields ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <>
              <Input
                title="Cliente"
                type="selectCliente"
                options={clientes}
                onChange={getClienteId}
              />
              <Input
                title="Placa"
                type="edit"
                value={placa}
                onChange={(evt) => setPlaca(evt.target.value)}
              />
              <Input
                title="Marca"
                type="edit"
                value={marca}
                onChange={(evt) => setMarca(evt.target.value)}
              />
              <Input
                title="Modelo"
                type="edit"
                value={modelo}
                onChange={(evt) => setModelo(evt.target.value)}
              />
              <Input
                title="Ano"
                type="edit"
                value={ano}
                onChange={(evt) => setAno(evt.target.value)}
              />
            </>
          )}

          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => editVeiculo()}>Salvar</BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
