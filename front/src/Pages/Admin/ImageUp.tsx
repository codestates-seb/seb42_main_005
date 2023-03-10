import styled from "styled-components";

interface Props {
  isImgUp: boolean;
  setIsImgUp: React.Dispatch<React.SetStateAction<boolean>>;
  imgUrl: string;
}

export default function PharmDetail({ isImgUp, setIsImgUp, imgUrl }: Props) {
  return (
    <>
      <ModalBackDrop onClick={() => setIsImgUp(!isImgUp)}>
        <Container>
          <span onClick={() => setIsImgUp(!isImgUp)}>닫기</span>
          <Img src={`${imgUrl}`} onClick={(event) => event.stopPropagation()}></Img>
        </Container>
      </ModalBackDrop>
    </>
  );
}

const ModalBackDrop = styled.section`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: var(--modal-backdrop);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span {
    cursor: pointer;
    color: var(--white);
    font-size: 20px;
    border-radius: 50%;
  }
`;
const Img = styled.img`
  height: 600px;
  width: 400px;
  object-fit: cover;
  border-radius: 5px;
`;
