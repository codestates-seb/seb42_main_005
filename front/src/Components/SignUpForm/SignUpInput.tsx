import React, { HTMLInputTypeAttribute } from "react";
import styled from "styled-components";

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  className?: string;
}
//? signUpInput으로 하면 에러남=> TS는 가장 처음 레터를 대문자로 해야?

export default function SignUpInput({ type, name, placeholder, value, onChange, readOnly, className }: Props) {
  return (
    <>
      <SignUpInInput
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={className}
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
