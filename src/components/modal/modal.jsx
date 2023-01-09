import { useEffect } from 'react'
import { createPortal } from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.scss';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modals");

export default function Modal({header, className, children, onClose}) {
  useEffect(() => {
    const handleCloseModalEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleCloseModalEsc);

    return(() => {
      document.removeEventListener('keydown', handleCloseModalEsc)
    })
  }, [onClose]);
  
  return createPortal(
    <>
      <div className={`${styles.modal} ${className}`} role="dialog">
        <ModalHeader text={header} onClose={onClose} />
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};
