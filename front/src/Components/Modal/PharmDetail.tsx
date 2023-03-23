import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import WriteReviewForm from "./WriteReviewForm";
import ReviewUnit from "./ReviewUnit";
import PharmInfo from "./PharmInfo";
import PharmRank from "../Ul/PharmRank";
import Button from "../Ul/Button";
import { API_PharmDetail } from "../../Api/APIs";
import { zIndex_Modal } from "../../Util/z-index";
import { HiXMark } from "react-icons/hi2";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface Props {
  setIsModalUp: React.Dispatch<React.SetStateAction<boolean>>;
  like?: boolean;
  setLike?: React.Dispatch<React.SetStateAction<boolean>>;
  storeIdx: number;
  Pharm: any;
}

export default function PharmDetail({ setIsModalUp, like, setLike, storeIdx, Pharm }: Props) {
  const [isReviewFormShown, setIsReviewFormShown] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  //! GET : 리뷰리스트
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`${API_PharmDetail.REAL_API}/${storeIdx}/review`);
        setReviewList(response.data.response.storeReviews);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  console.log(reviewList)

  return (
    <ModalBackDrop onClick={() => setIsModalUp(false)}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <CloseBtnContainer>
          <HiXMark id="close" onClick={() => setIsModalUp(false)} aria-hidden="true" />
        </CloseBtnContainer>
        <InfoHeader>
          <InfoTitle>{Pharm.name}</InfoTitle>
          <PharmRank rating={Pharm.rating} likes={Pharm.pickedStoreCount} reviewCount={Pharm.reviewCount} />
        </InfoHeader>
        <Constant>
          <PharmInfo like={like} setLike={setLike} Pharm={Pharm} />
          <ReviewContainer>
            <ReviewTitle>리뷰</ReviewTitle>
            {reviewList.length ? (
              <Reviews>
                {reviewList.map((review: any) => (
                  <ReviewUnit
                    review={review}
                    key={review.reviewIdx}
                    reviewIdx={review.reviewIdx}
                    storeIdx={Pharm.storeIdx}
                    setReviewList={setReviewList}
                    reviewList={reviewList}
                  />
                ))}
              </Reviews>
            ) : (
              <Instead>
                <AiOutlineExclamationCircle className="bigger" onClick={() => setIsReviewFormShown(true)} />
                <p>작성된 리뷰가 없습니다.</p>
                <p>지금 리뷰를 작성해 보세요!</p>
              </Instead>
            )}
          </ReviewContainer>
        </Constant>
        {isReviewFormShown ? (
          <WriteReviewForm setIsReviewFormShown={setIsReviewFormShown} storeIdx={Pharm.storeIdx} reviewList={reviewList} setReviewList={setReviewList}/>
        ) : null}
        {/* 로그인이 안된 상태일 경우, 이 부분이 없어야 합니다 */}
        {isReviewFormShown ? null : (
          <WriteReviewBtnContainer>
            <Button onClick={() => setIsReviewFormShown(true)} color="mint" size="md" text="리뷰쓰기" />
          </WriteReviewBtnContainer>
        )}
      </ModalContainer>
    </ModalBackDrop>
  );
}

const ModalBackDrop = styled.section`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: var(--modal-backdrop);
  z-index: ${zIndex_Modal.ModalBackDrop};
`;
const ModalContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 30px;
  height: 600px;
  width: 940px;
  background-color: var(--white);
  border-radius: 10px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 20px;
    height: 700px;
    width: 500px;
    background-color: var(--white);
    border-radius: 10px;
  }
  z-index: ${zIndex_Modal.ModalContainer};
`;
const InfoHeader = styled.header`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0px 10px 7px 10px;
    gap: 10px;
    width: 450px;
    background-color: var(--white);
    border-bottom: 1px solid var(--black-100);
  }
`;
const Constant = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ::-webkit-scrollbar-track {
    background-color: var(--black-075);
    border-radius: 0px 5px 5px 0px;
  }
  @media (max-width: 768px) {
    display: block;
    overflow-y: scroll;
  }
`;
const WriteReviewBtnContainer = styled.footer`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  right: 20px;
  bottom: 25px;
  width: 400px;
  padding-top: 10px;
  background-color: var(--white);
  @media (max-width: 768px) {
    position: static;
    bottom: 20px;
    background-color: var(--white);
  }
`;
const InfoTitle = styled.h1`
  font-weight: bold;
  font-size: 30px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
const ReviewContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 510px;
  width: 450px;
  padding: 10px 0px 0px 20px;
  @media (max-width: 768px) {
    position: static;
    display: flex;
    align-items: center;
    height: auto;
    padding: 20px 10px 10px 10px;
    border-bottom: 1px solid var(--black-100);
  }
`;
const ReviewTitle = styled.h2`
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  color: var(--black-500);
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    gap: 100px;
    width: 450px;
  }
`;
const Reviews = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 10px 10px 0 0;
  :active::-webkit-scrollbar-track {
    width: 0.6rem;
    visibility: visible;
  }
  @media (max-width: 768px) {
    flex-grow: 0;
    overflow: visible;
  }
`;
const CloseBtnContainer = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  top: 15px;
  right: 20px;
  width: 500px;
  font-size: 40px;
  color: var(--black-100);
  z-index: ${zIndex_Modal.CloseBtnContainer};
`;
const Instead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 420px;
  height: 500px;
  font-weight: 700;
  color: var(--black-300);
  border-radius: 5px;
  background-color: var(--black-050);
  .bigger {
    font-size: 40px;
    margin-bottom: 10px;
    :hover {
      color: var(--black-500);
    }
  }
  @media (max-width: 768px) {
    height: 200px;
  }
`;
