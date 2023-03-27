import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PharmInstance, postUserImg } from "../../Api/AxiosInstance";
import { onUpload } from "../../Api/onUpload";
import { useAppSelector } from "../../Redux/hooks";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { TYPE_UserInfo } from "../../Api/TYPES";

export default function PharmacistInformation() {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [imgFile, setImgFlie] = useState<File | Blob | string>("");
  const [myInfo, setMyInfo] = useState<TYPE_UserInfo>({
    createdAt: "",
    name: "",
    email: "",
    address: "",
  });

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! GET : 유저 정보
  useEffect(() => {
    PharmInstance.getPharmacistInfo(user.userIdx, setMyInfo);
  }, []);
  console.log(user.storeIdx);

  //! POST : 유저 이미지 업로드
  const submitUserImg = (e: any) => {
    e.preventDefault();
    const formDataImgsubmit = new FormData();
    formDataImgsubmit.append("profileImage", imgFile);
    formDataImgsubmit.append("userIdx", new Blob([JSON.stringify(user.userIdx)], { type: "application/json" }));
    postUserImg(formDataImgsubmit);
  };

  return (
    <Wrapper>
      <ImgContainer>
        <ReviewImgInput
          id="img"
          type="file"
          onChange={(e) => onUpload(e, setImgFlie, setImageSrc)}
          accept="image/*"
        ></ReviewImgInput>
        {imageSrc ? (
          <ReviewImg src={`${imageSrc}`} />
        ) : myInfo.imagePath ? (
          <ReviewImg src={`${myInfo.imagePath}`} />
        ) : (
          <ReviewImg src="Images/Pharm.png" />
        )}
        {imageSrc ? (
          <Label onClick={(e: any) => submitUserImg(e)} className="mint">
            <MdOutlineAddAPhoto aria-hidden="true" />
            사진수정완료
          </Label>
        ) : (
          <Label htmlFor="img">
            <MdOutlineAddAPhoto aria-hidden="true" />
            사진수정하기
          </Label>
        )}
      </ImgContainer>
      <Content>
        <ContentSet>
          <ContentKey>가입일</ContentKey>
          <ContentValue>{new Date(myInfo.createdAt).toLocaleDateString()}</ContentValue>
        </ContentSet>
        <ContentSet>
          <ContentKey>닉네임</ContentKey>
          <ContentValue>{myInfo.name}</ContentValue>
        </ContentSet>
        <ContentSet>
          <ContentKey>email</ContentKey>
          <ContentValue>{myInfo.email}</ContentValue>
        </ContentSet>
        <ContentSet>
          <ContentKey>주소</ContentKey>
          <ContentValue>{myInfo.address}</ContentValue>
        </ContentSet>
      </Content>
    </Wrapper>
  );
}

const ImgContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 120px;
`;

const ContentSet = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 3px;
`;
const ContentKey = styled.label`
  display: flex;
  align-items: center;
  width: 80px;
  margin-left: 20px;
  font-size: 18px;
  color: var(--black-500);
`;
const ContentValue = styled.span`
  padding-top: 2px;
  height: 30px;
  font-weight: normal;
  font-size: 18px;
  color: var(--black-700);
`;

const ReviewImgInput = styled.input`
  position: absolute;
  display: none;
`;
const ReviewImg = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--blue-100);
`;
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  margin-top: 7px;
  padding: 2px;
  gap: 2px;
  font-size: 15px;
  cursor: pointer;
  font-family: inherit;
  border-radius: 3px;
  font-size: 0.8rem;
  border: 1.2px solid var(--black-300);
  color: var(--black-300);
  box-shadow: var(--bs-btn);
  :active {
    background-color: var(--black-025);
    box-shadow: var(--bs-btn-click);
  }
  :hover {
    border: 1.2px solid var(--black-400);
    color: var(--black-400);
  }
  &.mint {
    border: 1.2px solid var(--l_button-mint);
    color: var(--l_button-mint);
    :hover {
      border: 1.2px solid var(--l_button-mint-hover);
      color: var(--l_button-mint-hover);
    }
  }
`;
const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  @media (max-width: 768px) {
    width: 500px;
  }
`;
const Wrapper = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 780px;

  @media (max-width: 768px) {
    width: 600px;
  }
`;
