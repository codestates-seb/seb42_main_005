import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { API_LikedPharmacyUnit } from "../../Api/APIs";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  likedPharmacy: any;
  likedPharmacies: any;
  setLikedPharmacies: any;
}

export default function LikedPharmacyUnit({ likedPharmacy, likedPharmacies, setLikedPharmacies }: Props) {
  const [pharmDetail, setPharmDetail] = useState();
  const [isModalUp, setIsModalUp] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [like, setLike] = useState(false);

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const pharmDetailsAndreviewList = async () => {
      await axios
        .get(`${API_LikedPharmacyUnit.GET_REAL_API}/${likedPharmacy.storeIdx}`)
        .then((response) => {
          setPharmDetail(response.data.response);
          axios
            .get(`${API_LikedPharmacyUnit.GET_REAL_API}/${likedPharmacy.storeIdx}/review`)
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

  //! POST : 찜취소
  const unLikePharmacy = async (storeIdx: number) => {
    try {
      await axios({
        url: `${API_LikedPharmacyUnit.GET_REAL_API}/${storeIdx}/pick?userIdx=${1}`, //? 리덕스 툴킷에서 유저인덱스 받아와야 함
        method: "post",
      });
    } catch (error) {
      console.log(error);
    }
    setLikedPharmacies([...likedPharmacies].filter((pharm) => pharm.storeIdx !== likedPharmacy.storeIdx));
  };
  return (
    <TableBody key={likedPharmacy.storeIdx}>
      {isModalUp ? (
        <PharmDetail
          setIsModalUp={setIsModalUp}
          like={like}
          setLike={setLike}
          storeIdx={likedPharmacy.storeIdx}
          pharmDetail={pharmDetail}
          reviewList={reviewList}
          setReviewList={setReviewList}
        />
      ) : null}
      <Text className="single icon">
        <IoIosArrowDropright onClick={() => onModalUp()} aria-hidden="true" />
      </Text>
      <Text className="pharm">{likedPharmacy.name}</Text>
      <Text className="address">{likedPharmacy.address}</Text>
      <Text className="number">{likedPharmacy.tel}</Text>
      <Text className="single icon">
        <RiDeleteBin6Line aria-hidden="true" onClick={(storeIdx: any) => unLikePharmacy(storeIdx)} />
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
  &.address {
    width: 300px;
  }
  &.number {
    width: 140px;
  }
  &.icon {
    color: var(--black-500);
    :hover {
      color: var(--black-200);
    }
  }
`;
