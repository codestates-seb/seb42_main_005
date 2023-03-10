import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <div className="logo_container">
        {/* LOGO */}
        <LogoContainer to="/">
          <img className="logo_img" alt="logo" src="Images/Logo.png" />
          <span className="logo_text">Pharmacy</span>
        </LogoContainer>
      </div>
      <div className="account_container"></div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  background-color: var(--blue-600);
  position: fixed;
  z-index: 10;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px, rgba(0, 0, 0, 0.2) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.1) 0px -3px 0px inset, hsl(0, 0%, 100%, 0.3) 0 1px 0 0 inset;
  border: 1px solid transparent;
`;

const LogoContainer = styled(Link)`
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  .logo_img {
    height: 35px;
    margin-right: 10px;
  }
  .logo_text {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
  }
`;
