import styled from "styled-components";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";

interface AccountProps {
  isLogin: boolean;
  account?: string;
}

export default function Layout({ isLogin, account }: AccountProps) {
  return (
    <div>
      <Header isLogin={isLogin} account={account} />
      <MainContainer>
        <main className="main">
          <Outlet />
        </main>
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  padding-top: 50px;
  justify-content: center;
  .main {
    width: 100%;
    height: calc(100vh - 50px);
  }
`;
