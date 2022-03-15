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

export default function Clientes() {
  const [nomeOficina, setNomeOficina] = useState();
  const [clientes, setClientes] = useState();
  const [rows, setRows] = useState();
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "cpf", headerName: "CPF", width: 200 },
    { field: "telefone", headerName: "Telefone", width: 200 },
    { field: "endereco", headerName: "Endereço", width: 400 },
  ];

  const cpfMask = useCallback((v) => {
    const p1 = v.slice(0, 3);
    const p2 = v.slice(3, 6);
    const p3 = v.slice(6, 9);
    const p4 = v.slice(9, 11);
    return `${p1}.${p2}.${p3}-${p4}`;
  }, []);

  const telefoneMask = useCallback((v) => {
    if (v) {
      const p1 = v.slice(0, 2);
      const p2 = v.slice(2, 4);
      const p3 = v.slice(4, 9);
      const p4 = v.slice(9, 13);
      return `+${p1} (${p2}) ${p3}-${p4}`;
    }
  }, []);

  const getOficina = useCallback(async () => {
    const response = await api.get("/oficina/2");
    setNomeOficina(response.data[0].nome);
  }, []);

  const getClientes = useCallback(async () => {
    const clientesResponse = await api.get("/cliente");
    setClientes(clientesResponse.data);
  }, []);

  useEffect(() => {
    let builder = [];
    clientes?.map((c) => {
      builder.push({
        id: c.cliente_id,
        cliente_id: c.cliente_id,
        nome: c.nome,
        cpf: cpfMask(c.cpf),
        telefone: telefoneMask(c.telefone) ?? "",
        endereco: c.endereco,
      });
    });
    setRows(builder);
  }, [clientes]);

  useEffect(() => {
    getOficina();
    getClientes();
  }, []);

  return (
    <Container>
      <LeftNavbar>
        <Title>{nomeOficina}</Title>
        <NavbarButton href="/">ORÇAMENTOS</NavbarButton>
        <NavbarButton href="/servicos">SERVIÇOS</NavbarButton>
        <NavbarButton href="/clientes">CLIENTES</NavbarButton>
        <NavbarButton href="¹veiculos">VEÍCULOS</NavbarButton>
      </LeftNavbar>
      <ContentContainer>
        <TopRow>
          <Title>Clientes</Title>
          <RightTop>
            <TopButton href="/novo-cliente">Novo cliente</TopButton>
            <TopButton href="/edit-cliente">Editar cliente</TopButton>
            <TopButton href="/delete-cliente">Excluir cliente</TopButton>
          </RightTop>
        </TopRow>
        <DataGrid columns={columns} rows={rows} autoHeight width={"100%"} />
      </ContentContainer>
    </Container>
  );
}
