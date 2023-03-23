import React from "react";
import styled from "styled-components";

interface CheckProps {
  value?: any;
  id?: string;
  checked?: any;
  onChange?: any;
}

export default function CheckBox({ id, checked, onChange, value }: CheckProps) {
  return <Check type="checkbox" id={id} checked={checked} onChange={onChange} value={value}></Check>;
}

const Check = styled.input`
  cursor: pointer;
  appearance: none;
  width: 20px;
  height: 20px;
  margin-right: 7px;
  border: 1px solid var(--black-100);
  border-radius: 3.5px;
  box-shadow: var(--bs-btn);
  transition: 0.1s;
  :active {
    box-shadow: var(--bs-btn-click);
    transition: 0.1s;
  }
  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 130% 130%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--blue-400);
    transition: 0.1s;
  }
`;
