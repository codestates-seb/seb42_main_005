import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";
import MyInfoInformation from "../../Components/MyPage/MyInfo_Information";
import Button from "../../Components/Ul/Button";
import MyInfoLikes from "../../Components/MyPage/MyInfo_likes";
import MyInfoReviews from "../../Components/MyPage/MyInfo_reviews";


export default function MyInfo() {
  return (
    <WholePage>
      <ContentsWrapper>
        <PageHeading>마이페이지</PageHeading>
        <Information>
          <Title>내 정보</Title>
          <MyInfoInformation/>
        </Information>
        <Information>
          <Title>내가 찜한 약국</Title>
          <MyInfoLikes/>
        </Information>
        <Information>
          <Title>내가 남긴 리뷰</Title>
          <MyInfoReviews/>
        </Information>
        <QuitBtnWrapper to="/sign_out">
          <Button text="탈퇴하기" color="red" size="lg" />
        </QuitBtnWrapper>
      </ContentsWrapper>
    </WholePage>
  );
}

const WholePage = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentsWrapper = styled.section`
  width: 1000px;
  padding-top: 50px;
`;
const QuitBtnWrapper = styled(Link)`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0 100px 0;
`;
const PageHeading = styled.h1`
  padding-bottom: 30px;
  padding-left: 10px;
  color: var(--black-600);
  font-size: 40px;
  border-bottom: 1.5px solid var(--black-075);
`;
const Information = styled.section`
  display: flex;
  padding: 20px;
  border-bottom: 1.5px solid var(--black-075);
`;
const Title = styled.h2`
  width: 180px;
`;
