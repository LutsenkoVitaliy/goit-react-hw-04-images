import React, { Component } from 'react';
import { SearchbarHead, SearchForm, SearchButton, SearchButtonLabel, InputSearch } from './Searchbar.styled';
import { toast } from 'react-toastify';


class Searchbar extends Component {
  state = { 
    pictureName : '',
  }

  handleNameChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase()})
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.pictureName.trim() === '') {
      toast.error('Input name !');
      return;
    }
    this.props.onSearchSubmit(this.state.pictureName)
    this.setState({pictureName: ''})
  }
  
  render() {
    const { pictureName } = this.state
  return (
  <SearchbarHead>
    <SearchForm onSubmit={this.handleSubmit}>
      <SearchButton type="submit" >
        <SearchButtonLabel>Search</SearchButtonLabel>
      </SearchButton>
      <InputSearch
      onChange={this.handleNameChange}
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
}

export default Searchbar;