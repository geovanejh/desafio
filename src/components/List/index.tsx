import { Container } from './styles';

export interface ListProps {
  children: React.ReactNode;
}

export const List = ({ children }: ListProps) => {
  return <Container>{children}</Container>;
};
