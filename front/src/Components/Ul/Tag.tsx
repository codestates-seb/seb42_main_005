//태그들 => 영재님이 함!! 쓰지마!!!
import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <Tags>
      <Tag>친절해요</Tag>
      <Tag>주차가능</Tag>
      <Tag>꼼꼼해요</Tag>
    </Tags>
  );
}

const Tags = styled.ul`
  display: flex;
  justify-content: flex-start;
`;
const Tag = styled.li`
  list-style: none;
  border: 4px solid var(--blue-400);
  border-radius: 30px;
  margin-right: 20px;
  padding: 4px;
  font-size: 15px;
  color: var(--blue-400);
  :hover {
    background-color: var(--blue-100);
  }
`;
