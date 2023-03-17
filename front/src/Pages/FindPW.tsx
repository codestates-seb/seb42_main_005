import { useState } from "react";
import styled from "styled-components";
import Button from "../Components/Ul/Button";
import SignUpInput from "../Components/SignUpForm/SignUpInput";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function FindPW() {

const [randomError, setRandomError] = useState(false)

  return (
    <Wrapper>
      <LogoContainer>
        <img alt="logo" src="Images/Logo.png"/>
        <h1>Medi-Map</h1>
      </LogoContainer>
      <Container>
        <Instruction>
          <p>가입시 입력했던 이메일을 입력해주세요.</p>
          <br />
          <p>입력시 해당 이메일로 임시 비밀번호가 전송됩니다.</p>
        </Instruction>
        <InputContainer className={randomError ? "error" : ""}>
          <BsPersonCircle className="inputimage" aria-hidden="true"/>
          <SignUpInput type={"email"} name={"email"} placeholder={"이메일을 입력하세요."} onChange={()=>setRandomError(true)} />
        </InputContainer>
        <AlertMsg className={randomError ? "error" : ""}>
          <AiOutlineExclamationCircle aria-hidden="true"/>
          유효성 검사 로직이 들어갈 자리입니다~!~!
        </AlertMsg>
        <ButtonContainer>
          <Button color="blue" size="lg" text="입력" />
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
`;
const LogoContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
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
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  border-radius: 18px;
  box-shadow: var(--bs-lg);
  border: 1px solid var(--black-100);
`;
const Instruction = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 15px;
  margin: 10px 0;
  font-size: 17px;
  color: var(--black-400);
`;
const InputContainer = styled.section`
  margin: 20px 0px;
  width: 350px;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--black-150);
  margin-bottom: 0.8rem;
  border-radius: 10px;
  box-shadow: var(--bs-sm);
  padding: 0 10px;
  .inputimage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: auto;
    color: var(--black-200);
  }
  :focus-within {
    border-color: var(--blue-300);
    box-shadow: var(--wrapped-shadow);
    transition: 0.2s;
  }
  &.error:focus-within {
    box-shadow: var(--wrapped-shadow-red);
    border: 1px solid hsl(359, 46%, 66%);
    transition: 0.2s;
  }
`;
const ButtonContainer = styled.footer`
  display: flex;
  justify-content: center;
  width: 350px;
  margin-top: 20px;
`;
const AlertMsg = styled.div`
  display: none;
  &.error {
    display: block;
    line-height: 0;
    display: flex;
    align-items: center;
    font-weight: normal;
    gap: 5px;
    font-size: 15px;
    color: var(--red);
  }
`;