import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PharmDetail from "../../Components/Modal/PharmDetail";
import PharmRank from "../../Components/Ul/PharmRank";
import { APIS } from "../../Api/APIs";
import DropDown from "./DropDown";
import { useAppSelector } from "../../Redux/hooks";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";

export default function PharmacyInformation() {
  const [isModalUp, setIsModalUp] = useState<React.SetStateAction<boolean>>(false);
  const [pharmDetail, setPharmDetail] = useState<React.SetStateAction<any>>({});
  const [reviewList, setReviewList] = useState<React.SetStateAction<[]>>([]);
  const [like, setLike] = useState<React.SetStateAction<boolean>>(false);
  const [isDropDownDown, setIsDropDownDown] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [imgFile, setImgFlie]: any = useState(null);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    setImgFlie(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const getPharmDetail = async () => {
      await axios
        .get(`${APIS.GET_PHARMLIST}/${user.storeIdx}`) //TODO - REDUX TOOLKIT
        .then((response) => setPharmDetail(response.data.response))
        .catch((error) => {
          console.log("약국 상세정보 받아오던 중 에러 발생");
          console.log(error);
        });
    };
    const getReviewList = async () => {
      await axios
        .get(`${APIS.GET_PHARMLIST}/${user.storeIdx}/review`) //TODO - REDUX TOOLKIT
        .then((response) => setReviewList(response.data.response.storeReviews))
        .catch((error) => {
          console.log("약국 리뷰 받아오던 중 에러 발생");
          console.log(error);
        });
    };
    axios.all([getPharmDetail(), getReviewList()]);
    setIsModalUp(true);
  };

  const submitPharmImg = (e: any) => {
    e.preventDefault();
    //!백엔드한테 키값,url 확인하기 => 이미지 보내는데 에러남
    const formDataImgsubmit = new FormData();
    formDataImgsubmit.append("image", imgFile);
    formDataImgsubmit.append("userIdx", new Blob([JSON.stringify(user.userIdx)], { type: "application/json" }));

    const submitNewImg: any = async () => {
      try {
        //!PATCH_USER_IMG는 바꿈
        await axios({
          url: `${APIS.PATCH_USER_IMG}/image`,
          method: "patch",
          data: formDataImgsubmit,
        });
      } catch (error) {
        console.log(error);
      }
    };
    submitNewImg();
  };

  console.log(pharmDetail);

  return (
    <Content>
      {isModalUp ? (
        <PharmDetail
          setIsModalUp={setIsModalUp}
          like={like}
          setLike={setLike}
          storeIdx={user.storeIdx} //TODO - REDUX TOOLKIT
          pharmDetail={pharmDetail}
          reviewList={reviewList}
          setReviewList={setReviewList}
        />
      ) : null}
      <ImgContainer>
        <ImgInput id="pharmImg" type="file" onChange={(e) => onUpload(e)} accept="image/*" />
        {imageSrc ? (
          <PharmImg src={imageSrc as string} />
        ) : (
          <PharmImg src="Images/ImgPreparing.png" alt="image preparing" />
        )}
        {imageSrc ? (
          <Label onClick={submitPharmImg}>
            <MdOutlineAddAPhoto aria-hidden="true" />
            우리약국 사진 수정완료
          </Label>
        ) : (
          <Label htmlFor="pharmImg">
            <MdOutlineAddAPhoto aria-hidden="true" />
            우리약국 사진 수정하기
          </Label>
        )}
      </ImgContainer>
      <InfomationContainer>
        <Header>
          <PharmName onClick={() => onModalUp()}>{pharmDetail?.name}</PharmName>
          <PharmRank
            rating={pharmDetail.rating}
            likes={pharmDetail.pickedStoreCount}
            reviewCount={pharmDetail.reviewCount}
          />
        </Header>
        <Unit>
          <Key>주소</Key>
          <Value>{pharmDetail?.address}</Value>
        </Unit>
        <Unit>
          <Key>전화번호</Key>
          <Value>{pharmDetail?.tel}</Value>
        </Unit>
        <Unit>
          <Key>영업시간</Key>
          <Value>
            {isDropDownDown ? (
              <IoIosArrowDropdown
                aria-hidden="true"
                id={`dropDown ${isDropDownDown ? "close" : "open"}`}
                onClick={() => setIsDropDownDown(!isDropDownDown)}
              />
            ) : (
              <IoIosArrowDropright
                aria-hidden="true"
                id={`dropDown ${isDropDownDown ? "close" : "open"}`}
                onClick={() => setIsDropDownDown(!isDropDownDown)}
              />
            )}
            {pharmDetail?.todayOperatingTime?.operatingTime?.startTime
              ? `${pharmDetail?.todayOperatingTime.operatingTime.startTime?.slice(
                  0,
                  -3,
                )}-${pharmDetail?.todayOperatingTime?.operatingTime?.endTime?.slice(0, -3)}`
              : ""}
            {isDropDownDown ? (
              <DropDown setIsDropDownDown={setIsDropDownDown} workingHours={pharmDetail.operatingTime} />
            ) : null}
          </Value>
        </Unit>
      </InfomationContainer>
    </Content>
  );
}

const Content = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 800px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
const ImgContainer = styled.aside`
  position: relative;
`;
const PharmImg = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
  border: 2px solid var(--black-100);
  @media (max-width: 768px) {
    object-fit: cover;
    width: 15rem;
    height: 9.868rem;
  }
`;
const InfomationContainer = styled.section`
  height: 15.625rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  @media (max-width: 768px) {
    width: 350px;
    margin-left: 20px;
  }
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid var(--black-100);
  padding-bottom: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
`;
const PharmName = styled.h3`
  font-weight: bold;
  font-size: 30px;
  :hover {
    color: var(--black-400);
  }
`;
const Unit = styled.div`
  display: flex;
  margin-left: 20px;
`;
const Key = styled.h4`
  display: flex;
  align-items: center;
  width: 80px;
  color: var(--black-350);
  font-size: 17px;
  font-weight: bold;
`;
const Value = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  #dropDown:hover {
    color: var(--black-400);
  }
`;
const ImgInput = styled.input`
  position: absolute;
  display: none;
`;
const Label = styled.label`
  cursor: pointer;
  position: absolute;
  display: flex;
  bottom: 8px;
  right: 4px;
  gap: 5px;
  padding: 2px 3px;
  font-size: 15px;
  font-family: inherit;
  border-radius: 3px;
  background-color: var(--white);
  border: 1.2px solid var(--black-300);
  color: var(--black-300);
  box-shadow: var(--bs-btn);
  :active {
    background-color: var(--black-025);
    box-shadow: var(--bs-btn-click);
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    right: 0;
    left: 0;
    bottom: -26px;
  }
`;
