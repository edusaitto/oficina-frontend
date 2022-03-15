import { useCallback, useState } from "react";
import api from "../../api/connection";
import {
  CustomInput,
  CustomSelect,
  InputContainer,
  InputTitle,
} from "./styles";

export default function Input(props) {
  const [valueCliente, setValueCliente] = useState(0);
  const [valueVeiculo, setValueVeiculo] = useState(0);
  const [valueMecanico, setValueMecanico] = useState(0);
  const [valueServico, setValueServico] = useState(0);

  if (props.type === "selectCliente") {
    return (
      <InputContainer>
        <InputTitle>{props.title}</InputTitle>
        <CustomSelect value={valueCliente}>
          <option value={0} disabled>
            Selecione um cliente
          </option>
          {props.options?.map((opt) => {
            return (
              <option
                key={opt.cliente_id}
                value={opt.cliente_id}
                onClick={() => {
                  props.onChange(opt.cliente_id);
                  setValueCliente(opt.cliente_id);
                }}
              >
                {opt.nome}
              </option>
            );
          })}
        </CustomSelect>
      </InputContainer>
    );
  }
  if (props.type === "selectVeiculo") {
    return (
      <InputContainer>
        <InputTitle>{props.title}</InputTitle>
        <CustomSelect value={valueVeiculo}>
          <option disabled value={0}>
            Selecione um veículo
          </option>
          {props.options?.map((opt) => {
            return (
              <option
                key={opt.veiculo_id}
                value={opt.veiculo_id}
                onClick={() => {
                  props.onChange(opt.veiculo_id);
                  setValueVeiculo(opt.veiculo_id);
                }}
              >
                {opt.placa}
              </option>
            );
          })}
        </CustomSelect>
      </InputContainer>
    );
  }
  if (props.type === "selectMecanico") {
    return (
      <InputContainer>
        <InputTitle>{props.title}</InputTitle>
        <CustomSelect value={valueMecanico}>
          <option disabled value={0}>
            Selecione um mecânico
          </option>
          {props.options?.map((opt) => {
            return (
              <option
                key={opt.mecanico_id}
                value={opt.mecanico_id}
                onClick={() => {
                  props.onChange(opt.mecanico_id);
                  setValueMecanico(opt.mecanico_id);
                }}
              >
                {opt.nome}
              </option>
            );
          })}
        </CustomSelect>
      </InputContainer>
    );
  }
  if (props.type === "selectServico") {
    return (
      <InputContainer>
        <InputTitle>{props.title}</InputTitle>
        <CustomSelect value={valueServico}>
          <option disabled value={0}>
            Selecione um serviço
          </option>
          {props.options?.map((opt) => {
            return (
              <option
                key={opt.servico_id}
                value={opt.servico_id}
                onClick={() => {
                  props.onChange(opt.servico_id);
                  setValueServico(opt.servico_id);
                }}
              >
                {opt.tipo_servico}
              </option>
            );
          })}
        </CustomSelect>
      </InputContainer>
    );
  }
  if (props.type === "edit") {
    return (
      <InputContainer>
        <InputTitle>{props.title}</InputTitle>
        <CustomInput onChange={props.onChange} value={props.value}/>
      </InputContainer>
    );
  }
  return (
    <InputContainer>
      <InputTitle>{props.title}</InputTitle>
      <CustomInput onChange={props.onChange} />
    </InputContainer>
  );
}
