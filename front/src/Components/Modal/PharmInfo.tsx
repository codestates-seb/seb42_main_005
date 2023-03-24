import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PharmRank from "../Ul/PharmRank";
import AnyDropDown from "./AnyDropDown";
import { APIS } from "../../Api/APIs";

interface Props {
  like: any;
  setLike: any;
  Pharm: any;
}

export default function PharmInfo({ like, setLike, Pharm }: Props) {
  const [isDropDownDown, setIsDropDownDown] = useState(false);

  //! POST : 찜하기/찜취소
  const likeThisPharmacy = async () => {
    try {
      await axios({
        url: `${APIS.POST_LIKE}/${Pharm.storeIdx}/pick?userIdx=${1}`, //? 리덕스 툴킷에서 유저인덱스 받아와야 함
        method: "post",
      });
    } catch (error) {
      console.log(error);
    }
    setLike(!like);
  };

  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>{Pharm.name}</InfoTitle>
        {Pharm && <PharmRank rating={Pharm.rating} likes={Pharm.pickedStoreCount} reviewCount={Pharm.reviewCount} />}
      </InfoHeader>
      <InfoImgContainer>
        {Pharm.image ? (
          <PharmImg src={Pharm.image as string} />
        ) : (
          <PharmImg src="Images/ImgPreparing.png" alt="이미지 준비중입니다." />
        )}
        {/* like 의 상태가 아니라 약국 정보에 내가 이 약국을 찜했는지 여부의 boolean 으로 바꿔야 함 */}
        {like ? (
          <LikeButton onClick={() => likeThisPharmacy()}>
            <img src="./Images/Heart.png" alt="좋아요 상태의 꽉찬 하트입니다." />
          </LikeButton>
        ) : (
          <LikeButton onClick={() => likeThisPharmacy()}>
            <img src="./Images/UnHeart.png" alt="좋아요 전 상태의 빈 하트입니다." />
          </LikeButton>
        )}
      </InfoImgContainer>
      <InfoInfo>
        <InfoUnit>
          <InfoInfoTitle>영업시간</InfoInfoTitle>
          <InfoInfoContent>
            {Pharm.todayOperatingTime
              ? `${Pharm.todayOperatingTime.operatingTime.startTime.slice(
                  0,
                  -3,
                )} - ${Pharm.todayOperatingTime.operatingTime.endTime.slice(0, -3)}`
              : "정보가 없습니다."}
            {!isDropDownDown ? (
              <More id={`dropDown ${isDropDownDown ? "close" : "open"}`} onClick={() => setIsDropDownDown(true)}>
                영업시간 더보기
              </More>
            ) : null}
            {isDropDownDown ? (
              <AnyDropDown setIsDropDownDown={setIsDropDownDown} workingHours={Pharm.operatingTime} />
            ) : null}
          </InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>주소</InfoInfoTitle>
          <InfoInfoContent className="address">{Pharm.address}</InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>전화번호</InfoInfoTitle>
          <InfoInfoContent>{Pharm.tel}</InfoInfoContent>
        </InfoUnit>
      </InfoInfo>
    </InfoContainer>
  );
}

const InfoContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  padding: 10px 20px 20px 0px;
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
  padding: 10px;
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
  padding: 15px 5px;
  border-bottom: 1px solid var(--black-100);
`;
const LikeButton = styled.button`
  position: absolute;
  right: 51px;
  top: 17px;
  width: 20px;
  border: none;
  background-color: transparent;
  @media (max-width: 768px) {
    right: 60px;
  }
`;
const InfoInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px 10px 20px;
  gap: 10px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const InfoUnit = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;
const InfoInfoTitle = styled.h2`
  display: flex;
  align-items: flex-start;
  width: 70px;
  color: var(--black-350);
  font-size: 17px;
  font-weight: bold;
`;
const InfoInfoContent = styled.span`
  position: relative;
  display: flex;
  align-items: flex-start;
  height: 25px;
  width: 350px;
  gap: 3px;
  font-size: 17px;
  &.address {
    height: 60px;
    white-space: normal;
    word-break: normal;
  }
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
const PharmImg = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
  border: 2px solid var(--black-100);
`;
