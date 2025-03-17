import styled, { css } from 'styled-components';

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
}

const primaryStyles = css`
  background-color: #0082f5;
  color: white;
  border: none;
`;

const secondaryStyles = css`
  background-color: #ffffff;
  color: #202020;
  border: 1px solid #dcdcdc;
`;

const getButtonStyles = (type: ButtonProps['type']) => {
  switch (type) {
    case 'primary':
      return primaryStyles;
    case 'secondary':
      return secondaryStyles;
    default:
      return primaryStyles;
  }
};

export const StyledButton = styled.button<ButtonProps>`
  padding: 12px 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  ${(props) => getButtonStyles(props.type)}
`;
