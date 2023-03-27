import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Input from "../Ul/Input";
import Button from "../Ul/Button";
import { APIS } from "../../Api/APIs";
import { useAppSelector } from "../../Redux/hooks";
import { BsArrowReturnRight } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import { TYPE_Detail, TYPE_reviewList, TYPE_setReviewList } from "../../Api/TYPES";

interface Props {
  reviewIdx: number;
  reply: any;
  Pharm: TYPE_Detail | undefined;
  reviewList: TYPE_reviewList[] | TYPE_reviewList;
  setReviewList: React.Dispatch<React.SetStateAction<TYPE_reviewList[]>>;
}
export default function ReplyOfReview({ reviewIdx, reply, Pharm, setReviewList }: Props) {
  const [isPatchFormShown, setIsPatchFormShown] = useState(false);
  const [content, setContent] = useState(reply.content);

  const handlerReplyOfReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! PATCH : 리뷰의 댓글수정
  const editReplyKeyPress = async (e: any) => {
    if (e.key === " " && e.getModifierState("Shift") === false) {
      e.stopPropagation();
    } else if (e.key === " " && e.target.value.slice(-1) === " ") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      e.preventDefault();
      await axios
        .patch(`${APIS.PATCH_REPLY}/${reviewIdx}/reply/${reply.replyIdx}`, {
          storeIdx: Pharm?.storeIdx,
          userIdx: user.userIdx,
          content,
        })
        .then(() => setIsPatchFormShown(false))
        .catch((error) => {
          console.log("리뷰의 댓글을 수정하던 중 에러 발생");
          console.log(error);
        });
      await axios
        .get(`${APIS.GET_REVIEWS}/${Pharm?.storeIdx}/review`)
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
  const deleteReply = async () => {
    await axios.delete(`${APIS.DELETE_REPLY}/${reviewIdx}/reply/${reply.replyIdx}`).catch((error) => {
      console.log("리뷰의 댓글을 삭제하던 중 에러 발생");
      console.log(error);
    });
    await axios
      .get(`${APIS.GET_REVIEWS}/${Pharm?.storeIdx}/review`)
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
          <UserIcon src={reply.profileImage ? reply.profileImage : "/Images/Pharm.png"} alt="pharmacist" />
          <UserName>{reply.userName}</UserName>
          <Created>{new Date(reply.createdAt).toLocaleDateString()}</Created>
        </UserInfo>
        <ButtonContainer>
          {user?.userRole === "약국회원" && Pharm?.storeIdx === user?.storeIdx ? (
            <>
              <Button color="l_blue" size="sm" text="수 정" onClick={() => setIsPatchFormShown(true)} />
              <Button color="l_red" size="sm" text="삭 제" onClick={() => deleteReply()} />
            </>
          ) : null}
        </ButtonContainer>
      </Upper>
      <Reply>{reply.content}</Reply>
      {isPatchFormShown ? (
        <WriteReplyForm>
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
            onChange={handlerReplyOfReview}
            onKeyPress={editReplyKeyPress}
          />
        </WriteReplyForm>
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
const Reply = styled.div`
  padding: 10px;
  margin-bottom: 10px;
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
const WriteReplyForm = styled.form`
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
