//! 모달 컴포넌트 본 창입니다
import { useState } from "react";
import styled from "styled-components";
import PharmInfo from "./PharmInfo";
import ReviewUnit from "./ReviewUnit";
import WriteReviewForm from "./WriteReviewForm";
import PharmRank from "../Ul/PharmRank";
import Button from "../Ul/Button";

export default function PharmDetail() {
  const [isReviewFormShown, setIsReviewFormShown] = useState(false);

  return (
    <>
      <ModalBackDrop>
        <ModalContainer>
          <InfoHeader>
            <InfoTitle>킹갓약국</InfoTitle>
            <PharmRank />
          </InfoHeader>
          <Constant>
            <PharmInfo />
            <ReviewContainer>
              <ReviewTitle>리뷰</ReviewTitle>
              <Reviews>
                <ReviewUnit />
              </Reviews>
            </ReviewContainer>
            {isReviewFormShown ? (
              <WriteReviewForm isReviewFormShown={isReviewFormShown} setIsReviewFormShown={setIsReviewFormShown} />
            ) : null}
            {isReviewFormShown ? null : (
              <WriteReviewBtnContainer>
                <Button
                  onClick={() => setIsReviewFormShown(!isReviewFormShown)}
                  color="mint"
                  size="md"
                  text="리뷰쓰기"
                />
              </WriteReviewBtnContainer>
            )}
          </Constant>
        </ModalContainer>
      </ModalBackDrop>
    </>
  );
}

const ModalBackDrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--modal-backdrop);
`;
const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
`;
const Constant = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: scroll;
    height: 580px;
    padding-top: calc(100% - 180px);
  }
  ::-webkit-scrollbar-track {
    background-color: var(--black-075);
    border-radius: 0px 5px 5px 0px;
  }
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
const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 30px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
const ReviewContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 550px;
  width: 450px;
  padding: 10px 0px 0px 20px;
  @media (max-width: 768px) {
    position: static;
    display: flex;
    align-items: center;
    height: auto;
    padding: 20px 10px 10px 10px;
    margin-bottom: 60px;
    border-bottom: 1px solid var(--black-100);
  }
`;
const ReviewTitle = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid var(--black-100);
  color: var(--black-500);
  font-weight: bold;
  font-size: 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 450px;
    padding-left: 10px;
    gap: 100px;
  }
`;
const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  border-bottom: 0.5px solid var(--black-100);
  ::-webkit-scrollbar-track {
    visibility: hidden;
  }
  :active::-webkit-scrollbar-track {
    width: 0.6rem;
    visibility: visible;
  }
  @media (max-width: 768px) {
    flex-grow: 0;
    overflow: visible;
  }
`;
const WriteReviewBtnContainer = styled.span`
  z-index: 1;
  position: absolute;
  right: 55px;
  bottom: 25px;
  width: 50px;
  @media (max-width: 768px) {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    right: 20px;
    bottom: 20px;
    z-index: 1;
    width: 490px;
  }
`;
