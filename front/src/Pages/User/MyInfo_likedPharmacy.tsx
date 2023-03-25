import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { APIS } from "../../Api/APIs";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  likedPharmacy: any;
  setLikedPharmacies: any;
}

export default function LikedPharmacyUnit({ likedPharmacy, setLikedPharmacies }: Props) {
  const [isModalUp, setIsModalUp] = useState<React.SetStateAction<boolean>>(false);
  const [pharmDetail, setPharmDetail] = useState<React.SetStateAction<any>>();
  const [reviewList, setReviewList] = useState<React.SetStateAction<[]>>([]);
  const [like, setLike] = useState(false);

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const getPharmDetail = async () => {
      await axios
        .get(`${APIS.GET_PHARMDETAILS}/${likedPharmacy.storeIdx}`)
        .then((response) => setPharmDetail(response.data.response))
        .catch((error) => {
          console.log("약국 상세정보 받아오던 중 에러 발생");
          console.log(error);
        });
    };
    const getReviewList = async () => {
      await axios
        .get(`${APIS.GET_REVIEWS}/${likedPharmacy.storeIdx}/review`)
        .then((response) => setReviewList(response.data.response.storeReviews))
        .catch((error) => {
          console.log("약국 리뷰 받아오던 중 에러 발생");
          console.log(error);
        });
    };
    axios.all([getPharmDetail(), getReviewList()]);
    setIsModalUp(true);
  };

  //! POST : 찜취소
  const unLikePharmacy = async (storeIdx: number) => {
    await axios.post(`${APIS.POST_LIKE}/${storeIdx}/pick?userIdx=${1}`).catch((error) => {
      console.log("찜취소 하던 중 에러 발생");
      console.log(error);
    });
    await axios
      .get(`${APIS.GET_MYREVIEWS}/${1}`) //TODO - REDUX TOOLKIT
      .then((response) => setLikedPharmacies(response.data))
      .catch((error) => {
        console.log("찜리스트 다시 받아오던 중 에러 발생");
        console.log(error);
      });
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
