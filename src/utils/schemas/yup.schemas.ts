import * as yup from 'yup';
import { FornecedorForm } from '../../@types/fornecedor';

export const fornecedorSchema = yup.object({
  id: yup.string().notRequired(),
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  contato: yup
    .array()
    .of(
      yup
        .object({
          nome: yup.string().required('Nome do contato é obrigatório'),
          telefone: yup.string().required('Telefone é obrigatório'),
          prioritario: yup.boolean().required('Prioritário é obrigatório'),
        })
        .required(),
    )
    .min(1, 'Pelo menos um contato é necessário')
    .required('Contatos são obrigatórios'),
  endereco: yup
    .object({
      cep: yup.string().required('CEP é obrigatório'),
      logradouro: yup.string().required('Logradouro é obrigatório'),
      numero: yup.string().required('Número é obrigatório'),
      cidade: yup.string().required('Cidade é obrigatória'),
      estado: yup.string().required('Estado é obrigatório'),
      bairro: yup.string().required('Bairro é obrigatório'),
      referencia: yup.string().notRequired(),
    })
    .required('Endereço é obrigatório'),
}) as yup.ObjectSchema<FornecedorForm>;
