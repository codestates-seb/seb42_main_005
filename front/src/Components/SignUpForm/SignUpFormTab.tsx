import React from "react";
import styled from "styled-components";
import { SELEC_OPTIONS_TAP } from "../../Util/type";

interface Props {
  tab: string;
  onClickPharm?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClickUser?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
export default function SignUpForms({ tab, onClickPharm, onClickUser }: Props) {
  return (
    <TabContainer>
      <Tab title={"user"} tab={tab} onClick={onClickUser}>
        일반 회원
      </Tab>
      <Tab title={"pharm"} tab={tab} onClick={onClickPharm}>
        <img alt="signup_logo" src="Images/SignUpPill.png" />
        약사회원
      </Tab>
    </TabContainer>
  );
}

const TabContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 3rem;
`;

const Tab = styled.span<{ title: string; tab: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: var(--black-500);
  width: 50%;
  height: 3rem;
  background-color: ${({ title, tab }) => (title === tab ? "var( --white)" : "var(--black-050)")};
  border: 1px solid var(--black-200);
  border-bottom: none;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: 0 -1px 4px -3px hsla(0, 0%, 0%, 0.09), 0 -3px 8px -3px hsla(0, 0%, 0%, 0.1),
    0 -4px 13px -3px hsla(0, 0%, 0%, 0.13);
  cursor: pointer;
  img {
    width: 1.5rem;
    height: 1.3rem;
    padding-right: 0.5rem;
  }
`;
