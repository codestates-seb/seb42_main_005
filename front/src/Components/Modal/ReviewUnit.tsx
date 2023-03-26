import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ReplyOfReview from "./ReplyOfReview";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import Input from "../Ul/Input";
import { APIS } from "../../Api/APIs"; 
import { TYPE_setReviewList, TYPE_reviewList } from "../../Api/TYPES";
import { HiXMark } from "react-icons/hi2";
import { BsFillStarFill } from "react-icons/bs";

interface Props {
  review: any;
  reviewIdx: number;
  storeIdx: number;
  reviewList: TYPE_reviewList;
  setReviewList: TYPE_setReviewList;
}

export default function ReviewUnit({ review, reviewIdx, storeIdx, reviewList, setReviewList }: Props) {
  const [isReplyFormShown, setIsReplyFormShown] = useState<React.SetStateAction<boolean>>(false);
  const [isOnEdit, setIsOnEdit] = useState<React.SetStateAction<boolean>>(false);
  const [reviewContent, setReviewContent] = useState<React.SetStateAction<any>>(review.content);
  const [replyContent, setReplyContent] = useState<React.SetStateAction<any>>("");
  const handleReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewContent(e.target.value);
  };
  const handleReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContent(e.target.value);
  };

  //! PATCH : 리뷰수정
  const editReview = async (e: any) => {
    if (e.key === " " && e.getModifierState("Shift") === false) {
      e.stopPropagation();
    } else if (e.key === " " && e.target.value.slice(-1) === " ") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const data: any = {
        userIdx: 1, //TODO - REDUX TOOLKIT
        content: reviewContent,
        rating: review.rating,
      };
      await axios
        .patch(`${APIS.PATCH_REVIEWS}/${storeIdx}/review/${reviewIdx}`, data)
        .catch((error) => {console.log("리뷰를 수정하던 중 에러 발생");console.log(error)});
      await axios
        .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
        .then((response) => {
          setReviewList(response.data.response.storeReviews);
        })
        .then(() => setIsOnEdit(false))
        .catch((error) => {console.log("리뷰리스트를 다시 불러오던 중 에러 발생");console.log(error)});
    }
  };

  // ! DELETE : 리뷰삭제
  const deleteReview = async () => {
    await axios.delete(`${APIS.DELETE_REVIEWS}/${storeIdx}/review/${reviewIdx}`).catch((error) => console.log(error));
    await axios
      .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
      .then((response) => {
        setReviewList(response.data.response.storeReviews);
      })
      .catch((error) => {console.log("리뷰를 삭제하던 중 에러 발생");console.log(error)});
  };

  const data = {
    userIdx: 1, //TODO - REDUX TOOLKIT
    content: reviewContent,
  };
  //! POST : 리뷰신고
  const reportReview = async () => {
    await axios
      .post(`${APIS.POST_REPORT_REVIEW}/${storeIdx}/review/${reviewIdx}/report`, data)
      .catch((error) => {console.log("리뷰를 신고하던 중 에러 발생");console.log(error)});
  };

  //! POST : 리뷰의 댓글작성
  const postReply = async (e: any) => {
    if (e.key === " " && e.getModifierState("Shift") === false) {
      e.stopPropagation();
    } else if (e.key === " " && e.target.value.slice(-1) === " ") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const newComment = {
        storeIdx,
        userIdx: 1,  //TODO - REDUX TOOLKIT
        content: replyContent,
      };
      await axios
        .post(`${APIS.POST_REPLY}/${reviewIdx}/reply`, newComment)
        .then(() => setReplyContent(""))
        .then(() => setIsReplyFormShown(false))
        .catch((error) => {console.log("리뷰의 댓글을 작성하던 중 에러 발생");console.log(error)});
      await axios
        .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
        .then((response) => {
          setReviewList(response.data.response.storeReviews);
        })
        .catch((error) => {console.log("리뷰리스트를 다시 불러오던 중 에러 발생");console.log(error)});
    }
  };

  return (
    <ReviewUnitContainer>
      <section>
        <Upper>
          <UserInfo>
            <UserIcon src={review.userImage} alt="일반계정 사용자의 이미지 입니다." />
            <UserName>{review.userName}</UserName>
            <Created>{new Date(review.createdAt).toLocaleDateString()}</Created>
            <StarContainer>
              {new Array(review.rating).fill("").map((_, i) => (
                <BsFillStarFill key={i} />
              ))}
            </StarContainer>
          </UserInfo>
          {/* 여기 계정에 따른 로직 작성 필요 */}
          <ButtonContainer>
            {/* 일반계정이면 && 해당 리뷰의 userIdx 와 리덕스 툴킷의 내 userIdx 가 같을 때 => 수정 + 삭제 버튼이 보임 */}
            <Button color="l_blue" size="sm" text="수 정" onClick={() => setIsOnEdit(true)} />
            <Button color="l_red" size="sm" text="삭 제" onClick={() => deleteReview()} />
            {/* 약사계정이면 && 해당 약국의 storIdx 와 리덕스 툴킷의 내 storeIdx 가 같을 때 => 댓글 + 신고 버튼이 보임 */}
            <Button color="l_mint" size="sm" text="댓 글" onClick={() => setIsReplyFormShown(true)} />
            {/* 로그인 상태여야 함 */}
            <Button color="l_black" size="sm" text="신 고" onClick={() => reportReview()} />
          </ButtonContainer>
        </Upper>
        <Lower>
          {isOnEdit ? (
            <EditRest>
              <p>리뷰를 수정해주세요. 작성 완료 시 'Enter'를 눌러주세요.</p>
              <label htmlFor="editReview" id="hide" />
              <Textarea
                id="editReview"
                rows={2}
                isValid={true}
                icon={false}
                value={reviewContent}
                onChange={handleReview}
                onKeyPress={editReview}
              />
            </EditRest>
          ) : (
            <Rest>{review.content}</Rest>
          )}
          <ReviewImg src={review.reviewImage} />
        </Lower>
      </section>
      {isReplyFormShown ? (
        <WriteCommentForm>
          <Instruction>
            <p>댓글을 작성해주세요. 작성 완료 시 'Enter'를 눌러주세요.</p>
            <HiXMark id="close" onClick={() => setIsReplyFormShown(false)} aria-hidden="true" />
          </Instruction>
          <label htmlFor="comment of review" id="hide" />
          <Input
            id="comment of review"
            placeholder="감사합니다 :)"
            isValid={true}
            icon={true}
            value={replyContent}
            onChange={handleReply}
            onKeyPress={postReply}
          />
        </WriteCommentForm>
      ) : null}
      {review.replies?.map((reply: any) => (
        <ReplyOfReview
          key={reply.replyIdx}
          reviewIdx={reviewIdx}
          reply={reply}
          review={review}
          storeIdx={storeIdx}
          reviewList={reviewList}
          setReviewList={setReviewList}
        />
      ))}
    </ReviewUnitContainer>
  );
}

