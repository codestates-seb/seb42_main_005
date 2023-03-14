import styled from "styled-components";
import Button from "../../Components/Ul/Button";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

let dummy = {
  myInfo: {
    profileImg: "Images/logo.png",
    joined: "2021.03.29",
    nickname: "caffeine",
    email: "JudiPark0426@github.com",
    address: "서울시 종로구 대학로 101",
  },
  myLikes: [
    {
      pharm: "킹갓약국",
      address: "서울시 종로구 대학로 101",
      tel: "1588-5700",
    },
    {
      pharm: "제너럴 약국",
      address: "서울시 중랑구 신내로 156",
      tel: "02-2276-7000",
    },
  ],
  myReviews: [
    {
      pharm: "킹갓약국",
      review: "내꿈은 늘 너였어 박연진",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "제너럴 약국",
      review: "졸려 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "텐텐좋아약국",
      review: "텐텐 사러 갔는데 여기에는 노마밖에 안팜 ㅠ 노마 노맛 ㅜ",
      writtenAt: "2012.02.14",
    },
  ],
};

export default function MyInfo() {
  return (
    <WholePage>
      <ContentsWrapper>
        <PageHeading>마이페이지</PageHeading>
        <Information>
          <ImgContainer>이미지 자리</ImgContainer>
          <Content>
            <ContentSet>
              <ContentKey>가입일</ContentKey>
              <ContentValue>{dummy.myInfo.joined}</ContentValue>
            </ContentSet>
            <ContentSet>
              <ContentKey>닉네임</ContentKey>
              <ContentValue>{dummy.myInfo.nickname}</ContentValue>
            </ContentSet>
            <ContentSet>
              <ContentKey>email</ContentKey>
              <ContentValue>{dummy.myInfo.email}</ContentValue>
            </ContentSet>
            <ContentSet>
              <ContentKey>주소</ContentKey>
              <ContentValue>{dummy.myInfo.address}</ContentValue>
            </ContentSet>
            <ButtonContainer>
              <Button text="수정하기" color="blue" size="lg" />
            </ButtonContainer>
          </Content>
        </Information>
        <Information>
          <Title>내가 찜한 약국</Title>
          <Content>
            <TableHead>
              <Text className="single" />
              <Text className="pharm">약국명</Text>
              <Text className="address">주소</Text>
              <Text className="number">전화번호</Text>
              <Text className="single" />
            </TableHead>
            {dummy.myLikes.map((data) => (
              <TableBody>
                <Text className="single icon">
                  <IoIosArrowDropright />
                </Text>
                <Text className="pharm">{data.pharm}</Text>
                <Text className="address">{data.address}</Text>
                <Text className="number">{data.tel}</Text>
                <Text className="single icon">
                  <RiDeleteBin6Line />
                </Text>
              </TableBody>
            ))}
          </Content>
        </Information>
        <Information>
          <Title>내가 남긴 리뷰</Title>
          <Content>
            <TableHead>
              <Text className="single" />
              <Text className="pharm">약국명</Text>
              <Text className="review">내용</Text>
              <Text className="number">작성일</Text>
              <Text className="single" />
            </TableHead>
            {dummy.myReviews.map((data, i) => (
              <TableBody>
                <Text className="single">{i + 1}</Text>
                <Text className="pharm">{data.pharm}</Text>
                <Text className="review">{data.review}</Text>
                <Text className="number">{data.writtenAt}</Text>
                <Text className="single icon">
                  <RiDeleteBin6Line />
                </Text>
              </TableBody>
            ))}
          </Content>
        </Information>
        <div id="quitBtnWrapper">
          <Button text="탈퇴하기" color="red" size="lg" />
        </div>
      </ContentsWrapper>
      {/* <Footer /> */}
    </WholePage>
  );
}

const WholePage = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* overflow-y: scroll; */
`;
const ContentsWrapper = styled.section`
  /* border: 1px solid black; */
  /*  */
  width: 1000px;
  padding-top: 50px;
  #quitBtnWrapper {
    /* background-color: yellow; */
    /*  */
    display: flex;
    justify-content: flex-end;
    /* height: 400px; */
    margin: 20px 0 100px 0;
  }
`;
const PageHeading = styled.h1`
  /* border: 1px solid brown; */
  /*  */
  padding-bottom: 30px;
  padding-left: 10px;
  font-size: 40px;
  border-bottom: 1.5px solid var(--black-075);
`;
const Information = styled.section`
  /* border: 1px solid burlywood; */
  /*  */
  display: flex;
  padding: 20px;
  gap: 20px;
  border-bottom: 1.5px solid var(--black-075);
`;
const ImgContainer = styled.aside`
  border: 1px solid gainsboro;
  /*  */
  width: 200px;
`;
const Title = styled.h2`
  /* border: 1px solid cadetblue; */
  /*  */
  width: 200px;
  /* font-weight: bold; */
`;
const Content = styled.section`
  /* border: 1px solid tan; */
  /*  */
  /* width: 800px; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  gap: 10px;
`;
const ButtonContainer = styled.span`
  position: absolute;
  display: flex;
  bottom: 0;
  right: 0;
`;
const TableHead = styled.h3`
  /* border: 1px solid khaki; */
  /*  */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* height: 30px; */
  padding: 2px 10px;
  color: var(--black-500);
  border-top: 1.5px solid var(--black-075);
  border-bottom: 1.5px solid var(--black-075);
  background-color: var(--black-050);
`;
const TableBody = styled.div`
  /*  */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1px 10px;
  border-bottom: 1px solid var(--black-050);
`;
const ContentSet = styled.h3`
  /* border: 1px solid indianred; */
  /*  */
  display: flex;
  align-items: center;
  gap: 30px;
`;
const ContentKey = styled.h3`
  /* border: 1px solid firebrick; */
  /*  */
  display: flex;
  align-items: center;
  width: 70px;
  padding-left: 20px;
  font-size: 18px;
  color: var(--black-500);
`;
const ContentValue = styled.span`
  /* border: 1px solid magenta; */
  /*  */
  font-weight: normal;
  font-size: 18px;
  color: var(--black-700);
`;
const Text = styled.span`
  /* border: 1px solid blue; */
  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  &.single {
    height: 30px;
    width: 50px;
  }
  &.pharm {
    height: 30px;
    width: 150px;
  }
  &.address {
    height: 30px;
    width: 270px;
  }
  &.number {
    height: 30px;
    width: 140px;
  }
  &.review {
    min-height: 30px;
    width: 300px;
    white-space: normal;
    word-break: break-all;
  }
  &.icon {
    color: var(--black-500);
    :hover {
      color: var(--black-200);
    }
  }
`;
// const Footer = styled.footer`
//   background-color: yellow;
//   width: 200px;
//   height: 200px;
// `;
