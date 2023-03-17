import React from "react";
import styled from "styled-components";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface Props {
  value?: any;
}

export default function InputAlert({ value }: Props) {
  return (
    <>
      {!value && (
        <Container>
          <AiOutlineExclamationCircle className="icon" aria-hidden="true" />
          <Text className="important">필수값입니다</Text>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  line-height: 0;
  color: var(--blue-700);
  font-weight: normal;
  .icon {
    margin-left: 0.4rem;
    font-size: 0.7rem;
  }
`;
const Text = styled.div`
  margin-left: 0.1rem;
  margin-top: 0.2rem;
  font-size: 0.7rem;
  display: flex;
  line-height: 0;
  align-items: center;
  color: var(--blue-700);
`;
