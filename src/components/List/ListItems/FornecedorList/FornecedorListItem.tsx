import { Fornecedor } from '../../../../@types/fornecedor';
import { ItemsList } from '../../styles';
import { FornecedorItem, Phone } from './styles';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import { onlyNumbersMask } from '../../../../utils/masks';

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
          <div>{item.descricao === '' ? 'Não informado.' : item.descricao}</div>
          <div>
            {item.contato
              .filter((contato) => contato.prioritario)
              .map((contatoPrioritario, idx) => (
                <div key={idx}>
                  {contatoPrioritario.nome}
                  <Phone>
                    {contatoPrioritario.telefone}
                    <a
                      href={`https://api.whatsapp.com/send?phone=55${onlyNumbersMask(contatoPrioritario.telefone)}&text=Olá, tudo bem? Sou do aplicativo de fornecedores e gostaria de falar com você.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                  </Phone>
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
