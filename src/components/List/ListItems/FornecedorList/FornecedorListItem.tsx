import { Fornecedor } from '../../../../@types/fornecedor';
import { ItemsList } from '../../styles';
import { FornecedorItem } from './styles';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

interface ListItemsProps {
  items: Fornecedor[];
  deleteFornecedor: (id: string) => void;
}

export const FornecedorList = ({ items, deleteFornecedor }: ListItemsProps) => {
  const navigate = useNavigate();

  return (
    <ItemsList>
      {items.map((item) => (
        <FornecedorItem key={item.id}>
          <div>{item.nome}</div>
          <div>{item.descricao}</div>
          <div>
            {item.contato
              .filter((contato) => contato.prioritario)
              .map((contatoPrioritario, idx) => (
                <div key={idx}>
                  <div>{contatoPrioritario.nome}</div>
                  {contatoPrioritario.telefone}
                </div>
              ))}
          </div>
          <div>
            <div>
              <p>
                {item.endereco.logradouro} - {item.endereco.numero}
              </p>
            </div>
            <div>
              {item.endereco.cidade} - {item.endereco.estado}
            </div>
          </div>
          <div>
            <a onClick={() => navigate(`/fornecedores/form/${item.id}`)}>
              <FaEdit />
            </a>
            <a onClick={() => deleteFornecedor(item.id)}>
              <AiFillDelete />
            </a>
          </div>
        </FornecedorItem>
      ))}
    </ItemsList>
  );
};
