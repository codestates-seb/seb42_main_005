import { useState } from "react";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { RiDeleteBin6Line } from "react-icons/ri";

const API_URL = "http://localhost:3005/response";

interface Props {
  review: any;
  key: number;
}

export default function MyReview({ review, key }: Props) {
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <TableBody>
      {isModalUp ? (
        <PharmDetail setIsModalUp={setIsModalUp} like={like} setLike={setLike} storeIdx={review.storeIdx} />
      ) : null}
      <Text className="single">{key + 1}</Text>
      <Text className="pharm" onClick={() => setIsModalUp(true)}>
        {review.storeName}
      </Text>
      <Text className="review">{review.content}</Text>
      <Text className="number">{review.createdAt}</Text>
      <Text className="single icon">
        <RiDeleteBin6Line aria-hidden="true" />
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
