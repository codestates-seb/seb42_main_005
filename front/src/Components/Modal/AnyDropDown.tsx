import React from "react";
import styled from "styled-components";
import { zIndex_Modal } from "../../Util/z-index";
import { HiXMark } from "react-icons/hi2";
import { TYPE_Working, TYPE_setLike } from "../../Api/TYPES";

interface Props {
  setIsDropDownDown: TYPE_setLike;
  workingHours: TYPE_Working | Array<any> | undefined;
}
export default function AnyDropDown({ setIsDropDownDown, workingHours }: Props) {
  const translate = (day: string) => {
    if (day === "monday") return "월요일";
    if (day === "tuesday") return "화요일";
    if (day === "wednesday") return "수요일";
    if (day === "thursday") return "목요일";
    if (day === "friday") return "금요일";
    if (day === "saturday") return "토요일";
    if (day === "sunday") return "일요일";
    if (day === "holiday") return "공휴일";
  };
  return (
    <DropDownContainer onClick={() => setIsDropDownDown(false)}>
      <CloseBtnContainer>
        <HiXMark id="close" onClick={() => setIsDropDownDown(false)} aria-hidden="true" />
      </CloseBtnContainer>
      {Object.entries(workingHours).map((day, i) => (
        <Unit key={i}>
          <Key>{translate(day[0])}</Key>
          {day[1] ? (
            <Value>{`${day[1].startTime.slice(0, -3)} - ${day[1].endTime.slice(0, -3)}`}</Value>
          ) : (
            <Value>휴무</Value>
          )}
        </Unit>
      ))}
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
  gap: 3px;
  right: 30px;
  bottom: -175px;
  background: var(--black-050);
  box-shadow: var(--bs-lg);
  border-radius: 3px;
  z-index: ${zIndex_Modal.AnyDropDown};
  @media (max-width: 768px) {
    right: 50px;
  }
`;
const CloseBtnContainer = styled.header`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
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
`;
