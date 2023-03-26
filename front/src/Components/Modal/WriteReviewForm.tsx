import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { APIS } from "../../Api/APIs";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import { TYPE_Pharm, TYPE_setIsReviewFormShown, TYPE_reviewList, TYPE_setReviewList } from "../../Api/TYPES";
import { useAppSelector } from "../../Redux/hooks";
import { zIndex_Modal } from "../../Util/z-index";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";

interface Props {
  Pharm: TYPE_Pharm | undefined;
  setIsReviewFormShown: TYPE_setIsReviewFormShown;
  storeIdx: number | undefined;
  reviewList: TYPE_reviewList;
  setReviewList: TYPE_setReviewList;
}

export default function WriteReviewForm({ Pharm, setIsReviewFormShown, storeIdx, reviewList, setReviewList }: Props) {
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

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! POST : 리뷰작성
  const onSubmit: any = async (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    let data: any = {
      userIdx: user.userIdx, //TODO - REDUX TOOLKIT
      content: review.content,
      rating: review.rating,
    };
    const formData = new FormData();
    formData.append("postDto", new Blob([JSON.stringify(data)], { type: "application/json" }));
    formData.append("image", imgFile);
    await axios
      .post(`${APIS.POST_REVIEWS}/${storeIdx}/review`, formData)
      .then(() => setIsReviewFormShown(false))
      .catch((error) => {
        console.log("리뷰를 작성하던 중 에러 발생");
        console.log(error);
      });
    await axios
      .get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
      .then((response) => {
        setReviewList(response.data.response.storeReviews);
      })
      .catch((error) => {
        console.log("리뷰리스트를 다시 불러오던 중 에러 발생");
        console.log(error);
      });
  };

  return (
    <WriteReviewContainer onSubmit={onSubmit}>
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
