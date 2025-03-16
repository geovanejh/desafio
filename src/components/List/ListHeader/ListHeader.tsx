import SearchField from '../../Form/SearchField/SearchField';
import { HeaderContainer } from './styles';

interface ListProps {
  title: string;
  items: string[]; // Cabeçalhos da lista
  buttonClick?: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Função de busca
}

export const ListHeader = ({
  items,
  title,
  buttonClick,
  onSearchChange,
}: ListProps) => {
  return (
    <HeaderContainer>
      <div>
        <h3>{title}</h3>
        {buttonClick && <button onClick={() => buttonClick()}>Novo</button>}
        <SearchField onChange={onSearchChange} />
      </div>
      <div>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </HeaderContainer>
  );
};
