import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../Components/Ul/Button";
import { API_SignOut } from "../Api/APIs";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { removeLocalStorage } from "../Api/localStorage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { DeleteUserInfo } from "../Redux/slice/userSlice";

export default function SignOut() {
  const [isChecked, setIsChecked] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

  //! DELETE : 일반회원 회원가입 - JWT
  //* 토큰 지우고 디스패치 날리기

  const navigate = useNavigate();
  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  const dispatch = useAppDispatch();
  const signOut = () => {
    if (!isChecked) {
      return setErrMsg(true);
    }
    const signOutDelete = async () => {
      await axios
        .delete(`${API_SignOut.REAL_API}/${user.userIdx}`)
        .then(() => {
          localStorage.clear();
          dispatch(DeleteUserInfo());
        })
        .catch((err) => {
          console.log(err);
        });
    };
    alert("그동안 저희 사이트를 이용해주셔서 감사합니다.");
    navigate("/");
    signOutDelete();
  };

  return (
    <Wrapper>
      <Container>
        <ExceptButton>
          <h1>
            Medi-Map(가제)을 영구적으로 탈퇴할 지 확인하기 전에
            <br />
            탈퇴의 의미에 대해 잠시 설명하겠습니다.
          </h1>
          <ul>
            <li>
              계정을 탈퇴하면 되돌릴 수 없으며,
              <br />이 삭제가 수행되고 나중에 마음이 바뀌면 원래 내용을 되찾을 방법이 없습니다.
            </li>
            <li>
              사용자의 질문과 답변은 사이트에 남아 있지만 연결이 해제되고 익명화되며 (ex. "user21216294"로 나열됨)
              <br />
              나중에 사이트로 돌아가더라도 사용자의 권한을 표시하지 않습니다.
            </li>
          </ul>
          <span>
            <span id="checkBoxWrapper">
              <Check
                name={"checkbox"}
                type="checkbox"
                onChange={(event) => {
                  setIsChecked(event.target.checked);
                  setErrMsg(false);
                }}
              />
            </span>
            <div>
              <p id="alert" className={errMsg ? "show" : undefined}>
                <AiOutlineExclamationCircle aria-hidden="true" />
                체크박스에 동의가 필요합니다
              </p>
              <p>
                위에 언급된 정보를 읽었으며 내 계정을 삭제하는 것의 의미를 이해하였고,
                <br />
                탈퇴를 계속 진행하길 원한다면 체크박스에 ‘체크’해 주십시오.
              </p>
            </div>
          </span>
        </ExceptButton>
        <footer>
          <Button text="탈퇴하기" color="red" size="lg" onClick={signOut}></Button>
        </footer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 1000px;
  height: 400px;
  font-size: 20px;
  @media (max-width: 768px) {
    margin: 20px;
    width: 500px;
    height: 600px;
  }
  h1 {
    color: var(--black-600);
    font-size: 30px;
    line-height: 40px;
    @media (max-width: 768px) {
      font-size: 22px;
      line-height: 30px;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 30px;
    line-height: 25px;
    @media (max-width: 768px) {
      font-size: 18px;
      line-height: 25px;
      white-space: normal;
      word-break: keep-all;
    }
  }
  span {
    display: flex;
    padding: 10px;
    line-height: 30px;
    font-size: 18px;
    p {
      padding-top: 8px;
      line-height: 25px;
      @media (max-width: 768px) {
        font-size: 15px;
        line-height: 20px;
      }
    }
  }
  #alert {
    display: none;
    &.show {
      display: block;
      line-height: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 15px;
      color: var(--red);
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
  }
`;
const ExceptButton = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
`;
const Check = styled.input`
  cursor: pointer;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid var(--black-100);
  box-shadow: var(--bs-btn);
  margin-right: 7px;
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
