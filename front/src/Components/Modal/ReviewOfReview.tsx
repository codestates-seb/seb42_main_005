import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { BsArrowReturnRight } from "react-icons/bs";
import Input from "../Ul/Input";
import Button from "../Ul/Button";
import { HiXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../Redux/hooks";
import { getReviewListActions } from "../../Redux/slice/getReviewSlice";
import axios from "axios";

interface Props {
  el: any;
  key: number;
}
export default function ReviewOfReview({ el, key }: Props) {
  const [isPatchFormShown, setIsPatchFormShown] = useState(false);
  const [constent, setContsent] = useState(el.content);
  const dispatch = useDispatch();
  const a = dispatch(getReviewListActions.getReviewList);
  // console.log(a);

  const reviewList = useAppSelector((state: any) => {
    return state.getReview.response.storeReview;
  });
  //  const comment = reviewList.comments.filter((ele:any)=>(
  //   ele.commentIdx
  //  ))

  const handlerReviewOfReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContsent(e.target.value);
  };
  const handleOnKeyPress = (e: any) => {
    e.preventDefault();
    if (e.key === "Enter") {
      // const formData = new FormData(e.target);
      // const reviewOfReview = formData.get("reviewOfReview");
      const Data = {
        content: constent,
      };
      const submitReviewOfReview = async () => {
        try {
          await axios({
            url: "http://localhost:3010/response",
            method: "patch",
            data: Data,
          });
        } catch (error) {
          console.log(error);
        }
      };
      dispatch(
        getReviewListActions.getReviewList(
          reviewList.map((review: any) =>
            review.comments.map((comment: any) =>
              comment.commentIdx === key ? (comment.content = constent) : comment,
            ),
          ),
        ),
      );
      submitReviewOfReview();
    }
  };
  return (
    <CommentContainer>
      <Upper>
        <UserInfo>
          <span id="reply">
            <BsArrowReturnRight aria-hidden="true" />
          </span>
          <UserIcon src={el.userImage} alt="pharmacist" />
          <UserName>{el.name}</UserName>
          <Created>{new Date(el.createdAt).toLocaleDateString()}</Created>
        </UserInfo>
        <ButtonContainer>
          {/* 약사계정이면 댓글 버튼이 보이고, 아닌경우에는 안보이는 로직 작성 필요 */}
          <Button color="l_blue" size="sm" text="수 정" onClick={() => setIsPatchFormShown(true)} />
          <Button color="l_red" size="sm" text="삭 제" />
        </ButtonContainer>
      </Upper>
      <Comment>{el.content}</Comment>
      {isPatchFormShown ? (
        <WriteCommentForm>
          <Instruction>
            <p>댓글을 수정해주세요. 작성 완료 시 'Enter'를 눌러주세요.</p>
            <HiXMark id="close" onClick={() => setIsPatchFormShown(false)} aria-hidden="true" />
          </Instruction>
          <label htmlFor="review_patch" />
          <Input
            id="review_patch"
            name={"reviewOfReview"}
            isValid={true}
            icon={true}
            value={constent}
            onChange={handlerReviewOfReview}
            onKeyPress={handleOnKeyPress}
          />
        </WriteCommentForm>
      ) : null}
    </CommentContainer>
  );
}

const CommentContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
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
  height: 80px;
  border-radius: 10px;
  background-color: var(--white);
  border: 0.5px solid var(--blue-300);
  box-shadow: 0px 0px 5px var(--black-200);
`;
const Instruction = styled.header`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  #close {
    font-size: 17px;
    color: var(--black-400);
  }
`;
