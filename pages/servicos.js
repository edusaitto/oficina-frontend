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
  const [servicos, setServicos] = useState();
  const [rows, setRows] = useState();
  const columns = [
    { field: "servico_id", headerName: "ID", width: 100 },
    { field: "tipo_servico", headerName: "Tipo de serviço", width: 300 },
    { field: "descricao", headerName: "Descrição", width: 700 },
    { field: "valor", headerName: "Valor", width: 150 },
  ];

  const getOficina = useCallback(async () => {
    const response = await api.get("/oficina/2");
    setNomeOficina(response.data[0].nome);
  }, []);

  const getServicos = useCallback(async () => {
    const servicosResponse = await api.get("/servico");
    setServicos(servicosResponse.data);
  }, []);

  useEffect(() => {
    let builder = [];
    servicos?.map((s) => {
      builder.push({
        id: s.servico_id,
        servico_id: s.servico_id,
        tipo_servico: s.tipo_servico,
        descricao: s.descricao,
        valor: s.valor,
      });
    });
    setRows(builder);
  }, [servicos]);

  useEffect(() => {
    getOficina();
    getServicos();
  }, []);

  return (
    <Container>
      <LeftNavbar>
        <Title>{nomeOficina}</Title>
        <NavbarButton href="/">ORÇAMENTOS</NavbarButton>
        <NavbarButton href="/servicos">SERVIÇOS</NavbarButton>
        <NavbarButton href="/clientes">CLIENTES</NavbarButton>
        <NavbarButton href="">VEÍCULOS</NavbarButton>
      </LeftNavbar>
      <ContentContainer>
        <TopRow>
          <Title>Serviços</Title>
          <RightTop>
            <TopButton href="/novo-servico">Novo serviço</TopButton>
            <TopButton href="/servico-orcamento">Fazer orçamento</TopButton>
            <TopButton href="/edit-servico">Editar serviço</TopButton>
            <TopButton href="/delete-servico">Excluir serviço</TopButton>
          </RightTop>
        </TopRow>
        <DataGrid columns={columns} rows={rows} autoHeight width={"100%"} />
      </ContentContainer>
    </Container>
  );
}
