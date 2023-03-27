import React, { useState } from "react";
import styled from "styled-components";
import { UserInstance, getDetailsAndReviews, deleteReview } from "../../Api/AxiosInstance";
import { useAppSelector } from "../../Redux/hooks";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TYPE_boolean, TYPE_Detail, TYPE_reviewList } from "../../Api/TYPES";

interface Props {
  review: any;
  storeIdx: number;
  reviewIdx: number;
  idx: number;
  setMyReviewList: any;
}

export default function MyReview({ review, storeIdx, reviewIdx, idx, setMyReviewList }: Props) {
  const [isModalUp, setIsModalUp] = useState<TYPE_boolean>(false);
  const [pharmDetail, setPharmDetail] = useState<TYPE_Detail>();
  const [reviewList, setReviewList] = useState<TYPE_reviewList[]>([]);
  const [like, setLike] = useState<TYPE_boolean>(false);

  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    getDetailsAndReviews(setPharmDetail, setReviewList, storeIdx);
    setIsModalUp(true);
  };

  //! DELETE : 리뷰삭제
  const deleteReviewAndRefresh = async () => {
    await deleteReview(storeIdx, reviewIdx);
    await UserInstance.getMyReviews(user.userIdx, setMyReviewList);
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
        <RiDeleteBin6Line aria-hidden="true" onClick={() => deleteReviewAndRefresh()} />
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
