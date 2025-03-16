import { useEffect, useState } from 'react';
import { api, cepApi } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fornecedorSchema } from '../../utils/schemas/yup.schemas';
import { FornecedorForm } from '../../@types/fornecedor';
import Input from '../../components/Form/Input/Input';
import { FormRow } from '../../components/Form/styles';
import toast from 'react-hot-toast';

export const FornecedoresForm = () => {
  const [loading, setLoading] = useState(true);
  const { id: idFornecedor } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FornecedorForm>({
    resolver: yupResolver(fornecedorSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      contato: [{ nome: '', telefone: '', prioritario: false }],
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        cidade: '',
        estado: '',
        bairro: '',
        referencia: '',
      },
    },
  });

  const handleCep = async (cep: string) => {
    if (cep.length !== 8) return;

    try {
      const { data } = await cepApi.get(`/ws/${cep}/json`);
      setValue('endereco.logradouro', data.logradouro);
      setValue('endereco.bairro', data.bairro);
      setValue('endereco.cidade', data.cidade);
      setValue('endereco.estado', data.estado);
    } catch (error) {
      console.error('Erro ao buscar informações do CEP:', error);
      toast.error('Erro ao buscar informações do CEP.');
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contato',
  });

  const setup = async () => {
    if (!idFornecedor) return;
    try {
      const { data } = await api.get(`/fornecedores/${idFornecedor}`);
      reset(data);
      console.log('data: ', data);
    } catch (error) {
      alert('Erro ao carregar fornecedores.');
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await setup();
      setLoading(false);
    };
    initialize();
  }, [idFornecedor]);

  const handlePrioritarioChange = (index: number, checked: boolean) => {
    if (checked) {
      fields.forEach((_, i) => {
        if (i !== index) {
          setValue(`contato.${i}.prioritario`, false);
        }
      });
    }
    setValue(`contato.${index}.prioritario`, checked);
  };

  const handleUpdate = async (data: FornecedorForm) => {
    try {
      const response = await api.put(`/fornecedores/${idFornecedor}`, data);
      console.log(
        'Fornecedor atualizado com sucesso! Resposta:',
        response.data,
      );
      toast.success('Fornecedor atualizado com sucesso!'); // Toast de sucesso
      navigate(-1);
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      toast.error('Erro ao atualizar fornecedor.'); // Toast de erro
    }
  };

  const handleNewFornecedor = async (data: FornecedorForm) => {
    try {
      const response = await api.post('/fornecedores', data);
      console.log('Fornecedor criado com sucesso! Resposta:', response.data);
      toast.success('Fornecedor criado com sucesso!'); // Toast de sucesso
      navigate(-1);
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
      toast.error('Erro ao criar fornecedor.'); // Toast de erro
    }
  };

  const onSubmit = async (data: FornecedorForm) => {
    console.log('Dados enviados:', data);
    if (idFornecedor) {
      return handleUpdate(data);
    } else {
      return handleNewFornecedor(data);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <a onClick={() => navigate('/')}>Voltar</a>
        <h2>{idFornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h2>
      </div>
      <Input
        label="Nome"
        error={errors.nome?.message || null}
        type="text"
        placeholder="Nome do fornecedor"
        id="nome"
        register={register}
      />
      <Input
        label="Descrição"
        error={errors.descricao?.message || null}
        type="text"
        placeholder="Descrição"
        id="descricao"
        register={register}
      />

      <h3>Contatos</h3>
      {fields.map((field, index) => (
        <FormRow key={field.id}>
          <Input
            label="Nome do Contato"
            error={
              (errors.contato?.[index]?.nome &&
                errors.contato[index]?.nome?.message) ||
              null
            }
            type="text"
            placeholder="Descrição"
            id={`contato.${index}.nome`}
            register={register}
          />
          <Input
            label="Nome do Contato"
            error={
              (errors.contato?.[index]?.telefone &&
                errors.contato[index]?.telefone?.message) ||
              null
            }
            type="text"
            placeholder="Descrição"
            id={`contato.${index}.telefone`}
            register={register}
          />

          <input
            type="checkbox"
            {...register(`contato.${index}.prioritario`)}
            onChange={(e) => handlePrioritarioChange(index, e.target.checked)}
          />
          {errors.contato?.[index]?.prioritario && (
            <p>{errors.contato[index]?.prioritario?.message}</p>
          )}
          <label>Prioritário</label>

          <button type="button" onClick={() => remove(index)}>
            Remover Contato
          </button>
        </FormRow>
      ))}
      {errors.contato && (
        <p style={{ color: 'red' }}>{errors.contato.message}</p>
      )}
      <button
        type="button"
        onClick={() => append({ nome: '', telefone: '', prioritario: false })}
      >
        Adicionar Contato
      </button>

      <h3>Endereço</h3>
      <Input
        label="CEP"
        error={(errors.endereco?.cep && errors.endereco.cep.message) || null}
        type="text"
        placeholder="CEP"
        id="endereco.cep"
        register={register}
        onChange={(e) => handleCep(e.target.value)}
      />
      <Input
        label="Logradouro"
        error={
          (errors.endereco?.logradouro && errors.endereco.logradouro.message) ||
          null
        }
        type="text"
        placeholder="Logradouro"
        id="endereco.logradouro"
        register={register}
      />

      <Input
        label="Número"
        error={
          (errors.endereco?.numero && errors.endereco.numero.message) || null
        }
        type="text"
        placeholder="Número"
        id="endereco.numero"
        register={register}
      />

      <Input
        label="Cidade"
        error={
          (errors.endereco?.cidade && errors.endereco.cidade.message) || null
        }
        type="text"
        placeholder="Cidade"
        id="endereco.cidade"
        register={register}
      />

      <Input
        label="Estado"
        error={
          (errors.endereco?.estado && errors.endereco.estado.message) || null
        }
        type="text"
        placeholder="Estado"
        id="endereco.estado"
        register={register}
      />

      <Input
        label="Bairro"
        error={
          (errors.endereco?.bairro && errors.endereco.bairro.message) || null
        }
        type="text"
        placeholder="Bairro"
        id="endereco.bairro"
        register={register}
      />

      <Input
        label="Referência"
        error={
          (errors.endereco?.referencia && errors.endereco.referencia.message) ||
          null
        }
        type="text"
        placeholder="Referência"
        id="endereco.referencia"
        register={register}
      />

      <button type="submit">Salvar</button>
    </form>
  );
};
