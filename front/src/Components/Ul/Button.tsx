import styled from "styled-components";
import { Link } from "react-router-dom";
import { TbNotebook } from "react-icons/tb";

interface BtnProps {
  text: string;
  color?: string;
  size?: string;
  url?: string;
  icon?: boolean;
  disabled?: boolean;
  onClick?: ()=>void;
}

export default function Button({ text, icon, color, size, url, disabled, onClick }: BtnProps) {
  // A tag
  if (url) {
    return (
      <LinkButton className={`${color} ${size} ${disabled ? "disabled" : null}`} to={url}>
        {text}
      </LinkButton>
    );
  }

  // Button tag
  return (
    <BasicButton className={`${color} ${size}`} onClick={onClick}>
      {icon ? <TbNotebook className="icon" /> : null}
      {text}
    </BasicButton>
  );
}

const LinkButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin: 0;
  padding: 0.5rem;
  text-decoration: none;
  font-family: inherit;
  font-size: 0.9rem;
  white-space: nowrap;
  color: var(--white);
  border: none;
  border-radius: 3px;

  /* color */
  &.blue {
    background-color: var(--button-blue);
  }
  &.blue:hover {
    background-color: var(--button-blue-hover);
  }
  &.mint {
    background-color: var(--button-mint);
  }
  &.mint:hover {
    background-color: var(--button-mint-hover);
  }
  &.red {
    background-color: var(--button-red);
  }
  &.red:hover {
    background-color: var(--button-red-hover);
  }

  /* SIZE */
  &.md {
    line-height: 1.1;
    padding: 0.5rem 1rem;
    /* 버튼 위 라인 효과 */
    box-shadow: inset 0 1px 0 0 hsl(0, 0%, 100%, 0.4);
    border: 1px solid transparent;
    text-decoration: none;
  }
  &.lg {
    line-height: 1.3;
    padding: 0.5rem 2rem;
    font-weight: 700;
    /* 버튼 위 라인 효과 */
    box-shadow: inset 0 1px 0 0 hsl(0, 0%, 100%, 0.4);
    border: 1px solid transparent;
    text-decoration: none;
  }

  &.disabled {
    opacity: 0.7;
    cursor: default;
    pointer-events: none;
  }
`;

const BasicButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin: 0;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  white-space: nowrap;
  color: var(--white);
  background-color: var(--white);
  border: none;
  border-radius: 3px;

  /* color */
  &.l_black {
    border: 1.2px solid var(--black-300);
    color: var(--black-300);
  }
  &.l_black:hover {
    border: 1.2px solid var(--black-400);
    color: var(--black-400);
  }
  &.l_blue {
    border: 1.2px solid var(--l_button-blue);
    color: var(--l_button-blue);
  }
  &.l_blue:hover {
    border: 1.2px solid var(--l_button-blue-hover);
    color: var(--l_button-blue-hover);
  }
  &.l_mint {
    border: 1.2px solid var(--l_button-mint);
    color: var(--l_button-mint);
  }
  &.l_mint:hover {
    border: 1.2px solid var(--l_button-mint-hover);
    color: var(--l_button-mint-hover);
  }
  &.l_red {
    border: 1.2px solid var(--l_button-red);
    color: var(--l_button-red);
  }
  &.l_red:hover {
    border: 1.2px solid var(--l_button-red-hover);
    color: var(--l_button-red-hover);
  }
  &.blue {
    background-color: var(--button-blue);
  }
  &.blue:hover {
    background-color: var(--button-blue-hover);
  }
  &.mint {
    background-color: var(--button-mint);
  }
  &.mint:hover {
    background-color: var(--button-mint-hover);
  }
  &.red {
    background-color: var(--button-red);
  }
  &.red:hover {
    background-color: var(--button-red-hover);
  }

  /* SIZE */
  &.sm {
    line-height: 0.3;
    font-size: 0.8rem;
    box-shadow: var(--bs-btn);
  }
  &.sm:active {
    background-color: var(--black-025);
    box-shadow: var(--bs-btn-click);
  }
  &.md {
    line-height: 1.1;
    padding: 0.5rem 1rem;
    /* 버튼 위 라인 효과 */
    box-shadow: inset 0 1px 0 0 hsl(0, 0%, 100%, 0.4);
    border: 1px solid transparent;
    text-decoration: none;
  }
  &.lg {
    line-height: 1.3;
    padding: 0.5rem 2rem;
    font-weight: 700;
    /* 버튼 위 라인 효과 */
    box-shadow: inset 0 1px 0 0 hsl(0, 0%, 100%, 0.4);
    border: 1px solid transparent;
    text-decoration: none;
  }
  & .icon {
    margin: 0 5px 0 0;
    position: relative;
    font-size: 1rem;
  }
`;
