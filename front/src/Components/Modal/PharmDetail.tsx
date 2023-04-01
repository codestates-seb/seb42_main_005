import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WriteReviewForm from "./WriteReviewForm";
import PharmRank from "../Ul/PharmRank";
import PharmInfo from "./PharmInfo";
import ReviewList from "./Reviews";
import Button from "../Ul/Button";
import { zIndex_Modal } from "../../Util/z-index";
import { getLocalStorage } from "../../Api/localStorage";
import { TYPE_setBoolean, TYPE_boolean, TYPE_reviewList, TYPE_Detail, TYPE_setLike } from "../../Api/TYPES";
import { HiXMark } from "react-icons/hi2";

interface Props {
  setIsModalUp: TYPE_setBoolean;
  like: TYPE_boolean;
  setLike: TYPE_setLike;
  storeIdx: number;
  pharmDetail: TYPE_Detail | undefined;
  reviewList: TYPE_reviewList[];
  setReviewList: React.Dispatch<React.SetStateAction<TYPE_reviewList[]>>;
}

export default function PharmDetail({
  setIsModalUp,
  like,
  setLike,
  storeIdx,
  pharmDetail,
  reviewList,
  setReviewList,
}: Props) {
  const [isReviewFormShown, setIsReviewFormShown] = useState<TYPE_boolean>(false);

  const token = getLocalStorage("access_token");
  const navigate = useNavigate();
  const returnLogin = () => {
    alert("로그인을 해주세요!");
    navigate("/login");
  };

  return (
    <ModalBackDrop onClick={() => setIsModalUp(false)}>
      <ModalContainer onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}>
        <CloseBtnContainer>
          <HiXMark id="close" onClick={() => setIsModalUp(false)} aria-hidden="true" />
        </CloseBtnContainer>
        <InfoHeader>
          <InfoTitle>{pharmDetail?.name}</InfoTitle>
          <PharmRank
            rating={pharmDetail?.rating}
            likes={pharmDetail?.pickedStoreCount}
            reviewCount={pharmDetail?.reviewCount}
          />
        </InfoHeader>
        <Constant>
          <PharmInfo like={like} setLike={setLike} pharmDetail={pharmDetail} />
          <ReviewList
            reviewList={reviewList}
            setReviewList={setReviewList}
            setIsReviewFormShown={setIsReviewFormShown}
            storeIdx={storeIdx}
            Pharm={pharmDetail}
          />
        </Constant>
        {token && isReviewFormShown ? (
          <WriteReviewForm
            Pharm={pharmDetail}
            setIsReviewFormShown={setIsReviewFormShown}
            storeIdx={pharmDetail?.storeIdx}
            setReviewList={setReviewList}
          />
        ) : null}
        {token ? (
          <WriteReviewBtnContainer>
            <Button onClick={() => setIsReviewFormShown(true)} color="mint" size="md" text="리뷰쓰기" />
          </WriteReviewBtnContainer>
        ) : (
          <WriteReviewBtnContainer>
            <Button onClick={() => returnLogin()} color="mint" size="md" text="리뷰쓰기" />
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
  bottom: 20px;
  width: 400px;
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
