import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ReviewOfReview from "./ReviewOfReview";
import Textarea from "../Ul/Textarea";
import Input from "../Ul/Input";
import Button from "../Ul/Button";
import { API_ReviewUnit } from "../../Api/APIs"; // Review.json
import { BsFillStarFill } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";

interface Props {
  review: any;
  reviewIdx: number;
  storeIdx: number;
}

export default function ReviewUnit({ review, reviewIdx, storeIdx }: Props) {
  const [isCommentFormShown, setIsCommentFormShown] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [reviewContent, setReviewContent] = useState(review.content);
  const [commentContent, setCommentContent] = useState("");

  const handleReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewContent(e.target.value);
  };
  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  //! PATCH : 리뷰수정
  const editReviewKeyPress = (e: any) => {
    e.preventDefault();
    if (e.key === "Enter") {
      // const formData = new FormData(e.target);
      // const review = formData.get("review");

      //* dummy url 일때
      const ReviewData = {
        ...review,
        content:reviewContent,
      };
      //TODO url 받았을때
      // const Data = {
      //   content,
      // };

      const submitReview = async () => {
        try {
          //* dummy url 일때 -> Review.json
          await axios({
            url: API_ReviewUnit.DUMMY_API,
            method: "patch",
            data: ReviewData,
          }).then(() => setIsOnEdit(false));
          //TODO url 받았을때 -> /api/store/{storeIdx}/review/{reviewIdx}
          // await axios({
          //   url: `${API_ReviewUnit.REAL_API}/${storeIdx}/review/${reviewIdx}`,
          //   method: "patch",
          //   data: ReviewData,
          // }).then(()=>setIsOnEdit(false))
        } catch (error) {
          console.log(error);
        }
      };
        submitReview();
    }
  };

  //! DELETE : 리뷰삭제
  const deleteReview = async () => {
    //* dummy data 일때 -> Review.json
    await axios.delete(`${API_ReviewUnit.DUMMY_API}`);
    //TODO url 받았을때 -> /api/store/{storeIdx}/review/{reviewIdx}
    // await axios.delete(`${API_ReviewUnit.REAL_API}/${storeIdx}/review/${reviewIdx}`)
  };

  const newComment = {
    //? 리덕스 툴킷에서 현재 로그인한 유저의 userIdx 받아와야 함
    userIdx: 1,
    content: commentContent,
  };

  //! POST : 리뷰의 댓글작성
  const submitCommentKeyPress = async (e: any) => {
    try {
      //* dummy url 일때 -> Review.json
      await axios({
        url: "http://localhost:3010/response",
        method: "post",
        data: newComment,
      });
      //TODO url 받았을때 -> /api/store/{storeIdx}/review/{reviewIdx}
      // await axios({
      //   url: `${API_ReviewUnit.REAL_API}/${storeIdx}/review/${reviewIdx}`,
      //   method: "post",
      //   data: newComment,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReviewUnitContainer>
      <section>
        <Upper>
          <UserInfo>
            <UserIcon src={review.userImage} alt="일반계정 사용자의 이미지 입니다." />
            <UserName>{review.name}</UserName>
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
            <Button color="l_red" size="sm" text="삭 제" onClick={() => deleteReview} />
            {/* 약사계정이면 && 해당 약국의 storIdx 와 리덕스 툴킷의 내 storeIdx 가 같을 때 => 댓글 + 신고 버튼이 보임 */}
            <Button color="l_mint" size="sm" text="댓 글" onClick={() => setIsCommentFormShown(true)} />
            {/* 로그인 상태여야 함 */}
            <Button color="l_black" size="sm" text="신 고" />
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
                onKeyPress={editReviewKeyPress}
              />
            </EditRest>
          ) : (
            <Rest>{review.content}</Rest>
          )}
          <ReviewImg src={review.reviewImage} />
        </Lower>
      </section>
      {review.comments.map((comment: any) => (
        <ReviewOfReview comment={comment} key={comment.commentIdx} id={comment.commentIdx} />
      ))}
      {isCommentFormShown ? (
        <WriteCommentForm>
          <Instruction>
            <p>댓글을 작성해주세요. 작성 완료 시 'Enter'를 눌러주세요.</p>
            <HiXMark id="close" onClick={() => setIsCommentFormShown(false)} aria-hidden="true" />
          </Instruction>
          <label htmlFor="comment of review" id="hide" />
          <Input
            id="comment of review"
            placeholder="감사합니다 :)"
            isValid={true}
            icon={true}
            value={commentContent}
            onChange={handleComment}
            onKeyPress={submitCommentKeyPress}
          />
        </WriteCommentForm>
      ) : null}
    </ReviewUnitContainer>
  );
}

const ReviewUnitContainer = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 10px 10px 10px;
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
  padding-top: 10px;
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
  height: 80px;
  width: 100px;
  border-radius: 5px;
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
