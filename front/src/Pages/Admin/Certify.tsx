import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { AdminInstance } from "../../Api/AxiosInstance";
import { useAppSelector } from "../../Redux/hooks";
import Cert from "./Cert";
import AdminTabs from "./AdminTabs";
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Check } from "../../Api/TYPES";

export default function Certify() {
  const [certificates, setCertificates] = useState<any>([]);
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
    AdminInstance.getCertificates(setCertificates, page, setIsLast, preventRef.current);
  }, [page]);
  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { root: listRef.current, threshold: 0.1 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [isLast, certificates.length !== 0]);

  return (
    <WholePage>
      <Wrapper>
        <AdminTabs current="certify" />
        <Page>
          {user?.userType === "관리자" ? (
            <>
              <Header>
                <span>약사인증관리</span>
                <ButtonContainer>
                  <Button color="blue" size="md" text="신청승인" onClick={() => AdminInstance.successCertify(data)} />
                  <Button color="red" size="md" text="신청반려" onClick={() => AdminInstance.deniedCertify(data)} />
                </ButtonContainer>
              </Header>
              <Table>
                <Label>
                  <Values className="checkBox">
                    <CheckBox />
                  </Values>
                  <Contaniner>
                    <Values className="nickname">닉네임</Values>
                    <Values className="email">email</Values>
                    <Values className="requested">신청일</Values>
                    <Values className="businessCert">사업자등록증</Values>
                    <Values className="licenceCert">약사면허증</Values>
                  </Contaniner>
                </Label>
                {certificates?.length ? (
                  <BelowLable ref={listRef}>
                    {certificates.map((cert: any, i: number) => (
                      <Content key={i}>
                        <Values className="checkBox">
                          <CheckBox
                            id={cert.userIdx}
                            onChange={(e: any) => onCheckedItem(e.target.checked, e.target.id)}
                          />
                        </Values>
                        <Cert key={i} cert={cert} />
                      </Content>
                    ))}
                    {<div ref={obsRef} />}
                  </BelowLable>
                ) : (
                  <Instead>
                    <AiOutlineExclamationCircle aria-hidden="true" />
                    <span>약사인증요청이 없습니다.</span>
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
const Table = styled.figure`
  display: flex;
  flex-direction: column;
  height: 450px;
  overflow-x: scroll;
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
const Contaniner = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 8px;
  width: 100%;
`;
