import { useEffect, useCallback, useState } from "react";
import api from "./api/connection";
import {
  Container,
  Title,
  ContentContainer,
  TopRow,
  TopButton,
  RightTop,
} from "./styles";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "./components/Navbar";

export default function Home() {
  const [nomeOficina, setNomeOficina] = useState();
  const [orcamentos, setOrcamentos] = useState();
  const [orcamentosIncompletos, setOrcamentosIncompletos] = useState();
  const [rows, setRows] = useState();
  const columns = [
    { field: "orcamento_id", headerName: "ID", width: 100 },
    { field: "cliente", headerName: "Cliente", width: 300 },
    { field: "veiculo", headerName: "Veículo", width: 250 },
    { field: "mecanico", headerName: "Mecânico", width: 300 },
    { field: "valor", headerName: "Valor", width: 150 },
    { field: "aprovado", headerName: "Aprovado", width: 100 },
  ];

  const getOficina = useCallback(async () => {
    const response = await api.get("/oficina/2");
    setNomeOficina(response.data[0].nome);
  }, []);

  const getOrcamentos = useCallback(async () => {
    const orcamentosResponse = await api.get("/orcamento");
    const orcamentosIncompletos = await api.get("/orcamento/incompleto");
    setOrcamentosIncompletos(orcamentosIncompletos.data);
    setOrcamentos(orcamentosResponse.data);
  }, [rows]);

  useEffect(() => {
    let builder = [];
    orcamentos?.map((o) => {
      builder.push({
        id: o.orcamento_id,
        orcamento_id: o.orcamento_id,
        cliente: o.cliente,
        veiculo: o.placa,
        mecanico: o.mecanico,
        valor: o.valor_total ?? "",
        aprovado: o.aprovado ?? "",
      });
    });
    orcamentosIncompletos?.map((o) => {
      builder.push({
        id: o.orcamento_id,
        orcamento_id: o.orcamento_id,
        cliente: o.nome,
        veiculo: o.placa,
        mecanico: "",
        valor: "",
        aprovado: "",
      });
    });
    setRows(builder);
  }, [orcamentos, orcamentosIncompletos]);

  useEffect(() => {
    getOficina();
    getOrcamentos();
  }, []);

  return (
    <Container>
      <Navbar nome={nomeOficina} type={0}/>
      <ContentContainer>
        <TopRow>
          <Title>Orçamentos</Title>
          <RightTop>
            <TopButton href="/orcamentos/novo">Novo orçamento</TopButton>
            <TopButton href="/orcamentos/mecanico">Adicionar mecânico</TopButton>
            <TopButton href="/orcamentos/calculo">Calcular orçamento</TopButton>
            <TopButton href="/orcamentos/aprovacao">Adicionar aprovação</TopButton>
            <TopButton href="/orcamentos/delete">Excluir orçamento</TopButton>
          </RightTop>
        </TopRow>
        <DataGrid columns={columns} rows={rows} autoHeight width={"100%"} />
      </ContentContainer>
    </Container>
  );
}
