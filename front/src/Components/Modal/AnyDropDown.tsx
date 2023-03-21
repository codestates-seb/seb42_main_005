import styled from "styled-components";
import { zIndex_Modal } from "../../Util/z-index";
import { HiXMark } from "react-icons/hi2";

interface Props {
  setIsDropDownDown: React.Dispatch<React.SetStateAction<boolean>>;
  pharmDetail: any;
}

export default function AnyDropDown({ setIsDropDownDown, pharmDetail }: Props) {
  // console.log(pharmDetail.operatingTime);
  const week = pharmDetail.operatingTime;
  return (
    <DropDownContainer onClick={() => setIsDropDownDown(false)}>
      <CloseBtnContainer>
        <HiXMark id="close" onClick={() => setIsDropDownDown(false)} aria-hidden="true" />
      </CloseBtnContainer>

      <Unit>
        <Key>월요일</Key>
        <Value>{`${week.monday.startTime} - ${week.monday.endTime}`}</Value>
      </Unit>

      <Unit>
        <Key>화요일</Key>
        <Value>{`${week.tuesday.startTime} - ${week.tuesday.endTime}`}</Value>
      </Unit>

      <Unit>
        <Key>수요일</Key>
        <Value>{`${week.wednesday.startTime} - ${week.wednesday.endTime}`}</Value>
      </Unit>
      <Unit>
        <Key>목요일</Key>
        <Value>{`${week.thursday.startTime} - ${week.thursday.endTime}`}</Value>
      </Unit>
      <Unit>
        <Key>금요일</Key>
        <Value>{`${week.friday.startTime} - ${week.friday.endTime}`}</Value>
      </Unit>
      <Unit>
        <Key>토요일</Key>
        <Value>{`${week.saturday.startTime} - ${week.saturday.endTime}`}</Value>
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
  bottom: -70px;
  right: 30px;
  @media (max-width: 768px) {
    right: 30px;
    bottom: -80px;
  }
  gap: 3px;
  background: var(--black-050);
  box-shadow: var(--bs-lg);
  border-radius: 3px;
  z-index: ${zIndex_Modal.AnyDropDown};
`;
const CloseBtnContainer = styled.header`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-left: 29px;
  margin-bottom: 4px;
  height: 15px;
  width: 146px;
  font-size: 19px;
  color: var(--black-300);
  transition: 0.2s;
  #close:hover {
    color: var(--black-600);
    transition: 0.2s;
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
  width: 130px;
`;
