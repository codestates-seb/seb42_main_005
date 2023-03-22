import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <WrapperSearch>
      <label htmlFor="search box" />
      <InputSearch id="search box" placeholder="약국 검색.." />
      <ButtonSearch>
        <BsSearch className="searchIcon" aria-hidden="true" />
      </ButtonSearch>
    </WrapperSearch>
  );
}
const WrapperSearch = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 5px;
`;
const ButtonSearch = styled.button`
  position: absolute;
  top: 3px;
  right: 2.9px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  height: 2.45rem;
  border: none;
  border-radius: 0 6.3px 6.3px 0;
  background-color: var(--blue-300);
  transition: 0.2s;
  .searchIcon {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--white);
  }
  :hover {
    background-color: var(--blue-400);
    transition: 0.2s;
  }
`;
const InputSearch = styled.input`
  flex: 1 1 0;
  width: 26rem;
  height: 2.8rem;
  padding-right: 3.5rem;
  padding-left: 1rem;
  border: none;
  border: 3px solid var(--blue-300);
  border-radius: 10px;
  font-size: 1.1rem;
  text-overflow: ellipsis;
  transition: 0.2s;
  :focus {
    border-color: var(--blue-400);
    box-shadow: var(--wrapped-shadow);
    transition: 0.2s;
  }
`;
