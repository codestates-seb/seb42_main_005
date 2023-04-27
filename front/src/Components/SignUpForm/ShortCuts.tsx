import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { APIS } from "../../Api/APIs";
import { get } from "../../Redux/slice/userSlice";
import { setLocalStorage } from "../../Api/localStorage";
import { getLocalStorage } from "../../Api/localStorage";

export default function ShortCuts({}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const postLogin = async (email: string, password: string) => {
    await axios
      .post(APIS.POST_LOGIN_JWT, { email: email, password: password })
      .then((res) => {
        let accessToken = res.headers.authorization;
        let refreshToken = res.headers.refresh;
        setLocalStorage("access_token", accessToken);
        setLocalStorage("refresh_token", refreshToken);
        let token = getLocalStorage("access_token");
        axios.defaults.headers.common.Authorization = token;
        dispatch(get(res.data));

        return res;
      })
      .then((res) => {
        if (res.data.userType == "관리자") {
          return navigate("/admin-reports");
        }
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Text>
        체험용 게스트 계정 <br />
        Guest-account <br />
      </Text>
      <ButtonContainer>
        <Button onClick={() => postLogin("dltjddmssl6485@naver.com", "ls!610604")}>
          <Img src="/Images/User.png" alt="원 안에 사람이 있는 도형" />
          일반회원
        </Button>
        <Button onClick={() => postLogin("jj@naver.com", "ls!610604")}>
          <Img src="/Images/Pharm.png" alt="원 안에 사람과 병원 표시가 있는 도형" />
          약사회원
        </Button>
        <Button onClick={() => postLogin("admin@gmail.com", "asdfasdf1!")}>
          <Img src="/Images/Admin.png" alt="원 안에 사람과 톱니모양이 있는 도형" />관 리 자
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 9.2rem;
  margin: 16px 0;
  padding: 1.5rem 0.5rem 1.2rem 0.5rem;
  border: 1px solid var(--black-200);
  border-radius: 18px;
  background-color: var(--black-050);
  box-shadow: var(--bs-lg);
`;
const Text = styled.p`
  color: var(--black-500);
  font-size: 16px;
  line-height: 25px;
`;
const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  margin-top: 5px;
  padding-right: 10px;
  color: var(--black-400);
  font-size: 16px;
  font-weight: 500;
  border: 1px solid var(--black-150);
  background-color: var(--black-025);
  border-radius: 10px;
  box-shadow: var(--bs-sm);
  transition: 0.2s;
  :hover {
    background-color: var(--blue-100);
    color: var(--black-600);
    transition: 0.2s;
  }
`;
const Img = styled.img`
  margin: 2px 5px 2px 10px;
  width: 30px;
  border: 1.5px solid var(--blue-200);
  border-radius: 20px;
`;
