import { Container } from './styles';

export interface ListProps {
  children: React.ReactNode;
  layout?: string;
}

export const List = ({ children, layout }: ListProps) => {
  return <Container>{children}</Container>;
};
