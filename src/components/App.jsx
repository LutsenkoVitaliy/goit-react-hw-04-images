import { Component } from "react";
import { Container } from "./App.styled";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from "./ImageGallery";
import Searchbar from "./Searchbar";
import Modal from "./Modal";

class App extends Component {
  state = { 
    pictureName: '',
    showModal: false,
    modalImg: {}
  }

  handleSearchSubmit = pictureName => {
    this.setState({pictureName})
  }
  
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  openModalIMG = (evt) => {
    this.toggleModal();
    const modalImg = {
      largeImageURL: evt.currentTarget.dataset.url,
      alt: evt.currentTarget.alt,
    };
    this.setState({ modalImg })
  }



  render() {
    const {pictureName, showModal, modalImg} = this.state
    return (
    <Container>
        {!showModal && <Searchbar onSearchSubmit={this.handleSearchSubmit} />}
        <ImageGallery pictureName={pictureName} openModal={this.openModalIMG} />
      
        {showModal &&
          <Modal onClose={this.toggleModal}>
            <img src={modalImg.largeImageURL} alt={modalImg.alt} />
          </Modal>}
          
      <ToastContainer autoClose={3000} />
    </Container>
    );
  }
}

export default App;
