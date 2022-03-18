import { useCallback, useState } from "react";
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

export default function NovoCliente() {
  const router = useRouter();
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [endereco, setEndereco] = useState();
  const [loading, setLoading] = useState(false);

  const addCliente = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.post(
        "/cliente",
        {
          nome: nome,
          cpf: cpf,
          telefone: telefone ?? null,
          endereco: endereco ?? null,
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
        router.push("/clientes");
      }
    }
  }, [nome, cpf, telefone, endereco]);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/clientes">Voltar</TopButton>
        <Title>Novo cliente</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input title="Nome" onChange={(evt) => setNome(evt.target.value)} />
          <Input title="CPF" onChange={(evt) => setCpf(evt.target.value)} />
          <Input
            title="Telefone (opcional)"
            onChange={(evt) => setTelefone(evt.target.value)}
          />
          <Input
            title="Endereço (opcional)"
            onChange={(evt) => setEndereco(evt.target.value)}
          />
          {loading ? (
            <ReactLoading
              type={"bubbles"}
              color={"#000"}
              height={"5%"}
              width={"5%"}
            />
          ) : (
            <BottomButton onClick={() => addCliente()}>Adicionar</BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
