import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { APIS } from "../../Api/APIs";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  review: any;
  storeIdx: number;
  reviewIdx: number;
  idx: number;
}

export default function MyReview({ review, storeIdx, reviewIdx, idx }: Props) {
  const [isModalUp, setIsModalUp] = useState(false);
  const [pharmDetail, setPharmDetail] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [like, setLike] = useState(false);

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const getPharmDetail = async () => {
      await axios
        .get(`${APIS.GET_PHARMDETAILS}/${storeIdx}`)
        .then((response) => setPharmDetail(response.data.response))
        .catch((err) => console.log("약국상세받아오던 중" + err));
    };
    const getReviewList = async () => {
      await axios
        .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
        .then((response) => setReviewList(response.data.response.storeReviews))
        .catch((err) => console.log("리뷰받아오던 중" + err));
    };
    axios.all([getPharmDetail(), getReviewList()]);
    setIsModalUp(true);
  };

  //! DELETE : 리뷰삭제
  const deleteReview = async () => {
    try {
      await axios({
        url: `${APIS.DELETE_REVIEWS}/${storeIdx}/review/${reviewIdx}`,
        method: "delete",
      });
    } catch (error) {
      console.log(error);
    }
    setReviewList([...reviewList].filter((review: any) => review.reviewIdx !== reviewIdx));
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
      <Text className="number">{review.createdAt}</Text>
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
