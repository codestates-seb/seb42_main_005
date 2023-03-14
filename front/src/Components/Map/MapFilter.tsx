import { useState } from "react";
import styled from "styled-components";
import { IoCloudyNightOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { RiHeartsLine } from "react-icons/ri";

// interface Selected {
//   current?: string;
// }
// { current }: Selected
interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<"map_home" | "in_business" | "midnight" | "bookmarks">>;
}

export default function MapFilter({ selected, setSelected }: Props) {
  return (
    <CtrlContainer>
      <FillterBtn title={"map_home"} selected={selected} onClick={() => setSelected("map_home")}>
        <HiOutlineHome className="icon" />
        <div className="text">지도 홈</div>
      </FillterBtn>
      <span className="partition" />
      <FillterBtn title={"in_business"} selected={selected} onClick={() => setSelected("in_business")}>
        <AiOutlineMedicineBox className="icon" />
        <div className="text">영업 중</div>
      </FillterBtn>
      <span className="partition" />
      <FillterBtn title={"midnight"} selected={selected} onClick={() => setSelected("midnight")}>
        <IoCloudyNightOutline className="icon" />
        <div className="text">심 야</div>
      </FillterBtn>
      <span className="partition" />
      <FillterBtn title={"bookmarks"} selected={selected} onClick={() => setSelected("bookmarks")}>
        <RiHeartsLine className="icon" />
        <div className="text">찜 콩</div>
      </FillterBtn>
    </CtrlContainer>
  );
}
const CtrlContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  top: 70px;
  left: 850px;
  padding: 6px 10px 4px 10px;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: var(--bs-lg);
  transition: 0.2s;
  .partition {
    width: 1.2px;
    height: 48px;
    margin: 0 10px;
    background-color: var(--black-100);
  }
  @media (max-width: 1200px) {
    left: 650px;
    transition: 0.2s;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    left: 490px;
    padding: 10px 6px 10px 6px;
    transition: 0.2s;
    .partition {
      width: 50px;
      height: 1.2px;
      margin: 10px 0 6px 0;
      background-color: var(--black-100);
    }
  }
`;
const FillterBtn = styled.span<{ title: string; selected: string }>`
  cursor: pointer;
  display: block;
  width: 65px;
  height: 65px;
  text-align: center;
  .icon {
    align-items: center;
    font-size: 2.6rem;
    color: ${({ title, selected }) => (title === selected ? "var(--blue-400)" : "var(--blue-200)")};
    transition: 0.2s;
  }
  .text {
    align-items: center;
    font-size: 0.75rem;
    color: var(--black-300);
    transition: 0.2s;
  }
  &:hover {
    .icon {
      color: var(--blue-500);
      font-size: 2.65rem;
      transition: 0.2s;
    }
    .text {
      color: var(--black-500);
      font-size: 0.77rem;
      transition: 0.2s;
    }
  }
`;
