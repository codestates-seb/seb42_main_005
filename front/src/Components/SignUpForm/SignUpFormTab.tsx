import React from "react";
import styled from "styled-components";
import { MdOutlineLocalPharmacy } from "react-icons/md";

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
        <MdOutlineLocalPharmacy className="icon" />
        약사회원
      </Tab>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 3rem;
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
  background-color: ${({ title, tab }) => (title === tab ? "var( --white)" : "var(--black-050)")};
  border: 1px solid var(--black-200);
  border-bottom: none;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: 0 -1px 4px -3px hsla(0, 0%, 0%, 0.09), 0 -3px 8px -3px hsla(0, 0%, 0%, 0.1),
    0 -4px 13px -3px hsla(0, 0%, 0%, 0.13);
  cursor: pointer;
  .icon {
    font-size: 1.2rem;
    margin-right: 0.2rem;
    margin-bottom: 2px;
  }
`;
