
import { FC } from 'react';
import styles from './modal-header.module.scss';

type ModalHeaderProps = {
  text?: string;
  onClose: () => void;
};

const ModalHeader: FC<ModalHeaderProps> = ({text, onClose}) => {
  return (
    <div className={styles.modalHeader}>
      {text && <p className="text text_type_main-large">{text}</p>}
      <div onClick={onClose} className={styles.closeModal}>
      </div>
    </div>
  )
}

export default ModalHeader;