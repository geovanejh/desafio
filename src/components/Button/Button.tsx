import React from 'react';
import { StyledButton } from './styles';

type ButtonProps = {
  type?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  onClick,
  children,
}) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
