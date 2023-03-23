import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";
import { zIndex_Modal } from "../../Util/z-index";
import { API_WriteReviewForm } from "../../Api/APIs"; // Review.json
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";

interface Props {
  setIsReviewFormShown: React.Dispatch<React.SetStateAction<boolean>>;
  storeIdx: number;
  reviewList: any;
  setReviewList: any;
}

export default function WriteReviewForm({ setIsReviewFormShown, storeIdx, reviewList, setReviewList }: Props) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const [imgFile, setImgFile]: any = useState(null);
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    setImgFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const [review, setReview]: any = useState({
    reviewIdx: 0,
    content: "",
    rating: 0,
    createdAt: "",
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
  const onSubmit: any = (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reviewContent = formData.get("content");
    const star = formData.get("rating");

    let data: any = {
      userIdx: 3,
      content: review.content,
      rating: review.rating,
    };

    const formDataForsubmit = new FormData();
    formDataForsubmit.append("postDto", new Blob([JSON.stringify(data)], { type: "application/json" }));
    formDataForsubmit.append("image", imgFile);

    //! POST : 리뷰작성
    //TODO /api/store/{storeIdx}/review
    const postReview = async () => {
      try {
        await axios({
          url: `${API_WriteReviewForm.POST_REAL_API}/${storeIdx}/review`,
          method: "post",
          data: formDataForsubmit,
        });
      } catch (error) {
        console.log(error);
      }
    };

    //* 새로고침 안되고 보여주는 로직
    let show: any = {
      userIdx: 1, //? 리덕스 툴킷에서 userIdx 가져오기
      userImage: review.userImage,
      userName: "나 회원 아니거든?", //? 리덕스 툴킷에서 name 가져오기
      content: review.content,
      rating: review.rating,
      reviewImage: imageSrc,
      createdAt: new Date().toLocaleDateString(),
    };
    setReviewList([show, ...reviewList]);
    setReview({
      reviewIdx: 0,
      content: "",
      rating: 0,
      createdAt: "",
    });
    setImageSrc("");
    postReview();
  };

  return (
    <WriteReviewContainer onSubmit={onSubmit}>
      <InputTop className="wide">
        <HiXMark aria-hidden="true" className="except" onClick={() => setIsReviewFormShown(false)} />
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
          <ReviewImgInput id="img" type="file" onChange={(e) => onUpload(e)} accept="image/*" />
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
            <Star
              src={`${review.rating > 0 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReview({
                  ...review,
                  rating: 1,
                })
              }
            />
            <Star
              src={`${review.rating > 1 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReview({
                  ...review,
                  rating: 2,
                })
              }
            />
            <Star
              src={`${review.rating > 2 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReview({
                  ...review,
                  rating: 3,
                })
              }
            />
            <Star
              src={`${review.rating > 3 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReview({
                  ...review,
                  rating: 4,
                })
              }
            />
            <Star
              src={`${review.rating > 4 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={(e) =>
                setReview({
                  ...review,
                  rating: 5,
                })
              }
            />
          </StarContainer>
          <RateNum readOnly type="text" name="rating" value={`${review.rating}`} onChange={handlerRate}></RateNum>
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
  .wide {
    display: flex;
    justify-content: flex-end;
    width: 400px;
    font-size: 20px;
    color: var(--black-300);
    transition: 0.2s;
    #close:hover {
      color: var(--black-600);
      transition: 0.2s;
    }
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
  display: none;
  margin-left: 3px;
  width: 4rem;
  color: var(--black-300);
  font-size: 23px;
  font-weight: bold;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;
