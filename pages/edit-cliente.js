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

export default function NovoCliente() {
  const router = useRouter();
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [endereco, setEndereco] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState(false);

  const getFields = useCallback(async (cliente_id) => {
    setLoadingFields(true);
    setId(cliente_id);
    let response;
    try {
      response = await api.get(`/cliente/${cliente_id}`);
    } catch (e) {
      return e;
    } finally {
      if (cliente_id == "") {
        setNome("");
        setCpf("");
        setTelefone("");
        setEndereco("");
      } else if (response.data[0]) {
        setNome(response.data[0].nome);
        setCpf(response.data[0].cpf);
        setTelefone(response.data[0].telefone);
        setEndereco(response.data[0].endereco);
      } else {
        setNome("Cliente não encontrado");
        setCpf("");
        setTelefone("");
        setEndereco("");
      }
      setLoadingFields(false);
    }
  }, []);

  const addCliente = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.put(
        "/cliente",
        {
          cliente_id: id,
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
        <Title>Editar cliente</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="ID do cliente"
            type="edit"
            value={id}
            onChange={(evt) => getFields(evt.target.value)}
          />
          <Input
            title="Nome"
            type="edit"
            value={nome}
            onChange={(evt) => setNome(evt.target.value)}
          />
          <Input
            title="CPF"
            type="edit"
            value={cpf}
            onChange={(evt) => setCpf(evt.target.value)}
          />
          <Input
            title="Telefone (opcional)"
            type="edit"
            value={telefone}
            onChange={(evt) => setTelefone(evt.target.value)}
          />
          <Input
            title="Endereço (opcional)"
            type="edit"
            value={endereco}
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
            <BottomButton onClick={() => addCliente()}>Salvar</BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
