import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEscape);
  }

  handleCloseModalByEscape = e => {
    if (e.code === 'Escape') {
      console.log('Escape');
      this.props.closeModal();
    }
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { image, descr } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleCloseModal}>
        <div className={s.Modal}>
          <img src={image} alt={descr} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
