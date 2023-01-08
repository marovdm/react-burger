import React from 'react'
import { createPortal } from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import modalStyles from './modal.module.scss';

const modalRoot = document.getElementById("modals");

export default function Modal({header, className, children, onClose}) {
    return createPortal(
        <>
          <div className={`${modalStyles.modal} ${className}`} role="dialog">
            <ModalHeader onClose={onClose}>{header}</ModalHeader>
            <div className={modalStyles.content}>
              {children}
            </div>
          </div>
          <ModalOverlay onClose={onClose} />
        </>,
        modalRoot
    );
}

