import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = {
    srcLarge: this.props.srcLarge,
    altLarge: this.props.altLarge,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onModalClick(null);
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onModalClick(null);
    }
  };

  render() {
    const { srcLarge, altLarge } = this.state;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>
          <img src={srcLarge} alt={altLarge} />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
