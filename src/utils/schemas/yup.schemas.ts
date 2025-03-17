import * as yup from 'yup';
import { FornecedorForm } from '../../@types/fornecedor';

export const fornecedorSchema = yup.object({
  id: yup.string().notRequired(),
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string(),
  contato: yup
    .array()
    .of(
      yup
        .object({
          nome: yup.string().required('Nome é obrigatório'),
          telefone: yup.string().required('Telefone é obrigatório'),
          prioritario: yup.boolean().required('Prioritário é obrigatório'),
        })
        .required(),
    )
    .min(1, 'Pelo menos um contato é necessário')
    .required('Contatos são obrigatórios')
    .test(
      'at-least-one-priority',
      'Pelo menos um contato deve ser prioritário',
      (contatos) => {
        return contatos?.some((contato) => contato.prioritario) || false;
      },
    ),
  endereco: yup
    .object({
      cep: yup.string().required('CEP é obrigatório'),
      logradouro: yup.string().required('Logradouro é obrigatório'),
      numero: yup.string().required('Número é obrigatório'),
      cidade: yup.string().required('Cidade é obrigatória'),
      estado: yup.string().required('Estado é obrigatório'),
      bairro: yup.string().required('Bairro é obrigatório'),
      referencia: yup
        .string()
        .notRequired()
        .test('notNull', 'Não pode ser null', (value) => value !== null),
    })
    .required('Endereço é obrigatório'),
}) as yup.ObjectSchema<FornecedorForm>;