const ReviewUnitContainer = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  margin-bottom: 20px;
  border: 1px solid var(--black-100);
  border-radius: 5px;
  @media (max-width: 768px) {
    position: static;
    display: flex;
    justify-content: space-between;
    width: 420px;
  }
`;
const StarContainer = styled.span`
  color: var(--l_button-mint);
  font-size: 12px;
`;
const Lower = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &#hide {
    display: none;
  }
`;
const Rest = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  height: 80px;
  width: 280px;
  white-space: normal;
  word-break: break-all;
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 5px;
  border: 1px solid var(--black-100);
`;
const EditRest = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 280px;
  p {
    position: absolute;
    top: 5px;
    margin-left: 5px;
    font-size: 12px;
    font-weight: 500;
    color: var(--blue-300);
  }
`;
const ReviewImg = styled.img`
  object-fit: cover;
  margin-bottom: 0.6rem;
  height: 80px;
  width: 100px;
  border-radius: 5px;
  border: 1px solid var(--black-100);
`;
const Upper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const UserInfo = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  #reply {
    color: var(--black-300);
  }
`;
const UserIcon = styled.img`
  object-fit: cover;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--blue-100);
`;
const UserName = styled.span`
  font-size: 15px;
`;
const Created = styled.span`
  color: var(--black-300);
  font-size: 12px;
`;
const ButtonContainer = styled.span`
  display: flex;
  gap: 5px;
  font-size: 10px;
`;
const WriteCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  height: 85px;
  border-radius: 10px;
  background-color: var(--white);
  border: 0.5px solid var(--blue-300);
  box-shadow: 0px 0px 5px var(--black-200);
  &#hide {
    display: none;
  }
`;
const Instruction = styled.header`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  #close {
    font-size: 17px;
    color: var(--black-400);
  }
`;
