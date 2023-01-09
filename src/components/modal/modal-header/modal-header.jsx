
import styles from './modal-header.module.scss';
import PropTypes from 'prop-types';

export default function ModalHeader({text, onClose}) {
  return (
    <div className={styles.modalHeader}>
      {text && <p className="text text_type_main-large">{text}</p>}
      <div onClick={onClose} className={styles.closeModal}>
      </div>
    </div>
  )
}

ModalHeader.propTypes = {
  text: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}
