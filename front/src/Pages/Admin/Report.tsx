import React from "react";
import styled from "styled-components";
import CheckBox from "../../Components/Ul/CheckBox";

interface Props {
  report: any;
}

export default function Report({ report }: Props) {
  return (
    <Contaniner>
      <Values className="content">{report.content}</Values>
      <Values className="email">{report.email}</Values>
      <Values className="writtenAt">{report.writtenAt}</Values>
      <Values className="reports">{report.reports}</Values>
    </Contaniner>
  );
}

const Contaniner = styled.div`
  display: flex;
  align-items: center;
`;
const Content = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 0.5px solid var(--black-075);
  background-color: var(--white);
  :hover {
    background-color: var(--black-050);
  }
`;
const Values = styled.span`
  display: flex;
  justify-content: center;
  &.checkBox {
    padding-left: 7px;
  }
  &.content {
    width: 400px;
    white-space: normal;
    word-break: break-all;
  }
  &.email {
    width: 300px;
  }
  &.writtenAt {
    width: 150px;
  }
  &.reports {
    width: 60px;
  }
`;
