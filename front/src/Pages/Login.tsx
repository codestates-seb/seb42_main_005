import React from "react";
import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import SignUpInput from "../Components/SignUpForm/SignUpInput";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <Total>
      <Container>
        <Title>
          <img alt="logo" src="Images/Logo.png" />
          <h1>로그인</h1>
        </Title>
        <ContentContainer>
          <Google>
            <button className="google_button">
              <GoogleButton>
                <img className="google_img" alt="google" src="Images/google.png" />
                <span className="google">Sign up with Google</span>
              </GoogleButton>
            </button>
          </Google>
          <LoginForm>
            <InputContainer>
              <BsPersonCircle className="inputimage" />
              <SignUpInput
                type={"email"}
                name={"email"}
                placeholder={"이메일을 입력하세요."}
                // value={email}
                // onChange={onChange}
              />
            </InputContainer>
            <InputContainer>
              <AiOutlineLock className="inputimage" />
              <SignUpInput
                type={"password"}
                name={"password"}
                placeholder={"비밀번호를 입력하세요."}
                // value={password}
                // onChange={onChange}
              />
            </InputContainer>
            <button className="login_button">로그인</button>
          </LoginForm>
        </ContentContainer>
        <SearchContainer>
          <Link to="/find_pw">
            <Search>비밀번호 찾기</Search>
          </Link>
        </SearchContainer>
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
  padding-top: 6rem;
  padding-bottom: 4rem;
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
const ContentContainer = styled.div`
  padding: 3rem 1rem 3rem 1rem;
  width: 40rem;
  border: 1px solid var(--black-200);
  border-radius: 18px;
  box-shadow: var(--bs-lg);
`;

const Google = styled.div`
  padding-bottom: 2rem;
  .google_button {
    height: 3.3rem;
    width: 37.875rem;
    border: 1px solid var(--black-200);
    border-radius: 10px;
    background-color: transparent;
    cursor: pointer;
    box-shadow: var(--bs-md);
    &:hover {
      background-color: var(--black-050);
    }
  }
`;
const GoogleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .google_img {
    width: 2.6rem;
  }
  .google {
    padding-left: 0.3rem;
    font-size: 1.1rem;
    color: var(--black-500);
  }
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .login_button {
    background-color: var(--blue-500);
    border: none;
    width: 15rem;
    height: 2.8rem;
    font-size: 1.1rem;
    color: var(--white);
    margin: auto;
    margin-top: 3rem;
    border-radius: 7px;
    box-shadow: var(--bs-md);
    &:hover {
      background-color: var(--blue-400);
    }
  }
`;
const InputContainer = styled.div`
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
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Search = styled.button`
  color: var(--black-500);
  height: 3.3rem;
  width: 10rem;
  font-size: 18px;
  margin-top: 3rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
