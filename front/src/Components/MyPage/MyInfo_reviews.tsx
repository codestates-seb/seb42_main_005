import styled from "styled-components";
import { RiDeleteBin6Line } from "react-icons/ri";


let dummy = {
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

export default function MyInfoReviews() {
  return (
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
