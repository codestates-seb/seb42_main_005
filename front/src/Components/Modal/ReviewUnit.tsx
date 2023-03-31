import React, { useState } from "react";
import styled from "styled-components";
import { patchReview, getReview, deleteReview, reportReview, postReply } from "../../Api/AxiosInstance";
import { TYPE_Review, TYPE_reviewList, TYPE_Detail } from "../../Api/TYPES";
import { getLocalStorage } from "../../Api/localStorage";
import { useAppSelector } from "../../Redux/hooks";
import ReplyOfReview from "./ReplyOfReview";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import Input from "../Ul/Input";
import { HiXMark } from "react-icons/hi2";
import { BsFillStarFill } from "react-icons/bs";

interface Props {
  review: TYPE_Review | any;
  reviewIdx: number;
  Pharm: TYPE_Detail | undefined;
  reviewList: TYPE_reviewList[] | TYPE_reviewList;
  setReviewList: React.Dispatch<React.SetStateAction<TYPE_reviewList[]>>;
  reviewUserName: string;
  page: number
}

export default function ReviewUnit({ review, reviewIdx, Pharm, setReviewList, reviewUserName,page }: Props) {
  const [isReplyFormShown, setIsReplyFormShown] = useState<React.SetStateAction<boolean>>(false);
  const [isOnEdit, setIsOnEdit] = useState<React.SetStateAction<boolean>>(false);
  const [reviewContent, setReviewContent] = useState<React.SetStateAction<any>>(review.content);
  const [replyContent, setReplyContent] = useState<React.SetStateAction<any>>("");
  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  const handleReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewContent(e.target.value);
  };
  const handleReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContent(e.target.value);
  };

  // ! DELETE : 리뷰삭제
  const deleteReviewAndRefresh = async () => {
    await deleteReview(Pharm?.storeIdx, reviewIdx);
    await getReview(Pharm?.storeIdx, setReviewList, page);
  };

  //! POST : 리뷰신고
  // reportReview(storeIdx, reviewIdx, report)
  const report = {
    userIdx: user?.userIdx,
    content: reviewContent,
  };

  //! POST : 리뷰의 댓글작성
  const postReplyAndRefresh = async (e: any) => {
    if (e.key === " " && e.getModifierState("Shift") === false) {
      e.stopPropagation();
    } else if (e.key === " " && e.target.value.slice(-1) === " ") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const reply = {
        storeIdx: Pharm?.storeIdx,
        userIdx: user.userIdx,
        content: replyContent,
      };
      await postReply(reviewIdx, reply, setReplyContent, setIsReplyFormShown);
      await getReview(Pharm?.storeIdx, setReviewList, page);
    }
  };

  //! PATCH : 리뷰수정
  const patchReviewAndRefresh = async (e: any) => {
    if (e.key === " " && e.getModifierState("Shift") === false) {
      e.stopPropagation();
    } else if (e.key === " " && e.target.value.slice(-1) === " ") {
      e.stopPropagation();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const data: any = {
        userIdx: user.userIdx,
        content: reviewContent,
        rating: review.rating,
      };
      await patchReview(Pharm?.storeIdx, reviewIdx, data, setIsOnEdit);
      await getReview(Pharm?.storeIdx, setReviewList);
    }
  };

  const token = getLocalStorage("access_token");

  return (
    <ReviewUnitContainer>
      <section>
        <Upper>
          <UserInfo>
            <UserIcon
              src={review.profileImage ? review.profileImage : "/Images/User.png"}
              alt="일반계정 사용자의 이미지 입니다."
            />
            <UserName>{review.userName}</UserName>
            <Created>{new Date(review.createdAt).toLocaleDateString()}</Created>
            <StarContainer>
              {new Array(review.rating).fill("").map((_, i) => (
                <BsFillStarFill key={i} />
              ))}
            </StarContainer>
          </UserInfo>
          <ButtonContainer>
            {user?.userType === "일반회원" && user?.name === reviewUserName ? (
              <>
                <Button color="l_blue" size="sm" text="수 정" onClick={() => setIsOnEdit(true)} />
                <Button color="l_red" size="sm" text="삭 제" onClick={() => deleteReviewAndRefresh()} />
              </>
            ) : null}
            {user?.userType === "약국회원" && Pharm?.storeIdx === user?.storeIdx ? (
              <Button color="l_mint" size="sm" text="댓 글" onClick={() => setIsReplyFormShown(true)} />
            ) : null}
            {token && user?.name !== reviewUserName ? (
              <Button
                color="l_black"
                size="sm"
                text="신 고"
                onClick={() => reportReview(Pharm?.storeIdx, reviewIdx, report)}
              />
            ) : null}
          </ButtonContainer>
        </Upper>
        <Lower>
          {isOnEdit && !review.reviewImage ? (
            <>
              <EditRestNoImg>
                <p className="edit_noImg">리뷰를 수정해주세요.작성 완료 시 'Enter'를 눌러주세요.</p>
                <label htmlFor="editReview_noImg" id="hide" />
                <Textarea
                  id="editReview_noImg"
                  rows={2}
                  isValid={true}
                  icon={false}
                  value={reviewContent}
                  onChange={handleReview}
                  onKeyPress={(e: any) => patchReviewAndRefresh(e)}
                />
              </EditRestNoImg>
            </>
          ) : isOnEdit && review.reviewImage ? (
            <>
              <EditRest>
                <p className="edit_img">리뷰를 수정해주세요. 작성 완료 시 'Enter'를 눌러주세요.</p>
                <label htmlFor="editReview" id="hide" />
                <Textarea
                  id="editReview"
                  rows={2}
                  isValid={true}
                  icon={false}
                  value={reviewContent}
                  onChange={handleReview}
                  onKeyPress={(e: any) => patchReviewAndRefresh(e)}
                />
              </EditRest>
              <ReviewImg src={review.reviewImage} />
            </>
          ) : !isOnEdit && review.reviewImage ? (
            <>
              <Rest>{review.content}</Rest>
              <ReviewImg src={review.reviewImage} />
            </>
          ) : (
            <RestNoImg>{review.content}</RestNoImg>
          )}
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
            onKeyPress={(e: any) => postReplyAndRefresh(e)}
          />
        </WriteCommentForm>
      ) : null}
      {review.replies?.map((reply: any) => (
        <ReplyOfReview
          key={reply.replyIdx}
          reviewIdx={reviewIdx}
          reply={reply}
          Pharm={Pharm}
          setReviewList={setReviewList}
          page={page}
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
  min-height: 80px;
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
  .edit_img {
    position: absolute;
    top: 5px;
    margin-left: 5px;
    font-size: 11px;
    font-weight: 500;
    color: var(--blue-300);
  }
  #editReview {
    font-size: 14px;
  }
`;
const EditRestNoImg = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 280px;
  .edit_noImg {
    position: absolute;
    top: 0.1px;
    margin-left: 5px;
    font-size: 11px;
    font-weight: 500;
    color: var(--blue-300);
  }
  #editReview_noImg {
    margin-top: 4px;
    font-size: 14px;
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
const RestNoImg = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;
  width: 400px;
  white-space: normal;
  word-break: break-all;
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
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
