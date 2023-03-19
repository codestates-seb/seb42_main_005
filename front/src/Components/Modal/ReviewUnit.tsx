import { useState } from "react";
import styled from "styled-components";
import Input from "../Ul/Input";
import Button from "../Ul/Button";
import { BsArrowReturnRight } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
// import { detailDate } from "../Ul/detailDate";

interface Props {
  reviewList: any;
}
export default function ReviewUnit({ reviewList }: Props) {
  const [isCommentFormShown, setIsCommentFormShown] = useState(false);

  return (
    <>
      <ReviewUnitContainer>
        <section>
          <Upper>
            <UserInfo>
              <UserIcon src="/Images/User.png" alt="user" />
              <UserName>caffeine</UserName>
              <Created>{new Date(reviewList.createdAt).toLocaleDateString()}</Created>
              <StarContainer>
                {reviewList.rating === 1 ? <BsFillStarFill /> : ""}
                {reviewList.rating === 2 ? (
                  <>
                    <BsFillStarFill />
                    <BsFillStarFill />
                  </>
                ) : (
                  ""
                )}
                {reviewList.rating === 3 ? (
                  <>
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                  </>
                ) : (
                  ""
                )}
                {reviewList.rating === 4 ? (
                  <>
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                  </>
                ) : (
                  ""
                )}
                {reviewList.rating === 5 ? (
                  <>
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                  </>
                ) : (
                  ""
                )}
              </StarContainer>
            </UserInfo>
            <ButtonContainer>
              {/* 약사계정이면 댓글 버튼이 보이고, 아닌경우에는 안보이는 로직 작성 필요 */}
              <Button color="l_mint" size="sm" text="댓 글" onClick={() => setIsCommentFormShown(true)} />
              <Button color="l_black" size="sm" text="신 고" />
            </ButtonContainer>
          </Upper>
          <Lower>
            <Rest>{reviewList.content}</Rest>
            <ReviewImg src="./Images/쌍화탕.jpg" />
          </Lower>
          <CommentContainer>
            <Upper>
              <UserInfo>
                <span id="reply">
                  <BsArrowReturnRight aria-hidden="true" />
                </span>
                <UserIcon src="/Images/Pharm.png" alt="pharmacist" />
                <UserName>킹갓 약사</UserName>
                <Created>2023.03.05</Created>
              </UserInfo>
              <ButtonContainer>
                {/* 약사계정이면 댓글 버튼이 보이고, 아닌경우에는 안보이는 로직 작성 필요 */}
                <Button color="l_blue" size="sm" text="수 정" onClick={() => setIsCommentFormShown(true)} />
                <Button color="l_red" size="sm" text="삭 제" />
              </ButtonContainer>
            </Upper>
            <Comment>누가우리약국 오라고 칼들고 협박함? 다신 오지마ㅇㅇ</Comment>
          </CommentContainer>
        </section>
        {isCommentFormShown ? (
          <WriteCommentForm>
            <Instruction>
              <p>댓글을 작성해주세요. 작성 완료 시 'Enter'를 눌러주세요.</p>
            </Instruction>
            <label htmlFor="comment of review" />
            <Input id="comment of review" placeholder="감사합니다 :)" isValid={true} icon={true} />
          </WriteCommentForm>
        ) : null}
      </ReviewUnitContainer>
    </>
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
const StarContainer = styled.span`
  color: var(--l_button-mint);
  font-size: 12px;
`;
const ButtonContainer = styled.span`
  display: flex;
  gap: 5px;
  font-size: 10px;
`;
const Lower = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Rest = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 280px;
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
  border-radius: 5px;
  border: 1px solid var(--black-100);
`;
const ReviewImg = styled.img`
  object-fit: cover;
  height: 80px;
  width: 100px;
  border-radius: 5px;
`;
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
const WriteCommentForm = styled.section`
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
`;
