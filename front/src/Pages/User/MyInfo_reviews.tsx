import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MyReview from "../User/MyInfo_MyReview";
import { APIS } from "../../Api/APIs";
import axios from "axios";
import { useAppSelector } from "../../Redux/hooks";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function MyInfoReviews() {
  const [myReviewList, setMyReviewList] = useState([]);

  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  //! GET : 내가 작성한 리뷰 리스트
  useEffect(() => {
    const getMyReviews = async () => {
      await axios
        .get(`${APIS.GET_MYREVIEWS}/${user.userIdx}`)
        .then((response) => setMyReviewList(response.data.response.reviews))
        .catch((error) => {
          console.log("내가 작성한 리뷰리스트 받아오던 중 에러 발생");
          console.log(error);
        });
    };
    getMyReviews();
  }, []);

  return (
    <Content>
      <TableHead>
        <Text className="single" />
        <Text className="pharm">약국명</Text>
        <Text className="review">내용</Text>
        <Text className="number">작성일</Text>
        <Text className="single" />
      </TableHead>
      {myReviewList.length ? (
        <Rest>
          {myReviewList.map((review: any, i: number) => (
            <MyReview
              key={review.reviewIdx}
              review={review}
              idx={i}
              storeIdx={review.storeIdx}
              reviewIdx={review.reviewIdx}
              setMyReviewList={setMyReviewList}
            />
          ))}
        </Rest>
      ) : (
        <WhenEmpty>
          <Add to="/">
            <IoMdAddCircleOutline id="icon" aria-hidden="true" />
          </Add>
          <span>
            <p>현재 내가 남긴 리뷰가 없습니다.</p>
            <p>마음에 드는 약국에 리뷰를 남겨보세요!</p>
          </span>
        </WhenEmpty>
      )}
    </Content>
  );
}

const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 300px;
  background-color: var(--black-025);
  @media (max-width: 768px) {
    width: 600px;
    overflow-x: scroll;
  }
`;
const TableHead = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  padding-right: 0.6rem;
  width: calc(780px + 0.6rem);
  color: var(--black-500);
  border-top: 1.5px solid var(--black-075);
  border-bottom: 1.5px solid var(--black-075);
  background-color: var(--black-050);
`;
const Rest = styled.section`
  display: flex;
  flex-direction: column;
  width: calc(780px + 0.6rem);
  overflow-y: scroll;
`;
const WhenEmpty = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: var(--black-200);
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
`;
const Add = styled(Link)`
  font-size: 50px;
  color: var(--black-100);
  #icon:hover {
    color: var(--black-300);
  }
`;
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
