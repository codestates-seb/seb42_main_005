import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import AdminTabs from "./AdminTabs";
import Report from "./Report";
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";
import { API_Reports } from "../../Api/APIs";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [checkedList, setCheckedList]: any = useState([]);

  //! GET : 신고리뷰관리 리스트 불러오기
  useEffect(() => {
    const getReports = async () => {
      try {
        //TODO /api/admin/reports
        const response = await axios.get(API_Reports.GET_REAL_API);
        setReports(response.data.storeReview);
      } catch (error) {
        console.log(error);
      }
    };
    getReports();
  }, []);

  //! DELETE : 신고누적리뷰 삭제
  const deleteReview = async () => {
    try {
      //TODO /api/admin/access/success
      await axios({
        url: API_Reports.DELETE_REAL_API,
        method: "delete",
        data: setCheckedList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //! POST : 신고누적리뷰 복구
  const restoreReview = async () => {
    try {
      //TODO /api/admin/access/failure
      await axios({
        url: API_Reports.POST_REAL_API,
        method: "post",
        data: setCheckedList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckedItem = useCallback(
    (checked: boolean, item: string) => {
      if (checked) {
        setCheckedList([...checkedList, item]);
      } else if (!checked) {
        setCheckedList(checkedList.filter((el: any) => el !== item));
      }
    },
    [checkedList]
  );

  return (
    <WholePage>
      <Wrapper>
        <AdminTabs current="reports" />
        <Page>
          <Header>
            <span>신고리뷰관리</span>
            <ButtonContainer>
              <Button color="blue" size="md" text="선택삭제" onClick={() => deleteReview()} />
              <Button color="blue" size="md" text="선택복구" onClick={() => restoreReview()} />
            </ButtonContainer>
          </Header>
          <Table>
            <Label>
              <Values className="checkBox">
                <CheckBox onChange={(e: any) => onCheckedItem(e.target.checked, e.target.id)}/>
              </Values>
              <Values className="content">내용</Values>
              <Values className="email">email</Values>
              <Values className="writtenAt">작성일</Values>
              <Values className="reports">신고 수</Values>
            </Label>
            {reports.length ? (
              <BelowLable>
                {reports.map((report: any, i: number) => (
                  <Content key={i}>
                    <Values className="checkBox">
                      <CheckBox id={report.reportIdx} onChange={(e: any) => onCheckedItem(e.target.checked, e.target.id)} />
                    </Values>
                    <Report key={i} report={report} />
                  </Content>
                ))}
              </BelowLable>
            ) : (
              <Instead>
                <AiOutlineExclamationCircle aria-hidden="true" />
                <span>신고된 리뷰가 없습니다.</span>
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
  &.content {
    width: 400px;
    white-space: normal;
    word-break: break-all;
  }
  &.email {
    width: 300px;
  }
  &.writtenAt {
    width: 150px;
  }
  &.reports {
    width: 60px;
  }
`;
