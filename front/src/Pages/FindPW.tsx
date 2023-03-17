import { useState } from "react";
import styled from "styled-components";
import Button from "../Components/Ul/Button";
import SignUpInput from "../Components/SignUpForm/SignUpInput";
import { BsPersonCircle } from "react-icons/bs";
import { validators } from "../Components/SignUpForm/Validation";
import ErrorAlert from "../Components/SignUpForm/ErrorAlert";

export default function FindPW() {
  const [findPassword, setFindPassword] = useState("");
  const [error, setError] = useState(false);

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFindPassword(value);
    let errors = false;
    if (name === "email") {
      errors = validators.validateEmail(value);
    }
    setError(errors);
  };

  const onSubmit: any = (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");

    if (!email) {
      return alert("항목을 입력해주세요");
    }
    if (error === true) {
      return alert("항목을 다시 확인해주세요");
    }
  };

  return (
    <Wrapper>
      <LogoContainer>
        <img alt="logo" src="Images/Logo.png" />
        <h1>Medi-Map</h1>
      </LogoContainer>
      <Container onSubmit={onSubmit}>
        <Instruction>
          <p>가입시 입력했던 이메일을 입력해주세요.</p>
          <br />
          <p>입력시 해당 이메일로 임시 비밀번호가 전송됩니다.</p>
        </Instruction>
        <InputContainer className={`${error ? "red" : null}`}>
          <BsPersonCircle className="inputimage" aria-hidden="true" />
          <label htmlFor="passwordfind-input"></label>
          <SignUpInput
            type={"email"}
            name={"email"}
            placeholder={"이메일을 입력하세요."}
            onChange={changeEmailHandler}
            value={findPassword}
          />
        </InputContainer>
        <ErrorAlert Error={error} ErrorText={"이메일 형식이 올바르지 않습니다."} />
        <ButtonContainer>
          <Button color="blue" size="lg" text="입력" type="submit" />
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
  overflow-y: scroll;
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
const Container = styled.form`
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
  &.red {
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
