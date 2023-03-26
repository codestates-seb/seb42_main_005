import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import AdminTabs from "./AdminTabs";
import CheckBox from "../../Components/Ul/CheckBox";
import {useAppSelector} from "../../Redux/hooks";
import Button from "../../Components/Ul/Button";
import {APIS} from "../../Api/APIs";
import {AiOutlineExclamationCircle} from "react-icons/ai";

export default function Users() {
  const [users, setUsers] = useState<never[]>([]);
  const [time, setTime] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<Array<any>>([]);

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! GET : 전체 회원 리스트 불러오기
  useEffect(() => {
    const getUsers = async () => {
      await axios
        .get(APIS.GET_ADMIN_USERS)
        .then((response) => setUsers(response.data.response.content))
        .catch((error) => {
          console.log("전체회원리스트 불러오던 중 에러 발생");
          console.log(error);
        });
    };
    getUsers();
  }, []);
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
  console.log(users);
  const data = { userIdxs: checkedList };
  //! POST : 계정 정지
  const blockUsers = async () => {
    await axios
      .post(`${APIS.POST_ADMIN_BLOCK}?period=${time}`, data)
      .catch((error) => {
        console.log("계정 정지하던 중 에러 발생");
        console.log(error);
      })
      .then(() => location.reload());
  };

  //! POST : 계정 강퇴
  const fireUsers = async () => {
    await axios
      .post(APIS.POST_ADMIN_FIRE, data)
      .catch((error) => {
        console.log("계정 강퇴하던 중 에러 발생");
        console.log(error);
      })
      .then(() => location.reload());
  };

  //! POST : 계정 복구
  const restoreUsers = async () => {
    await axios
      .post(APIS.POST_ADMIN_RESTORE, data)
      .catch((error) => {
        console.log("계정 복구하던 중 에러 발생");
        console.log(error);
      })
      .then(() => location.reload());
  };

  const returnAccountState = (accountState: any) => {
    if (accountState === "ACTIVE") return "활동회원";
    if (accountState === "TEMPORARY") return "승인대기";
    if (accountState === "SUSPENDED") return "강퇴회원";
    if (accountState === "WITHDRAWN") return "탈퇴회원";
  };

  return (
    <WholePage>
      <Wrapper>
        <AdminTabs current="users" />
        <Page>
          {user?.userRole === "관리자" ? (
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
                  <Button color="blue" size="md" text="선택정지" onClick={() => blockUsers()} />
                  <Button color="mint" size="md" text="선택복구" onClick={() => restoreUsers()} />
                  <Button color="red" size="md" text="선택강퇴" onClick={() => fireUsers()} />
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
