import { useState } from "react";
import styled from "styled-components";
import PharmSignForms from "../Components/SignUpForm/PharmSignForms";
import SignUpFormTab from "../Components/SignUpForm/SignUpFormTab";
import UserSignUpForms from "../Components/SignUpForm/UserSignUpForms";
import { SELECT_OPTIONS_TAP } from "../Util/type";

export default function SignUp() {
  const [tab, setTab] = useState<SELECT_OPTIONS_TAP>("user");

  return (
    <Total>
      <Container>
        <Title>
          <img alt="logo" src="Images/Logo.png" />
          <h1>회원가입</h1>
        </Title>
        <SignUpFormTab tab={tab} onClickPharm={() => setTab("pharm")} onClickUser={() => setTab("user")} />
        {tab === "user" ? <UserSignUpForms /> : <PharmSignForms />}
      </Container>
    </Total>
  );
}
const Total = styled.section`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35rem;
`;
const Title = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  img {
    width: 3.5rem;
  }
  h1 {
    color: var(--blue-600);
    font-size: 2.2rem;
  }
`;
