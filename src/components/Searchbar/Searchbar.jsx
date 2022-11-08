import { useState } from 'react';
import PropTypes from "prop-types";
import { SearchbarHead, SearchForm, SearchButton, SearchButtonLabel, InputSearch } from './Searchbar.styled';
import { toast } from 'react-toastify';

export default function Searchbar ({onSearchSubmit}) {
  const [pictureName, setPictureName] = useState('')

  const handleNameChange = e => {
    setPictureName(e.currentTarget.value.toLowerCase());
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (pictureName.trim() === '') {
      toast.error('Input name !');
      return;
    }
    onSearchSubmit(pictureName);
    setPictureName('');
  }

    return (
  <SearchbarHead>
    <SearchForm onSubmit={handleSubmit}>
      <SearchButton type="submit" >
        <SearchButtonLabel>Search</SearchButtonLabel>
      </SearchButton>
      <InputSearch
      onChange={handleNameChange}
      value={pictureName}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      />
    </SearchForm>
  </SearchbarHead>
    );
}

Searchbar.propType = {
  onSearchSubmit: PropTypes.func.isRequired
};
  
