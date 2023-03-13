import { useState } from "react";
import styled from "styled-components";
import AdminTabs from "./AdminTabs";
import ImageUp from "./ImageUp";
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Certify() {
  const [isImgUp, setIsImgUp] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const dummy = [
    {
      nickname: "typescript",
      email: "papa@johns.com",
      requested: "2023.02.25",
      businessCert: "Images/random.png",
      licenceCert: "Images/random.png",
    },
  ];

  return (
    <WholePage>
      {isImgUp ? <ImageUp isImgUp={isImgUp} setIsImgUp={setIsImgUp} imgUrl={imgUrl} /> : null}
      <Wrapper>
        <AdminTabs current="certify" />
        <Page>
          <Header>
            <span>약사인증관리</span>
            <ButtonContainer>
              <Button color="blue" size="md" text="신청승인" />
              <Button color="blue" size="md" text="신청반려" />
            </ButtonContainer>
          </Header>
          <Table>
            <Label>
              <Values className="checkBox">
                <CheckBox />
              </Values>
              <Values className="nickname">닉네임</Values>
              <Values className="email">email</Values>
              <Values className="requested">신청일</Values>
              <Values className="businessCert">사업자등록증</Values>
              <Values className="licenceCert">약사면허증</Values>
            </Label>
            {dummy.length ? (
              <BelowLable>
                {dummy.map((data, i) => (
                  <Content key={i}>
                    <Values className="checkBox">
                      <CheckBox />
                    </Values>
                    <Values className="nickname">{data.nickname}</Values>
                    <Values className="email">{data.email}</Values>
                    <Values className="requested">{data.requested}</Values>
                    <Values
                      className="businessCert link"
                      onClick={() => {
                        setIsImgUp(!isImgUp);
                        setImgUrl(data.businessCert);
                      }}
                    >
                      {data.businessCert}
                    </Values>
                    <Values
                      className="licenceCert link"
                      onClick={() => {
                        setIsImgUp(!isImgUp);
                        setImgUrl(data.licenceCert);
                      }}
                    >
                      {data.licenceCert}
                    </Values>
                  </Content>
                ))}
              </BelowLable>
            ) : (
              <Instead>
                <AiOutlineExclamationCircle />
                <span>약사인증요청이 없습니다.</span>
              </Instead>
            )}
          </Table>
        </Page>
      </Wrapper>
    </WholePage>
  );
}

const WholePage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 52px);
`;
const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  padding: 7px;
  width: 80rem;
  height: 40rem;
  overflow: hidden;
  border-radius: 15px;
  border: 2px solid var(--black-200);
  box-shadow: var(--wrapped-shadow);
  background-color: var(--black-075);
`;
const Page = styled.section`
  display: flex;
  flex-direction: column;
  height: 40rem;
  padding: 15px 55px;
  border: 1px solid var(--black-100);
  border-radius: 0 10px 10px 10px;
  background-color: var(--white);
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5px 20px 20px;
  span {
    font-size: 20px;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    padding: 20px 0px 20px 20px;
  }
`;
const ButtonContainer = styled.section`
  display: flex;
  gap: 20px;
`;
const Select = styled.select`
  cursor: pointer;
  padding: 0.5rem;
  color: var(--l_button-blue);
  border-radius: 3px;
  border: 1.2px solid var(--l_button-blue);
  :focus {
    outline: none;
  }
`;
const Option = styled.option``;
const Table = styled.figure`
  display: flex;
  flex-direction: column;
  height: 450px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 768px) {
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: block;
    }
  }
`;
const Label = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: calc(1150px + 0.6rem);
  padding: 10px calc(20px + 0.6rem) 10px 20px;
  font-size: 1.2rem;
  font-weight: bolder;
  color: var(--black-500);
  border-top: 1.5px solid var(--black-100);
  border-bottom: 1.5px solid var(--black-100);
  background-color: var(--black-050);
`;
const BelowLable = styled.section`
  display: flex;
  flex-direction: column;
  height: 26rem;
  width: calc(1150px + 0.6rem);
  overflow-y: scroll;
  background-color: var(--black-050);
`;
const Instead = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 26rem;
  color: var(--black-100);
  font-size: 6rem;
  font-weight: bold;
  background-color: var(--black-025);
  span {
    font-size: 2rem;
  }
`;
const Content = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 0.5px solid var(--black-075);
  background-color: var(--white);
  &.suspended {
    color: var(--black-200);
  }
  :hover {
    background-color: var(--black-050);
  }
`;
const Values = styled.span`
  display: flex;
  justify-content: center;
  &.checkBox {
    padding-left: 7px;
  }
  &.nickname {
    width: 200px;
  }
  &.email {
    width: 200px;
  }
  &.requested {
    width: 100px;
  }
  &.businessCert {
    width: 200px;
  }
  &.licenceCert {
    width: 200px;
  }
  &.link {
    cursor: pointer;
    text-decoration: underline;
    color: var(--blue-300);
    :hover {
      color: var(--blue-600);
    }
  }
`;
