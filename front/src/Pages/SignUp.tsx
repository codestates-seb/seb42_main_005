import React, { useState } from "react";
import styled from "styled-components";
import PharmSignForms from "../Components/SignUpForm/PharmSignForms";
import SignUpFormTab from "../Components/SignUpForm/SignUpFormTab";
import UserSignUpForms from "../Components/SignUpForm/UserSignUpForms";

export interface Form {
  email: string;
  password: string;
  name: string;
  address: string;
}

export default function SignUp() {
  const [tab, setTab] = useState<"user" | "pharm">("user");

  return (
    <Total>
      <Container>
        <Title>
          <img alt="logo" src="Images/Logo.png" />
          <h1>회원가입</h1>
        </Title>
        <SignUpFormTab tab={tab} setTab={setTab} />
        {tab === "user" ? <UserSignUpForms /> : <PharmSignForms />}
      </Container>
    </Total>
  );
}
const Total = styled.main`
  display: flex;
  justify-content: center;
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 40rem;
`;

const Title = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 6rem;
  img {
    padding-right: 1rem;
    width: 3.5rem;
    height: 3rem;
  }
  h1 {
    color: var(--blue-600);
    font-size: 2.2rem;
  }
`;
