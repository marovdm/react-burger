import styles from './modal-overlay.module.scss';

type ModalOverlayProps = {
  onClose: () => void;
}

export default function ModalOverlay({onClose}: ModalOverlayProps) {
  return (
    <div onClick={onClose} className={styles.overlay}></div>
  )
}
