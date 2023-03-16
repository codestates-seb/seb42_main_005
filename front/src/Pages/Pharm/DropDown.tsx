import { useState } from "react";
import styled from "styled-components";

export default function DropDown() {
  return (
    <DropDownContainer onClick={(event) => event.stopPropagation()}>
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
  align-items: center;
  top: 24px;
  gap: 4px;
  height: 200px;
  width: 170px;
  background: white;
  box-shadow: var(--bs-lg);
  border-radius: 3px;
  @media (max-width: 768px) {
    left: -25px
  }
`;
const Unit = styled.article`
  display: flex;
  align-items: center;
  width: 150px;
`;
const Key = styled.h5`
  width: 45px;
  font-size: 15px;
  font-weight: 600;
  color: var(--black-600);
`;
const Value = styled.span`
  font-weight: 400;
  font-size: 15px;
`;
