import React, { useState } from "react";
import styled from "styled-components";
import WriteReviewForm from "./WriteReviewForm";
import PharmInfo from "./PharmInfo";
import PharmRank from "../Ul/PharmRank";
import Button from "../Ul/Button";
import ReviewList from "./Reviews";
import { zIndex_Modal } from "../../Util/z-index";
import { HiXMark } from "react-icons/hi2";

interface Props {
  setIsModalUp: React.Dispatch<React.SetStateAction<boolean>>;
  like?: boolean;
  setLike?: React.Dispatch<React.SetStateAction<boolean>>;
  storeIdx: number;
  Pharm?: any;
  pharmDetail: any;
  reviewList: any;
  setReviewList: any;
}

export default function PharmDetail({
  setIsModalUp,
  like,
  setLike,
  storeIdx,
  Pharm,
  pharmDetail,
  reviewList,
  setReviewList,
}: Props) {

  const [isReviewFormShown, setIsReviewFormShown] = useState(false);
  // const [pharmDetail, setPharmDetail] = useState({});
  // const [reviewList, setReviewList] = useState([]);

  //! GET : 약국상세정보 + 리뷰리스트
  // useEffect(() => {
  //   const pharmDetailsAndreviewList = async () => {
  //     await axios
  //       .get(`${API_PharmItem.REAL_API}/${storeIdx}`)
  //       .then((response) => {
  //         setPharmDetail(response.data.response);
  //         axios
  //           .get(`${API_PharmDetail.REAL_API}/${storeIdx}/review`)
  //           .then((response) => {
  //             setReviewList(response.data.response.storeReviews);
  //           })
  //           .catch((err) => console.log("리뷰받아오던 중" + err));
  //       })
  //       .catch((err) => console.log("약국상세받아오던 중" + err));
  //   };
  //   pharmDetailsAndreviewList();
  // }, []);

  // const onModalUp = () => {
  //   const pharmDetailsAndreviewList = async () => {
  //     await axios
  //       .get(`${API_PharmItem.REAL_API}/${storeIdx}`)
  //       .then((response) => {
  //         setPharmDetail(response.data.response);
  //         axios
  //           .get(`${API_PharmDetail.REAL_API}/${storeIdx}/review`)
  //           .then((response) => {
  //             setReviewList(response.data.response.storeReviews);
  //           })
  //           .catch((err) => console.log("리뷰받아오던 중" + err));
  //       })
  //       .catch((err) => console.log("약국상세받아오던 중" + err));
  //   };
  //   pharmDetailsAndreviewList();
  //   setIsModalUp(false);
  // };

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
          <PharmInfo like={like} setLike={setLike} Pharm={pharmDetail} />
          <ReviewList
            reviewList={reviewList}
            setReviewList={setReviewList}
            setIsReviewFormShown={setIsReviewFormShown}
            storeIdx={storeIdx}
            Pharm={Pharm}
          />
        </Constant>
        {isReviewFormShown ? (
          <WriteReviewForm
            setIsReviewFormShown={setIsReviewFormShown}
            storeIdx={Pharm.storeIdx}
            reviewList={reviewList}
            setReviewList={setReviewList}
          />
        ) : null}
        {/* 로그인이 안된 상태일 경우, 버튼을 누르면 로그인 페이지로 랜딩 */}
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
