import React from 'react';
import { StyledLabel } from '../Input/styles';
import { StyledSelect } from './styles';

interface SelectFieldProps {
  items: Array<{ value: string; label: string }>;
  id: string;
  register: any; // Tipagem do react-hook-form
  error: string | null;
  label: string;
  placeholder: string;
}

export const SelectField = ({
  items,
  id,
  register,
  error,
  label,
  placeholder,
}: SelectFieldProps) => {
  return (
    <div>
      <StyledLabel error={error}>{label}</StyledLabel>
      <StyledSelect id={id} {...register(id)}>
        <option>{placeholder}</option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.value}
          </option>
        ))}
      </StyledSelect>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
