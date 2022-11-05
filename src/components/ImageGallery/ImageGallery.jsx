import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from '../Loader';
import Button from 'components/Button';

import api from 'components/services/pixabay-api';
import { GalleryList } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = { 
    pictures: [],
    error: null,
    status: 'idle',
    page: 1,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictureName;
    const nextName = this.props.pictureName;
    const prevPage = prevState.page;
    const nextPage = this.state.page

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      api.fetchPixabayPicture(nextName)
        .then(data => {
          this.setState({ pictures: data.hits, status: 'resolved' })
          if (data.total === 0) {
            return Promise.reject( new Error(`Фото с именем ${nextName} не найдены`))
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
    }

    if (prevPage !== nextPage) {
      api.fetchPixabayPicture(nextName, nextPage)
        .then(picture => {
          this.setState({
            pictures: nextPage > 1 ?
              [...prevState.pictures, ...picture.hits] :
              picture.hits
        })
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
    }
  };
  
  onLoadMore() {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { pictures, status, error } = this.state
    console.log(pictures.length);


    if (status === 'idle') {
      return <h1>Введите имя каринки</h1>
    };
    
    if(status === 'pending') {
      return <Loader />
    };
    
    if (status === 'rejected') {
      return <h1>{error.message}</h1>
    }

    if (status === 'resolved') { 
      return (
      <>
      <GalleryList>
        <ImageGalleryItem pictures={pictures} openModal={this.props.openModal}/> 
      </GalleryList>  
          {pictures.length >= 12 && <Button onLoadMore={() => this.onLoadMore()} />}
      </>    
      )
    }
  }}

export default ImageGallery;
