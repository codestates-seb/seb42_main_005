import styled from "styled-components";

interface SortProps {
  sorted: string;
  onClickDistance?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClickReviewCount?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClickRating?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export default function SortButtons({ sorted, onClickDistance, onClickReviewCount, onClickRating }: SortProps) {
  return (
    <SortContainer>
      <ButtonSort title={"distance"} sorted={sorted} onClick={onClickDistance}>
        <span className="label">가까운순</span>
      </ButtonSort>
      <span className="partition" />
      <ButtonSort title={"reviewCount"} sorted={sorted} onClick={onClickReviewCount}>
        <span className="label">리뷰많은순</span>
      </ButtonSort>
      <span className="partition" />
      <ButtonSort title={"rating"} sorted={sorted} onClick={onClickRating}>
        <span className="label">별점높은순</span>
      </ButtonSort>
    </SortContainer>
  );
}
const SortContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .partition {
    width: 1.4px;
    height: 0.9rem;
    margin: 0 15px;
    background-color: var(--black-300);
  }
`;
const ButtonSort = styled.button<{ title: string; sorted: string }>`
  cursor: pointer;
  border: none;
  background-color: var(--white);
  font-size: 0.9rem;
  transition: 0.2s;
  .label {
    align-items: center;
    font-size: 0.75rem;
    font-weight: ${({ title, sorted }) => (title === sorted ? "500" : "400")};
    color: ${({ title, sorted }) => (title === sorted ? "var(--blue-500)" : "var(--black-300)")};
    transition: 0.2s;
    &:hover {
      color: var(--blue-400);
      transition: 0.2s;
    }
  }
`;
