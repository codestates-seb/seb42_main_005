import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserInstance } from "../../Api/AxiosInstance";
import LikedPharmacyUnit from "../User/MyInfo_likedPharmacy";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAppSelector } from "../../Redux/hooks";

export default function MyInfoLikes() {
  const [likedPharmacies, setLikedPharmacies] = useState([]);

  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });
  
  //! GET : 내가 찜한 약국 리스트
  useEffect(() => {
    UserInstance.getLikedPharmList(user.userIdx, setLikedPharmacies);
  }, []);

  return (
    <Content>
      <TableHead>
        <Text className="single" />
        <Text className="pharm">약국명</Text>
        <Text className="address">주소</Text>
        <Text className="number">전화번호</Text>
        <Text className="single" />
      </TableHead>
      {likedPharmacies.length ? (
        <Rest>
          {likedPharmacies.map((likedPharmacy: any) => (
            <LikedPharmacyUnit
              key={likedPharmacy.storeIdx}
              likedPharmacy={likedPharmacy}
              setLikedPharmacies={setLikedPharmacies}
            />
          ))}
        </Rest>
      ) : (
        <WhenEmpty>
          <Add to="/">
            <IoMdAddCircleOutline id="icon" aria-hidden="true" />
          </Add>
          <span>
            <p>현재 찜한 약국이 없습니다.</p>
            <p>마음에 드는 약국을 찜해보세요!</p>
          </span>
        </WhenEmpty>
      )}
    </Content>
  );
}

const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 300px;
  background-color: var(--black-025);
  @media (max-width: 768px) {
    width: 600px;
    overflow-x: scroll;
  }
`;
const TableHead = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  padding-right: 0.6rem;
  width: calc(780px + 0.6rem);
  color: var(--black-500);
  border-top: 1.5px solid var(--black-075);
  border-bottom: 1.5px solid var(--black-075);
  background-color: var(--black-050);
`;
const Rest = styled.section`
  display: flex;
  flex-direction: column;
  width: calc(780px + 0.6rem);
  overflow-y: scroll;
`;
const WhenEmpty = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: var(--black-200);
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
`;
const Add = styled(Link)`
  font-size: 50px;
  color: var(--black-100);
  #icon:hover {
    color: var(--black-300);
  }
`;
const TableBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 780px;
  padding: 8px 10px;
  color: var(--black-600);
  border-bottom: 0.5px solid var(--black-075);
  background-color: var(--white);
  :hover {
    background-color: var(--black-050);
  }
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
    width: 300px;
  }
  &.number {
    width: 140px;
  }
  &.icon {
    color: var(--black-500);
    :hover {
      color: var(--black-200);
    }
  }
`;
