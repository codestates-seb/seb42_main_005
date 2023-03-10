//! 모달 컴포넌트 왼편 리뷰 부분입니다
//* border : blue 로 되어 있는 부분은 컴포넌트 재사용 예정인 임시 부분입니다
import { useState } from "react";
import styled from "styled-components";
import Button from "../Ul/Button";
import Tag from "../Ul/Tag";
import Textarea from "../Ul/Textarea";
import TagContainer from "./TagContainer";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BsStar } from "react-icons/bs";
import { BiPhotoAlbum } from "react-icons/bi";

export default function Review() {
  const [isShown, setIsShown] = useState(false);
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
      <ReviewUnit>
        <Upper>
          <UserInfo>
            <UserIcon src="/Images/user.png" />
            <UserName>caffeine</UserName>
            <Created>2023.03.05</Created>
          </UserInfo>
          <ButtonContainer>
            <Button color="l_mint" size="sm" text="댓 글" />
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
      </ReviewUnit>
      <Button onClick={() => setIsShown(!isShown)} color="mint" size="md" text="리뷰쓰기" />
      {isShown ? (
        <WriteReviewForm>
          <InputTop>
            <Textarea placeholder="쿠르루삥뽕~!" isValid={true} rows={5} icon={true} />
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
            <Button onClick={() => setIsShown(!isShown)} color="blue" size="md" text="작성완료" icon={true} />
          </InputBot>
        </WriteReviewForm>
      ) : null}
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 0px 10px 20px;
  height: 500px;
  width: 450px;
`;
const ReviewTitle = styled.div`
  padding-bottom: 10px;
  color: var(--black-500);
  font-weight: bold;
  font-size: 25px;
  border-bottom: 1px solid var(--black-200);
`;
const ReviewUnit = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid var(--black-200);
`;
const Upper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const UserInfo = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const UserIcon = styled.img`
  width: 30px;
  height: 30px;
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
  height: 60px;
  font-size: 14px;
`;
const ReviewTagContainer = styled.div`
  border: 1px solid blue;
  width: 280px;
  font-size: 14px;
`;
const ReviewImg = styled.img`
  height: 80px;
  width: 100px;
  object-fit: cover;
  border-radius: 5px;
`;
const WriteReviewBtn = styled.button`
  position: absolute;
  z-index: 2;
  right: 0px;
  bottom: 0px;
  width: 50px;
  border: 1px solid blue;
`;
const WriteReviewForm = styled.div`
  position: absolute;
  z-index: 3;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  width: 430px;
  padding: 15px;
  background-color: var(--white);
  border: 1px solid var(--blue-300);
  border-radius: 10px;
  box-shadow: 0px 0px 5px var(--black-300);
`;
const InputTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ReviewTextarea = styled.textarea`
  width: 280px;
  height: 80px;
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
  padding: 5px 10px;
  height: 35px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-200) inset;
`;
const SelectTag = styled.button`
  font-size: 0.8rem;
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
  padding: 0 15px;
  width: 280px;
  height: 35px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-200) inset;
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
const ReviewDone = styled.button``;
