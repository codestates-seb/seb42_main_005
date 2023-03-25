import React, { useState } from "react";
import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import SignUpInput from "../Components/SignUpForm/SignUpInput";
import { AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { validators } from "../Components/SignUpForm/Validation";
import ErrorAlert from "../Components/SignUpForm/ErrorAlert";
import axios from "axios";
import { API_UserLogIn } from "../Api/APIs";
import { setLocalStorage } from "../Api/localStorage";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { getUserInfo } from "../Redux/slice/userSlice";

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
    let errors;
    if (name === FORM_FIELD_NAMES.PASSWORD) {
      errors = validators.validatePassword(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: any = (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get(FORM_FIELD_NAMES.EMAIL);
    const password = formData.get(FORM_FIELD_NAMES.PASSWORD);

    if (!email || !password) {
      return alert("모든 항목을 입력해주세요");
    }
    if (error.email === true || error.password === true) {
      return alert("항목을 다시 확인해주세요");
    }

    // { withCredentials: true }
    const postLogin = async () => {
      await axios
        .post(API_UserLogIn.REAL_API, { email: email, password: password })
        .then((res) => {
          let accessToken = res.headers.authorization;
          let refreshToken = res.headers.refresh;

          setLocalStorage("access_token", accessToken);
          setLocalStorage("refresh_token", refreshToken);

          console.log(accessToken);
          console.log(refreshToken);

          axios.defaults.headers.common["Authorization"] = `${accessToken}`;

          dispatch(getUserInfo(res.data));
        })
        .then(() => {
          navigate("/");
          console.log(user);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert("ID 또는 비밀번호가 일치하지 않습니다.");
          }
          console.log(err);
        });
    };
    postLogin();
  };
  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });
  console.log(user);

  //! POST : 로그인 - Auth
  const postAuthSignUp = async () => {
    try {
      //TODO /api/oauth2/authorization/{provider}
      const provider = ""; //! 여기 수정 필요
      await axios({
        url: `${API_UserLogIn.AUTH_REAL_API}/${provider}`,
        method: "post",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Total>
      <Container>
        <Title>
          <img alt="logo" src="Images/Logo.png" />
          <h1>로그인</h1>
        </Title>
        <ContentContainer>
          <Google>
            <button className="google_button" onClick={() => postAuthSignUp()}>
              <GoogleButton>
                <img className="google_img" alt="google" src="Images/google.png" />
                <span className="google">Sign up with Google</span>
              </GoogleButton>
            </button>
          </Google>
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
  width: 35rem;
`;
const Title = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  padding: 2rem;
  width: 35rem;
  border: 1px solid var(--black-200);
  border-radius: 18px;
  box-shadow: var(--bs-lg);
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
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
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
