import { useDaumPostcodePopup } from "react-daum-postcode";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UserInstance, postUserImg, BaseInstance } from "../../Api/AxiosInstance";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { validators } from "../../Components/SignUpForm/Validation";
import { onUpload } from "../../Api/onUpload";
import SignUpInput from "../../Components/SignUpForm/SignUpInput";
import InputAlert from "./InputAlert";
import Button from "../../Components/Ul/Button";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { TYPE_UserInfo } from "../../Api/TYPES";
import { APIS } from "../../Api/APIs";
import { get } from "../../Redux/slice/userSlice";
import axios from "axios";
import { getLocalStorage } from "../../Api/localStorage";

interface Props {
  scriptUrl?: string;
}

export default function MyInfoInformation({ scriptUrl }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [imgFile, setImgFlie] = useState<File | Blob | string>("");
  const [myAddress, setMyAddress] = useState("");
  const [myName, setMyName] = useState("");
  const [myInfo, setMyInfo] = useState<TYPE_UserInfo>({
    createdAt: "",
    name: "",
    email: "",
    address: "",
  });
  const [signForm, setSignForms] = useState({
    name: myInfo.name,
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    address: myInfo.address,
  });
  const [error, setError] = useState({
    name: false,
    password: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const user = useAppSelector((state) => {
    return state.userInfo.response;
  });

  //! GET : 유저 정보
  useEffect(() => {
    UserInstance.getUserInfo(user.userIdx, setMyInfo, setMyName, setMyAddress);
  }, []);

  const FORM_FIELD_NAMES = {
    NAME: "name",
    PASSWORD: "password",
    NEWPASSWORD: "newPassword",
    CONFIRMNEWPASSWORD: "confirmNewPassword",
    ADDRESS: "address",
  } as const;

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMyName(value);
    setSignForms({
      ...signForm,
      [name]: value,
    });
    let errors;
    if (name === FORM_FIELD_NAMES.NAME) {
      errors = validators.validateName(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changeAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMyAddress(value);
    setSignForms({
      ...signForm,
      [name]: value,
    });
  };

  const changeNowPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });
    let errors;
    if (name === FORM_FIELD_NAMES.PASSWORD) {
      errors = validators.validatePassword(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changeNewPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });

    let errors;
    if (name === FORM_FIELD_NAMES.NEWPASSWORD) {
      errors = validators.validatePassword(value);
    }

    setError({
      ...error,
      [name]: errors,
    });
  };

  const changeNewConfirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignForms({
      ...signForm,
      [name]: value,
    });
    let errors;
    if (name === FORM_FIELD_NAMES.CONFIRMNEWPASSWORD) {
      errors = validators.validatePasswordCheck(signForm.newPassword, value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setSignForms((prev) => ({ ...prev, address: fullAddress }));
    setMyAddress(fullAddress);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    open({ onComplete: handleComplete });
    e.preventDefault();
  };

  //! PATCH : 회원정보 수정
  const onSubmit: any = async (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get(FORM_FIELD_NAMES.PASSWORD);
    const name = formData.get(FORM_FIELD_NAMES.NAME);
    const address = formData.get(FORM_FIELD_NAMES.ADDRESS);
    const newPassword = formData.get(FORM_FIELD_NAMES.NEWPASSWORD);
    const confirmNewPassword = formData.get(FORM_FIELD_NAMES.CONFIRMNEWPASSWORD);
    if (!password || !name || !address) {
      return alert("필수값을 입력해주세요");
    }
    if (
      error.password === true ||
      error.name === true ||
      error.newPassword === true ||
      error.confirmNewPassword === true
    ) {
      return alert("항목을 다시 확인해주세요");
    }
    if (newPassword !== confirmNewPassword) {
      return alert("새 비밀번호를 한번 더 입력해주세요");
    }
    const newUserData = {
      name: name,
      address: address,
      password: password,
      newPassword: newPassword,
    };
    await UserInstance.patchUserInfo(user.userIdx, newUserData, setIsEditing);
    await UserInstance.getUserInfo(user.userIdx, setMyInfo, setMyName, setMyAddress);
  };

  const dispatch = useAppDispatch();
  let token = getLocalStorage("access_token");
  const API = import.meta.env.VITE_APP_API_URL;
  useEffect(() => {
    const userNewInfo = async () => {
      try {
        const response = await axios.get(`${API}${APIS.GET_USER_INFO}/${user.userIdx}`, {
          headers: { Authorization: token },
        });
        dispatch(get(response.data.response));
      } catch (error) {
        console.log(error);
      }
    };
    userNewInfo();
  }, []);

  //! POST : 유저 이미지 업로드
  const submitUserImg = (e: any) => {
    e.preventDefault();
    const formDataImgsubmit = new FormData();
    formDataImgsubmit.append("profileImage", imgFile);
    formDataImgsubmit.append("userIdx", new Blob([JSON.stringify(user.userIdx)], { type: "application/json" }));
    postUserImg(formDataImgsubmit);
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <ImgContainer>
        <ReviewImgInput
          name="reviewImg"
          id="img"
          type="file"
          onChange={(e) => onUpload(e, setImgFlie, setImageSrc)}
          accept="image/*"
        ></ReviewImgInput>
        {imageSrc ? (
          <ReviewImg src={`${imageSrc}`} />
        ) : myInfo.imagePath ? (
          <ReviewImg src={`${myInfo.imagePath}`} />
        ) : (
          <ReviewImg src="Images/User.png" alt="user" />
        )}
        {imageSrc ? (
          <Label onClick={(e: any) => submitUserImg(e)} className="mint">
            <MdOutlineAddAPhoto aria-hidden="true" />
            사진수정완료
          </Label>
        ) : (
          <Label htmlFor="img">
            <MdOutlineAddAPhoto aria-hidden="true" />
            사진수정하기
          </Label>
        )}
      </ImgContainer>
      <Content>
        <ContentSet>
          <ContentKey>가입일</ContentKey>
          <ContentValue>{new Date(myInfo.createdAt).toLocaleDateString()}</ContentValue>
        </ContentSet>
        <ContentSet>
          <ContentKey>닉네임</ContentKey>
          {isEditing ? (
            <EditWrapper>
              <InputWrapper className={`${error.name ? "error" : ""}`}>
                <SignUpInput
                  type={"text"}
                  name={FORM_FIELD_NAMES.NAME}
                  placeholder={"닉네임을 입력하세요."}
                  value={myName}
                  onChange={changeNameHandler}
                />
              </InputWrapper>
              <InputAlert value={signForm.name} />
              <AlertMsg className={`${error.name ? "error" : ""}`}>
                <AiOutlineExclamationCircle aria-hidden="true" />
                이름에는 공백이 들어갈 수 없습니다.
              </AlertMsg>
            </EditWrapper>
          ) : (
            <ContentValue>{myInfo.name}</ContentValue>
          )}
        </ContentSet>
        <ContentSet>
          <ContentKey>email</ContentKey>
          <ContentValue>{myInfo.email}</ContentValue>
        </ContentSet>
        <ContentSet>
          <ContentKey>주소</ContentKey>
          {isEditing ? (
            <InputWrapper>
              <SignUpInput
                readOnly
                type={"text"}
                name={FORM_FIELD_NAMES.ADDRESS}
                placeholder={"주소를 입력하세요."}
                value={myAddress}
                onChange={changeAddressHandler}
              />
              <Button
                color="l_blue"
                size="sm"
                text="주소 찾기"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e)}
              />
            </InputWrapper>
          ) : (
            <ContentValue>{myInfo.address}</ContentValue>
          )}
        </ContentSet>
        {isEditing ? (
          <>
            <ContentSet>
              <ContentKey>비밀번호</ContentKey>
              <EditWrapper>
                <InputWrapper className={`${error.password ? "error" : null}`}>
                  <SignUpInput
                    type={"password"}
                    name={FORM_FIELD_NAMES.PASSWORD}
                    placeholder={"현재 비밀번호를 입력하세요."}
                    value={signForm.password}
                    onChange={changeNowPasswordHandler}
                  />
                </InputWrapper>
                <InputAlert value={signForm.password} />
                <AlertMsg className={`${error.password ? "error" : null}`}>
                  <AiOutlineExclamationCircle aria-hidden="true" />
                  비밀번호가 일치하지 않습니다.
                </AlertMsg>
              </EditWrapper>
            </ContentSet>
            <ContentSet>
              <ContentKey></ContentKey>
              <EditWrapper>
                <InputWrapper className={`${error.newPassword ? "error" : null}`}>
                  <SignUpInput
                    type={"password"}
                    name={FORM_FIELD_NAMES.NEWPASSWORD}
                    placeholder={"새 비밀번호를 입력하세요."}
                    value={signForm.newPassword}
                    onChange={changeNewPasswordHandler}
                  />
                </InputWrapper>
                <AlertMsg className={`${error.newPassword ? "error" : null}`}>
                  <AiOutlineExclamationCircle aria-hidden="true" />
                  문자 숫자 특수문자 조합 8자 이상으로 조합으로 입력해주세요.
                </AlertMsg>
              </EditWrapper>
            </ContentSet>
            <ContentSet>
              <ContentKey></ContentKey>
              <EditWrapper>
                <InputWrapper className={`${error.confirmNewPassword ? "error" : null}`}>
                  <SignUpInput
                    type={"password"}
                    name={FORM_FIELD_NAMES.CONFIRMNEWPASSWORD}
                    placeholder={"새 비밀번호를 한번 더 입력하세요."}
                    value={signForm.confirmNewPassword}
                    onChange={changeNewConfirmPasswordHandler}
                  />
                </InputWrapper>
                <AlertMsg className={`${error.confirmNewPassword ? "error" : ""}`}>
                  <AiOutlineExclamationCircle />새 비밀번호와 일치하지 않습니다.
                </AlertMsg>
              </EditWrapper>
            </ContentSet>
          </>
        ) : (
          ""
        )}
        <ButtonContainer id="edit">
          {isEditing ? null : (
            <Button type={"button"} text="수정하기" color="blue" size="lg" onClick={() => setIsEditing(true)} />
          )}
        </ButtonContainer>
        <ButtonContainer id="done">
          {isEditing ? <Button type={"submit"} text="수정완료" color="blue" size="lg" /> : null}
        </ButtonContainer>
      </Content>
    </Wrapper>
  );
}

const ImgContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 120px;
`;
const AlertMsg = styled.div`
  display: none;
  &.error {
    display: block;
    line-height: 0;
    display: flex;
    align-items: center;
    font-weight: normal;
    gap: 5px;
    font-size: 15px;
    color: var(--red);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  #edit {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  #done {
    position: absolute;
    bottom: 0;
    right: 0;
    @media (max-width: 768px) {
      position: static;
      display: flex;
      padding-top: 20px;
    }
  }
`;
const ContentSet = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 3px;
`;
const ContentKey = styled.label`
  display: flex;
  align-items: center;
  width: 80px;
  margin-left: 20px;
  font-size: 18px;
  color: var(--black-500);
`;
const ContentValue = styled.span`
  padding-top: 2px;
  height: 30px;
  font-weight: normal;
  font-size: 18px;
  color: var(--black-700);
`;
const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const InputWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-right: 3px;
  height: 30px;
  width: 400px;
  input {
    height: 25px;
    padding-top: 2px;
    font-size: 18px;
    color: var(--black-700);
    ::placeholder {
      color: var(--black-200);
    }
  }
  font-weight: normal;
  border-radius: 5px;
  border: 1px solid var(--black-150);
  &:focus-within {
    box-shadow: var(--wrapped-shadow);
  }
  &.error:focus-within {
    box-shadow: var(--wrapped-shadow-red);
    border: 1px solid hsl(359, 46%, 66%);
    transition: 0.2s;
  }
  @media (max-width: 768px) {
    width: 350px;
  }
`;
const ReviewImgInput = styled.input`
  position: absolute;
  display: none;
`;
const ReviewImg = styled.img`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--blue-100);
`;
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  margin-top: 7px;
  padding: 2px;
  gap: 2px;
  font-size: 15px;
  cursor: pointer;
  font-family: inherit;
  border-radius: 3px;
  font-size: 0.8rem;
  border: 1.2px solid var(--black-300);
  color: var(--black-300);
  box-shadow: var(--bs-btn);
  :active {
    background-color: var(--black-025);
    box-shadow: var(--bs-btn-click);
  }
  :hover {
    border: 1.2px solid var(--black-400);
    color: var(--black-400);
  }
  &.mint {
    border: 1.2px solid var(--l_button-mint);
    color: var(--l_button-mint);
    :hover {
      border: 1.2px solid var(--l_button-mint-hover);
      color: var(--l_button-mint-hover);
    }
  }
`;
const Content = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  @media (max-width: 768px) {
    width: 500px;
  }
`;
const Wrapper = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 780px;

  @media (max-width: 768px) {
    width: 600px;
  }
`;
