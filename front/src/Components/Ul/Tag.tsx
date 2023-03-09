import styled from "styled-components";

interface TagProps {
  idx: number;
  list?: string[];
}

export default function Tag({ idx, list }: TagProps) {
  list = ["친절한 서비스", "꼼꼼한 복약지도", "주차가능", "접근성이 좋음"];

  return <StyledTag>{list[idx]}</StyledTag>;
}

const StyledTag = styled.button`
  text-decoration: none;
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem 0.2rem 0.5rem;
  border-radius: 20px;
  display: inline-block;
  border: 1.6px solid var(--tag-stroke);
  background-color: var(--white);
  color: var(--tag-text);
  white-space: nowrap;
  transition: 0.2s;
  :hover {
    border: 1.6px solid var(--tag-stroke-hover);
    color: var(--tag-text-hover);
    transition: 0.2s;
  }
`;
