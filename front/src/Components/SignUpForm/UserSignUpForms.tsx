import React, { useState } from "react";
import styled from "styled-components";
import UserAdress from "./UserAdress";
import SignUpInput from "./SignUpInput";
import { Validate } from "./Validation";
import { BsPersonCircle } from "react-icons/bs";
import { FaUserEdit, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import ErrorAlert from "./ErrorAlert";
//!  name, address, email, password
export default function UserSignUpForms() {
  const [signForm, setSignForms] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    name: false,
  });

  const [checks, setChecks] = useState(false);

  const { email, password, name, address } = signForm;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let errors = false;
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });

    if (name === "email") {
      errors = Validate.emailValidation(value);
    }
    if (name === "password") {
      errors = Validate.passwordValidation(value);
    }
    if (name === "name") {
      errors = Validate.nameValidation(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, address } = signForm;

    if (!email || !password || !name || !address) {
      return alert("모든 항목을 입력해주세요");
    }
    if (error.email === true || error.password === true || error.name === true) {
      return alert("항목을 다시 확인해주세요");
    }
    if (checks === false) {
      return alert("회원가입시, 사용자의 현재 위치를 사용하는 것에 동의해주세요");
    }
  };
  return (
    <Container>
      <Google>
        <button className="google_button">
          <GoogleButton>
            <img className="google_img" alt="google" src="Images/google.png" />
            <span className="google">Sign up with Google</span>
          </GoogleButton>
        </button>
      </Google>
      <SignUpForm onSubmit={onSubmit}>
        <InputContainer className={`email ${error.email ? "error" : "success"}`}>
          <BsPersonCircle className="inputimage" />
          <SignUpInput
            type={"email"}
            name={"email"}
            placeholder={"이메일을 입력하세요."}
            value={email}
            onChange={onChange}
          />
        </InputContainer>
        <ErrorAlert Error={error.email} ErrorText={"이메일 형식이 올바르지 않습니다."} />
        <InputContainer className={`${error.password ? "error" : "success"}`}>
          <AiOutlineLock className="inputimage" />
          <SignUpInput
            type={"password"}
            name={"password"}
            placeholder={"비밀번호를 입력하세요."}
            value={password}
            onChange={onChange}
          />
        </InputContainer>
        <ErrorAlert Error={error.password} ErrorText={"문자 숫자 특수문자 조합 8자 이상으로 조합해주세요."} />
        <InputContainer className={`${error.name ? "error" : "success"}`}>
          <FaUserEdit className="inputimage" />
          <SignUpInput
            type={"text"}
            name={"name"}
            placeholder={"닉네임을 입력하세요."}
            value={name}
            onChange={onChange}
          />
        </InputContainer>
        <ErrorAlert Error={error.name} ErrorText={"이름에는 공백이 들어갈 수 없습니다."} />
        <InputContainer>
          <FaMapMarkerAlt className="inputimage" />
          <SignUpInput
            readOnly
            type={"text"}
            name={"address"}
            placeholder={"주소를 입력하세요."}
            value={address as string}
            onChange={onChange}
          />
          <UserAdress setSignForms={setSignForms} />
        </InputContainer>
        <CheckContainer>
          <Check type="checkbox" onClick={() => setChecks(!checks)} />
          <span className="checkbox_content">
            회원가입시, 사용자의 현재 위치를 사용하는 것에 동의하는 것으로 간주됩니다.
          </span>
        </CheckContainer>
        <button className="signup_button">회원가입</button>
      </SignUpForm>
    </Container>
  );
}
const Container = styled.section`
  padding: 2rem 1rem;
  width: 35rem;
  gap: 3px;
  border: 1px solid var(--black-200);
  border-top: none;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: 0 1px 4px -3px hsla(0, 0%, 0%, 0.09), 0 3px 8px -3px hsla(0, 0%, 0%, 0.1),
    0 4px 13px -3px hsla(0, 0%, 0%, 0.13);
`;
const Google = styled.article`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  .google_button {
    cursor: pointer;
    height: 3.3rem;
    width: 33rem;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid var(--black-200);
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
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  .signup_button {
    background-color: var(--blue-500);
    border: none;
    width: 15rem;
    height: 2.8rem;
    font-size: 1.1rem;
    color: var(--white);
    margin: auto;
    margin-top: 1rem;
    border-radius: 7px;
    box-shadow: var(--bs-md);
    &:hover {
      background-color: var(--blue-400);
    }
  }
`;
const InputContainer = styled.article`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  padding: 0 10px;
  border-radius: 10px;
  box-shadow: var(--bs-sm);
  border: 1px solid var(--black-150);
  .inputimage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: auto;
    color: var(--black-200);
  }
  .adress_find {
    align-items: center;
    display: flex;
  }
  &:focus-within {
    box-shadow: var(--wrapped-shadow);
  }
  &.error {
    box-shadow: var(--wrapped-shadow-red);
  }
`;

const CheckContainer = styled.article`
  display: flex;
  flex-direction: row;
  padding: 10px 0px 10px 5px;
  .checkbox_content {
    color: var(--black-500);
  }
`;

const Check = styled.input`
  cursor: pointer;
  appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid var(--black-100);
  box-shadow: var(--bs-btn);
  margin-right: 0.6rem;
  padding-left: 1rem;
  border-radius: 3.5px;
  transition: 0.1s;
  :active {
    box-shadow: var(--bs-btn-click);
    transition: 0.1s;
  }
  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 130% 130%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--blue-400);
    transition: 0.1s;
  }
`;
