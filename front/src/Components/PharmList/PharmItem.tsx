import { useState, useEffect } from "react";
import styled from "styled-components";
import PharmRank from "../Ul/PharmRank";
import PharmDetail from "../Modal/PharmDetail";
import axios from "axios";

interface Props {
  totalPharmList: any;
}

export default function PharmItem({ totalPharmList }: Props) {
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);
  const [pharmDetail, setPharmDetail]: any = useState();

  useEffect(() => {
    const getPharmDetail = async () => {
      try {
        const response = await axios.get("http://localhost:3020/response");
        setPharmDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPharmDetail();
  }, []);

  return (
    <PharmCard>
      {isModalUp ? (
        <PharmDetail setIsModalUp={setIsModalUp} like={like} setLike={setLike} pharmDetail={pharmDetail} />
      ) : null}
      <InfoImgContainer>
        <Img src={totalPharmList && totalPharmList.image} alt="고심약국" onClick={() => setIsModalUp(true)} />
        <LikeButton onClick={() => setLike(!like)}>
          {like ? <img src="./Images/Heart.png" alt="like" /> : <img src="./Images/UnHeart.png" alt="unlike" />}
        </LikeButton>
      </InfoImgContainer>
      <PharmTitleBox>
        <PharmName onClick={() => setIsModalUp(true)}>{totalPharmList && totalPharmList.name}</PharmName>
        {totalPharmList && <PharmRank rating={totalPharmList.rating} />}
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
