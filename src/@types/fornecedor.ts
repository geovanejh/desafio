export interface Fornecedor {
  id: string;
  nome: string;
  descricao: string;
  contato: {
    nome: string;
    telefone: string;
    prioritario: boolean;
  }[];
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    cidade: string;
    estado: string;
    bairro: string;
    referencia?: string;
  };
}

export type FornecedorForm = Omit<Fornecedor, 'id'> & { id?: string };
