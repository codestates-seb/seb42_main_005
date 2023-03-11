//! 모달 컴포넌트 오른편 약국 정보 부분입니다
import { useState } from "react";
import styled from "styled-components";
import Tag from "../Ul/Tag";
import PharmRank from "../Ul/PharmRank";

export default function PharmInfo() {
  const [like, setLike] = useState(false);

  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>킹갓약국</InfoTitle>
        <PharmRank />
      </InfoHeader>
      <InfoImgContainer>
        <Img src="/Images/pharm.png"></Img>
        <LikeButton onClick={() => setLike(!like)}>
          {like ? <img src="./Images/Heart.png" /> : <img src="./Images/UnHeart.png" />}
        </LikeButton>
      </InfoImgContainer>
      <InfoInfo>
        <InfoUnit>
          <InfoInfoTitle>주소</InfoInfoTitle>
          <InfoInfoContent>서울시 종로구 대학로 101</InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>전화번호</InfoInfoTitle>
          <InfoInfoContent>02-1234-1234</InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>영업시간</InfoInfoTitle>
          <InfoInfoContent>09:00 ~ 21:00</InfoInfoContent>
        </InfoUnit>
      </InfoInfo>
      <InfoTagContainer>
        <InfoTagTitle>사람들이 많이 선택한 태그!</InfoTagTitle>
        <InfoTagBox>
          <Tag idx={0} />
          <Tag idx={1} />
          <Tag idx={2} />
          <Tag idx={3} />
        </InfoTagBox>
      </InfoTagContainer>
    </InfoContainer>
  );
}

const InfoContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 550px;
  width: 450px;
  padding: 10px 20px 0px 0px;
  border-right: 1px solid var(--black-100);
  @media (max-width: 768px) {
    height: auto;
    margin: 0px 0 30px 0;
    padding: 300px 0px 0px 0px;
    border-right: none;
    border-bottom: 1px solid var(--black-100);
  }
`;
const InfoHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px 7px 10px;
  gap: 10px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    position: sticky;
    top: 0px;
    padding: 40px 10px 10px 10px;
    background-color: var(--white);
    z-index: 3;
  }
`;
const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 30px;
`;
const InfoImgContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    padding: 80px 20px 20px 20px;
  }
`;
const Img = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
`;
const LikeButton = styled.span`
  position: absolute;
  right: 51px;
  top: 12px;
  width: 20px;
  @media (max-width: 768px) {
    right: 60px;
    top: 80px;
  }
`;
const InfoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 5px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const InfoUnit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const InfoInfoTitle = styled.span`
  color: var(--black-350);
  font-size: 17px;
  font-weight: bold;
`;
const InfoInfoContent = styled.span`
  font-size: 16px;
`;
const InfoTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    gap: 10px;
    padding: 20px;
    border: none;
  }
`;
const InfoTagTitle = styled.div`
  font-size: 14px;
  color: var(--black-500);
`;
const InfoTagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  padding: 10px;
  gap: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
`;
