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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Text className="info">
        ...or we can <br />
        provide you shortcuts <br />
        for your convenience!
      </Text>
      <Text>I want to try...</Text>
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
          <Img src="/Images/Admin.png" alt="원 안에 사람과 톱니모양이 있는 도형" />
          관리자
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  width: 13rem;
`;
const Text = styled.p`
  color: var(--black-500);
  font-size: 15px;
  &.info {
    margin-bottom: 20px;
  }
`;
const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 80px;
  color: var(--black-300);
  font-size: 15px;
  font-weight: 600;
  border: 1px solid var(--black-150);
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: var(--bs-sm);
  :hover {
    background-color: var(--blue-100);
    color: var(--black-600);
  }
`;
const Img = styled.img`
  width: 40px;
  margin-bottom: 7px;
  border: 1.5px solid var(--blue-200);
  border-radius: 20px;
`;
