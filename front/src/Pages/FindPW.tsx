import styled from "styled-components";
import { useState } from "react";
import { toast } from "react-toastify";
import { validators } from "../Components/SignUpForm/Validation";
import SignUpInput from "../Components/SignUpForm/SignUpInput";
import ErrorAlert from "../Components/SignUpForm/ErrorAlert";
import Button from "../Components/Ul/Button";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { findPW } from "../Api/AxiosInstance";

export default function FindPW() {
  const [findPassword, setFindPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFindPassword(value);
    let errors = false;
    if (name === "email") {
      errors = validators.validateEmail(value);
    }
    setError(errors);
  };

  const navigate = useNavigate();
  //! PATCH (?) 비밀번호 찾기
  const onSubmit: any = async (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    if (!email) {
      return toast.error("항목을 입력해주세요", {
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
    if (error === true) {
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
    } else {
      findPW(findPassword);
      toast.success("작성하신 이메일로 임시비밀번호가 전송되었습니다.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>navigate("/login"), 1000);
    }
  };

  return (
    <Wrapper>
      <LogoContainer>
        <img alt="logo" src="Images/Logo.png" />
        <span className="logo_text">
          우리<span className="logo_text2">동네</span>약국<span className="logo_text2">지도</span>
        </span>
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

const Wrapper = styled.section`
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
  padding-right: 15px;
  img {
    margin-right: 10px;
    width: 3rem;
    height: 3rem;
  }
  .logo_text {
    font-size: 2rem;
    font-weight: 900;
    color: var(--blue-600);
    letter-spacing: -1.5px;
    .logo_text2 {
      margin-right: 7px;
      font-size: 2rem;
      font-weight: 400;
      color: var(--blue-600);
      letter-spacing: -1.5px;
      vertical-align: 5px;
    }
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