import { useEffect, useState } from 'react';
import { List } from '../../components/List';
import { ListHeader } from '../../components/List/ListHeader/ListHeader';
import { FornecedorList } from '../../components/List/ListItems/FornecedorList/FornecedorListItem';
import { api } from '../../api';
import { Loading } from '../../components/Loading';
import { Fornecedor } from '../../@types/fornecedor';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Home = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState<
    Fornecedor[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const deleteFornecedor = async (id: string) => {
    try {
      if (confirm('Deletar fornecedor?')) {
        await api.delete(`/fornecedores/${id}`);
        setup();
      }
    } catch (error) {
      alert('Erro ao deletar fornecedor.');
    }
  };

  const setup = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/fornecedores`);
      console.log('data: ', data);
      setFornecedores(data);
      setFilteredFornecedores(data);
    } catch (error) {
      toast.error('Erro ao carregar fornecedores.');
    }
    setLoading(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredFornecedores(fornecedores);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(lowerCaseQuery),
      );
      setFilteredFornecedores(filtered);
    }
  };

  useEffect(() => {
    setup();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <List>
        <ListHeader
          title="LISTA DE FORNECEDORES"
          items={['Nome', 'Descrição', 'Contato', 'Endereço']}
          buttonClick={() => navigate('/fornecedores/form')}
          onSearchChange={handleSearchChange}
        />
        <FornecedorList
          items={filteredFornecedores}
          deleteFornecedor={deleteFornecedor}
        />
      </List>
    </>
  );
};
