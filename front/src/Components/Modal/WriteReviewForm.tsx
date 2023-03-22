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

interface Props {
  setIsReviewFormShown: React.Dispatch<React.SetStateAction<boolean>>;
  storeIdx: number;
}

export default function WriteReviewForm({ setIsReviewFormShown, storeIdx }: Props) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const [reviewList, setReviewList]: any = useState({
    reviewIdx: 0,
    content: "",
    rating: 0,
    createdAt: "",
  });

  const handlerText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewList({
      ...reviewList,
      [name]: value,
    });
  };
  const handlerRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviewList({
      ...reviewList,
      [name]: value,
    });
  };
  const onSubmit: any = (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const review = formData.get("content");
    const star = formData.get("rating");

    //* dummy data 일때 -> 나중에 수정 , 화면에 뜨는지 확인하려고 한것
    let newData: any = {
      storeReview: [
        {
          reviewIdx: 53,
          name: "이성은",
          userImage:
            "https://mblogthumb-phinf.pstatic.net/MjAxODA0MDdfMTIy/MDAxNTIzMDI3MjQ1Nzk3.k5nYScR4RH3Tx2JVS6pQiqoKRakgtsjJnBvRSg1VfD8g.SYovJeXlx8Am487HAc9RSJ_4gNpbnhuQVPPh24_N568g.JPEG.monday20000/1522512872270.jpg?type=w800",
          reviewImage:
            "https://mblogthumb-phinf.pstatic.net/MjAxODA0MDdfMTcz/MDAxNTIzMDI3MjQ1NDU4.uP9jhQMTNwQSSUGZcDRlddU5E11r4Kl4QRTnaSrrqKkg.OX4yCUKh3wbhgF0zGlxOT6TNIaDa3vvd9S3bMDvHfEwg.JPEG.monday20000/1522493493318.jpg?type=w800",
          content: review,
          rating: star,
          createdAt: new Date(),
          modifiedAt: new Date(),
        },
      ],
    };
    //TODO url 받았을때 : formData 를 이용한 대대적인 수정 필요 ㅠㅠ
    // let newData: any = {
    //   userIdx: 1,
    //   content: "리뷰 본문 약사가 맛있고 제품이 친절해요",
    //   image: "사진 파일이 들어갈 것이다.",
    //   rating: 4,
    // };

    //! POST : 리뷰작성
    const postReview = async () => {
      try {
        //* dummy url 일때 -> Review.json
        await axios({
          url: API_WriteReviewForm.DUMMY_API,
          method: "post",
          data: newData,
        });
        //TODO url 받았을때 -> /api/store/{storeIdx}/review
        // await axios({
        //   url: `${API_WriteReviewForm.REAL_API}/${storeIdx}/review`,
        //   method: "post",
        //   data: newData,
        // });
      } catch (error) {
        console.log(error);
      }
    };
    setReviewList({ reviewIdx: 0, content: "", rating: 0, createdAt: "" });
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
          value={reviewList.content}
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
              src={`${reviewList.rating > 0 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 1,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 1 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 2,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 2 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 3,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 3 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 4,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 4 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={(e) =>
                setReviewList({
                  ...reviewList,
                  rating: 5,
                })
              }
            />
          </StarContainer>
          <RateNum readOnly type="text" name="rating" value={`${reviewList.rating}`} onChange={handlerRate}></RateNum>
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
