//! 모달 컴포넌트 본 창입니다
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
  height: 550px;
  width: 780px;
  background-color: var(--white);
  border-radius: 10px;
`;
