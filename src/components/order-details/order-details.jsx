import Modal from '../modal/modal'
import doneImg from '../../images/icons/done.png';

export default function OrderDetails({orderDetail, onClose}) {
  return (
    <Modal onClose={onClose} className="pt-10 pb-30">
        <p className="text text_type_digits-large mb-8">034536</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={doneImg} alt="done" />
        <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </Modal>
  )
}
