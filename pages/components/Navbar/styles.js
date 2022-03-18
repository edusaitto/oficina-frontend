import styled from "styled-components";

export const TitleOficina = styled.h1`
  color: #8fb3e8;
  padding: 16px;
`;

export const LeftNavbar = styled.div`
  background-color: #3c5b89;
  display: flex;
  flex-direction: column;
  width: 20%;
  min-height: 100vh;
`;

export const NavbarButton = styled.a`
  text-decoration: none;
  padding: 16px;
  font-size: 16px;
  color: white;

  &:hover {
    background-color: #4c6fa4;
  }
`;

export const SelectedNavbarButton = styled.a`
  text-decoration: none;
  padding: 16px;
  font-size: 16px;
  color: black;
  background-color: #5582c4;
`;