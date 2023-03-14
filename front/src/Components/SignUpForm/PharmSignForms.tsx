import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../Ul/Button";
import PharmAddress from "./PharmAddress";
import SignUpInput from "./SignUpInput";
import { Validate } from "./Validation";

//!  name, address, email, password
export default function PharmSignForms() {
  const [businessImg, setBusinessImg] = useState<string>("");
  const [pharmImg, setPharmImg] = useState<string>("");
  const [businessImgFile, setbusinessImgFile] = useState<File | null>(null);
  const [pharmImgFile, setPharmImgFile] = useState<File | null>(null);
  //나중에 파일 넘겨줄때 businessImgFile, pharmImgFile 넘겨주면 돼!

  const [pSignForm, setpSignForms] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });
  const [error, setError] = useState({
    email: true,
    password: true,
    name: true,
  });

  const [checks, setChecks] = useState(false);

  const { email, password, name, address } = pSignForm;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let errors = false;
    const { name, value } = e.target;
    setpSignForms({
      ...pSignForm,
      [name]: value,
    });

    if (name === "email") {
      errors = Validate.emailValidation(value);
    }
    if (name === "password") {
      errors = Validate.passwordValidation(value);
    }
  };

  const BusinessImg = useRef<HTMLInputElement>(null);
  const PharmImg = useRef<HTMLInputElement>(null);
  const onClickBusinessImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    BusinessImg.current?.click();
  };

  const onClickPharmImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    PharmImg.current?.click();
  };

  return (
    <Container>
      <SignUpForm>
        <InputContainer className={`${error.email ? "error" : "success"}`}>
          <img alt="person" src="Images/person-outline.png" />
          <SignUpInput
            type={"email"}
            name={"email"}
            placeholder={"이메일을 입력하세요."}
            value={email}
            onChange={onChange}
            Error={error.email}
            ErrorText={"이메일 형식이 올바르지 않습니다."}
          />
        </InputContainer>
        <InputContainer>
          <img alt="lock" src="Images/LockPersonOutline.png" />
          <SignUpInput
            type={"password"}
            name={"password"}
            placeholder={"비밀번호를 입력하세요."}
            value={password}
            onChange={onChange}
            Error={error.password}
            ErrorText={"비밀번호는 문자 숫자 특수문자 조합 8자 이상으로 조합해주세요."}
          />
        </InputContainer>
        <InputContainer>
          <img alt="person-pencil" src="Images/person-pencil .png" />
          <SignUpInput
            type={"text"}
            name={"name"}
            placeholder={"닉네임을 입력하세요."}
            value={name}
            onChange={onChange}
            Error={error.name}
            ErrorText={"이름에는 공백이 들어갈 수 없습니다."}
          />
        </InputContainer>
        <InputContainer>
          <img alt="live" src="Images/whereyoulive.png" />
          <SignUpInput
            type={"text"}
            name={"address"}
            placeholder={"주소를 입력하세요."}
            value={address as string}
            onChange={onChange}
          />
          <PharmAddress setpSignForms={setpSignForms} />
        </InputContainer>
        <InputContainer>
          <img alt="camera" src="Images/camera.png" />
          <ImgInput value={businessImg} placeholder="사업자 등록증을 올려주세요" />
          <div className="photo_upload">
            <Button color="l_blue" size="sm" text="사진업로드" onClick={onClickBusinessImg} />
          </div>
          <Img
            type="file"
            ref={BusinessImg}
            name="fileName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.files && setBusinessImg(e.target.files[0].name);
              e.target.files && setbusinessImgFile(e.target.files[0]);
            }}
          />
        </InputContainer>

        <InputContainer>
          <img alt="camera" src="Images/camera.png" />
          <ImgInput value={pharmImg} placeholder="약사면허증 사진을 올려주세요" />
          <div className="photo_upload">
            <Button color="l_blue" size="sm" text="사진업로드" onClick={onClickPharmImg} />
          </div>
          <Img
            type="file"
            ref={PharmImg}
            name="fileName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.files && setPharmImg(e.target.files[0].name);
              e.target.files && setPharmImgFile(e.target.files[0]);
            }}
          />
        </InputContainer>
        <CheckContainer>
          <Check type="checkbox" />
          <span className="checkbox_content">
            회원가입시, 사용자의 현재 위치를 사용하는 것에 동의하는 것으로 간주됩니다.
          </span>
        </CheckContainer>
        <button className="signup_button">회원가입</button>
      </SignUpForm>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
  width: 40rem;
  border: 1px solid var(--black-200);
  border-top: none;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: 0 1px 4px -3px hsla(0, 0%, 0%, 0.09), 0 3px 8px -3px hsla(0, 0%, 0%, 0.1),
    0 4px 13px -3px hsla(0, 0%, 0%, 0.13);
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .signup_button {
    background-color: var(--blue-500);
    border: none;
    width: 15rem;
    height: 2.8rem;
    font-size: 1.1rem;
    color: var(--white);
    margin: auto;
    margin-top: 1rem;
    border-radius: 7px;
    box-shadow: var(--bs-md);
    &:hover {
      background-color: var(--blue-400);
    }
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid var(--black-150);
  border-radius: 10px;
  box-shadow: var(--bs-sm);
  margin-bottom: 1.5rem;
  img {
    display: flex;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding-top: 0.2rem;
    margin-top: 0.2rem;
    margin-left: 0.4rem;
  }
  .photo_upload {
    padding: 0.7rem 0.8rem;
  }
  .adress_find {
    padding-top: 0.7rem;
    padding-left: 1.2rem;
  }
  &.success &:focus-within {
    box-shadow: var(--wrapped-shadow);
  }
  &.error &:focus-within {
    box-shadow: var(--wrapped-shadow-red);
  }
`;

const ImgInput = styled.input`
  width: 27rem;
  height: 2.7rem;
  outline: none;
  font-size: 1.1rem;
  padding-left: 0.5rem;
  border: none;
  color: var(--black-500);
  text-overflow: ellipsis;
`;
const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  .checkbox_content {
    color: var(--black-500);
  }
`;

const Check = styled.input`
  cursor: pointer;
  appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid var(--black-100);
  box-shadow: var(--bs-btn);
  margin-right: 0.6rem;
  padding-left: 1rem;
  border-radius: 3.5px;
  transition: 0.1s;
  :active {
    box-shadow: var(--bs-btn-click);
    transition: 0.1s;
  }
  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 130% 130%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--blue-400);
    transition: 0.1s;
  }
`;
const Img = styled.input`
  display: none;
`;
