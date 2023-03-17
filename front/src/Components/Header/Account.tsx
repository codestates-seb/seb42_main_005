import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
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
    margin-left: 0.5rem;
    list-style: none;
    font-size: 13px;
    display: flex;
    height: 100%;
    align-items: center;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--white);
    margin: 0 7px 0 10px;
  }
  .identity {
    font-size: 1rem;
    font-weight: 400;
    padding-top: 2.5px;
    color: var(--white);
    margin: 0 8px 0 0;
  }
`;
const DropdownBtn = styled.button`
  cursor: pointer;
  position: inherit;
  padding-top: 4px;
  background-color: transparent;
  border: none;
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
  display: flex;
  justify-content: center;
  right: 115px;
  top: 42px;
  width: 110px;
  border-radius: 3px;
  background: white;
  box-shadow: var(--bs-lg);
  transition: 0.2s;
  ul {
    list-style-type: none;
    position: relative;
    padding: 10px 0px 10px 0px;
  }
  li {
    padding: 5px 10px 3px 15px;
    width: 110px;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: right;
    color: var(--black-600);
    transition: 0.2s;
  }
  li:hover {
    cursor: pointer;
    color: var(--black-800);
    background: var(--black-050);
    transition: 0.2s;
  }
  @media (max-width: 768px) {
    transition: 0.2s;
    right: 45px;
  }
`;
const DropdownBackdrop = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 300;
`;

const LinkButton = styled(Link)`
  background-color: transparent;
  border: none;
  color: var(--white);
  text-decoration-line: none;
  font-size: 1rem;
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
  background-color: var(--white);
  width: 1.4px;
  height: 14px;
  margin: 0 30px;
  border-radius: 0.7px;
  transition: 0.2s;
  @media (max-width: 768px) {
    transition: 0.2s;
    margin: 0 10px;
  }
`;
