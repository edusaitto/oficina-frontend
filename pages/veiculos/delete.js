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
  const [loading, setLoading] = useState(false);

  const getVeiculoId = useCallback((id) => {
    setVeiculo(id);
  }, []);

  const getVeiculos = useCallback(async () => {
    const response = await api.get("/veiculo");
    setVeiculos(response.data);
  }, []);

  const deleteVeiculo = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.delete(`/veiculo/${veiculo}`);
    } catch (e) {
      setLoading(false);
      return e;
    } finally {
      if (response.status === 200) {
        router.push("/veiculos");
      }
    }
  }, [veiculo]);

  useEffect(() => {
    getVeiculos();
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/veiculos">Voltar</TopButton>
        <Title>Excluir veículo</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="Qual veículo deseja excluir?"
            type="selectVeiculo"
            options={veiculos}
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
            <BottomButton onClick={() => deleteVeiculo()}>Excluir</BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
