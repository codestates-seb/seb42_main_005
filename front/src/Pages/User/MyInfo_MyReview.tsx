import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { APIS } from "../../Api/APIs";
import { useAppSelector } from "../../Redux/hooks";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  review: any;
  storeIdx: number;
  reviewIdx: number;
  idx: number;
  setMyReviewList: any;
}

export default function MyReview({ review, storeIdx, reviewIdx, idx, setMyReviewList }: Props) {
  const [isModalUp, setIsModalUp] = useState<React.SetStateAction<boolean>>(false);
  const [pharmDetail, setPharmDetail] = useState<React.SetStateAction<any>>();
  const [reviewList, setReviewList] = useState<React.SetStateAction<[]>>([]);
  const [like, setLike] = useState<React.SetStateAction<boolean>>(false);

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const getPharmDetail = async () => {
      await axios
        .get(`${APIS.GET_PHARMDETAILS}/${storeIdx}`)
        .then((response) => setPharmDetail(response.data.response))
        .catch((error) => {
          console.log("약국 상세정보 받아오던 중 에러 발생");
          console.log(error);
        });
    };
    const getReviewList = async () => {
      await axios
        .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
        .then((response) => setReviewList(response.data.response.storeReviews))
        .catch((error) => {
          console.log("약국 리뷰 받아오던 중 에러 발생");
          console.log(error);
        });
    };
    axios.all([getPharmDetail(), getReviewList()]);
    setIsModalUp(true);
  };

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! DELETE : 리뷰삭제
  const deleteReview = async () => {
    await axios.delete(`${APIS.DELETE_REVIEWS}/${storeIdx}/review/${reviewIdx}`).catch((error) => {
      console.log("리뷰 삭제하던 중 에러 발생");
      console.log(error);
    });
    await axios
      .get(`${APIS.GET_MYREVIEWS}/${user.userIdx}`)
      .then((response) => setMyReviewList(response.data.response.reviews))
      .catch((error) => {
        console.log("내가 작성한 리뷰리스트 받아오던 중 에러 발생");
        console.log(error);
      });
  };

  return (
    <TableBody>
      {isModalUp ? (
        <>
          <PharmDetail
            setIsModalUp={setIsModalUp}
            like={like}
            setLike={setLike}
            storeIdx={storeIdx}
            pharmDetail={pharmDetail}
            reviewList={reviewList}
            setReviewList={setReviewList}
          />
        </>
      ) : null}
      <Text className="single">{idx + 1}</Text>
      <Text className="pharm" onClick={() => onModalUp()}>
        {review.storeName}
      </Text>
      <Text className="review">{review.content}</Text>
      <Text className="number">{new Date(review.modifiedAt).toLocaleDateString()}</Text>
      <Text className="single icon">
        <RiDeleteBin6Line aria-hidden="true" onClick={() => deleteReview()} />
      </Text>
    </TableBody>
  );
}

const TableBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 780px;
  padding: 8px 10px;
  color: var(--black-600);
  border-bottom: 0.5px solid var(--black-075);
  background-color: var(--white);
  :hover {
    background-color: var(--black-050);
  }
`;
const Text = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  &.single {
    width: 50px;
  }
  &.pharm {
    width: 150px;
  }
  &.number {
    width: 140px;
  }
  &.review {
    width: 300px;
    white-space: normal;
    word-break: break-all;
  }
  &.icon {
    color: var(--black-500);
    :hover {
      color: var(--black-200);
    }
  }
`;
