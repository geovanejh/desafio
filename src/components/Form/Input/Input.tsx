import { UseFormRegister } from 'react-hook-form';
import { StyledError, StyledInput, StyledLabel } from './styles';
import { TbAlertTriangle } from 'react-icons/tb';

type InputProps = {
  error: string | null;
  type: string;
  placeholder: string;
  label: string;
  register: UseFormRegister<any>;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  error,
  placeholder,
  label,
  id,
  register,
  onChange,
}) => {
  return (
    <div>
      <StyledLabel error={error}>{label}</StyledLabel>
      <StyledInput
        error={error}
        placeholder={placeholder}
        {...register(id)}
        onChange={onChange}
      />

      {error && (
        <StyledError>
          <TbAlertTriangle />
          {error}
        </StyledError>
      )}
    </div>
  );
};

export default Input;
