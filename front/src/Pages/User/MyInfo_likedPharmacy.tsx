import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { API_LikedPharmacyUnit } from "../../Api/APIs";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  likedPharmacy: any;
}

export default function LikedPharmacyUnit({ likedPharmacy }: Props) {
  const [pharmDetail, setPharmDetail] = useState();
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);

  //! GET : 약국상세정보
  useEffect(() => {
    const getPharmDetail = async () => {
      try {
        //* dummy data 일때 -> Pharm.json
        // const response = await axios.get(API_LikedPharmacyUnit.GET_DUMMY_API_);
        //TODO 실제 url 일때 -> /api/store/{storeIdx}
        const response = await axios.get(`${API_LikedPharmacyUnit.GET_REAL_API}/store${likedPharmacy.storeIdx}`);
        setPharmDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPharmDetail();
  }, []);

  //! POST : 찜취소
  const unLikePharmacy = (storeIdx: number) => {
    //* dummy data 일때
    // axios.delete(API_LikedPharmacyUnit.DELETE_DUMMY_API);
    //TODO 실제 url 일때 -> /api/store/{storeIdx}/pick
    axios.delete(`${API_LikedPharmacyUnit.DELETE_REAL_API}/${likedPharmacy.storeIdx}/pick`);
  };

  return (
    <TableBody key={likedPharmacy.storeIdx}>
      {isModalUp ? (
        <PharmDetail
          setIsModalUp={setIsModalUp}
          like={like}
          setLike={setLike}
          storeIdx={likedPharmacy.storeIdx}
          Pharm={pharmDetail}
        />
      ) : null}
      <Text className="single icon">
        <IoIosArrowDropright onClick={() => setIsModalUp(true)} aria-hidden="true" />
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
