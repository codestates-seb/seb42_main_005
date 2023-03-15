import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import PharmDetail from "../../Components/Modal/PharmDetail";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";

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
      review: "텐텐 사러 갔는데 여기에는 노마밖에 안팜 ㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "제너럴 약국",
      review: "졸려 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "텐텐좋아약국",
      review: "텐텐 사러 갔는데 여기에는 노마밖에 안팜 ㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "제너럴 약국",
      review: "졸려 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "텐텐좋아약국",
      review: "텐텐 사러 갔는데 여기에는 노마밖에 안팜 ㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "제너럴 약국",
      review: "졸려 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "텐텐좋아약국",
      review: "텐텐 사러 갔는데 여기에는 노마밖에 안팜 ㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "제너럴 약국",
      review: "졸려 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "텐텐좋아약국",
      review: "텐텐 사러 갔는데 여기에는 노마밖에 안팜 ㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "제너럴 약국",
      review: "졸려 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
      writtenAt: "2012.02.14",
    },
    {
      pharm: "텐텐좋아약국",
      review: "텐텐 사러 갔는데 여기에는 노마밖에 안팜 ㅠ",
      writtenAt: "2012.02.14",
    },
  ],
};

export default function MyInfoReviews() {
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <Content>
      {isModalUp ? (
        <PharmDetail isModalUp={isModalUp} setIsModalUp={setIsModalUp} like={like} setLike={setLike} />
      ) : null}
      <TableHead>
        <Text className="single" />
        <Text className="pharm">약국명</Text>
        <Text className="review">내용</Text>
        <Text className="number">작성일</Text>
        <Text className="single" />
      </TableHead>
      {dummy.myReviews.length ? (
        <Rest>
          {dummy.myReviews.map((data, i) => (
            <TableBody>
              <Text className="single">{i + 1}</Text>
              <Text className="pharm" onClick={() => setIsModalUp(!isModalUp)}>
                {data.pharm}
              </Text>
              <Text className="review">{data.review}</Text>
              <Text className="number">{data.writtenAt}</Text>
              <Text className="single icon">
                <RiDeleteBin6Line />
              </Text>
            </TableBody>
          ))}
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
