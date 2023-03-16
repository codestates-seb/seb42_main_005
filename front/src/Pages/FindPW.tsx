import styled from "styled-components";
import Button from "../Components/Ul/Button";
import Input from "../Components/Ul/Input";

export default function FindPW() {
  return (
    <Wrapper>
      <LogoContainer>
        <img alt="logo" src="Images/Logo.png" />
        <h1>Medi-Map</h1>
      </LogoContainer>
      <Container>
        <Instruction>
          <p>가입시 입력했던 이메일을 입력해주세요.</p>
          <br />
          <p>입력시 해당 이메일로 임시 비밀번호가 전송됩니다.</p>
        </Instruction>
        <InputContainer>
          <Input />
        </InputContainer>
        <ButtonContainer>
          <Button color="blue" size="lg" text="입력" />
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  border: 1px solid green;
  /*  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-bottom: 100px;
`;
const LogoContainer = styled.header`
  border: 1px solid red;
  /*  */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  img {
    padding-right: 1rem;
    width: 3.5rem;
    height: 3rem;
  }
`;
const Container = styled.section`
  border: 1px solid gainsboro;
  /*  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 420px;
  border-radius: 18px;
  box-shadow: var(--bs-lg);
  border: 1px solid var(--black-100);
`;
const Instruction = styled.h2`
  border: 1px solid khaki;
  /*  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 15px;
  font-size: 18px;
`;
const InputContainer = styled.section`
  border: 1px solid firebrick;
  /*  */
  margin: 20px 0px;
  width: 350px;
`;
const ButtonContainer = styled.footer`
  border: 1px solid firebrick;
  /*  */
  display: flex;
  justify-content: center;
  width: 350px;
`;
