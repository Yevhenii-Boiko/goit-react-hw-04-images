import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ srcLarge, altLarge, onModalClick }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onModalClick(null);
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onModalClick(null);
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <img src={srcLarge} alt={altLarge} />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
};

export default Modal;
