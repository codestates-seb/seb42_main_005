import React, { useState } from "react";
import styled from "styled-components";
import { TYPE_Pharm, TYPE_setIsReviewFormShown, TYPE_setReviewList } from "../../Api/TYPES";
import { getReview, postReview } from "../../Api/AxiosInstance";
import { useAppSelector } from "../../Redux/hooks";
import { zIndex_Modal } from "../../Util/z-index";
import { onUpload } from "../../Api/onUpload";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";

interface Props {
  Pharm: TYPE_Pharm | undefined;
  setIsReviewFormShown: TYPE_setIsReviewFormShown;
  storeIdx: number | undefined;
  setReviewList: TYPE_setReviewList;
}

export default function WriteReviewForm({ Pharm, setIsReviewFormShown, storeIdx, setReviewList }: Props) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const [imgFile, setImgFile]: any = useState(null);
  const [review, setReview]: any = useState({
    reviewIdx: 0,
    content: "",
    rating: 0,
    createdAt: "",
  });

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  const handlerText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };
  const handlerRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  //! POST : 리뷰작성
  const postReviewAndRefresh: any = async (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    let data: any = {
      userIdx: user.userIdx,
      content: review.content,
      rating: review.rating,
    };
    const formData = new FormData();
    formData.append("postDto", new Blob([JSON.stringify(data)], { type: "application/json" }));
    formData.append("image", imgFile);
    await postReview(storeIdx, formData, setIsReviewFormShown)
    await getReview(storeIdx, setReviewList)
  };

  return (
    <WriteReviewContainer onSubmit={postReviewAndRefresh}>
      <InputTop>
        <span id="instruction">
          <span id="name">{Pharm?.name}</span>에 리뷰를 남겨보세요!
        </span>
        <HiXMark id="close" aria-hidden="true" className="except" onClick={() => setIsReviewFormShown(false)} />
      </InputTop>
      <InputTop>
        <HiddenLabel htmlFor="review" />
        <Textarea
          id="review"
          name="content"
          placeholder="무분별한 비방, 비하, 욕설은 지양해주세요 :)"
          isValid={true}
          rows={3}
          icon={false}
          value={review.content}
          onChange={handlerText}
        />
        <ReviewImgContainer>
          <ReviewImgInput id="img" type="file" onChange={(e) => onUpload(e, setImgFile, setImageSrc)} accept="image/*" />
          {imageSrc ? (
            <ReviewImg src={imageSrc} />
          ) : (
            <Instead>
              <BiPhotoAlbum aria-hidden="true" />
            </Instead>
          )}
          <Label htmlFor="img">
            <MdOutlineAddAPhoto aria-hidden="true" />
          </Label>
        </ReviewImgContainer>
      </InputTop>
      <InputBot>
        <Rating>
          <StarContainer>
            {new Array(5).fill("").map((_, i)=><Star key={i}
              src={`${review.rating > i ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReview({
                  ...review,
                  rating: i+1,
                })
              }
            />)}
          </StarContainer>
          <RateNum readOnly type="text" name="rating" value={`${review.rating} / 5`} onChange={handlerRate}></RateNum>
        </Rating>
        <Button type="submit" color="blue" size="md" text="작성완료" icon={true} />
      </InputBot>
    </WriteReviewContainer>
  );
}

const WriteReviewContainer = styled.form`
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
  padding-right: 4px;
  span {
    padding-left: 2px;
    &#instruction {
      display: flex;
      align-items: flex-end;
      font-size: 16px;
      color: var(--black-400);
      font-weight: 400;
    }
    &#name {
      margin-right: 5px;
      font-size: 17px;
      font-weight: 600;
      color: var(--blue-600);
    }
  }
  #close {
    font-size: 20px;
    color: var(--black-300);
    :hover {
      color: var(--black-600);
      transition: 0.2s;
    }
  }
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
  border: 1px solid var(--black-100);
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
const HiddenLabel = styled.label`
  display: none;
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
const RateNum = styled.input`
  margin-left: 3px;
  width: 4rem;
  color: var(--black-300);
  font-size: 20px;
  font-weight: 600;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;
