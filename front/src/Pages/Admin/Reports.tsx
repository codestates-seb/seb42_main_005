import styled from "styled-components";
import AdminTabs from "./AdminTabs";
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
        <AdminTabs current="reports" />
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
              <Values className="checkBox">
                <CheckBox />
              </Values>
              <Values className="content">내용</Values>
              <Values className="email">email</Values>
              <Values className="writtenAt">작성일</Values>
              <Values className="reports">신고 수</Values>
            </Label>
            {dummy.length ? (
              <BelowLable>
                {dummy.map((data, i) => (
                  <Content key={i}>
                    <Values className="checkBox">
                      <CheckBox />
                    </Values>
                    <Values className="content">{data.content}</Values>
                    <Values className="email">{data.email}</Values>
                    <Values className="writtenAt">{data.writtenAt}</Values>
                    <Values className="reports">{data.reports}</Values>
                  </Content>
                ))}
              </BelowLable>
            ) : (
              <Instead>
                <AiOutlineExclamationCircle aria-hidden="true"/>
                <span>신고된 리뷰가 없습니다.</span>
              </Instead>
            )}
          </Table>
        </Page>
      </Wrapper>
    </WholePage>
  );
}

const WholePage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 52px);
`;
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 20px;
  padding: 7px;
  width: 80rem;
  height: 40rem;
  overflow: hidden;
  border-radius: 15px;
  border: 2px solid var(--black-200);
  box-shadow: var(--wrapped-shadow);
  background-color: var(--black-075);
`;
const Page = styled.section`
  display: flex;
  flex-direction: column;
  height: 40rem;
  padding: 15px 55px;
  border: 1px solid var(--black-100);
  border-radius: 0 10px 10px 10px;
  background-color: var(--white);
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5px 20px 20px;
  span {
    font-size: 20px;
    font-weight: bold;
  }
  @media (max-width: 768px) {
    padding: 20px 0px 20px 20px;
  }
`;
const ButtonContainer = styled.section`
  display: flex;
  gap: 20px;
`;
const Table = styled.figure`
  display: flex;
  flex-direction: column;
  height: 450px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 768px) {
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: block;
    }
  }
`;
const Label = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: calc(1150px + 0.6rem);
  padding: 10px calc(20px + 0.6rem) 10px 20px;
  font-size: 1.2rem;
  font-weight: bolder;
  color: var(--black-500);
  border-top: 1.5px solid var(--black-100);
  border-bottom: 1.5px solid var(--black-100);
  background-color: var(--black-050);
`;
const BelowLable = styled.section`
  display: flex;
  flex-direction: column;
  height: 26rem;
  width: calc(1150px + 0.6rem);
  overflow-y: scroll;
  background-color: var(--black-050);
`;
const Instead = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 26rem;
  width: calc(1150px + 0.6rem);
  color: var(--black-100);
  font-size: 6rem;
  font-weight: bold;
  background-color: var(--black-025);
  span {
    font-size: 2rem;
  }
`;
const Content = styled.article`
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
  &.checkBox {
    padding-left: 7px;
  }
  &.content {
    width: 400px;
    white-space: normal;
    word-break: break-all;
  }
  &.email {
    width: 300px;
  }
  &.writtenAt {
    width: 150px;
  }
  &.reports {
    width: 60px;
  }
`;
