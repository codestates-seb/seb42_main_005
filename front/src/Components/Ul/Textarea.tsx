import styled from "styled-components";
import { FaPencilAlt } from "react-icons/fa";

interface InputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  rows: number;
  isValid?: boolean;
  icon?: boolean;
  onChange?: () => void;
}

export default function Textarea({ id, placeholder, value, rows, icon, isValid, onChange }: InputProps) {
  return (
    <StyledInput>
      {icon && (
        <div className="left icon">
          <FaPencilAlt />
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
  display: flex;
  align-items: center;
  position: relative;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    color: var(--black-200);
    font-size: 1.2rem;
    top: 8px;
  }
  .left {
    left: 0;
    margin-left: calc(1.6rem - 0.75rem);
  }
  textarea {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    flex: 1 1 0;
    padding: 0.6rem 0.7rem;
    border: 1.2px solid var(--black-100);
    border-radius: 4px;
    outline: none;
    font-size: 0.9rem;
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
    box-shadow: var(--wrapped-shadow-red);
    border: 1px solid hsl(359, 46%, 66%);
    transition: 0.2s;
  }
`;
