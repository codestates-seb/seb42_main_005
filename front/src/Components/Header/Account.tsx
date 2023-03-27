import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getLocalStorage, removeLocalStorage } from "../../Api/localStorage";
import { DeleteUserInfo } from "../../Redux/slice/userSlice";
import { zIndex_Header } from "../../Util/z-index";
import { IoIosArrowBack } from "react-icons/io";
import { APIS } from "../../Api/APIs";

export default function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo]: any = useState({});

  const DropdownHandler = () => {
    setIsOpen(!isOpen);
  };

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! GET 유저 사진 불러오기
  const getUserInfo = async () => {
    await axios
      .get(`${APIS.GET_USER_INFO}/${user.userIdx}`)
      .then((response) => setUserInfo(response.data.response))
      .catch((error) => {
        console.log("내 정보 다시 가져오던 중 에러 발생");
        console.log(error);
      });
  };

  const dispatch = useAppDispatch();

  const logOut = () => {
    removeLocalStorage("access_token");
    removeLocalStorage("refresh_token");
    dispatch(DeleteUserInfo());
  };

  const token = getLocalStorage("access_token");

  if (!token) {
    return (
      <ContainerAccount className="main_nav">
        <ButtonLink to="/login">로그인</ButtonLink>
        <Partition />
        <ButtonLink to="/sign_up">회원가입</ButtonLink>
      </ContainerAccount>
    );
  } else if (user?.userRole === "약국회원") {
    useEffect(() => {
      getUserInfo();
    }, []);
    return (
      <ContainerAccount>
        <Link to="/user-my_info" className="profile">
          {userInfo.imagePath ? (
            <img src={`${userInfo.imagePath}`} alt="profile" />
          ) : (
            <img src={"Images/Pharm.png"} alt="profile" />
          )}
        </Link>
        <span className="name">{user.name}</span>
        <span className="identity">약사님</span>
        <DropdownButton onClick={DropdownHandler}>
          <IoIosArrowBack className={isOpen ? "close" : "open"} />
        </DropdownButton>
        {isOpen ? (
          <DropdownBackdrop onClick={DropdownHandler}>
            <Content>
              <ul>
                <Link to="/pharm-my_pharmacy" style={{ textDecoration: "none" }}>
                  <li>마이페이지</li>
                </Link>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <li onClick={logOut}>로그아웃</li>
                </Link>
              </ul>
            </Content>
          </DropdownBackdrop>
        ) : null}
      </ContainerAccount>
    );
  } else if (user?.userRole === "관리자") {
    return (
      <ContainerAccount>
        <Link to="/user-my_info" className="profile">
          {userInfo.imagePath ? (
            <img src={`${userInfo.imagePath}`} alt="profile" />
          ) : (
            <img src={"Images/Admin.png"} alt="profile" />
          )}
        </Link>
        <span className="name">특수기호</span>
        <span className="identity">관리자님</span>
        <DropdownButton onClick={DropdownHandler}>
          <IoIosArrowBack className={isOpen ? "close" : "open"} />
        </DropdownButton>
        {isOpen ? (
          <DropdownBackdrop onClick={DropdownHandler}>
            <Content>
              <ul>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <li onClick={logOut}>로그아웃</li>
                </Link>
              </ul>
            </Content>
          </DropdownBackdrop>
        ) : null}
      </ContainerAccount>
    );
  }
  else
    useEffect(() => {
      getUserInfo();
    }, []);
  return (
    <ContainerAccount>
      <Link to="/user-my_info" className="profile">
        {userInfo.imagePath ? (
          <img src={`${userInfo.imagePath}`} alt="profile" />
        ) : (
          <img src={"Images/User.png"} alt="profile" />
        )}
      </Link>
      <span className="name">{user?.name}</span>
      <span className="identity">님</span>
      <DropdownButton onClick={DropdownHandler}>
        <IoIosArrowBack className={isOpen ? "close" : "open"} />
      </DropdownButton>
      {isOpen ? (
        <DropdownBackdrop onClick={DropdownHandler}>
          <Content>
            <ul>
              <Link to="/user-my_info" style={{ textDecoration: "none" }}>
                <li>마이페이지</li>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <li onClick={logOut}>로그아웃</li>
              </Link>
            </ul>
          </Content>
        </DropdownBackdrop>
      ) : null}
    </ContainerAccount>
  );
}

const ContainerAccount = styled.section`
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
    background-color: var(--blue-100);
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
const DropdownButton = styled.button`
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

const ButtonLink = styled(Link)`
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
