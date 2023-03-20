import { useState } from "react";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

const API_URL = "http://localhost:3005/response"

interface Props {
  likedPharmacy: any;
}

export default function LikedPharmacy({ likedPharmacy }: Props) {
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);

  const DeleteLikedPharmacy = (storeIdx: number) => {
    axios.delete(`${API_URL}/post/like`);
  }

  return (
    <TableBody key={likedPharmacy.storeIdx}>
      {isModalUp ? (
        <PharmDetail setIsModalUp={setIsModalUp} like={like} setLike={setLike} storeIdx={likedPharmacy.storeIdx}/>
      ) : null}
      <Text className="single icon">
        <IoIosArrowDropright onClick={() => setIsModalUp(true)} aria-hidden="true" />
      </Text>
      <Text className="pharm">{likedPharmacy.name}</Text>
      <Text className="address">{likedPharmacy.address}</Text>
      <Text className="number">{likedPharmacy.tel}</Text>
      <Text className="single icon">
        <RiDeleteBin6Line aria-hidden="true" onClick={(storeIdx: any) => DeleteLikedPharmacy(storeIdx)} />
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
