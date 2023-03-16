import { useState } from "react";
import styled from "styled-components";
import Tag from "../Ul/Tag";
import Input from "../Ul/Input";
import Button from "../Ul/Button";
import { BsArrowReturnRight } from "react-icons/bs";

export default function ReviewUnit() {
  const [isCommentFormShown, setIsCommentFormShown] = useState(false);

  return (
    <>
      <ReviewUnitContainer>
        <section>
          <Upper>
            <UserInfo>
              <UserIcon src="/Images/User.png" />
              <UserName>caffeine</UserName>
              <Created>2023.03.05</Created>
            </UserInfo>
            <ButtonContainer>
              {/* 약사계정이면 댓글 버튼이 보이고, 아닌경우에는 안보이는 로직 작성 필요 */}
              <Button
                color="l_mint"
                size="sm"
                text="댓 글"
                onClick={() => setIsCommentFormShown(true)}
              />
              <Button color="l_black" size="sm" text="신 고" />
            </ButtonContainer>
          </Upper>
          <Lower>
            <Rest>
              <ReviewText>쌍화탕은 하나씩 주시는데 약사선생님은 바쁘신지 불친절합니다.</ReviewText>
              <ReviewTagContainer>
                <Tag idx={0} />
                <Tag idx={1} />
                <Tag idx={2} />
                <Tag idx={3} />
              </ReviewTagContainer>
            </Rest>
            <ReviewImg src="./Images/쌍화탕.jpg" />
          </Lower>
          <CommentContainer>
            <Upper>
              <UserInfo>
                <span id="reply">
                  <BsArrowReturnRight aria-hidden="true"/>
                </span>
                <UserIcon src="/Images/Pharm.png" />
                <UserName>킹갓 약사</UserName>
                <Created>2023.03.05</Created>
              </UserInfo>
              <ButtonContainer>
                {/* 약사계정이면 댓글 버튼이 보이고, 아닌경우에는 안보이는 로직 작성 필요 */}
                <Button
                  color="l_blue"
                  size="sm"
                  text="수 정"
                  onClick={() => setIsCommentFormShown(true)}
                />
                <Button color="l_red" size="sm" text="삭 제 " />
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
            <Input placeholder="감사합니다 :)" isValid={true} icon={true} />
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
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    position: static;
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
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
const Rest = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ReviewText = styled.section`
  padding-top: 10px;
  width: 280px;
  height: 0px;
  font-size: 14px;
`;
const ReviewTagContainer = styled.section`
  display: flex;
  overflow: hidden;
  width: 280px;
  height: 27px;
  gap: 10px;
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
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
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
