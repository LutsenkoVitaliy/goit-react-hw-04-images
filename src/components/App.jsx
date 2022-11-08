import { useState } from "react";
import { Container } from "./App.styled";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from "./ImageGallery";
import Searchbar from "./Searchbar";
import Modal from "./Modal";

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState({})
  const [page, setPage] = useState(1);
    


 const handleSearchSubmit = pictureName => {
   setPictureName(pictureName)
   setPage(1)
  }
  
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const openModalIMG = (evt) => {
    toggleModal();
    const modalImg = {
      largeImageURL: evt.currentTarget.dataset.url,
      alt: evt.currentTarget.alt,
    };
    setModalImg(modalImg)
  }

  return (
    <Container>
        {!showModal && <Searchbar onSearchSubmit={handleSearchSubmit} />}
        <ImageGallery pictureName={pictureName} openModal={openModalIMG} page={page} setPage={setPage} />
      
        {showModal &&
          <Modal onClose={toggleModal}>
            <img src={modalImg.largeImageURL} alt={modalImg.alt} />
          </Modal>}
          
      <ToastContainer autoClose={3000} />
    </Container>
    );
}

 



