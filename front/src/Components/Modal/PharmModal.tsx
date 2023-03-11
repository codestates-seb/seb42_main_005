//! 모달 컴포넌트 본 창입니다
import { useState } from "react";
import styled from "styled-components";
import PharmInfo from "./PharmInfo";
import Review from "./Review";

export default function PharmModal() {
  return (
    <>
      <ModalBackDrop>
        <ModalContainer>
          <PharmInfo />
          <Review />
        </ModalContainer>
      </ModalBackDrop>
    </>
  );
}

const ModalBackDrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--modal-backdrop);
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 940px;
  background-color: var(--white);
  border-radius: 10px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 700px;
    width: 500px;
    overflow-y: scroll;
    background-color: var(--white);
    border-radius: 10px;
    ::-webkit-scrollbar-track {
      width: 0.6rem;
      visibility: visible;
      border-radius: 0 10px 10px 0;
    }
    :-webkit-scrollbar-thumb {
      width: 0.6rem;
      visibility: visible;
    }
  }
`;
