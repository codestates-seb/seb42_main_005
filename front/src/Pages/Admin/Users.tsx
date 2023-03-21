import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import AdminTabs from "./AdminTabs";
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";
import { API_Users } from "../../Api/APIs";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Users() {
  const [users, setUsers] = useState([]);

  //! GET : 전체회원 리스트
  useEffect(() => {
    const getReviews = async () => {
      try {
        //* dummy data 일때 -> Review.json
        const response = await axios.get(API_Users.DUMMY_API);
        //TODO 실제 url 일때 -> /api/users
        // const response = await axios.get(API_Users.REAL_API);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  return (
    <WholePage>
      <Wrapper>
        <AdminTabs current="users" />
        <Page>
          <Header>
            <span>전체회원관리</span>
            <ButtonContainer>
              <Select>
                <Option>정지옵션</Option>
                <option>3일</option>
                <option>7일</option>
                <option>30일</option>
              </Select>
              <Button color="blue" size="md" text="선택정지" />
              <Button color="blue" size="md" text="선택강퇴" />
              <Button color="blue" size="md" text="선택복구" />
            </ButtonContainer>
          </Header>
          <Table>
            <Label>
              <Values className="checkBox">
                <CheckBox />
              </Values>
              <Values className="classification">구분</Values>
              <Values className="accountStatus">계정상태</Values>
              <Values className="nickname">닉네임</Values>
              <Values className="email">email</Values>
              <Values className="returnAt">복구예정일</Values>
              <Values className="subscription">가입일</Values>
              <Values className="reviewCount">리뷰 수</Values>
              <Values className="reportCount">신고 수</Values>
            </Label>
            {users.length ? (
              <BelowLable>
                {users.map((user: any, i) => (
                  <Content key={i} className={user.accountStatus === "suspended" ? "suspended" : ""}>
                    <Values className="checkBox">
                      <CheckBox />
                    </Values>
                    <Values className="classification">{user.classification}</Values>
                    <Values className="accountStatus">{user.accountStatus}</Values>
                    <Values className="nickname">{user.nickname}</Values>
                    <Values className="email">{user.email}</Values>
                    <Values className="returnAt">{user.returnAt}</Values>
                    <Values className="subscription">{user.subscription}</Values>
                    <Values className="reviewCount">{user.reviewCount}</Values>
                    <Values className="reportCount">{user.reportCount}</Values>
                  </Content>
                ))}
              </BelowLable>
            ) : (
              <Instead>
                <AiOutlineExclamationCircle aria-hidden="true" />
                <span>가입된 회원이 없습니다.</span>
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
const Wrapper = styled.section`
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
const Instead = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 26rem;
  width: calc(1150px + 0.6rem);
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
  &.classification {
    width: 60px;
  }
  &.accountStatus {
    width: 100px;
  }
  &.nickname {
    width: 180px;
  }
  &.email {
    width: 240px;
  }
  &.returnAt {
    width: 120px;
  }
  &.subscription {
    width: 120px;
  }
  &.reviewCount {
    width: 60px;
  }
  &.reportCount {
    width: 60px;
  }
`;
