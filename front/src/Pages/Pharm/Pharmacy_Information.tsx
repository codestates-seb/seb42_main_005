import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import PharmRank from "../../Components/Ul/PharmRank";
import DropDown from "./DropDown";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { API_PharmacyInformation } from "../../Api/APIs";

export default function PharmacyInformation() {
  const [pharmDetail, setPharmDetail]: any = useState();
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [isDropDownDown, setIsDropDownDown] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
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

  //! GET : 약국상세정보
  useEffect(() => {
    const getPharmDetail = async () => {
      try {
        //? storeIdx 는 약사 계정으로 로그인 시 리덕스 툴킷에서 받아올 수 있음 일단 임의로 2
        const response = await axios.get(`${API_PharmacyInformation.REAL_API}/store/${2}`);
        setPharmDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPharmDetail();
  }, []);
  //! GET : 약국상세정보 + 리뷰리스트
  const onModalUp = () => {
    const pharmDetailsAndreviewList = async () => {
      await axios
        //? storeIdx 는 약사 계정으로 로그인 시 리덕스 툴킷에서 받아올 수 있음 일단 임의로 2
        .get(`${API_PharmacyInformation.REAL_API}/${2}`)
        .then((response) => {
          setPharmDetail(response.data.response);
          axios
            .get(`${API_PharmacyInformation.REAL_API}/${2}/review`)
            .then((response) => {
              setReviewList(response.data.response.storeReviews);
            })
            .catch((err) => console.log("리뷰받아오던 중" + err));
        })
        .catch((err) => console.log("약국상세받아오던 중" + err));
    };
    pharmDetailsAndreviewList();
    setIsModalUp(true);
  };

  return (
    <Content>
      {isModalUp ? (
        <PharmDetail
          setIsModalUp={setIsModalUp}
          like={like}
          setLike={setLike}
          //? storeIdx 는 약사 계정으로 로그인 시 리덕스 툴킷에서 받아올 수 있음 일단 임의로 2
          storeIdx={2}
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
        <Label htmlFor="pharmImg">
          <MdOutlineAddAPhoto aria-hidden="true" />
          우리 약국 사진추가하기
        </Label>
      </ImgContainer>
      <InfomationContainer>
        <Header>
          <PharmName onClick={() => onModalUp()}>킹갓약국</PharmName>
          <PharmRank
            rating={pharmDetail.rating}
            likes={pharmDetail.pickedStoreCount}
            reviewCount={pharmDetail.reviewCount}
          />
        </Header>
        <Unit>
          <Key>주소</Key>
          <Value>서울시 종로구 대학로 101</Value>
        </Unit>
        <Unit>
          <Key>전화번호</Key>
          <Value>02-1234-1234</Value>
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
            09:00-21:00
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
