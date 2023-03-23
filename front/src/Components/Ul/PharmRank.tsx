import styled from "styled-components";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

interface Props {
  rating: number;
  likes: number;
  reviewCount: number;
}
export default function PharmRank({ rating, likes, reviewCount }: Props) {
  return (
    <Container>
      <div>{rating ? <BsStarFill className="select_star" /> : <BsStar className="unSelect_star" />}</div>
      <Star>
        {Number.isInteger(rating) ? rating :rating.toFixed(1)}
        <span className="rest">/5</span>
      </Star>
      <Selected>찜콩 {likes}</Selected>
      <span className="partition" />
      <TotalReview> 리뷰 {reviewCount}</TotalReview>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .unSelect_star {
    font-size: 1.2rem;
    color: var(--black-350);
    margin-right: 0.4rem;
  }
  .select_star {
    font-size: 1.2rem;
    color: var(--mint);
  }
  .partition {
    width: 1.4px;
    height: 1rem;
    margin: 0 12px;
    background-color: var(--black-300);
  }
`;

const Star = styled.span`
  margin-right: 0.9rem;
  margin-left: 0.2rem;
  padding-bottom: 2px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--black-700);
  .rest {
    margin-left: 0.2rem;
    font-weight: 500;
    color: var(--black-500);
  }
`;

const Selected = styled.span`

  font-size: 0.9rem;
  color: var(--black-400);
`;
const TotalReview = styled.span`

  font-size: 0.9rem;
  color: var(--black-400);
`;
