import Input from '../Input/Input';
import { StyledInput } from '../Input/styles';
import { SearchContainer } from './styles';
import { BsSearch } from 'react-icons/bs';

import { ChangeEventHandler } from 'react';

const SearchField = ({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <SearchContainer>
      <StyledInput error={null} onChange={onChange} />
      <BsSearch />
    </SearchContainer>
  );
};
export default SearchField;
