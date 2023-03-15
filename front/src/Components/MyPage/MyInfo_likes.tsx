import styled from "styled-components";
import { IoIosArrowDropright } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  return (
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
  );
}

const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
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
  &.icon {
    color: var(--black-500);
    :hover {
      color: var(--black-200);
    }
  }
`;
