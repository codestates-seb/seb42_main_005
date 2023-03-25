import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { API_MyInfoInformation } from "../../Api/APIs";
import { useAppSelector } from "../../Redux/hooks";

interface Props {
  scriptUrl?: string;
}

export default function PharmacistInformation({ scriptUrl }: Props) {
  const [myInfo, setMyInfo]: any = useState({
    createdAt: "",
    name: "",
    email: "",
    address: "",
  });

  const [imgFile, setImgFlie]: any = useState(null);

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  //! GET : 유저 정보
  useEffect(() => {
    const getReviews = async () => {
      try {
        //? userIdx 는 리덕스 툴킷에서 -> 2
        const response = await axios.get(`${API_MyInfoInformation.REAL_API}/${user.userIdx}`);
        setMyInfo(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, []);

  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
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

  const submitUserImg = (e: any) => {
    e.preventDefault();
    const formDataImgsubmit = new FormData();
    formDataImgsubmit.append("image", imgFile);

    // TODO : 리덕스 툴킷에서 userIdx가져와 [JSON.stringify(userIdx)] 수정 => 아래주석 코드 지우면 안돼!
    //   formDataImgsubmit.append("userIdx", new Blob([JSON.stringify(userIdx)], { type: "application/json" }));
    //

    const submitNewImg: any = async () => {
      try {
        await axios({
          url: `${API_MyInfoInformation.REAL_API}/image`,
          method: "patch",
          data: formDataImgsubmit,
        });
      } catch (error) {
        console.log(error);
      }
    };
    submitNewImg();
  };

  return (
    <Wrapper>
      <ImgContainer>
        <ReviewImgInput id="img" type="file" onChange={(e) => onUpload(e)} accept="image/*"></ReviewImgInput>
        {imageSrc ? <ReviewImg src={imageSrc as string} /> : <ReviewImg src="Images/Pharm.png" />}
        {imageSrc ? (
          <Label onClick={submitUserImg}>
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
