import React from "react"
import styled from "styled-components";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface Props {
  Error?: boolean;
  ErrorText?: string;
}

export default function ErrorAlert({ Error, ErrorText }: Props) {
  return (
    <ErrorContainer>
      {Error && (
        <>
          <AiOutlineExclamationCircle className="icon" aria-hidden="true" />
          <Box>{ErrorText}</Box>
        </>
      )}
    </ErrorContainer>
  );
}
const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  color: red;
  font-size: 15px;
  font-weight: normal;
  .icon {
    margin-bottom: 0.4rem;
    margin-left: 0.8rem;
  }
`;
const Box = styled.span`
  padding-left: 0.3rem;
  padding-bottom: 0.5rem;
`;
