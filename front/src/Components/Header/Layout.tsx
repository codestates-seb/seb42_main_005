import { Outlet } from "react-router";
import styled from "styled-components";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <MainContainer>
        <main className="main">
          <Outlet />
        </main>
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
  .main {
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: scroll;
  }
`;
