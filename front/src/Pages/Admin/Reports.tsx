import styled from "styled-components";
import AdminTabs from "./AdminTabs"
import Button from "../../Components/Ul/Button";
import CheckBox from "../../Components/Ul/CheckBox";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Reports() {
  const dummy = [
    {
      content: "약사 대머리임 ㅋㅋㅋㅋㅋ",
      email: "waiting@kbs.com",
      writtenAt: "2023.02.01",
      reports: 12,
    },
    {
      content: "잘되면 재밌고 잘안되면 재미없고",
      email: "boring@coding.com",
      writtenAt: "2023.02.01",
      reports: 13,
    },
    {
      content:
        "얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버얼마안남았다존버",
      email: "codestates@bootcamp.com",
      writtenAt: "2023.02.01",
      reports: 2,
    },
    {
      content: "자바칩프라푸치노 자몽허니블랙티 아이스시그니처초콜릿",
      email: "starbucks@gyeongju.com",
      writtenAt: "2023.02.01",
      reports: 6,
    },
    {
      content: "토피넛라떼 바닐라크림콜드브루 아이스카푸치노",
      email: "starbucks@gyeongju.com",
      writtenAt: "2023.02.01",
      reports: 8,
    },
    {
      content: "sfgsfdgshdfgjhkhjkdghjdghsgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgdfgsdfgsdf",
      email: "waiting@kbs.com",
      writtenAt: "2023.02.01",
      reports: 36,
    },
    {
      content: "오늘은 미세먼지가 아주 많습니다.",
      email: "yeonjinPArk@giKae.com",
      writtenAt: "2023.02.01",
      reports: 2,
    },
    {
      content: "할렐루야",
      email: "powerDrugger@weeeeeed.com",
      writtenAt: "2023.02.01",
      reports: 3,
    },
    {
      content: "전예솔!!!!!!!!!!!!!!!!!!!!!!!!!!",
      email: "colorBlind@yesolDad.com",
      writtenAt: "2023.02.01",
      reports: 1,
    },
  ];

  return (
    <WholePage>
      <Wrapper>
        <AdminTabs current="reports"/>
        <Page>
          <Header>
            <span>신고리뷰관리</span>
            <ButtonContainer>
              <Button color="blue" size="md" text="선택삭제" />
              <Button color="blue" size="md" text="선택복구" />
            </ButtonContainer>
          </Header>
          <Table>
            <Label>
              <CheckBox />
              <Values className="content">내용</Values>
              <Values className="email">email</Values>
              <Values className="writtenAt">작성일</Values>
              <Values className="reports">신고 수</Values>
            </Label>
            {dummy.length ? (
              <BelowLable>
                {dummy.map((data) => (
                  <Content>
                    <CheckBox />
                    <Values className="content">{data.content}</Values>
                    <Values className="email">{data.email}</Values>
                    <Values className="writtenAt">{data.writtenAt}</Values>
                    <Values className="reports">{data.reports}</Values>
                  </Content>
                ))}
              </BelowLable>
            ) : (
              <Instead>
                <AiOutlineExclamationCircle />
                <span>신고된 리뷰가 없습니다.</span>
              </Instead>
            )}
          </Table>
        </Page>
      </Wrapper>
    </WholePage>
  );
}

const WholePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 52px);
`;
const Wrapper = styled.main`
  /*  */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80rem;
  height: 40rem;
  overflow: hidden;
  border-radius: 15px;
  border: 2px solid var(--black-200);
  box-shadow: var(--wrapped-shadow);
  background-color: var(--black-075);
`;
const Page = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 15px 50px;
  border-top: 1.5px solid var(--black-100);
  border-radius: 0 10px 0 0;
  background-color: var(--white);
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  span {
    font-size: 20px;
    font-weight: bold;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;
const Table = styled.figure`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px calc(20px + 0.6rem) 10px 20px;
  font-size: 1.2rem;
  font-weight: bolder;
  color: var(--black-500);
  border-top: 1.5px solid var(--black-100);
  border-bottom: 1.5px solid var(--black-100);
  background-color: var(--black-050);
`;
const BelowLable = styled.div`
  display: flex;
  flex-direction: column;
  height: 26rem;
  overflow-y: scroll;
  background-color: var(--black-050);
`;
const Instead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 26rem;
  color: var(--black-100);
  font-size: 6rem;
  font-weight: bold;
  background-color: var(--black-025);
  span {
    font-size: 2rem;
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 0.5px solid var(--black-075);
  background-color: var(--white);
  :hover {
    background-color: var(--black-050);
  }
`;
const Values = styled.span`
  display: flex;
  justify-content: center;
  &.content {
    width: 30rem;
    white-space: normal;
    word-break: break-all;
  }
  &.email {
    width: 20rem;
  }
  &.writtenAt {
    width: 10rem;
  }
  &.reports {
    width: 5rem;
  }
`;
