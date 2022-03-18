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
  const [id, setId] = useState();
  const [tipo, setTipo] = useState();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [servicos, setServicos] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState(false);

  const getFields = useCallback(async (servico_id) => {
    setLoadingFields(true);
    setId(servico_id);
    let response;
    try {
      response = await api.get(`/servico/${servico_id}`);
    } catch (e) {
      return e;
    } finally {
      if (servico_id == "") {
        setTipo("");
        setDescricao("");
        setValor("");
      } else if (response.data[0]) {
        setTipo(response.data[0].tipo_servico);
        setDescricao(response.data[0].descricao);
        setValor(response.data[0].valor);
      } else {
        setTipo("Tipo não encontrado");
        setDescricao("Descrição não encontrada");
        setValor("");
      }
      setLoadingFields(false);
    }
  }, []);

  const editServico = useCallback(async () => {
    setLoading(true);
    let response;
    try {
      response = await api.put(
        "/servico",
        {
          servico_id: id,
          tipo_servico: tipo,
          descricao: descricao,
          valor: valor,
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
        router.push("/servicos");
      }
    }
  }, [tipo, descricao, valor]);

  useEffect(() => {
    api.get("/servico").then((res) => {
      setServicos(res.data);
    });
  }, []);

  return (
    <ContainerInputScreen>
      <TopRowInputScreen>
        <TopButton href="/servicos">Voltar</TopButton>
        <Title>Editar serviço</Title>
      </TopRowInputScreen>
      <ContentContainer>
        <CreateScreenContainer>
          <Input
            title="Serviço"
            options={servicos}
            type="selectServico"
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
                title="Tipo de serviço"
                type="edit"
                value={tipo}
                onChange={(evt) => setTipo(evt.target.value)}
              />
              <Input
                title="Descrição"
                type="edit"
                value={descricao}
                onChange={(evt) => setDescricao(evt.target.value)}
              />
              <Input
                title="Valor do serviço"
                type="edit"
                value={valor}
                onChange={(evt) => setValor(evt.target.value)}
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
            <BottomButton onClick={() => editServico()}>Salvar</BottomButton>
          )}
        </CreateScreenContainer>
      </ContentContainer>
    </ContainerInputScreen>
  );
}
