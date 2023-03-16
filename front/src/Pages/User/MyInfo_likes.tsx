import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";

let dummy = {
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
};

export default function MyInfoLikes() {
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <Content>
      {isModalUp ? (
        <PharmDetail setIsModalUp={setIsModalUp} like={like} setLike={setLike} />
      ) : null}
      <TableHead>
        <Text className="single" />
        <Text className="pharm">약국명</Text>
        <Text className="address">주소</Text>
        <Text className="number">전화번호</Text>
        <Text className="single" />
      </TableHead>
      {dummy.myLikes.length ? (
        <Rest>
          {dummy.myLikes.map((data, i) => {
            return (
              <TableBody key={i}>
                <Text className="single icon">
                  <IoIosArrowDropright onClick={() => setIsModalUp(!isModalUp)} />
                </Text>
                <Text className="pharm">{data.pharm}</Text>
                <Text className="address">{data.address}</Text>
                <Text className="number">{data.tel}</Text>
                <Text className="single icon">
                  <RiDeleteBin6Line />
                </Text>
              </TableBody>
            );
          })}
        </Rest>
      ) : (
        <WhenEmpty>
          <Add to="/">
            <IoMdAddCircleOutline id="icon" />
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
  /* flex-grow: 1; */
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
