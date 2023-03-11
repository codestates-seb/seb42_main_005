import styled from "styled-components";
import { Link } from "react-router-dom";
import Account from "./Account";

interface AccountProps {
  isLogin: boolean;
  account?: string;
}

export default function Header({ isLogin, account }: AccountProps) {
  return (
    <HeaderContainer>
      <div className="logo_container">
        <LogoContainer to="/">
          <img className="logo_img" alt="logo" src="Images/Logo.png" />
          <span className="logo_text">Medi-Map</span>
        </LogoContainer>
      </div>
      <EmptyContainer>
        <span className="partition" />
        <span className="partition" />
      </EmptyContainer>
      <div className="account_container">
        <Account isLogin={isLogin} account={account} />
      </div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 8rem 0 6rem;
  background-color: var(--blue-600);
  position: fixed;
  z-index: 10;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.1) 0px -3px 0px inset, hsl(0, 0%, 100%, 0.3) 0 1px 0 0 inset;
  border: 1px solid transparent;
  transition: 0.2s;
  @media (max-width: 768px) {
    transition: 0.2s;
    padding: 0 3rem 0 2rem;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  margin: 0 30px;
  transition: 0.2s;
  .partition {
    width: 3px;
    height: 30px;
    border-radius: 1px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.1) 0px -3px 0px inset, hsl(0, 0%, 100%, 0.3) 0 1px 0 0 inset;
    @media (max-width: 768px) {
      transition: 0.2s;
      width: 2px;
      height: 10px;
    }
  }
  @media (max-width: 768px) {
    transition: 0.2s;
    margin: 0 15px;
  }
`;

const LogoContainer = styled(Link)`
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 10px;
  border-radius: 4px;
  transition: 0.2s;
  .logo_img {
    height: 35px;
    margin-right: 12px;
  }
  .logo_text {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
  }
  :hover {
    background-color: var(--blue-700);
    transition: 0.2s;
  }
`;
