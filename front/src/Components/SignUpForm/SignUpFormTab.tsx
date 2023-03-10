import React from "react";
import styled from "styled-components";

interface Props {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<"user" | "pharm">>;
}

export default function SignUpForms({ tab, setTab }: Props) {
  return (
    <TabContainer>
      <Tab title={"user"} tab={tab} onClick={() => setTab("user")}>
        일반 회원
      </Tab>
      <Tab title={"pharm"} tab={tab} onClick={() => setTab("pharm")}>
        <img alt="signup_logo" src="Images/SignUpPill.png" />
        약사회원
      </Tab>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
`;

const Tab = styled.div<{ title: string; tab: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: var(--black-500);
  width: 50%;
  height: 3rem;
  background-color: ${({ title, tab }) => (title === tab ? "var( --white)" : "var(--black-150)")};
  border: 1px solid var(--black-200);
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  cursor: pointer;
  img {
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 0.5rem;
  }
`;
