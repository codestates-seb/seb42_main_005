//! 모달 컴포넌트 왼편 리뷰 부분입니다
import { useState } from "react";
import styled from "styled-components";
import Button from "../Ul/Button";
import Tag from "../Ul/Tag";
import Textarea from "../Ul/Textarea";
import Input from "../Ul/Input";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BsArrowReturnRight } from "react-icons/bs";
import { BiPhotoAlbum } from "react-icons/bi";

export default function Review() {
  const [isReviewFormShown, setIsReviewFormShown] = useState(false);
  const [isCommentFormShown, setIsCommentFormShown] = useState(false);
  const [imageSrc, setImageSrc]: any = useState(null);
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };
  const [rate, setRate] = useState(0);

  return (
    <ReviewContainer>
      <ReviewTitle>리뷰</ReviewTitle>
      <Reviews>
        <ReviewUnit>
          <section>
            <Upper>
              <UserInfo>
                <UserIcon src="/Images/user.png" />
                <UserName>caffeine</UserName>
                <Created>2023.03.05</Created>
              </UserInfo>
              <ButtonContainer>
                {/* 약사계정이면 댓글 버튼이 보이고, 아닌경우에는 안보이는 로직 작성 필요 */}
                <Button
                  color="l_mint"
                  size="sm"
                  text="댓 글"
                  onClick={() => setIsCommentFormShown(!isCommentFormShown)}
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
                    <BsArrowReturnRight />
                  </span>
                  <UserIcon src="/Images/user.png" />
                  <UserName>킹갓 약사</UserName>
                  <Created>2023.03.05</Created>
                </UserInfo>
                <ButtonContainer>
                  {/* 약사계정이면 댓글 버튼이 보이고, 아닌경우에는 안보이는 로직 작성 필요 */}
                  <Button color="l_blue" size="sm" text="수 정" onClick={() => setIsCommentFormShown(!isCommentFormShown)}/>
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
        </ReviewUnit>
      </Reviews>
      {/* 약사계정이면 보이지 않게 작업이 필요한 부분입니다 */}
      <WriteReviewBtnContainer>
        <Button onClick={() => setIsReviewFormShown(!isReviewFormShown)} color="mint" size="md" text="리뷰쓰기" />
      </WriteReviewBtnContainer>
      {/* 리뷰쓰기 버튼을 누르면 떠오르는 리뷰작성란입니다 */}
      {isReviewFormShown ? (
        <WriteReviewForm>
          <InputTop>
            <Textarea placeholder="무분별한 비방, 비하, 욕설은 지양해주세요 :)" isValid={true} rows={3} icon={true} />
            <ReviewImgContainer>
              <ReviewImgInput id="img" type="file" onChange={(e) => onUpload(e)} accept="image/*"></ReviewImgInput>
              {imageSrc ? (
                <ReviewImg src={imageSrc} />
              ) : (
                <Instead>
                  <BiPhotoAlbum />
                </Instead>
              )}
              <Label htmlFor="img">
                <MdOutlineAddAPhoto />
              </Label>
            </ReviewImgContainer>
          </InputTop>
          <TagSelection>
            <Tag idx={0} />
            <Tag idx={1} />
            <Tag idx={2} />
            <Tag idx={3} />
          </TagSelection>
          <InputBot>
            <Rating>
              <StarContainer>
                <Star
                  src={`${rate > 0 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
                  onClick={(e) => setRate(1)}
                />
                <Star
                  src={`${rate > 1 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
                  onClick={(e) => setRate(2)}
                />
                <Star
                  src={`${rate > 2 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
                  onClick={(e) => setRate(3)}
                />
                <Star
                  src={`${rate > 3 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
                  onClick={(e) => setRate(4)}
                />
                <Star
                  src={`${rate > 4 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
                  onClick={(e) => setRate(5)}
                />
              </StarContainer>
              <RateNum>{rate} / 5</RateNum>
            </Rating>
            <Button
              onClick={() => setIsReviewFormShown(!isReviewFormShown)}
              color="blue"
              size="md"
              text="작성완료"
              icon={true}
            />
          </InputBot>
        </WriteReviewForm>
      ) : null}
    </ReviewContainer>
  );
}

const ReviewContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 0px 0px 20px;
  height: 550px;
  width: 450px;
`;
const ReviewTitle = styled.header`
  padding-bottom: 10px;
  color: var(--black-500);
  font-weight: bold;
  font-size: 25px;
  border-bottom: 1px solid var(--black-100);
`;
const ReviewUnit = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 0px 10px 10px;
  border-bottom: 1px solid var(--black-100);
`;
const Upper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;
const UserInfo = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  #reply {
    color: var(--black-300);
  }
`;
const UserIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 50%;
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
const Lower = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Rest = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ReviewText = styled.span`
  padding-top: 10px;
  width: 280px;
  height: 0px;
  font-size: 14px;
`;
const ReviewTagContainer = styled.div`
  overflow: hidden;
  width: 280px;
  height: 27px;
  display: flex;
  gap: 10px;
`;
const ReviewImg = styled.img`
  height: 80px;
  width: 100px;
  object-fit: cover;
  border-radius: 5px;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 10px;
  padding: 10px 0px 0px 6px;
  border-top: 1px solid var(--black-075);
`;
const Comment = styled.div`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: var(--black-025);
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
`;
const WriteReviewBtnContainer = styled.div`
  position: absolute;
  z-index: 2;
  right: 40px;
  bottom: 10px;
  width: 50px;
`;
const WriteReviewForm = styled.section`
  position: absolute;
  z-index: 2;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 210px;
  width: 430px;
  padding: 15px;
  background-color: var(--white);
  border: 0.5px solid var(--blue-300);
  border-radius: 10px;
  box-shadow: 0px 0px 5px var(--black-200);
`;
const InputTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ReviewImgInput = styled.input`
  position: absolute;
  display: none;
`;
const ReviewImgContainer = styled.span`
  display: inline-block;
  position: relative;
`;
const Instead = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100px;
  font-size: 40px;
  color: var(--white);
  background-color: var(--black-075);
  border-radius: 5px;
`;
const Label = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  color: var(--black-100);
  background-color: var(--white);
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0.5px var(--black-200);
`;
const TagSelection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  height: 46px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
`;
const InputBot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Rating = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 280px;
  height: 35px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
`;
const StarContainer = styled.span`
  display: flex;
  gap: 10px;
`;
const Star = styled.img`
  width: 20px;
`;
const RateNum = styled.span`
  font-weight: bold;
  color: var(--black-300);
`;
const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  border-bottom: 1px solid var(--black-100);
  ::-webkit-scrollbar-track {
    visibility: hidden;
  }
  :active::-webkit-scrollbar-track {
    width: 0.6rem;
    visibility: visible;
  }
`;
const WriteCommentForm = styled.section`
  display: flex;
  flex-direction: column;
  margin: 10px 2px 0px 6px;
  padding: 10px;
  gap: 5px;
  height: 80px;
  background-color: var(--white);
  border: 0.5px solid var(--blue-300);
  border-radius: 10px;
  box-shadow: 0px 0px 5px var(--black-200);
`;
const Instruction = styled.div`
  font-size: 12px;
`;
