//! 모달 컴포넌트 오른편 약국 정보 부분입니다
import { useState } from "react";
import styled from "styled-components";
import Tag from "../Ul/Tag";
import PharmRank from "../Ul/PharmRank";
import AnyDropDown from "./AnyDropDown";

interface Props {
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PharmInfo({ like, setLike }: Props) {
  const [isDropDownDown, setIsDropDownDown] = useState(false);
  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>킹갓약국</InfoTitle>
        <PharmRank />
      </InfoHeader>
      <InfoImgContainer>
        <Img src="./Images/random.png" alt="고심약국"></Img>
        <LikeButton onClick={() => setLike(!like)}>
          {like ? <img src="./Images/Heart.png" alt="like" /> : <img src="./Images/UnHeart.png" alt="unlike" />}
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
          <InfoInfoContent>
            09:00 ~ 21:00
            {!isDropDownDown ? (
              <More id={`dropDown ${isDropDownDown ? "close" : "open"}`} onClick={() => setIsDropDownDown(true)}>
                영업시간 더보기
              </More>
            ) : null}
            {isDropDownDown ? <AnyDropDown setIsDropDownDown={setIsDropDownDown} /> : null}
          </InfoInfoContent>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 450px;
  padding: 10px 20px 0px 0px;
  border-right: 1px solid var(--black-100);
  @media (max-width: 768px) {
    height: auto;
    margin-bottom: 30px;
    padding: 0px;
    border-right: none;
    border-bottom: 1px solid var(--black-100);
  }
`;
const InfoHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px 10px 10px;
  gap: 10px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    display: none;
  }
`;
const InfoTitle = styled.h1`
  font-weight: bold;
  font-size: 30px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
const InfoImgContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 5px;
  border-bottom: 1px solid var(--black-100);
`;
const Img = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
`;
const LikeButton = styled.button`
  position: absolute;
  right: 51px;
  top: 22px;
  width: 20px;
  border: none;
  background-color: transparent;
  @media (max-width: 768px) {
    right: 60px;
    top: 21px;
  }
`;
const InfoInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 10px;
  gap: 10px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const InfoUnit = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const InfoInfoTitle = styled.h2`
  width: 70px;
  color: var(--black-350);
  font-size: 20px;
  font-weight: bold;
`;
const InfoInfoContent = styled.span`
  display: flex;
  align-items: center;
  height: 25px;
  gap: 3px;
  font-size: 18px;
`;
const InfoTagContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 5px;
  @media (max-width: 768px) {
    gap: 10px;
    padding: 20px;
    border: none;
  }
`;
const InfoTagTitle = styled.h3`
  font-size: 14px;
  font-weight: 400;
  color: var(--black-500);
`;
const InfoTagBox = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  padding: 10px;
  gap: 5px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
`;
const More = styled.button`
  cursor: pointer;
  display: inline-block;
  color: var(--l_button-mint);
  margin-left: 5px;
  padding: 3px 5px;
  font-size: 12px;
  border-radius: 15px;
  border: 1px solid var(--l_button-mint);
  background-color: transparent;
  :hover {
    color: var(--l_button-mint-hover);
    border: 1px solid var(--l_button-mint-hover);
  }
`;
