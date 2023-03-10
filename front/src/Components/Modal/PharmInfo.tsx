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
        <LikeButton onClick={()=>setLike(!like)}>{like ? <img src="./Images/Heart.png"/> : <img src="./Images/UnHeart.png"/>}</LikeButton>
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px 0px 0px;
  height: 500px;
  width: 280px;
  border-right: 1px solid var(--black-100);
`;
const InfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 7px;
  gap: 10px;
  border-bottom: 1px solid var(--black-100);
`;
const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 30px;
`;
const InfoImgContainer = styled.div`
  display: inline-block;
  position: relative;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--black-100);
`;
const LikeButton = styled.span`
  position: absolute;
  right: 26px;
  top: 3px;
  width: 20px;
`;
const Img = styled.img`
  width: 260px;
  height: 171.2px;
  object-fit: cover;
  border-radius: 5px;
`;
const InfoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px;
  padding-bottom: 7px;
  gap: 5px;
  border-bottom: 1px solid var(--black-100);
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
  padding: 7px 5px;
  gap: 5px;
  border-bottom: 1px solid var(--black-100);
`;
const InfoTagTitle = styled.div`
  font-size: 14px;
  color: var(--black-500);
`;
const InfoTagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
  border-radius: 5px;
`;
