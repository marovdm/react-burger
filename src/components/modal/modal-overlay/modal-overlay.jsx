import styles from './modal-overlay.module.scss';
import PropTypes from 'prop-types';

export default function ModalOverlay({onClose}) {
  return (
    <div onClick={onClose} className={styles.overlay}></div>
  )
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}
