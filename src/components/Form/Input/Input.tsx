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
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  error,
  placeholder,
  label,
  id,
  register,
  onChange,
  maxLength,
  type,
}) => {
  return (
    <div>
      <StyledLabel error={error}>{label}</StyledLabel>
      <StyledInput
        maxLength={maxLength}
        error={error}
        placeholder={placeholder}
        {...register(id)}
        onChange={onChange}
        type={type}
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
