import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { UserInstance, getDetailsAndReviews, likePharmacy } from "../../Api/AxiosInstance";
import { useAppSelector } from "../../Redux/hooks";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TYPE_boolean, TYPE_reviewList, TYPE_Detail } from "../../Api/TYPES";

interface Props {
  likedPharmacy: any;
  setLikedPharmacies: any;
}

export default function LikedPharmacyUnit({ likedPharmacy, setLikedPharmacies }: Props) {
  const [isModalUp, setIsModalUp] = useState<TYPE_boolean>(false);
  const [pharmDetail, setPharmDetail] = useState<TYPE_Detail>();
  const [reviewList, setReviewList] = useState<TYPE_reviewList[]>([]);
  const [like, setLike] = useState(true);

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    getDetailsAndReviews(setPharmDetail, setReviewList, likedPharmacy.storeIdx);
    setIsModalUp(true);
  };

  //! POST : 찜하기/찜취소
  const likePharmacyAndRefresh = async () => {
    await likePharmacy(likedPharmacy.storeIdx, like, setLike);
    await UserInstance.getLikedPharmList(user.userIdx, setLikedPharmacies);
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
      <Text className="single icon" onClick={() => onModalUp()} >
        <IoIosArrowDropright aria-hidden="true" />
      </Text>
      <Text className="pharm" onClick={() => onModalUp()}>{likedPharmacy.name}</Text>
      <Text className="address" onClick={() => onModalUp()}>{likedPharmacy.address}</Text>
      <Text className="number" onClick={() => onModalUp()}>{likedPharmacy.tel}</Text>
      <Text className="single icon">
        <RiDeleteBin6Line aria-hidden="true" onClick={() => likePharmacyAndRefresh()} />
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
    justify-content: flex-start;
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
