import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";
interface InputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  isValid?: boolean;
  icon?: boolean;
  onChange?: any;
  onKeyPress?: any;
}

export default function Input({ id, placeholder, value, icon, isValid, onChange, onKeyPress, name }: InputProps) {
  return (
    <StyledInput>
      {icon && (
        <div className="left icon">
          <FaPencilAlt aria-hidden="true" />
        </div>
      )}
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        className={`${isValid ? null : "error"}`}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  .icon {
    position: absolute;
    top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: var(--black-200);
  }
  .left {
    left: 0;
    margin-left: calc(1.6rem - 0.75rem);
  }
  input {
    padding: 0.6rem 0.7rem;
    height: 2.4rem;
    flex: 1 1 0;
    border: 1.2px solid var(--black-100);
    border-radius: 4px;
    outline: none;
    font-size: 0.9rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    transition: 0.2s;
  }
  input::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    color: var(--black-300);
  }
  input:focus {
    border-color: var(--blue-300);
    box-shadow: var(--wrapped-shadow);
    transition: 0.2s;
  }
  .left + input {
    padding-left: 2.6rem;
  }
  .error {
    border: 1px solid hsl(359, 46%, 66%);
    transition: 0.2s;
  }
  .error:focus {
    border: 1px solid hsl(359, 46%, 66%);
    box-shadow: var(--wrapped-shadow-red);
    transition: 0.2s;
  }
`;
