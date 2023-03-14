import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  SearchBar,
  Form,
  FormBtn,
  FormLabel,
  FormInput,
} from './SearchBar.styled';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleNameChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Enter something!');
      return;
    }
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <SearchBar>
      <Form onSubmit={handleSubmit}>
        <FormBtn type="submit">
          <FormLabel>
            <FaSearch />
          </FormLabel>
        </FormBtn>

        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleNameChange}
        />
      </Form>
    </SearchBar>
  );
};

export default Searchbar;
