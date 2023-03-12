import { useState } from "react";
import styled from "styled-components";
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";

export default function Reports() {
  return (
    <WholePage>
      <Wrapper>
        <TabContainer>
          <Tabs>신고리뷰 관리</Tabs>
          <Tabs>전체회원 관리</Tabs>
          <Tabs>약사인증 관리</Tabs>
        </TabContainer>
        <Page>
          <Header>
            <span>신고리뷰관리</span>
            <ButtonContainer>
              <Button color="blue" size="md" text="선택삭제" />
              <Button color="blue" size="md" text="선택복구" />
            </ButtonContainer>
          </Header>
          <Table>
            <Labels>
              <CheckBox />
              <Values className="content title">내용</Values>
              <Values className="email title">email</Values>
              <Values className="writtenAt title">작성일</Values>
              <Values className="reports title">신고 수</Values>
            </Labels>
            <Content>
              <CheckBox />
              <Values className="content">약사 대머리임 ㅋㅋㅋㅋㅋ</Values>
              <Values className="email">waiting@kbs.com</Values>
              <Values className="writtenAt">2023.01.07</Values>
              <Values className="reports">12</Values>
            </Content>
          </Table>
        </Page>
      </Wrapper>
    </WholePage>
  );
}

const WholePage = styled.div`
  background-color: gray;
  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 52px);
`
const Wrapper = styled.div`
  border: 1px solid green;
  background-color: var(--white);
  /*  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1000px;
  height: 600px;
`;
const TabContainer = styled.div`
  border: 1px solid green;
  background-color: gray;
  /*  */
  display: flex;
  justify-content: flex-start;
  height: 50px;
`;
const Tabs = styled.button`
  border: 1px solid green;
  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 20px;
  font-size: 18px;
`;
const Page = styled.article`
  border: 1px solid green;
  /*  */
  height: calc(600px - 50px);
  padding: 30px 20px;
`;
const Header = styled.header`
  border: 1px solid green;
  /*  */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  span {
    font-size: 20px;
    font-weight: bold;
  }
`;
const ButtonContainer = styled.div`
  border: 1px solid green;
  /*  */
  display: flex;
  gap: 20px;
`;
const Table = styled.figure`
  border: 1px solid green;
  /*  */
`;
const Labels = styled.div`
  border: 1px solid green;
  /*  */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px 7px 20px;
`;
const Content = styled.div`
  border: 1px solid green;
  /*  */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px 7px 20px;
  &.title {}
  &.content {}
  &.email {}
  &.writtenAt {}
  &.reports {}
`;
const Values = styled.span`
  border: 1px solid green;
  /*  */
`;
