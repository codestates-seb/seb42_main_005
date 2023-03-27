import styled from "styled-components";
import React from "react";
import { zIndex_MyPage } from "../../Util/z-index";
import { HiXMark } from "react-icons/hi2";
import { TYPE_Working, TYPE_setLike } from "../../Api/TYPES";

interface Props {
  setIsDropDownDown: TYPE_setLike;
  workingHours: TYPE_Working | undefined;
}

export default function DropDown({ setIsDropDownDown, workingHours }: Props) {
  return (
    <DropDownContainer onClick={(event) => event.stopPropagation()}>
      <CloseBtnContainer>
        <HiXMark id="close" onClick={() => setIsDropDownDown(false)} aria-hidden="true" />
      </CloseBtnContainer>
      <Unit>
        <Key>월요일</Key>
        {workingHours?.monday ? (
          <Value>{`${workingHours.monday.startTime.slice(0, -3)} - ${workingHours.monday.endTime.slice(0, -3)}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
      </Unit>
      <Unit>
        <Key>화요일</Key>
        {workingHours?.tuesday ? (
          <Value>{`${workingHours.tuesday.startTime.slice(0, -3)} - ${workingHours.tuesday.endTime.slice(
            0,
            -3,
          )}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
      </Unit>
      <Unit>
        <Key>수요일</Key>
        {workingHours?.wednesday ? (
          <Value>{`${workingHours.wednesday.startTime.slice(0, -3)} - ${workingHours.wednesday.endTime.slice(
            0,
            -3,
          )}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
      </Unit>
      <Unit>
        <Key>목요일</Key>
        {workingHours?.thursday ? (
          <Value>{`${workingHours.thursday.startTime.slice(0, -3)} - ${workingHours.thursday.endTime.slice(
            0,
            -3,
          )}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
      </Unit>
      <Unit>
        <Key>금요일</Key>
        {workingHours?.friday ? (
          <Value>{`${workingHours.friday.startTime.slice(0, -3)} - ${workingHours.friday.endTime.slice(0, -3)}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
      </Unit>
      <Unit>
        <Key>토요일</Key>
        {workingHours?.saturday ? (
          <Value>{`${workingHours.saturday.startTime.slice(0, -3)} - ${workingHours.saturday.endTime.slice(
            0,
            -3,
          )}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
      </Unit>
      <Unit>
        <Key>일요일</Key>
        {workingHours?.sunday ? (
          <Value>{`${workingHours.sunday.startTime.slice(0, -3)} - ${workingHours.sunday.endTime.slice(0, -3)}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
      </Unit>
      <Unit>
        <Key>공휴일</Key>
        {workingHours?.holiday ? (
          <Value>{`${workingHours.holiday.startTime.slice(0, -3)} - ${workingHours.holiday.endTime.slice(
            0,
            -3,
          )}`}</Value>
        ) : (
          <Value>휴무</Value>
        )}
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
  padding: 8px 5px;
  gap: 3px;
  top: 24px;
  background: var(--black-050);
  box-shadow: var(--bs-lg);
  border-radius: 3px;
  z-index: ${zIndex_MyPage.DropDown};
  @media (max-width: 768px) {
    left: -25px;
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
  margin-left: 5px;
  color: var(--black-600);
`;
const Value = styled.span`
  font-weight: 400;
  font-size: 15px;
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
