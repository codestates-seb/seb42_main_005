import React from "react";
import styled from "styled-components";
import SignUpLoginInput from "./SignUpLoginInput";

interface Props {
  tab: "user" | "pharm";
}

export default function SignUpForms({ tab }: Props) {
  return (
    <Container>
      <SignUpForm>
        <InputContainerUp>
          <img alt="person" src="Images/person-outline.png" />
          <SignUpLoginInput />
        </InputContainerUp>
        <InputContainer>
          <img alt="person" src="Images/LockPersonOutline.png" />
          <SignUpLoginInput />
        </InputContainer>
        <InputContainer>
          <img alt="person" src="Images/person-pencil .png" />
          <SignUpLoginInput />
        </InputContainer>
        <InputContainer>
          <img alt="person" src="Images/whereyoulive.png" />
          <SignUpLoginInput />
          <button>주소찾기</button>
        </InputContainer>
      </SignUpForm>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 40rem;
  width: 40rem;
  border: 1px solid var(--black-200);
  border-top: none;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 2rem;
    height: 2rem;
    margin-top: 0.3rem;
    margin-left: 0.3rem;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid var(--black-150);
  border-bottom: none;
`;
const InputContainerUp = styled(InputContainer)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
