import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PharmRank from "../Ul/PharmRank";
import PharmDetail from "../Modal/PharmDetail";
import { API_PharmItem } from "../../Api/APIs";
import { API_PharmDetail } from "../../Api/APIs";
import { useAppSelector } from "../../Redux/hooks";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../Api/localStorage";

interface Props {
  Pharm: any;
  storeIdx: number;
}

export default function PharmItem({ Pharm, storeIdx }: Props) {
  const [isModalUp, setIsModalUp] = useState(false);
  const [pharmDetail, setPharmDetail] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [like, setLike] = useState(false);

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const pharmDetailsAndreviewList = async () => {
      await axios
        .get(`${API_PharmItem.REAL_API}/${storeIdx}`)
        .then((response) => {
          setPharmDetail(response.data.response);
          axios
            .get(`${API_PharmDetail.REAL_API}/${storeIdx}/review`)
            .then((response) => {
              setReviewList(response.data.response.storeReviews);
            })
            .catch((err) => console.log("리뷰받아오던 중" + err));
        })
        .catch((err) => console.log("약국상세받아오던 중" + err));
    };
    pharmDetailsAndreviewList();
    setIsModalUp(true);
  };
  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! POST : 찜하기/찜취소
  const likeThisPharmacy = async () => {
    try {
      await axios({
        url: `${API_PharmItem.REAL_API}/${storeIdx}/pick?userIdx=${user.userIdx}`,
        method: "post",
      });
    } catch (error) {
      console.log(error);
    }
    setLike(!like);
  };

  const nagigate = useNavigate();
  const leadToLogin = () => {
    nagigate("/login");
    alert("약국 찜하기를 하시려면 로그인을 해주세요!");
  };

  const onClick = () => {
    const accessToken = getLocalStorage("access_token");
    if (!accessToken) {
      return leadToLogin();
    } else if (user.storeIdx) {
      return alert("약사회원은 찜하기를 이용하실수 없습니다.");
    } else if (user.userIdx && accessToken) {
      return likeThisPharmacy();
    }
  };

  return (
    <PharmCard>
      {isModalUp ? (
        <PharmDetail
          setIsModalUp={setIsModalUp}
          like={like}
          setLike={setLike}
          Pharm={Pharm}
          storeIdx={Pharm.storeIdx}
          pharmDetail={pharmDetail}
          reviewList={reviewList}
          setReviewList={setReviewList}
        />
      ) : null}
      <InfoImgContainer>
        <>
          {Pharm.image ? (
            <PharmImg src={Pharm.image as string} onClick={() => onModalUp()} />
          ) : (
            <PharmImg src="Images/ImgPreparing.png" alt="이미지 준비중입니다." onClick={() => onModalUp()} />
          )}
        </>
        <>
          {/* <LikeButton onClick={() => likeThisPharmacy()}> */}
          <LikeButton onClick={onClick}>
            {/* like 의 상태가 아니라 약국 정보에 내가 이 약국을 찜했는지 여부의 boolean 으로 바꿔야 함 */}
            {like ? (
              <img src="./Images/Heart.png" alt="좋아요가 선택된 상태의 꽉 찬 하트모양입니다." />
            ) : (
              <img src="./Images/UnHeart.png" alt="좋아요 하기 전의 빈 하트모양입니다." />
            )}
          </LikeButton>
        </>
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
  width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1.4rem;
  font-weight: bold;
`;
const PharmImg = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
  border: 2px solid var(--black-100);
`;
