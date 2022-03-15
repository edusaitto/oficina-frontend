import { useEffect, useCallback, useState } from "react";
import api from "./api/connection";
import {
  Container,
  Title,
  LeftNavbar,
  NavbarButton,
  ContentContainer,
  TopRow,
  TopButton,
  RightTop,
} from "./styles";
import { DataGrid } from "@mui/x-data-grid";

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
      <LeftNavbar>
        <Title>{nomeOficina}</Title>
        <NavbarButton href="">ORÇAMENTOS</NavbarButton>
        <NavbarButton href="/servicos">SERVIÇOS</NavbarButton>
        <NavbarButton href="/clientes">CLIENTES</NavbarButton>
        <NavbarButton href="">VEÍCULOS</NavbarButton>
      </LeftNavbar>
      <ContentContainer>
        <TopRow>
          <Title>Orçamentos</Title>
          <RightTop>
            <TopButton href="/orcamento">Novo orçamento</TopButton>
            <TopButton href="/mecanico">Adicionar mecânico</TopButton>
            <TopButton href="/calculo">Calcular orçamento</TopButton>
            <TopButton href="/aprovacao">Adicionar aprovação</TopButton>
            <TopButton href="/delete-orcamento">Excluir orçamento</TopButton>
          </RightTop>
        </TopRow>
        <DataGrid columns={columns} rows={rows} autoHeight width={"100%"} />
      </ContentContainer>
    </Container>
  );
}
