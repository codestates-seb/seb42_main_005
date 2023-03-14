import { useState } from "react";
import styled from "styled-components";
import Button from "../../Components/Ul/Button";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";

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
  const [imageSrc, setImageSrc]: any = useState(null);
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

  return (
    <WholePage>
      <ContentsWrapper>
        <PageHeading>마이페이지</PageHeading>
        <Information>
          <Title>내 정보</Title>
          <ImgContainer>
            <ReviewImgInput id="img" type="file" onChange={(e) => onUpload(e)} accept="image/*"></ReviewImgInput>
            {imageSrc ? (
              <ReviewImg src={imageSrc} />
            ) : (
              <Instead>
                <BiPhotoAlbum />
              </Instead>
            )}
            <Label htmlFor="img">
              <MdOutlineAddAPhoto />
              사진추가하기
            </Label>
          </ImgContainer>
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
  #quitBtnWrapper {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 100px 0;
  }
`;
const PageHeading = styled.h1`
  padding-bottom: 30px;
  padding-left: 10px;
  font-size: 40px;
  border-bottom: 1.5px solid var(--black-075);
`;
const Information = styled.section`
  display: flex;
  padding: 20px;
  border-bottom: 1.5px solid var(--black-075);
`;
const ImgContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
`;
const Title = styled.h2`
  width: 180px;
`;
const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`;
const ButtonContainer = styled.span`
  position: absolute;
  display: flex;
  bottom: 0;
  right: 0;
`;
const TableHead = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  color: var(--black-500);
  border-top: 1.5px solid var(--black-075);
  border-bottom: 1.5px solid var(--black-075);
  background-color: var(--black-050);
`;
const TableBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  color: var(--black-600);
  border-bottom: 1px solid var(--black-050);
`;
const ContentSet = styled.h3`
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 4px 0;
`;
const ContentKey = styled.h3`
  display: flex;
  align-items: center;
  width: 70px;
  padding-left: 20px;
  font-size: 18px;
  color: var(--black-500);
`;
const ContentValue = styled.span`
  font-weight: normal;
  font-size: 18px;
  color: var(--black-700);
`;
const Text = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  &.single {
    width: 50px;
  }
  &.pharm {
    width: 150px;
  }
  &.address {
    width: 270px;
  }
  &.number {
    width: 140px;
  }
  &.review {
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
const ReviewImgInput = styled.input`
  position: absolute;
  display: none;
`;
const ReviewImg = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
`;
const Instead = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  font-size: 40px;
  background-color: var(--black-075);
  color: var(--white);
  border-radius: 50%;
`;
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  margin-top: 5px;
  padding: 0 2px;
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
