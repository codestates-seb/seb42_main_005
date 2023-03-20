//홈화면 옆에 약국 리스트
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import PharmItem from "./PharmItem";
import { zIndex_PharmList } from "../../Util/z-index";
import { BsSearch } from "react-icons/bs";
import { RiHomeLine } from "react-icons/ri";
import { VscTriangleLeft } from "react-icons/vsc";
import { SELECT_HIDDEN } from "../../Util/type";

interface Props {
  hidden: SELECT_HIDDEN;
  setHidden: Dispatch<SetStateAction<SELECT_HIDDEN>>;
}
//데이터 들어오면 map으로 돌리기전에 하드코딩으로 두개해놨음
export default function PharmLists({ hidden, setHidden }: Props) {
  /* 조건부로 할려고 임의로 해놓은 것!
  나중에 데이터 넘어오면 바꿀것*/

  return (
    <ContainerList className={hidden ? "hide" : ""}>
      <ContainerWrap className={hidden ? "" : "hide"}>
        <ContainerEmpty>
          <span className="partition" />
        </ContainerEmpty>
        <PharmList>
          <h2 hidden>약국 리스트</h2>
          <ListHead>
            <SearchContainer>
              <div>
                <BsSearch className="searchIcon" aria-hidden="true" />
              </div>
              <label htmlFor="search box" />
              <SearchInput id="search box" placeholder="약국 검색.." />
              {hidden ? (
                <ButtonShow className="folded">
                  <VscTriangleLeft className={hidden ? "open" : ""} onClick={() => setHidden(false)} />
                </ButtonShow>
              ) : (
                <ButtonShow className="folded">
                  <VscTriangleLeft className={hidden ? "" : "close"} onClick={() => setHidden(true)} />
                </ButtonShow>
              )}
            </SearchContainer>
            <ButtonContainer>
              <ButtonMyPlace>
                <RiHomeLine className="logo" />
                <span className="my_place">우리 약국</span>
              </ButtonMyPlace>
              <SortContainer>
                <ButtonSort>가까운순</ButtonSort>
                <span className="partition" />
                <ButtonSort>리뷰많은순</ButtonSort>
                <span className="partition" />
                <ButtonSort>별점높은순</ButtonSort>
              </SortContainer>
            </ButtonContainer>
          </ListHead>
          <ListBody>
            <PharmItem />
            <PharmItem />
            <PharmItem />
            <PharmItem />
            <PharmItem />
          </ListBody>
        </PharmList>
      </ContainerWrap>
    </ContainerList>
  );
}

//전체 컨테이너
const ContainerList = styled.aside`
  position: absolute;
  top: 50px;
  left: 0;
  width: 34rem;
  height: calc(100vh - 50px);
  padding: 1.5rem 0 1rem 1.5rem;
  border-radius: 0 15px 15px 0;
  border-top: 1px solid var(--black-150);
  border-right: 1px solid var(--black-150);
  border-bottom: 1px solid var(--black-150);
  background-color: var(--white);
  box-shadow: var(--bs-lg);
  transition: 0.2s;
  &.hide {
    transform: translate(-500px, 0px);
  }
  @media (max-width: 768px) {
    width: 33rem;
    transition: 0.2s;
    &.hide {
      transform: translate(-480px, 0px);
    }
  }
  z-index: ${zIndex_PharmList.ListContainer};
`;
const ContainerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ContainerEmpty = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1 1 0;
  margin-right: 30px;
  &.folded {
    margin-right: 0;
  }
  .partition {
    width: 14px;
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px inset, rgba(0, 0, 0, 0.1) 0px 7px 13px -3px inset,
      rgba(0, 0, 0, 0.1) 0px -3px 0px, hsl(0, 0%, 100%, 0.1) 0 1px 0 0;
    transition: 0.2s;
    @media (max-width: 768px) {
      transition: 0.2s;
    }
  }
`;
const PharmList = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
`;
const ListHead = styled.header`
  margin-bottom: 10px;
  transition: 0.2s;
  @media (max-width: 768px) {
    transition: 0.2s;
  }
`;
const ListBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 135px);
  overflow-y: scroll;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 2px 2px 4px inset, rgba(0, 0, 0, 0.05) 0px 7px 7px -3px inset,
    rgba(0, 0, 0, 0.05) 0px -7px 7px -3px inset;
`;

//input
const SearchContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  .searchIcon {
    position: absolute;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin: 0.8rem;
    opacity: 0.4;
  }
`;
const SearchInput = styled.input`
  width: 26rem;
  height: 3rem;
  margin-right: 5px;
  padding-left: 2.8rem;
  border: 3px solid var(--blue-300);
  border-radius: 10px;
  outline: none;
  font-size: 1.1rem;
  transition: 0.2s;
  :focus {
    border-color: var(--blue-400);
    box-shadow: var(--wrapped-shadow);
    transition: 0.2s;
  }
`;
const ButtonShow = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  margin: 3px 5px 0 5px;
  border: none;
  background-color: transparent;
  font-size: 40px;
  font-weight: 600;
  color: var(--black-100);
  transition: 0.2s;
  :hover {
    color: var(--black-300);
    transition: 0.2s;
  }
  .close {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in;
  }
  .open {
    transform: rotate(-180deg);
    transition: transform 0.3s ease-in;
  }
`;
//Buttons
const ButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 25px 60px 3px 5px;
`;
//우리약국 가기
const ButtonMyPlace = styled.button`
  cursor: pointer;
  all: unset;
  margin-right: 88px;
  font-size: 1rem;
  color: var(--blue-400);
  transition: 0.2s;
  .logo {
    margin-right: 0.2rem;
    font-size: 1.1rem;
    vertical-align: -2px;
    transition: 0.2s;
  }
  :hover {
    font-weight: 600;
    color: var(--blue-600);
    transition: 0.2s;
  }
`;
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
const ButtonSort = styled.button`
  cursor: pointer;
  border: none;
  background-color: var(--white);
  font-size: 0.9rem;
  color: var(--black-350);
  transition: 0.2s;
  &:hover {
    color: var(--blue-500);
    transition: 0.2s;
  }
`;
