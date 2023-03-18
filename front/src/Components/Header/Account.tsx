import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { zIndex_Header } from "../../Util/z-index";
import { IoIosArrowBack } from "react-icons/io";

interface AccountProps {
  isLogin: boolean;
  account?: string;
}

export default function Account({ isLogin, account }: AccountProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuArr = [
    { link: "/user-my_info", type: "마이페이지" },
    { link: "/login", type: "로그아웃" },
  ];
  const AdminArr = [{ link: "/login", type: "로그아웃" }];
  const DropdownHandler = () => {
    setIsOpen(!isOpen);
  };

  if (isLogin && account === "User") {
    return (
      <AccountContainer>
        <Link to="/user-my_info" className="profile">
          <img
            // 임시 이미지 URL
            src={"Images/User.png"}
            alt="profile"
          />
        </Link>
        <span className="name">킹갓 제너럴</span>
        <span className="identity">님</span>
        <DropdownBtn onClick={DropdownHandler}>
          <IoIosArrowBack className={isOpen ? "close" : "open"} />
        </DropdownBtn>
        {isOpen ? (
          <DropdownBackdrop onClick={DropdownHandler}>
            <Content>
              <ul>
                {menuArr.map((item, idx) => {
                  return (
                    <Link to={item.link} key={idx} style={{ textDecoration: "none" }}>
                      <li>{item.type}</li>
                    </Link>
                  );
                })}
              </ul>
            </Content>
          </DropdownBackdrop>
        ) : null}
      </AccountContainer>
    );
  } else if (isLogin && account === "Pharm") {
    return (
      <AccountContainer>
        <Link to="/user-my_info" className="profile">
          <img
            // 임시 이미지 URL
            src={"Images/Pharm.png"}
            alt="profile"
          />
        </Link>
        <span className="name">킹갓</span>
        <span className="identity">약사님</span>
        <DropdownBtn onClick={DropdownHandler}>
          <IoIosArrowBack className={isOpen ? "close" : "open"} />
        </DropdownBtn>
        {isOpen ? (
          <DropdownBackdrop onClick={DropdownHandler}>
            <Content>
              <ul>
                {menuArr.map((item, idx) => {
                  return (
                    <Link to={item.link} key={idx} style={{ textDecoration: "none" }}>
                      <li>{item.type}</li>
                    </Link>
                  );
                })}
              </ul>
            </Content>
          </DropdownBackdrop>
        ) : null}
      </AccountContainer>
    );
  } else if (isLogin && account === "Admin") {
    return (
      <AccountContainer>
        <Link to="/user-my_info" className="profile">
          <img
            // 임시 이미지 URL
            src={"Images/Admin.png"}
            alt="profile"
          />
        </Link>
        <span className="name">특수기호</span>
        <span className="identity">관리자님</span>
        <DropdownBtn onClick={DropdownHandler}>
          <IoIosArrowBack className={isOpen ? "close" : "open"} />
        </DropdownBtn>
        {isOpen ? (
          <DropdownBackdrop onClick={DropdownHandler}>
            <Content>
              <ul>
                {AdminArr.map((item, idx) => {
                  return (
                    <Link to={item.link} key={idx} style={{ textDecoration: "none" }}>
                      <li>{item.type}</li>
                    </Link>
                  );
                })}
              </ul>
            </Content>
          </DropdownBackdrop>
        ) : null}
      </AccountContainer>
    );
  } else
    return (
      <AccountContainer className="main_nav">
        <LinkButton to="/login">로그인</LinkButton>
        <Partition />
        <LinkButton to="/sign_up">회원가입</LinkButton>
      </AccountContainer>
    );
}

const AccountContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  .main_nav {
    display: flex;
    align-items: center;
    list-style: none;
    height: 100%;
    margin-left: 0.5rem;
    font-size: 13px;
  }
  .profile {
    display: flex;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 0.5px solid var(--black-100);
    border-radius: 50%;
  }
  .name {
    margin: 0 7px 0 10px;
    white-space: nowrap;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--white);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .identity {
    margin: 0 8px 0 0;
    padding-top: 2.5px;
    font-size: 1rem;
    font-weight: 400;
    color: var(--white);
  }
`;
const DropdownBtn = styled.button`
  cursor: pointer;
  position: inherit;
  padding-top: 4px;
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
  color: var(--white);
  transition: 0.1s ease-out;
  :hover {
    cursor: pointer;
  }
  .close {
    transform: rotate(-90deg);
    transition: transform 0.2s ease-out;
  }
  .open {
    transform: rotate(0deg);
    transition: transform 0.2s ease-out;
  }
`;
const Content = styled.div`
  position: absolute;
  right: 115px;
  top: 42px;
  display: flex;
  justify-content: center;
  width: 110px;
  border-radius: 3px;
  background-color: white;
  box-shadow: var(--bs-lg);
  transition: 0.2s;
  ul {
    position: relative;
    list-style-type: none;
    padding: 10px 0px 10px 0px;
  }
  li {
    width: 110px;
    padding: 5px 10px 3px 15px;
    text-align: right;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--black-600);
    transition: 0.2s;
  }
  li:hover {
    cursor: pointer;
    background-color: var(--black-050);
    color: var(--black-800);
    transition: 0.2s;
  }
  @media (max-width: 768px) {
    right: 45px;
    transition: 0.2s;
  }
`;
const DropdownBackdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${zIndex_Header.Dropdown};
`;

const LinkButton = styled(Link)`
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: var(--white);
  text-decoration-line: none;
  transition: 0.2s;
  &:hover {
    font-weight: 700;
    transition: 0.2s;
  }
  @media (max-width: 768px) {
    transition: 0.2s;
    font-size: 0.9rem;
  }
`;

const Partition = styled.span`
  width: 1.4px;
  height: 14px;
  margin: 0 30px;
  border-radius: 0.7px;
  background-color: var(--white);
  transition: 0.2s;
  @media (max-width: 768px) {
    margin: 0 10px;
    transition: 0.2s;
  }
`;
