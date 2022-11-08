import { useState, useEffect } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from '../Loader';
import Button from 'components/Button';

import api from 'components/services/pixabay-api';
import { GalleryList } from './ImageGallery.styled';



export default function ImageGallery({ pictureName, openModal, page, setPage }) {
   
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
 
  useEffect(() => {
    if (pictureName === '') {
      return
    }
    setStatus('pending')
    api
      .fetchPixabayPicture(pictureName, page)
      .then(picture => {
        setPictures((prevPictures) => page > 1 ? [...prevPictures, ...picture.hits]
          : picture.hits)
        setStatus('resolved')
        if (picture.total === 0) {
          return Promise.reject(new Error(`Фото с именем ${pictureName} не найдены`))
        }
      })
      .catch(error => {
        setError(error)
        setStatus('rejected')
      })
  }, [pictureName, page]);
  
  const onLoadMore = e => {
    e.preventDefault()
   setPage(prevPage => prevPage + 1)
  };


  if (status === 'idle') {
    return <h1>Введите имя каринки</h1>
  };
    
  if (status === 'pending') {
    return <Loader />
  };
    
  if (status === 'rejected') {
    return <h1>{error.message}</h1>
  }

  if (status === 'resolved') {
    return (
      <>
        <GalleryList>
          <ImageGalleryItem pictures={pictures} openModal={openModal} />
        </GalleryList>
        {pictures.length >= 12 && <Button onLoadMore={onLoadMore} />}
      </>
    )
  }
}
