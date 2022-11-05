import { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalItem } from "./Modal.styled";
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose()
    }
  };
  
  handleClickBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose()
    }
  };
  
  render() { 
    return createPortal (
  <Overlay onClick={this.handleClickBackDrop}>
    <ModalItem>{this.props.children}</ModalItem>
  </Overlay>, modalRoot 
    );
  }
}
 
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
}