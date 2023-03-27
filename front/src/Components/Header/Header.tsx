import { Link } from "react-router-dom";
import styled from "styled-components";
import { zIndex_Header } from "../../Util/z-index";
import Account from "./Account";
import { useAppSelector } from "../../Redux/hooks";
import { useEffect } from "react";
import axios from "axios";
import { APIS } from "../../Api/APIs";
import { useState } from "react";
import { TYPE_UserInfo } from "../../Api/TYPES";

export default function Header() {
  const [userInfo, setUserInfo] = useState<TYPE_UserInfo>();

  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  //! GET : 유저 정보
  useEffect(() => {
    const getUserInfo = async () => {
      await axios
        .get(`${APIS.GET_USER_INFO}/${user.userIdx}`)
        .then((response) => setUserInfo(response.data.response))
        .catch((error) => {
          console.log("내 정보 다시 가져오던 중 에러 발생");
          console.log(error);
        });
    };
    if (user) {
      getUserInfo();
    }
  }, [user]);

  return (
    <HeaderContainer>
      <div className="logo_container">
        <LogoContainer to="/">
          <img className="logo_img" alt="logo" src="Images/Logo.png" />
          <span className="logo_text">Medi-Map</span>
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
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 7px 13px -3px,
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

const LogoContainer = styled(Link)`
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
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: 1px;
  }
  :hover {
    background-color: var(--blue-700);
    transition: 0.2s;
  }
`;
