
import modalHeaderStyles from './modal-header.module.scss';

export default function ModalHeader({children, onClose}) {
  return (
    <div className={modalHeaderStyles.modalHeader}>
      <p className="text text_type_main-large">{children}</p>
      <div onClick={onClose} className={modalHeaderStyles.closeModal}>
      </div>
    </div>
  )
}
