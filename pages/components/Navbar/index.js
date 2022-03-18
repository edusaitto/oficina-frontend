import {
  LeftNavbar,
  NavbarButton,
  SelectedNavbarButton,
  TitleOficina,
} from "./styles";

export default function Navbar(props) {
  return (
    <LeftNavbar>
      <TitleOficina>{props.nome}</TitleOficina>
      {props.type === 0 ? (
        <>
          <SelectedNavbarButton href="/">ORÇAMENTOS</SelectedNavbarButton>
          <NavbarButton href="/servicos">SERVIÇOS</NavbarButton>
          <NavbarButton href="/clientes">CLIENTES</NavbarButton>
          <NavbarButton href="/veiculos">VEÍCULOS</NavbarButton>
        </>
      ) : props.type === 1 ? (
        <>
          <NavbarButton href="/">ORÇAMENTOS</NavbarButton>
          <SelectedNavbarButton href="/servicos">SERVIÇOS</SelectedNavbarButton>
          <NavbarButton href="/clientes">CLIENTES</NavbarButton>
          <NavbarButton href="/veiculos">VEÍCULOS</NavbarButton>
        </>
      ) : props.type === 2 ? (
        <>
          <NavbarButton href="/">ORÇAMENTOS</NavbarButton>
          <NavbarButton href="/servicos">SERVIÇOS</NavbarButton>
          <SelectedNavbarButton href="/clientes">CLIENTES</SelectedNavbarButton>
          <NavbarButton href="/veiculos">VEÍCULOS</NavbarButton>
        </>
      ) : (
        <>
          <NavbarButton href="/">ORÇAMENTOS</NavbarButton>
          <NavbarButton href="/servicos">SERVIÇOS</NavbarButton>
          <NavbarButton href="/clientes">CLIENTES</NavbarButton>
          <SelectedNavbarButton href="/veiculos">VEÍCULOS</SelectedNavbarButton>
        </>
      )}
    </LeftNavbar>
  );
}
