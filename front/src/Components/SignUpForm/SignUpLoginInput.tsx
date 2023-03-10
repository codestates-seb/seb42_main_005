import React, { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignUpLoginInput({ type, name, placeholder, value, onChange }: Props) {
  return <Input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />;
}

const Input = styled.input`
  width: 30rem;
  height: 2.7rem;
  outline: none;
  border: none;
  font-size: 1.2rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  color: var(--black-400);
`;
