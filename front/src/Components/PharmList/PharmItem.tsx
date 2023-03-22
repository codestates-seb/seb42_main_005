import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PharmRank from "../Ul/PharmRank";
import PharmDetail from "../Modal/PharmDetail";
import { API_PharmItem } from "../../Api/APIs"; // PharmDetail.json

//TODO 실제 url 일때
interface Props {
  Pharm: any;
  storeIdx: number;
}

export default function PharmItem({ Pharm, storeIdx }: Props) {
  const [isModalUp, setIsModalUp] = useState(false);
  const [pharmDetail, setPharmDetail] = useState();
  const [like, setLike] = useState(false);

  //! GET : 약국상세정보
  useEffect(() => {
    const getPharmDetail = async () => {
      try {
        const response = await axios.get(`${API_PharmItem.REAL_API}/${storeIdx}`);
        setPharmDetail(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    getPharmDetail();
  }, []);

  return (
    <PharmCard>
      {isModalUp ? (
        <PharmDetail
          setIsModalUp={setIsModalUp}
          like={like}
          setLike={setLike}
          Pharm={pharmDetail}
          storeIdx={Pharm.storeIdx}
        />
      ) : null}
      <InfoImgContainer>
        {Pharm.image ? (
          <PharmImg src={Pharm.image as string} onClick={() => setIsModalUp(true)} />
        ) : (
          <PharmImg src="Images/ImgPreparing.png" alt="이미지 준비중입니다." onClick={() => setIsModalUp(true)} />
        )}
        <LikeButton onClick={() => setLike(!like)}>
          {like ? (
            <img src="./Images/Heart.png" alt="좋아요가 선택된 상태의 꽉 찬 하트모양입니다." />
          ) : (
            <img src="./Images/UnHeart.png" alt="좋아요 하기 전의 빈 하트모양입니다." />
          )}
        </LikeButton>
      </InfoImgContainer>
      <PharmTitleBox>
        <PharmName onClick={() => setIsModalUp(true)}>{Pharm && Pharm.name}</PharmName>
        {Pharm && <PharmRank rating={Pharm.rating} likes={Pharm.pickedStoreCount} reviewCount={Pharm.reviewCount} />}
      </PharmTitleBox>
    </PharmCard>
  );
}
const PharmCard = styled.article`
  width: 25rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid var(--black-100);
  .pharm_img {
    background-color: var(--black-200);
    width: 23.75rem;
    height: 15.625rem;
    display: flex;
    justify-content: center;
    margin: 30px auto 20px auto;
    border-radius: 10px;
  }
`;
const InfoImgContainer = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
`;
const Img = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
`;
const LikeButton = styled.span`
  position: absolute;
  right: 36px;
  top: 12px;
  width: 20px;
`;
const PharmTitleBox = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;
const PharmName = styled.h1`
  cursor: pointer;
  font-size: 1.56rem;
  font-weight: bold;
`;
const PharmImg = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
  border: 2px solid var(--black-100);
`;
