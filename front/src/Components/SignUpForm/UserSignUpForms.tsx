import React, { useState } from "react";
import styled from "styled-components";
import UserAdress from "./UserAdress";
import SignUpInput from "./SignUpInput";
import { validators } from "./Validation";
import { BsPersonCircle } from "react-icons/bs";
import { FaUserEdit, FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import ErrorAlert from "./ErrorAlert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const FORM_FIELD_NAMES = {
    EMAIL: "email",
    PASSWORD: "password",
    NAME: "name",
    ADDRESS: "address",
  };

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });

    let errors;
    if (name === FORM_FIELD_NAMES.EMAIL) {
      errors = validators.validateEmail(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });
    let errors;
    if (name === FORM_FIELD_NAMES.PASSWORD) {
      errors = validators.validatePassword(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });
    let errors;
    if (name === FORM_FIELD_NAMES.NAME) {
      errors = validators.validateName(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changeAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });
  };
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecks(e.target.checked);
  };
  const navigate = useNavigate();
  const onSubmit: any = (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get(FORM_FIELD_NAMES.EMAIL);
    const password = formData.get(FORM_FIELD_NAMES.PASSWORD);
    const name = formData.get(FORM_FIELD_NAMES.NAME);
    const address = formData.get(FORM_FIELD_NAMES.ADDRESS);

    if (!email || !password || !name || !address) {
      return alert("모든 항목을 입력해주세요");
    }
    if (error.email === true || error.password === true || error.name === true) {
      return alert("항목을 다시 확인해주세요");
    }
    if (checks === false) {
      return alert("회원가입시, 사용자의 현재 위치를 사용하는 것에 동의해주세요");
    }

    const data = {
      name: name,
      email: email,
      password: password,
      address: address,
    };

    const postSignUp = async () => {
      try {
        await axios({
          //! url수정
          url: "/api/users/normal",
          method: "post",
          data: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    postSignUp();
    navigate("/login");
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
        <InputContainer className={`${error.email ? "red" : null}`}>
          <BsPersonCircle className="inputImage" aria-hidden="true" />
          <label htmlFor="useremail-input"></label>
          <SignUpInput
            type={"email"}
            name={FORM_FIELD_NAMES.EMAIL}
            placeholder={"이메일을 입력하세요."}
            value={signForm.email}
            onChange={changeEmailHandler}
          />
        </InputContainer>
        <ErrorAlert Error={error.email} ErrorText={"이메일 형식이 올바르지 않습니다."} />
        <InputContainer className={`${error.password ? "red" : null}`}>
          <AiOutlineLock className="inputImage" aria-hidden="true" />
          <label htmlFor="userpassword-input"></label>
          <SignUpInput
            type={"password"}
            name={FORM_FIELD_NAMES.PASSWORD}
            placeholder={"비밀번호를 입력하세요."}
            value={signForm.password}
            onChange={changePasswordHandler}
          />
        </InputContainer>
        <ErrorAlert Error={error.password} ErrorText={"문자 숫자 특수문자 조합 8자 이상으로 조합해주세요."} />
        <InputContainer className={`${error.name ? "red" : null}`}>
          <FaUserEdit className="inputImage" aria-hidden="true" />
          <label htmlFor="username-input"></label>
          <SignUpInput
            type={"text"}
            name={FORM_FIELD_NAMES.NAME}
            placeholder={"닉네임을 입력하세요."}
            value={signForm.name}
            onChange={changeNameHandler}
          />
        </InputContainer>
        <ErrorAlert Error={error.name} ErrorText={"이름에는 공백이 들어갈 수 없습니다."} />
        <InputContainer>
          <FaMapMarkerAlt className="inputImage" aria-hidden="true" />
          <label htmlFor="useraddress-input"></label>
          <SignUpInput
            readOnly
            type={"text"}
            name={FORM_FIELD_NAMES.ADDRESS}
            placeholder={"주소를 입력하세요."}
            value={signForm.address}
            onChange={changeAddressHandler}
          />
          <UserAdress setSignForms={setSignForms} />
        </InputContainer>
        <CheckContainer>
          <Check type="checkbox" onChange={checkHandler} checked={checks} />
          <span className="checkbox_content">
            회원가입시, 사용자의 현재 위치를 사용하는 것에 동의하는 것으로 간주됩니다.
          </span>
        </CheckContainer>
        <button className="signup_button" type="submit">
          회원가입
        </button>
      </SignUpForm>
    </Container>
  );
}
const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  width: 35rem;
  border: 1px solid var(--black-200);
  border-top: none;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: 0 1px 4px -3px hsla(0, 0%, 0%, 0.09), 0 3px 8px -3px hsla(0, 0%, 0%, 0.1),
    0 4px 13px -3px hsla(0, 0%, 0%, 0.13);
`;
const Google = styled.article`
  padding-bottom: 1rem;
  .google_button {
    height: 3.3rem;
    width: 31rem;
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
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
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
  border: 1px solid var(--black-150);
  border: 1px solid var(--black-150);
  margin-bottom: 0.5rem;
  border-radius: 10px;
  box-shadow: var(--bs-sm);
  padding: 0 10px;
  .inputImage {
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
  &.red {
    box-shadow: var(--wrapped-shadow-red);
    border: 1px solid hsl(359, 46%, 66%);
  }
`;

const CheckContainer = styled.article`
  display: flex;
  align-items: center;
  margin: 20px 0;
  .checkbox_content {
    font-size: 15px;
    font-size: 15px;
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
