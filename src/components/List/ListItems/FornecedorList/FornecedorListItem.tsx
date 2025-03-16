import { Fornecedor } from '../../../../@types/fornecedor';
import { api } from '../../../../api';
import { ItemsList } from '../../styles';
import { FornecedorItem } from './styles';
import { useNavigate } from 'react-router-dom';

interface ListItemsProps {
  items: Fornecedor[];
  deleteFornecedor: (id: string) => void;
}

export const FornecedorList = ({ items, deleteFornecedor }: ListItemsProps) => {
  const navigate = useNavigate();

  return (
    <ItemsList>
      {items.map((item, index) => (
        <FornecedorItem key={index}>
          <div>{item.nome}</div>
          <div>{item.descricao}</div>
          <div>
            {item.contato
              .filter((contato) => contato.prioritario)
              .map((contatoPrioritario, idx) => (
                <div key={idx}>{contatoPrioritario.nome}</div>
              ))}
          </div>
          <div>
            {item.endereco.logradouro}, {item.endereco.numero}
          </div>
          <div>
            {item.endereco.cidade}, {item.endereco.estado}
          </div>
          <button onClick={() => navigate(`/fornecedores/form/${item.id}`)}>
            editar
          </button>
          <button onClick={() => deleteFornecedor(item.id)}>excluir</button>
        </FornecedorItem>
      ))}
    </ItemsList>
  );
};
