import React, { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../Redux/hooks";
import axios from "axios";
import Input from "../Ul/Input";
import Button from "../Ul/Button";
import { APIS } from "../../Api/APIs";
import { BsArrowReturnRight } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";

interface Props {
  reviewIdx: number;
  reply: any;
  review: any;
  storeIdx: any;
  reviewList: any;
  setReviewList: any;
}
export default function ReviewOfReview({ reviewIdx, review, reply, storeIdx, reviewList, setReviewList }: Props) {
  const [isPatchFormShown, setIsPatchFormShown] = useState(false);
  const [content, setContent] = useState(reply.content);

  const handlerReviewOfReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! PATCH : 리뷰의 댓글수정
  const editCommentKeyPress = async (e: any) => {
    if (e.key === " " && e.getModifierState("Shift") === false) {
      e.stopPropagation();
    } else if (e.key === " " && e.target.value.slice(-1) === " ") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      e.preventDefault();
      await axios
        .patch(`${APIS.PATCH_REPLY}/${reviewIdx}/reply/${reply.replyIdx}`, {
          storeIdx,
          userIdx: user.userIdx,
          content,
        })
        .then(() => setIsPatchFormShown(false))
        .catch((error) => {
          console.log("리뷰의 댓글을 수정하던 중 에러 발생");
          console.log(error);
        });
      await axios
        .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
        .then((response) => {
          setReviewList(response.data.response.storeReviews);
        })
        .catch((error) => {
          console.log("리뷰리스트를 다시 불러오던 중 에러 발생");
          console.log(error);
        });
    }
  };

  // ! DELETE : 리뷰의 댓글삭제
  const deleteComment = async () => {
    await axios.delete(`${APIS.DELETE_REPLY}/${reviewIdx}/reply/${reply.replyIdx}`).catch((error) => {
      console.log("리뷰의 댓글을 삭제하던 중 에러 발생");
      console.log(error);
    });
    await axios
      .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
      .then((response) => {
        setReviewList(response.data.response.storeReviews);
      })
      .catch((error) => {
        console.log("리뷰리스트를 다시 불러오던 중 에러 발생");
        console.log(error);
      });
  };

  return (
    <CommentContainer>
      <Upper>
        <UserInfo>
          <span id="reply">
            <BsArrowReturnRight aria-hidden="true" />
          </span>
          <UserIcon src={reply.userImage} alt="pharmacist" />
          <UserName>{reply.userName}</UserName>
          <Created>{new Date(reply.createdAt).toLocaleDateString()}</Created>
        </UserInfo>
        <ButtonContainer>
          {/* 약사계정이면 && 해당 약국의 storeIdx 와 리덕스 툴킷의 내 storeIdx 가 같을 때 => 버튼이 보임 */}
          {user?.userRole === "약국회원" && storeIdx === user?.storeIdx ? (
            <>
              <Button color="l_blue" size="sm" text="수 정" onClick={() => setIsPatchFormShown(true)} />
              <Button color="l_red" size="sm" text="삭 제" onClick={() => deleteComment()} />
            </>
          ) : null}
        </ButtonContainer>
      </Upper>
      <Comment>{reply.content}</Comment>
      {isPatchFormShown ? (
        <WriteCommentForm>
          <Instruction>
            <p>댓글을 수정해주세요. 작성 완료 시 'Enter'를 눌러주세요.</p>
            <HiXMark id="close" onClick={() => setIsPatchFormShown(false)} aria-hidden="true" />
          </Instruction>
          <label htmlFor="review_patch" id="hide" />
          <Input
            id="review_patch"
            name={"reviewOfReview"}
            isValid={true}
            icon={true}
            value={content}
            onChange={handlerReviewOfReview}
            onKeyPress={editCommentKeyPress}
          />
        </WriteCommentForm>
      ) : null}
    </CommentContainer>
  );
}

const CommentContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 10px 0px 0px 6px;
  gap: 3px;
  border-top: 1px solid var(--black-075);
`;
const Comment = styled.div`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: var(--black-025);
  border: 1px solid var(--black-100);
`;
const Upper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
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
  margin: 10px 2px 0px 6px;
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
