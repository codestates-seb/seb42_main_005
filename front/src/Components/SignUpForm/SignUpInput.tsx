import React, { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Error?: boolean;
  ErrorText?: string;
}
export default function SignUpInput({ type, name, placeholder, value, onChange, Error, ErrorText }: Props) {
  return (
    <>
      <SignUpInInput type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
      {Error && <Box>{ErrorText}</Box>}
    </>
  );
}

const SignUpInInput = styled.input`
  width: 27rem;
  height: 2.7rem;
  outline: none;
  font-size: 1.1rem;
  padding-left: 0.5rem;
  border: none;
  text-overflow: ellipsis;
  color: var(--black-500);
`;

const Box = styled.div`
  position: relative;
  top: 2.8rem;
  right: 25rem;
  font-size: 1px;
  color: red;
`;
