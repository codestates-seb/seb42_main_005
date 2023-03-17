import styled from "styled-components";
import { zIndex_Modal } from "../../Util/z-index";
import { HiXMark } from "react-icons/hi2";

interface Props {
  setIsDropDownDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnyDropDown({ setIsDropDownDown }: Props) {
  return (
    <DropDownContainer onClick={() => setIsDropDownDown(false)} >
      <CloseBtnContainer>
        <HiXMark id="close" onClick={() => setIsDropDownDown(false)} aria-hidden="true"/>
      </CloseBtnContainer>
      <Unit>
        <Key>월요일</Key>
        <Value>10:00 - 20:00</Value>
      </Unit>
      <Unit>
        <Key>화요일</Key>
        <Value>10:00 - 20:00</Value>
      </Unit>
      <Unit>
        <Key>수요일</Key>
        <Value>10:00 - 20:00</Value>
      </Unit>
      <Unit>
        <Key>목요일</Key>
        <Value>둘째, 넷째주 휴무</Value>
      </Unit>
      <Unit>
        <Key>금요일</Key>
        <Value>10:00 - 20:00</Value>
      </Unit>
      <Unit>
        <Key>토요일</Key>
        <Value>10:00 - 20:00</Value>
      </Unit>
      <Unit>
        <Key>일요일</Key>
        <Value>10:00 - 20:00</Value>
      </Unit>
      <Unit>
        <Key>공휴일</Key>
        <Value>10:00 - 20:00</Value>
      </Unit>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 0;
  bottom: -35px;
  right: 72px;
  @media (max-width: 768px) {
    right: 65px;
  }
  gap: 3px;
  background: white;
  box-shadow: var(--bs-lg);
  border-radius: 3px;
  z-index: ${zIndex_Modal.AnyDropDown};
`;
const CloseBtnContainer = styled.header`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-right: 7px;
  margin-bottom: 2px;
  height: 15px;
  width: 146px;
  font-size: 19px;
  color: var(--black-300);
  transition: 0.2s;
  #close:hover {
    color: var(--black-600);
    transition: 0.2s;
  }
`;
const Unit = styled.article`
  display: flex;
  align-items: center;
`;
const Key = styled.h5`
  width: 45px;
  font-size: 14px;
  font-weight: 500;
  margin-left: 7px;
  color: var(--black-500);
`;
const Value = styled.span`
  font-weight: 400;
  font-size: 14px;
  font-weight: 400;
`;