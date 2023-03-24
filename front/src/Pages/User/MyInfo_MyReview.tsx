import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { API_MyInfoReviews } from "../../Api/APIs";
import { API_MyReview } from "../../Api/APIs";
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
    const pharmDetailsAndreviewList = async () => {
      await axios
        .get(`${API_MyReview.REAL_API}/${storeIdx}`)
        .then((response) => {
          setPharmDetail(response.data.response);
          axios
            .get(`${API_MyReview.REAL_API}/${storeIdx}/review`)
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

  //! DELETE : 리뷰삭제
  const deleteReview = async () => {
    try {
      await axios({
        url: `${API_MyInfoReviews.REAL_API}/${storeIdx}/review/${reviewIdx}`,
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
