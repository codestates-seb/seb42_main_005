import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";

interface InputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  rows: number;
  isValid?: boolean;
  icon?: boolean;
  onChange?: any;
}

export default function Textarea({ id, placeholder, value, rows, icon, isValid, onChange }: InputProps) {
  return (
    <StyledInput>
      {icon && (
        <div className="left icon">
          <FaPencilAlt aria-hidden="true" />
        </div>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        rows={rows}
        className={`${isValid ? null : "error"}`}
        onChange={onChange}
      />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  position: relative;
  height: 80px;
  width: 280px;
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
  textarea {
    flex: 1 1 0;
    padding: 0.6rem 0.7rem;
    border: 1.2px solid var(--black-100);
    border-radius: 4px;
    font-size: 0.9rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    outline: none;
    resize: none;
    transition: 0.2s;
  }
  textarea::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    color: var(--black-300);
  }
  textarea:focus {
    border-color: var(--blue-300);
    box-shadow: var(--wrapped-shadow);
    transition: 0.2s;
  }
  .left + textarea {
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
