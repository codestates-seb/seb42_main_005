//! 모달 컴포넌트 오른편 약국 정보 부분입니다
//* border : blue 로 되어 있는 부분은 컴포넌트 재사용 예정인 임시 부분입니다
import styled from "styled-components";
import PharmRank from "./PharmRank";
import TagContainer from "./TagContainer";

export default function PharmInfo() {
  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>킹갓약국</InfoTitle>
        {/* <PharmRank /> */}
        <Temporary>
          <span>4.6/5</span>
          <span>찜콩 45</span>
          <span>리뷰 113</span>
        </Temporary>
      </InfoHeader>
      <InfoImgContainer>
        <Img src="/Images/pharm.png"></Img>
        <LikeButton>💙</LikeButton>
      </InfoImgContainer>
      <InfoInfo>
        <InfoUnit>
          <InfoInfoTitle>주소</InfoInfoTitle>
          <InfoInfoContent>서울시 종로구 대학로 101</InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>전화번호</InfoInfoTitle>
          <InfoInfoContent>02-1234-1234</InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>영업시간</InfoInfoTitle>
          <InfoInfoContent>09:00 ~ 21:00</InfoInfoContent>
        </InfoUnit>
      </InfoInfo>
      <InfoTagContainer>
        <InfoTagTitle>사람들이 많이 선택한 태그!</InfoTagTitle>
        <InfoTagBox>
          {/* <TagContainer /> */}
          <div>
            <span>친절해요</span>
            <span>깨끗해요</span>
            <span>주차가능</span>
          </div>
        </InfoTagBox>
      </InfoTagContainer>
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px 0px 0px;
  height: 500px;
  width: 280px;
  border-right: 1px solid var(--black-200);
`;
const InfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  gap: 10px;
  border-bottom: 1px solid var(--black-200);
`;
const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 30px;
`;
const InfoImgContainer = styled.div`
  display: inline-block;
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--black-200);
`;
const LikeButton = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 20px;
  border: 1px solid blue;
`;
const Img = styled.img`
  width: 260px;
  height: 171.2px;
  object-fit: cover;
  border-radius: 5px;
`;
const InfoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 5px;
  gap: 10px;
  border-bottom: 1px solid var(--black-200);
`;
const InfoUnit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const InfoInfoTitle = styled.span`
  color: var(--black-400);
  font-size: 17px;
  font-weight: bold;
`;
const InfoInfoContent = styled.span`
  font-size: 16px;
`;
const InfoTagContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 5px;
  gap: 10px;
  border-bottom: 1px solid var(--black-200);
`;
const InfoTagTitle = styled.div`
  font-size: 14px;
  color: var(--black-500);
`;
const InfoTagBox = styled.div`
  border: 1px solid blue;
`;
const Temporary = styled.div`
  display: flex;
  border: 1px solid blue;
`;
