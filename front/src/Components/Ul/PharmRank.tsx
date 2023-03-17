// 약국 별점, 찜콩, 리뷰수
import styled from "styled-components";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

export default function PharmRank() {
  /**별점: 나중에 데이터 받아왔을때 바꿔야함,
   * 별점이 있을때는 꽉찬별,
   * 별점 없는 신생약국 일때는 빈별 */
  const starPoint: number = 4.5;
  return (
    <Container>
      <div>{starPoint ? <BsStarFill className="select_star" /> : <BsStar className="unSelect_star" />}</div>
      <Star> {starPoint}<span className="rest">/5</span> </Star>
      <Selected>찜콩 45</Selected>
      <span className="partition" />
      <TotalReview> 리뷰 113</TotalReview>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .unSelect_star {
    color: var(--black-350);
    font-size: 1.2rem;
    margin-right: 0.4rem;
  }
  .select_star {
    font-size: 1.2rem;
    color: var(--mint);
  }
  .partition {
    width: 1.4px;
    height: 1rem;
    background-color: var(--black-300);
    margin: 0 12px;
  }
`;

const Star = styled.span`
  font-weight: bold;
  font-size: 1.3rem;
  margin-right: 1.2rem;
  margin-left: 0.5rem;
  padding-bottom: 2px;
  color: var(--black-700);
  .rest{
    margin-left: 0.2rem;
    color: var(--black-500);
    font-weight: 500;
  }
`;

const Selected = styled.span`
  color: var(--black-400);
`;
const TotalReview = styled.span`
  color: var(--black-400);
`;
