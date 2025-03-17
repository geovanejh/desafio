import { useEffect, useState } from 'react';
import { api, cepApi } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fornecedorSchema } from '../../utils/schemas/yup.schemas';
import { FornecedorForm } from '../../@types/fornecedor';
import Input from '../../components/Form/Input/Input';
import { FormHeader, FormRow } from '../../components/Form/styles';
import toast, { Toaster } from 'react-hot-toast';
import { maskCEP, maskPhoneNumber } from '../../utils/masks';
import { Container } from '../../components/List/styles';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import Button from '../../components/Button/Button';
import { SelectField } from '../../components/Form/SelectField/SelectField';
import { UFList } from '../../utils/UF';

export const FornecedoresForm = () => {
  const [loading, setLoading] = useState(true);
  const { id: idFornecedor } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ufItems = UFList().map((uf) => ({
    value: uf.sigla,
    label: uf.nome,
  }));

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contato',
  });

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    const maskedValue = maskCEP(cep);
    setValue('endereco.cep', maskedValue);

    if (cep.length === 8) {
      try {
        const { data } = await cepApi.get(`/ws/${cep}/json`);
        setValue('endereco.logradouro', data.logradouro);
        setValue('endereco.bairro', data.bairro);
        setValue('endereco.cidade', data.localidade);
        setValue('endereco.estado', data.uf);
      } catch (error) {
        toast.error('Erro ao buscar informações do CEP.');
      }
    }
  };

  const handlePhoneChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, '');
      const maskedValue = maskPhoneNumber(rawValue);
      setValue(`contato.${index}.telefone`, maskedValue);
    };

  const setup = async () => {
    if (!idFornecedor) return;
    try {
      const { data } = await api.get(`/fornecedores/${idFornecedor}`);
      reset({
        ...data,
        endereco: {
          ...data.endereco,
          cep: maskCEP(data.endereco.cep || ''),
        },
      });
    } catch (error) {
      toast.error('Erro ao carregar fornecedores.');
    } finally {
      setLoading(false);
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
      const response = await api.put(`/fornecedores/${idFornecedor}`, {
        ...data,
        endereco: {
          ...data.endereco,
          cep: data.endereco.cep.replace(/\D/g, ''),
        },
      });
      toast.success('Fornecedor atualizado com sucesso!');
      navigate(-1);
    } catch (error) {
      toast.error('Erro ao atualizar fornecedor.');
    }
  };

  const handleNewFornecedor = async (data: FornecedorForm) => {
    try {
      const response = await api.post('/fornecedores', {
        ...data,
        endereco: {
          ...data.endereco,
          cep: data.endereco.cep.replace(/\D/g, ''),
        },
      });
      toast.success('Fornecedor criado com sucesso!');
      navigate(-1);
    } catch (error) {
      toast.error('Erro ao criar fornecedor.');
    }
  };

  const onSubmit = async (data: FornecedorForm) => {
    if (idFornecedor) {
      return handleUpdate(data);
    } else {
      return handleNewFornecedor(data);
    }
  };

  const handleRemoveContato = (index: number) => {
    if (fields.length <= 1) {
      toast.error('É necessário manter pelo menos um contato.');
      return;
    }
    remove(index);
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <Container>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>
          <a onClick={() => navigate('/')}>
            <IoMdArrowRoundBack />
          </a>
          <h2>{idFornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h2>
        </FormHeader>
        <h3>Informações</h3>
        <FormRow layout="1fr 1.5fr">
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
        </FormRow>

        <h3>Contatos</h3>
        {fields.map((field, index) => (
          <FormRow key={field.id} layout="3fr 3fr 0.2fr 0.5fr">
            <Input
              label="Nome"
              error={
                (errors.contato?.[index]?.nome &&
                  errors.contato[index]?.nome?.message) ||
                null
              }
              type="text"
              placeholder="Nome"
              id={`contato.${index}.nome`}
              register={register}
            />
            <Input
              label="Telefone"
              error={
                (errors.contato?.[index]?.telefone &&
                  errors.contato[index]?.telefone?.message) ||
                null
              }
              type="text"
              placeholder="(99) 99999-9999"
              id={`contato.${index}.telefone`}
              register={register}
              onChange={handlePhoneChange(index)}
              maxLength={15}
            />
            <div>
              <Input
                label="Prioritário"
                error={errors.contato?.[index]?.prioritario?.message || null}
                type="checkbox"
                id={`contato.${index}.prioritario`}
                register={register}
                placeholder=""
                onChange={(e) =>
                  handlePrioritarioChange(index, e.target.checked)
                }
              />
              {errors.contato?.[index]?.prioritario && (
                <p>{errors.contato[index]?.prioritario?.message}</p>
              )}
            </div>
            <div>
              <a onClick={() => handleRemoveContato(index)}>
                <MdDelete />
              </a>
            </div>
          </FormRow>
        ))}
        {errors.contato && (
          <p style={{ color: 'red' }}>{errors.contato.message}</p>
        )}
        <Button
          onClick={() => append({ nome: '', telefone: '', prioritario: false })}
        >
          Adicionar Contato
        </Button>

        <h3>Endereço</h3>
        <FormRow layout="1fr">
          <Input
            label="CEP*"
            error={
              (errors.endereco?.cep && errors.endereco.cep.message) || null
            }
            type="text"
            placeholder="00000-000"
            id="endereco.cep"
            register={register}
            onChange={handleCepChange}
            maxLength={9}
          />
        </FormRow>
        <FormRow layout="3fr 1fr">
          <Input
            label="Logradouro"
            error={
              (errors.endereco?.logradouro &&
                errors.endereco.logradouro.message) ||
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
              (errors.endereco?.numero && errors.endereco.numero.message) ||
              null
            }
            type="text"
            placeholder="Número"
            id="endereco.numero"
            register={register}
          />
        </FormRow>
        <FormRow layout="1fr 0.5fr">
          <Input
            label="Cidade"
            error={
              (errors.endereco?.cidade && errors.endereco.cidade.message) ||
              null
            }
            type="text"
            placeholder="Cidade"
            id="endereco.cidade"
            register={register}
          />
          <Input
            label="Bairro"
            error={
              (errors.endereco?.bairro && errors.endereco.bairro.message) ||
              null
            }
            type="text"
            placeholder="Bairro"
            id="endereco.bairro"
            register={register}
          />
        </FormRow>
        <FormRow layout="0.5fr 1fr">
          <SelectField
            label="Estado"
            error={
              (errors.endereco?.estado && errors.endereco.estado.message) ||
              null
            }
            id="endereco.estado"
            register={register}
            items={ufItems}
            placeholder="Estado"
          />
          <Input
            label="Referência"
            error={
              (errors.endereco?.referencia &&
                errors.endereco.referencia.message) ||
              null
            }
            type="text"
            placeholder="Referência"
            id="endereco.referencia"
            register={register}
          />
        </FormRow>
        <FormRow layout="1fr">
          <Button>Salvar</Button>
        </FormRow>
      </form>
    </Container>
  );
};
