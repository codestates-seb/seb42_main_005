import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import PharmRank from "../Ul/PharmRank";
import PharmDetail from "../Modal/PharmDetail";
import {APIS} from "../../Api/APIs";
import {getLocalStorage} from "../../Api/localStorage";
import {useAppSelector} from "../../Redux/hooks";

interface Props {
  Pharm: any;
  storeIdx: number;
}

export default function PharmItem({ Pharm, storeIdx }: Props) {
  const [isModalUp, setIsModalUp] = useState<React.SetStateAction<boolean>>(false);
  const [pharmDetail, setPharmDetail] = useState<React.SetStateAction<{}>>({});
  const [reviewList, setReviewList] = useState<React.SetStateAction<[]>>([]);
  const [like, setLike] = useState<React.SetStateAction<boolean>>(false);

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const getPharmDetail = async () => {
      await axios
        .get(`${APIS.GET_PHARMLIST}/${storeIdx}`)
        .then((response) => setPharmDetail(response.data.response))
        .catch((err) => {
          console.log("약국상세받아오던 중 에러 발생");
          console.log(err);
        });
    };
    const getReviewList = async () => {
      await axios
        .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
        .then((response) => setReviewList(response.data.response.storeReviews))
        .catch((err) => {
          console.log("약국리뷰받아오던 중 에러 발생");
          console.log(err);
        });
    };
    axios.all([getPharmDetail(), getReviewList()]);
    setIsModalUp(true);
  };

  //! POST : 찜하기/찜취소
  const likeThisPharmacy = async () => {
    await axios
      .post(`${APIS.POST_LIKE}/${storeIdx}/pick?userIdx=${user.userId}`)
      .then(() => setLike(!like))
      .catch((error) => console.log(error));
  };

  const nagigate = useNavigate();

  const leadToLogin = () => {
    nagigate("/login");
    alert("약국 찜하기를 하시려면 로그인을 해주세요!");
  };

  const likeButton = () => {
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
          storeIdx={Pharm.storeIdx}
          pharmDetail={pharmDetail}
          reviewList={reviewList}
          setReviewList={setReviewList}
        />
      ) : null}
      <InfoImgContainer>
        {Pharm.imagePath ? (
          <PharmImg src={Pharm.imagePath} onClick={() => onModalUp()} />
        ) : (
          <PharmImg src="Images/ImgPreparing.png" alt="이미지 준비중입니다." onClick={() => onModalUp()} />
        )}
        <LikeButton onClick={likeButton}>
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
