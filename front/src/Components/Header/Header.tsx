import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../Redux/hooks";
import { zIndex_Header } from "../../Util/z-index";
import { getUser } from "../../Api/AxiosInstance";
import Account from "./Account";
import { TYPE_UserInfo } from "../../Api/TYPES";
import { toast } from "react-toastify";

export default function Header() {
  const [userInfo, setUserInfo] = useState<TYPE_UserInfo | undefined>();
  const [alertUp, setAlertUp] = useState<Boolean>(true);

  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  useEffect(() => {
    if (user) getUser(user.userIdx, setUserInfo);
  }, [user]);

  const navigate = useNavigate();
  const goHome = () => {
    if (user?.name === "관리자") {
      return toast.info("관리자는 지도를 이용하실수 없습니다.", {
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
    navigate("/");
  };
  return (
    <>
      <HeaderContainer>
        <div className="logo_container">
          <LogoContainer onClick={() => goHome()}>
            <img className="logo_img" alt="logo" src="Images/Logo.png" />
            <span className="logo_text">
              우리<span className="logo_text2">동네</span>약국<span className="logo_text2">지도</span>
            </span>
          </LogoContainer>
        </div>
        <EmptyContainer>
          <span className="partition" />
          <span className="partition" />
        </EmptyContainer>
        <div className="account_container">
          <Account userInfo={userInfo} />
        </div>
      </HeaderContainer>
      {alertUp ? (
        <Alert onClick={() => setAlertUp(false)}>
          <p className="notice">
            전국단위 서비스는 아직 준비중으로, 현재
            <span className="emph">서울지역</span>만 이용이 가능합니다.
          </p>
          <span className="close">눌러서 닫기</span>
        </Alert>
      ) : null}
    </>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  padding: 0 8rem 0 6rem;
  border: 1px solid transparent;
  background-color: var(--blue-600);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.1) 0px -3px 0px inset, hsl(0, 0%, 100%, 0.3) 0 1px 0 0 inset;
  z-index: ${zIndex_Header.Header};
  transition: 0.2s;
  @media (max-width: 768px) {
    padding: 0 3rem 0 2rem;
    transition: 0.2s;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  margin: 0 30px;
  transition: 0.2s;
  .partition {
    width: 3px;
    height: 30px;
    border-radius: 1px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 5px 8px -3px,
      rgba(0, 0, 0, 0.1) 0px -3px 0px inset, hsl(0, 0%, 100%, 0.3) 0 1px 0 0 inset;
    @media (max-width: 768px) {
      width: 2px;
      height: 10px;
      transition: 0.2s;
    }
  }
  @media (max-width: 768px) {
    margin: 0 15px;
    transition: 0.2s;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
  border-radius: 4px;
  text-decoration: none;
  transition: 0.2s;
  .logo_img {
    height: 35px;
    margin-right: 12px;
  }
  .logo_text {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--white);
    letter-spacing: 0.1px;
    .logo_text2 {
      margin-right: 7px;
      font-size: 1.3rem;
      font-weight: 300;
      color: var(--white);
      letter-spacing: 0.1px;
      vertical-align: 3px;
    }
  }
  :hover {
    background-color: var(--blue-700);
    transition: 0.2s;
  }
`;

const Alert = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 52px;
  width: 100%;
  height: 30px;
  /* font-weight: normal; */
  font-weight: 450;
  background-color: var(--kakao);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.1) 0px -1px 0px inset;
  z-index: ${zIndex_Header.Alert};
  .emph {
    margin-left: 5px;
    padding: 0;
    font-weight: 700;
    color: var(--google);
  }
  .notice {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .close {
    cursor: pointer;
    margin-left: 10px;
    padding: 3px 7px 2px 7px;
    border-radius: 6px;
    font-size: 12px;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.06), 0 2px 8px hsla(0, 0%, 0%, 0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: 0.2s;
    &:hover {
      font-weight: 700;
      transition: 0.2s;
    }
  }
`;
