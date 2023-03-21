import { useState, useEffect } from "react";
import styled from "styled-components";
import PharmInfo from "./PharmInfo";
import ReviewUnit from "./ReviewUnit";
import WriteReviewForm from "./WriteReviewForm";
import PharmRank from "../Ul/PharmRank";
import Button from "../Ul/Button";
import { zIndex_Modal } from "../../Util/z-index";
import { HiXMark } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import axios from "axios";
import { getReviewListAction } from "../../Redux/slice/getReviewSlice";

interface Props {
  setIsModalUp: React.Dispatch<React.SetStateAction<boolean>>;
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  pharmListDetail: any;
}

export default function PharmDetail({ setIsModalUp, like, setLike, pharmListDetail }: Props) {
  const [isReviewFormShown, setIsReviewFormShown] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3003/response");
        // console.log(response.data);

        dispatch(getReviewListAction.getReviewList(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  const reviewList = useAppSelector((state: any) => {
    return state.getReview.storeReview;
  });

  return (
    <>
      <ModalBackDrop onClick={() => setIsModalUp(false)}>
        <ModalContainer onClick={(event) => event.stopPropagation()}>
          <CloseBtnContainer>
            <HiXMark id="close" onClick={() => setIsModalUp(false)} aria-hidden="true" />
          </CloseBtnContainer>
          <InfoHeader>
            <InfoTitle>{pharmListDetail.storeName}</InfoTitle>
            <PharmRank rating={pharmListDetail.rating} />
          </InfoHeader>
          <Constant>
            <PharmInfo like={like} setLike={setLike} pharmListDetail={pharmListDetail} />
            <ReviewContainer>
              <ReviewTitle>리뷰</ReviewTitle>
              <Reviews>
                {reviewList?.map((el: any) => (
                  <ReviewUnit reviewList={el} key={el.reviewIdx} />
                ))}
              </Reviews>
            </ReviewContainer>
          </Constant>
          {isReviewFormShown ? <WriteReviewForm setIsReviewFormShown={setIsReviewFormShown} /> : null}
          {isReviewFormShown ? null : (
            <WriteReviewBtnContainer>
              <Button onClick={() => setIsReviewFormShown(true)} color="mint" size="md" text="리뷰쓰기" />
            </WriteReviewBtnContainer>
          )}
        </ModalContainer>
      </ModalBackDrop>
    </>
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
  width: 450px;
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
