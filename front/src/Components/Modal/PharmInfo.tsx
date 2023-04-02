import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { likePharmacy } from "../../Api/AxiosInstance";
import styled from "styled-components";
import { useAppSelector } from "../../Redux/hooks";
import PharmRank from "../Ul/PharmRank";
import AnyDropDown from "./AnyDropDown";
import { TYPE_setLike, TYPE_Detail, TYPE_boolean } from "../../Api/TYPES";
import { getLocalStorage } from "../../Api/localStorage";
import { toast } from "react-toastify";

interface Props {
  like: TYPE_boolean;
  setLike: TYPE_setLike;
  pharmDetail: TYPE_Detail | undefined;
}

export default function PharmInfo({ like, setLike, pharmDetail }: Props) {
  const [isDropDownDown, setIsDropDownDown] = useState<boolean>(false);

  const navigate = useNavigate();
  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  const likeThisPharmacy = () => {
    const accessToken = getLocalStorage("access_token");
    if (!accessToken) {
      toast.error("로그인을 해주세요!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>navigate("/login"), 1000);
    } else if (user.storeIdx) {
      toast.info("약사회원은 찜하기를 이용하실수 없습니다.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (user.userIdx && accessToken) {
      const storeidx: any = pharmDetail?.storeIdx;
      likePharmacy(storeidx, like, setLike);
    }
  };

  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>{pharmDetail?.name}</InfoTitle>
        {pharmDetail && (
          <PharmRank
            rating={pharmDetail.rating}
            likes={pharmDetail.pickedStoreCount}
            reviewCount={pharmDetail.reviewCount}
          />
        )}
      </InfoHeader>
      <InfoImgContainer>
        {pharmDetail?.imagePath ? (
          <PharmImg src={pharmDetail?.imagePath} />
        ) : (
          <PharmImg src="Images/ImgPreparing.png" alt="이미지 준비중입니다." />
        )}
        <LikeButton onClick={() => likeThisPharmacy()}>
          {like ? (
            <img src="./Images/Heart.png" alt="좋아요가 선택된 상태의 꽉 찬 하트모양입니다." />
          ) : (
            <img src="./Images/UnHeart.png" alt="좋아요 하기 전의 빈 하트모양입니다." />
          )}
        </LikeButton>
      </InfoImgContainer>
      <InfoInfo>
        <InfoUnit>
          <InfoInfoTitle className={pharmDetail?.isOperating ? "open" : ""}>
            {pharmDetail?.isOperating ? "영업중" : "영업종료"}
          </InfoInfoTitle>
          <InfoInfoContent>
            {pharmDetail?.isOperating
              ? `${pharmDetail?.todayOperatingTime?.operatingTime?.endTime?.slice(0, -3)}에 영업종료`
              : pharmDetail?.todayOperatingTime?.operatingTime?.startTime
              ? `${pharmDetail?.todayOperatingTime?.operatingTime?.startTime?.slice(
                  0,
                  -3,
                )} - ${pharmDetail?.todayOperatingTime?.operatingTime?.endTime?.slice(0, -3)}`
              : "오늘은 휴무일입니다."}
            {!isDropDownDown ? (
              <More id={`dropDown ${isDropDownDown ? "close" : "open"}`} onClick={() => setIsDropDownDown(true)}>
                영업시간 더보기
              </More>
            ) : null}
            {isDropDownDown ? (
              <AnyDropDown setIsDropDownDown={setIsDropDownDown} workingHours={pharmDetail?.operatingTime} />
            ) : null}
          </InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>전화번호</InfoInfoTitle>
          <InfoInfoContent id="number">
            {pharmDetail?.tel}
            <Span>고객님의 귀한 시간을 위해 약국 방문 전 연락 바랍니다.</Span>
          </InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>주소</InfoInfoTitle>
          <InfoInfoContent className="address">{pharmDetail?.address}</InfoInfoContent>
        </InfoUnit>
      </InfoInfo>
    </InfoContainer>
  );
}

const InfoContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  padding-right: 20px;
  border-right: 1px solid var(--black-100);
  @media (max-width: 768px) {
    height: auto;
    margin-bottom: 30px;
    padding: 0px;
    border-right: none;
    border-bottom: 1px solid var(--black-100);
  }
`;
const InfoHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    display: none;
  }
`;
const InfoTitle = styled.h1`
  font-weight: bold;
  font-size: 30px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
const InfoImgContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 5px;
  border-bottom: 1px solid var(--black-100);
`;
const LikeButton = styled.button`
  position: absolute;
  right: 51px;
  top: 17px;
  width: 20px;
  border: none;
  background-color: transparent;
  @media (max-width: 768px) {
    right: 60px;
  }
`;
const InfoInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0px 10px 20px;
  gap: 10px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const InfoUnit = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;
const InfoInfoTitle = styled.h2`
  display: flex;
  align-items: flex-start;
  width: 70px;
  color: var(--black-350);
  font-size: 17px;
  font-weight: bold;
  &.open {
    color: var(--mint-hover);
  }
`;
const InfoInfoContent = styled.span`
  position: relative;
  display: flex;
  align-items: flex-start;
  height: 25px;
  width: 350px;
  gap: 3px;
  font-size: 17px;
  &.address {
    height: 60px;
    white-space: normal;
    word-break: normal;
  }
  &#number {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  #today {
    display: flex;
    align-items: center;
    padding: 1px 3px 0px 0px;
    font-size: 15px;
    font-weight: 600;
    color: var(--blue-400);
  }
`;
const More = styled.button`
  cursor: pointer;
  display: inline-block;
  color: var(--l_button-mint);
  margin-left: 5px;
  padding: 3px 5px;
  font-size: 12px;
  border-radius: 15px;
  border: 1px solid var(--l_button-mint);
  background-color: transparent;
  :hover {
    color: var(--l_button-mint-hover);
    border: 1px solid var(--l_button-mint-hover);
  }
`;
const PharmImg = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
  border: 2px solid var(--black-100);
`;
const Span = styled.span`
  font-size: 12px;
  font-weight: 350;
  color: var(--l_button-mint-hover);
`;
