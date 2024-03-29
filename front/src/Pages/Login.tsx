import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { BsPersonCircle } from "react-icons/bs";
import SignUpInput from "../Components/SignUpForm/SignUpInput";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { validators } from "../Components/SignUpForm/Validation";
import ErrorAlert from "../Components/SignUpForm/ErrorAlert";
import axios from "axios";
import { APIS } from "../Api/APIs";
import { setLocalStorage } from "../Api/localStorage";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { get } from "../Redux/slice/userSlice";
import { getLocalStorage } from "../Api/localStorage";
import ShortCuts from "../Components/SignUpForm/ShortCuts";

export default function Login() {
  const [loginForm, setLoginForms] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const FORM_FIELD_NAMES = {
    EMAIL: "email",
    PASSWORD: "password",
  };

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForms({
      ...loginForm,
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
    setLoginForms({
      ...loginForm,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });
  const onSubmit: any = (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get(FORM_FIELD_NAMES.EMAIL);
    const password = formData.get(FORM_FIELD_NAMES.PASSWORD);

    if (!email || !password) {
      return toast.error("모든 항목을 입력해주세요", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (error.email === true || error.password === true) {
      return toast.error("항목을 다시 확인해주세요", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    //! POST : 로그인 - JWT
    const postLogin = async () => {
      await axios
        .post(APIS.POST_LOGIN_JWT, { email: email, password: password })
        .then((res) => {
          let accessToken = res.headers.authorization;
          let refreshToken = res.headers.refresh;
          setLocalStorage("access_token", accessToken);
          setLocalStorage("refresh_token", refreshToken);
          let token = getLocalStorage("access_token");
          axios.defaults.headers.common.Authorization = token;
          dispatch(get(res.data));
          return res;
        })
        .then((res) => {
          if (res.data.userType == "관리자") {
            return navigate("/admin-reports");
          }
          window.location.replace("/");
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            toast.error("ID 또는 비밀번호가 일치하지 않습니다.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          console.log(error);
        });
    };
    postLogin();
  };

  return (
    <Total>
      <Container>
        <Title>
          <img alt="logo" src="Images/Logo.png" />
          <h1>로그인</h1>
        </Title>
        <ContentContainer>
          <LoginContainer>
            <LoginForm onSubmit={onSubmit}>
              <InputContainer className={`${error.email ? "red" : null}`}>
                <BsPersonCircle className="inputimage" aria-hidden="true" />
                <label htmlFor="email-input"></label>
                <SignUpInput
                  type={"email"}
                  name={FORM_FIELD_NAMES.EMAIL}
                  placeholder={"이메일을 입력하세요."}
                  value={loginForm.email}
                  onChange={changeEmailHandler}
                />
              </InputContainer>
              <ErrorAlert Error={error.email} ErrorText={"이메일 형식이 올바르지 않습니다."} />
              <InputContainer className={`${error.email ? "red" : null}`}>
                <AiOutlineLock className="inputimage" aria-hidden="true" />
                <label htmlFor="password-input"></label>
                <SignUpInput
                  type={"password"}
                  name={FORM_FIELD_NAMES.PASSWORD}
                  placeholder={"비밀번호를 입력하세요."}
                  value={loginForm.password}
                  onChange={changePasswordHandler}
                />
              </InputContainer>
              <ErrorAlert Error={error.password} ErrorText={"문자 숫자 특수문자 조합 8자 이상으로 조합해주세요."} />
              <button className="login_button" type="submit">
                로그인
              </button>
            </LoginForm>
          </LoginContainer>
          <ShortCuts />
        </ContentContainer>
        <SearchContainer>
          <Link to="/find_pw">
            <Search>비밀번호 찾기</Search>
          </Link>
          <Partition />
          <Link to="/sign_up">
            <Search>회원가입</Search>
          </Link>
        </SearchContainer>
      </Container>
    </Total>
  );
}
const Total = styled.main`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-right: 30px;
  padding-bottom: 3rem;
  img {
    width: 3.5rem;
  }
  h1 {
    color: var(--blue-600);
    font-size: 2.2rem;
  }
`;
const ContentContainer = styled.div`
  position: relative;
  left: 18%;
  display: flex;
`;
const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  padding: 2.2rem 1.5rem;
  border: 1px solid var(--black-200);
  border-radius: 18px;
  box-shadow: var(--bs-lg);
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 17rem;
  .login_button {
    background-color: var(--blue-500);
    border: none;
    width: 17rem;
    height: 2.8rem;
    font-size: 1.1rem;
    color: var(--white);
    margin: auto;
    margin-top: 1.5rem;
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
  margin-bottom: 0.5rem;
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
  &:focus-within {
    box-shadow: var(--wrapped-shadow);
  }
  &.red {
    box-shadow: var(--wrapped-shadow-red);
    border: 1px solid hsl(359, 46%, 66%);
  }
`;
const SearchContainer = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;
const Search = styled.button`
  color: var(--black-500);
  height: 3.3rem;
  font-size: 18px;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
const Partition = styled.span`
  height: 20px;
  border: 1px solid var(--black-200);
  margin: 0px 50px;
`;
