import { useState } from "react";
import styled from "styled-components";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import Tag from "../Ul/Tag";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";

interface Props {
  isReviewFormShown: boolean;
  setIsReviewFormShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WriteReviewForm({ isReviewFormShown, setIsReviewFormShown }: Props) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };
  const [rate, setRate] = useState(0);

  return (
    <WriteReviewContainer>
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
            <Star src={`${rate > 0 ? "./Images/fillstar.png" : "./Images/emstar.png"}`} onClick={(e) => setRate(1)} />
            <Star src={`${rate > 1 ? "./Images/fillstar.png" : "./Images/emstar.png"}`} onClick={(e) => setRate(2)} />
            <Star src={`${rate > 2 ? "./Images/fillstar.png" : "./Images/emstar.png"}`} onClick={(e) => setRate(3)} />
            <Star src={`${rate > 3 ? "./Images/fillstar.png" : "./Images/emstar.png"}`} onClick={(e) => setRate(4)} />
            <Star src={`${rate > 4 ? "./Images/fillstar.png" : "./Images/emstar.png"}`} onClick={(e) => setRate(5)} />
          </StarContainer>
          <RateNum>{rate} / 5</RateNum>
        </Rating>
        <Button
          color="blue"
          size="md"
          text="작성완료"
          icon={true}
          onClick={() => setIsReviewFormShown(!isReviewFormShown)}
        />
      </InputBot>
    </WriteReviewContainer>
  );
}

const WriteReviewContainer = styled.section`
  z-index: 2;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 20px;
  bottom: 20px;
  height: 210px;
  width: 430px;
  padding: 15px;
  background-color: var(--white);
  border-radius: 10px;
  border: 0.5px solid var(--blue-300);
  box-shadow: 0px 0px 5px var(--black-200);
  @media (max-width: 768px) {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 20px;
    left: 40px;
    min-height: 210px;
  }
`;
const InputTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ReviewImgContainer = styled.span`
  display: inline-block;
  position: relative;
`;
const ReviewImgInput = styled.input`
  position: absolute;
  display: none;
`;
const ReviewImg = styled.img`
  object-fit: cover;
  height: 80px;
  width: 100px;
  border-radius: 5px;
`;
const Instead = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100px;
  font-size: 40px;
  background-color: var(--black-075);
  color: var(--white);
  border-radius: 5px;
`;
const Label = styled.label`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  right: 0;
  height: 26px;
  width: 26px;
  background-color: var(--white);
  color: var(--black-100);
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0.5px var(--black-200);
`;
const TagSelection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 46px;
  padding: 10px;
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
  height: 35px;
  width: 280px;
  padding: 10px;
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
