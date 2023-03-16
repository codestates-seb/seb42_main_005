import styled from "styled-components";
import { zIndex_MapFilter } from "../../Util/z-index";
import { IoCloudyNightOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { RiHeartsLine } from "react-icons/ri";

interface FilterProps {
  selected: string;
  onClickMapHome?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClickInBusiness?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClickMidnight?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClickBookmarks?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export default function MapFilter({
  selected,
  onClickMapHome,
  onClickInBusiness,
  onClickMidnight,
  onClickBookmarks,
}: FilterProps) {
  return (
    <CtrlContainer>
      <FillterBtn title={"map_home"} selected={selected} onClick={onClickMapHome}>
        <HiOutlineHome className="icon" />
        <div className="label">지도 홈</div>
      </FillterBtn>
      <span className="partition" />
      <FillterBtn title={"in_business"} selected={selected} onClick={onClickInBusiness}>
        <AiOutlineMedicineBox className="icon" />
        <div className="label">영업 중</div>
      </FillterBtn>
      <span className="partition" />
      <FillterBtn title={"midnight"} selected={selected} onClick={onClickMidnight}>
        <IoCloudyNightOutline className="icon" />
        <div className="label">심 야</div>
      </FillterBtn>
      <span className="partition" />
      <FillterBtn title={"bookmarks"} selected={selected} onClick={onClickBookmarks}>
        <RiHeartsLine className="icon" />
        <div className="label">찜 콩</div>
      </FillterBtn>
    </CtrlContainer>
  );
}
const CtrlContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 70px;
  left: 850px;
  z-index: ${zIndex_MapFilter.CtrlContainer};
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
const FillterBtn = styled.button<{ title: string; selected: string }>`
  cursor: pointer;
  display: block;
  width: 65px;
  height: 65px;
  text-align: center;
  background-color: transparent;
  border: none;
  .icon {
    align-items: center;
    font-size: 2.6rem;
    color: ${({ title, selected }) => (title === selected ? "var(--blue-500)" : "var(--blue-200)")};
    transition: 0.2s;
  }
  .label {
    align-items: center;
    font-size: 0.75rem;
    font-weight: ${({ title, selected }) => (title === selected ? "700" : "400")};
    color: ${({ title, selected }) => (title === selected ? "var(--black-500)" : "var(--black-200)")};
    transition: 0.2s;
  }
  &:hover {
    .icon {
      color: var(--blue-400);
      font-size: 2.62rem;
      transition: 0.2s;
    }
    .label {
      color: var(--black-400);
      font-size: 0.76rem;
      transition: 0.2s;
    }
  }
`;
