import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import AdminTabs from "./AdminTabs";
import Cert from "./Cert";
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";
import { API_Certify } from "../../Api/APIs";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Certify() {
  const [certificates, setCertificates] = useState([]);
  const [checkList, setCheckList]: any = useState([]);

  //! GET : 약사인증신청 리스트 불러오기
  useEffect(() => {
    const getCertificates = async () => {
      try {
        //* dummy data 일때 -> Review.json
        // const response = await axios.get(API_Certify.DUMMY_API);
        //TODO 실제 url 일때 -> /api/admin/access/requests
        const response = await axios.get(`${API_Certify.GET_REAL_API}/access/requests`);
        setCertificates(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCertificates();
  }, []);

  //! POST : 약사인증신청 승인
  const successCertify = async () => {
    try {
      //TODO /api/admin/access/success
      await axios({
        url: API_Certify.POST_SUCCESS_REAL_API,
        method: "post",
        data: setCheckList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //! POST : 약사인증신청 반려
  const deniedCertify = async () => {
    try {
      //TODO /api/admin/access/failure
      await axios({
        url: API_Certify.POST_DENIED_REAL_API,
        method: "post",
        data: setCheckList,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WholePage>
      <Wrapper>
        <AdminTabs current="certify" />
        <Page>
          <Header>
            <span>약사인증관리</span>
            <ButtonContainer>
              <Button color="blue" size="md" text="신청승인" onClick={() => successCertify()} />
              <Button color="blue" size="md" text="신청반려" onClick={() => deniedCertify()} />
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
            {certificates.length ? (
              <BelowLable>
                {certificates.map((cert: any, i) => (
                  <Content>
                    <Values className="checkBox">
                      <CheckBox onChange={() => setCheckList([...checkList, { userIdx: cert.userIdx }])} />
                    </Values>
                    <Cert key={i} cert={cert} />
                  </Content>
                ))}
              </BelowLable>
            ) : (
              <Instead>
                <AiOutlineExclamationCircle aria-hidden="true" />
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
  color: var(--black-100);
  font-size: 6rem;
  font-weight: bold;
  background-color: var(--black-025);
  span {
    font-size: 2rem;
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
