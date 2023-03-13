import React, { Component } from 'react';
import { toast } from 'react-hot-toast';
import {
  SearchBar,
  Form,
  FormBtn,
  FormLabel,
  FormInput,
} from './SearchBar.styled';
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleNameChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.searchValue) {
      toast.error('Enter something!');
      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
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
            value={this.state.searchValue}
            onChange={this.handleNameChange}
          />
        </Form>
      </SearchBar>
    );
  }
}

export default Searchbar;
