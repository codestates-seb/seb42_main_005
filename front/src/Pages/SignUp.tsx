import React, { useState } from "react";
import styled from "styled-components";
import PharmSignForms from "../Components/SignUpForm/PharmSignForms";
import SignUpFormTab from "../Components/SignUpForm/SignUpFormTab";
import UserSignUpForms from "../Components/SignUpForm/UserSignUpForms";

export default function SignUp() {
  const [tab, setTab] = useState<"user" | "pharm">("user");

  return (
    <Total>
      <Container>
        <Title>
          <img alt="logo" src="Images/PillLogo.png" />
          <h1>회원가입</h1>
        </Title>
        <SignUpFormTab tab={tab} setTab={setTab} />
        {tab === "user" ? <UserSignUpForms /> : <PharmSignForms />}
      </Container>
    </Total>
  );
}
const Total = styled.div`
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 40rem;
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
