import React, { useState } from "react";
import styled from "styled-components";
import SignUpForms from "../Components/SignUpForm/SignUpForms";
import SignUpFormTab from "../Components/SignUpForm/SignUpFormTab";

export default function SignUp() {
  const [tab, setTab] = useState<"user" | "pharm">("user");

  return (
    <Container>
      <div className="tab_title">
        <Title>
          <img alt="logo" src="Images/PillLogo.png" />
          <h1>회원가입</h1>
        </Title>
        <SignUpFormTab tab={tab} setTab={setTab} />
        <SignUpForms tab={tab} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  img {
    margin-right: 1rem;
  }
  h1 {
    color: var(--blue-600);
  }
`;
