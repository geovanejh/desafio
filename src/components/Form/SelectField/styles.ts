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

export const StyledSelect = styled.select<InputProps>`
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
