import React from "react";
import styled from "styled-components";

interface Props {
  Error?: boolean;
  ErrorText?: string;
}

export default function ErrorAlert({ Error, ErrorText }: Props) {
  return <div>{Error && <Box>{ErrorText}</Box>}</div>;
}

const Box = styled.div`
  padding-left: 2rem;
  padding-bottom: 0.5rem;
  width: 26rem;
  font-size: 0.7rem;
  color: red;
`;
