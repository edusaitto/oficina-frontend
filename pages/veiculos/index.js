import { useEffect, useCallback, useState } from "react";
import api from "../api/connection";
import {
  Container,
  Title,
  ContentContainer,
  TopRow,
  TopButton,
  RightTop,
} from "../styles";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";

export default function Veiculos() {
  const [nomeOficina, setNomeOficina] = useState();
  const [veiculos, setVeiculos] = useState();
  const [rows, setRows] = useState();
  const columns = [
    { field: "veiculo_id", headerName: "ID", width: 100 },
    { field: "cliente", headerName: "Cliente", width: 400 },
    { field: "placa", headerName: "Placa", width: 200 },
    { field: "marca", headerName: "Marca", width: 200 },
    { field: "modelo", headerName: "Modelo", width: 200 },
    { field: "ano", headerName: "Ano", width: 100 },
  ];

  const getOficina = useCallback(async () => {
    const response = await api.get("/oficina/2");
    setNomeOficina(response.data[0].nome);
  }, []);

  const getVeiculos = useCallback(async () => {
    const veiculosResponse = await api.get("/veiculo");
    setVeiculos(veiculosResponse.data);
  }, []);

  useEffect(() => {
    let builder = [];
    veiculos?.map((v) => {
      builder.push({
        id: v.veiculo_id,
        veiculo_id: v.veiculo_id,
        cliente: v.nome,
        placa: v.placa,
        marca: v.marca ?? "",
        modelo: v.modelo ?? "",
        ano: v.ano ?? ""
      });
    });
    setRows(builder);
  }, [veiculos]);

  useEffect(() => {
    getOficina();
    getVeiculos();
  }, []);

  return (
    <Container>
      <Navbar nome={nomeOficina} type={3}/>
      <ContentContainer>
        <TopRow>
          <Title>Veículos</Title>
          <RightTop>
            <TopButton href="/veiculos/novo">Novo veículo</TopButton>
            <TopButton href="/veiculos/edit">Editar veículo</TopButton>
            <TopButton href="/veiculos/delete">Excluir veículo</TopButton>
          </RightTop>
        </TopRow>
        <DataGrid columns={columns} rows={rows} autoHeight width={"100%"} />
      </ContentContainer>
    </Container>
  );
}
