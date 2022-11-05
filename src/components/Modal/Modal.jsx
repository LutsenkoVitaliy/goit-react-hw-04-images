import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalItem } from "./Modal.styled";
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');
export default function Modal({ onClose, children }) {
  
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose()
    }
  };
  
  const handleClickBackDrop = e => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  });
  
  return createPortal (
  <Overlay onClick={handleClickBackDrop}>
    <ModalItem>{children}</ModalItem>
  </Overlay>, modalRoot 
    );
}
 

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
}