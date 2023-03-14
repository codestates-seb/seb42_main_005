import React, { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}
export default function SignUpInput({ type, name, placeholder, value, onChange, readOnly }: Props) {
  return (
    <>
      <SignUpInInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
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
  display: flex;
  flex-grow: 1;
`;
