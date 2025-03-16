import styled from 'styled-components';

interface InputProps {
  error: string | null;
}

const getInputStyles = (error: InputProps['error']) => {
  if (error) {
    return `
      border-color: rgb(255, 0, 0);
      color: rgb(255, 0, 0);

      &::placeholder {
      color: rgb(255, 0, 0);
      }

      &:focus {
      color: rgb(255, 0, 0);
      }
    `;
  }
};

export const StyledInput = styled.input<InputProps>`
  padding: 14px 16px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  color: #898989;
  font-size: 14px;

  &:focus {
    border-color: #7f7f7f;
    outline: none;
  }

  ${(props) => getInputStyles(props.error)}
`;

export const StyledLabel = styled.label<InputProps>`
  font-size: 14px;
  color: #9fa2b4;
  ${(props) => getInputStyles(props.error)}
`;

export const StyledError = styled.p`
  color: rgb(255, 0, 0);
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
