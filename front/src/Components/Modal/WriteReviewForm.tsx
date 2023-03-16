import { useState } from "react";
import styled from "styled-components";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import Tag from "../Ul/Tag";
import { zIndex_Modal } from "../../Util/z-index";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

interface Props {
  setIsReviewFormShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WriteReviewForm({ setIsReviewFormShown }: Props) {
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
    <WriteReviewContainer >
      <InputTop className="wide"><GrClose className="except" onClick={() => setIsReviewFormShown(false)}/></InputTop>
      <InputTop>
        <Textarea placeholder="무분별한 비방, 비하, 욕설은 지양해주세요 :)" isValid={true} rows={3} icon={false} />
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
        />
      </InputBot>
    </WriteReviewContainer>
  );
}

const WriteReviewContainer = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 20px;
  bottom: 20px;
  padding: 15px;
  gap: 8px;
  width: 430px;
  border-radius: 10px;
  background-color: var(--white);
  border: 0.5px solid var(--blue-300);
  box-shadow: 0px 0px 5px var(--black-200);
  z-index: ${zIndex_Modal.WriteReviewContainer};
  .wide{
    display: flex;
    justify-content: flex-end;
    width: 400px;
  }
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
const InputTop = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ReviewImgContainer = styled.section`
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
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100px;
  font-size: 40px;
  color: var(--white);
  border-radius: 5px;
  background-color: var(--black-075);
`;
const Label = styled.label`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  height: 26px;
  width: 26px;
  background-color: var(--white);
  color: var(--black-100);
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0.5px var(--black-200);
`;
const TagSelection = styled.section`
  display: flex;
  flex-direction: row;
  height: 46px;
  padding: 10px 15px;
  gap: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
`;
const InputBot = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Rating = styled.section`
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
  padding: 10px;
  gap: 10px;
`;
const Star = styled.img`
  width: 20px;
`;
const RateNum = styled.span`
  margin-right: 5px;
  color: var(--black-300);
  font-weight: bold;
`;
