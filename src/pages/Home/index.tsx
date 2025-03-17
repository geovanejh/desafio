import { useEffect, useState } from 'react';
import { List } from '../../components/List';
import { ListHeader } from '../../components/List/ListHeader/ListHeader';
import { FornecedorList } from '../../components/List/ListItems/FornecedorList/FornecedorListItem';
import { api } from '../../api';
import { Loading } from '../../components/Loading';
import { Fornecedor } from '../../@types/fornecedor';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import { ExportButton } from '../../components/List/styles';

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
      toast.error('Erro ao deletar fornecedor.');
    }
  };

  const setup = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/fornecedores`);
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

  const exportToCSV = () => {
    const csvData = filteredFornecedores.map((item) => ({
      Nome: item.nome,
      Descrição: item.descricao || '',
      Contato:
        item.contato
          .filter((contato) => contato.prioritario)
          .map((contato) => contato.nome)
          .join(', ') || 'Nenhum contato prioritário',
      Endereço: `${item.endereco.logradouro}, ${item.endereco.numero}, ${item.endereco.cidade}, ${item.endereco.estado}`,
    }));

    const csv = Papa.unparse(csvData, {
      header: true,
      delimiter: ',',
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'fornecedores.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
        <ExportButton onClick={exportToCSV}>Exportar para CSV</ExportButton>
      </List>
    </>
  );
};
