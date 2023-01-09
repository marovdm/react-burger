import styles from './modal-overlay.module.scss';

export default function ModalOverlay({onClose}) {
  return (
    <div onClick={onClose} className={styles.overlay}></div>
  )
}
