import React, { Link } from "react-router-dom";
import styled from "styled-components";
import PharmacistInformation from "./Pharmacist_Information";
import PharmacyInformation from "./Pharmacy_Information";
import Button from "../../Components/Ul/Button";

export default function MyPharmacy() {

  return (
    <WholePage>
      <ContentsWrapper>
        <PageHeading>마이페이지</PageHeading>
        <Information>
          <Title>내 정보</Title>
          <PharmacistInformation />
        </Information>
        <Information>
          <Title>우리약국</Title>
          <PharmacyInformation />
        </Information>
        <QuitBtnWrapper>
          <Link to="/sign_out">
            <Button text="탈퇴하기" color="red" size="lg" />
          </Link>
        </QuitBtnWrapper>
      </ContentsWrapper>
    </WholePage>
  );
}

const WholePage = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentsWrapper = styled.section`
  width: 1000px;
  padding-top: 50px;
  @media (max-width: 768px) {
    width: 700px;
  }
`;
const QuitBtnWrapper = styled.div`
  cursor: default;
  display: flex;
  justify-content: flex-end;
  margin: 20px 20px 100px 0;
  text-decoration: none;
`;
const PageHeading = styled.h1`
  padding-bottom: 30px;
  padding-left: 10px;
  color: var(--black-600);
  font-size: 40px;
  border-bottom: 1.5px solid var(--black-075);
  @media (max-width: 768px) {
    padding-left: 50px;
  }
`;
const Information = styled.section`
  display: flex;
  padding: 50px 20px;
  border-bottom: 1.5px solid var(--black-075);
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const Title = styled.h2`
  display: flex;
  flex-grow: 1;
  @media (max-width: 768px) {
    display: flex;
    align-items: flex-start;
    width: 600px;
    margin-bottom: 20px;
  }
`;
