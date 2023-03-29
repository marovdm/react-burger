import { FC, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.scss';

const modalRoot = document.getElementById("modals") as HTMLElement;

type ModalHeaderProps = {
  header?: string;
  className?: string;
  children: ReactNode;
  onClose: () => void;
};

const Modal: FC<ModalHeaderProps> = ({header, className, children, onClose}) => {
  useEffect(() => {
    const handleCloseModalEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleCloseModalEsc);

    return(() => {
      document.removeEventListener('keydown', handleCloseModalEsc)
    })
  }, [onClose]);
  
  return createPortal(
    <>
      <div className={`${styles.modal} ${className}`} role="dialog" data-cy='modal'>
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

export default Modal;