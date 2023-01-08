import overlayStyles from './modal-overlay.module.scss';

export default function ModalOverlay({onClose}) {

  return (
    <div onClick={onClose} className={overlayStyles.overlay}></div>
  )
}
