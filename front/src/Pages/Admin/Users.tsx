import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { AdminInstance } from "../../Api/AxiosInstance";
import { useAppSelector } from "../../Redux/hooks";
import AdminTabs from "./AdminTabs";
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Check, TYPE_AllUserInfo } from "../../Api/TYPES";

export default function Users() {
  const [users, setUsers] = useState<TYPE_AllUserInfo[]>([]);
  const [time, setTime] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<Check[]>([]);
  const listRef = useRef(null);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  //* 체크된 항목을 하나씩 담아주는 부분
  const onCheckedItem = useCallback(
    (checked: boolean, id: string) => {
      if (checked) {
        setCheckedList((prev) => [...prev, { userIdx: id }]);
      } else if (!checked) {
        setCheckedList(checkedList.filter((check) => check.userIdx !== id));
      }
    },
    [checkedList],
  );
  const data = { userIdxs: checkedList };
  const returnAccountState = (accountState: any) => {
    if (accountState === "ACTIVE") return "활동회원";
    if (accountState === "TEMPORARY") return "승인대기";
    if (accountState === "SUSPENDED") return "정지회원";
    if (accountState === "WITHDRAWN") return "탈퇴회원";
    if (accountState === "KICKEDOUT") return "강퇴회원";
  };
  const obsHandler = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (!isLast && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if (page === 0) {
      setIsLast(false);
    }
    AdminInstance.getUsers( setUsers, page, setIsLast, preventRef.current);
  }, [page]);
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { root: listRef.current, threshold: 0.1 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [isLast, users.length !== 0]);

  return (
    <WholePage>
      <Wrapper>
        <AdminTabs current="users" />
        <Page>
          {user?.userType === "관리자" ? (
            <>
              <Header>
                <span>전체회원관리</span>
                <ButtonContainer>
                  <Select onChange={(e: any) => setTime(e.target.value)}>
                    <Option value={0}>정지옵션</Option>
                    <option value={3}>3일</option>
                    <option value={7}>7일</option>
                    <option value={30}>30일</option>
                  </Select>
                  <Button color="blue" size="md" text="선택정지" onClick={() => AdminInstance.blockUsers(time, data)} />
                  <Button color="mint" size="md" text="선택복구" onClick={() => AdminInstance.restoreUsers(data)} />
                  <Button color="red" size="md" text="선택강퇴" onClick={() => AdminInstance.fireUsers(data)} />
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
                {users?.length ? (
                  <BelowLable ref={listRef}>
                    {users.map((user: any, i) => (
                      <Content key={i} className={user.userStatus === "ACTIVE" ? "" : "suspended"}>
                        <Values className="checkBox">
                          <CheckBox
                            id={user.userIdx}
                            onChange={(e: any) => {
                              onCheckedItem(e.target.checked, e.target.id);
                            }}
                          />
                        </Values>
                        <Values className="classification">{user.userType}</Values>
                        <Values className="accountStatus">{returnAccountState(user.userStatus)}</Values>
                        <Values className="nickname">{user.name}</Values>
                        <Values className="email">{user.email}</Values>
                        <Values className="returnAt">
                          {user.bannedRestoreDate ? new Date(user.bannedRestoreDate).toLocaleDateString() : ""}
                        </Values>
                        <Values className="subscription">{new Date(user.createdAt).toLocaleDateString()}</Values>
                        <Values className="reviewCount">{user.reviewCount}</Values>
                        <Values className="reportCount">{user.reportCount}</Values>
                      </Content>
                    ))}
                    {<div ref={obsRef}/>}
                  </BelowLable>
                ) : (
                  <Instead>
                    <AiOutlineExclamationCircle aria-hidden="true" />
                    <span>가입된 회원이 없습니다.</span>
                  </Instead>
                )}
              </Table>
            </>
          ) : (
            <NonAdmin>
              <AiOutlineExclamationCircle aria-hidden="true" />
              <span>권한이 없습니다.</span>
            </NonAdmin>
          )}
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
  /* border: 1px solid red; //! */
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
const NonAdmin = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 100%;
  color: var(--black-100);
  font-size: 3rem;
  font-weight: bold;
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
