import styled from "styled-components";
import { Button } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e6e6e6;
`;

export const ContainerInputScreen = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
  min-height: 100vh;
`;

export const Title = styled.h1`
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
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const TopButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 16px;
  margin: 16px 8px;
  background-color: #3c5b89;
  color: white;
  font-size: 16px;
  border-radius: 16px;
  border: 0;
  height: 60px;
  cursor: pointer;
`;

export const RightTop = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TopRowInputScreen = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 0px 16px;
`;

export const BottomButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 16px;
  margin: 16px 8px;
  background-color: #3c5b89;
  color: white;
  font-size: 16px;
  border-radius: 16px;
  border: 0;
  height: 60px;
  width: 200px;
  cursor: pointer;
`;

export const CreateScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
