import { useEffect, useState } from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-order.module.scss';
import OrderDetails from '../../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../preloader/preloader';
import { createOrderQuery } from '../../../store/reducers/action-creators';
import { toggleOpenedOrderModal } from '../../../store/reducers/order-slice';

export default function ConstructorOrder() {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const {selectedIngredients} = useSelector(state => state.burgers);
  const {orderNumber, isOpenedOrderModal, isLoading, error, hasError} = useSelector(state => state.order);

  useEffect(() => {
    // подсчет общей стоимости заказа
    // если булка - то умножаем на два, т.к. булок в заказе 2
    const calculateTotalPrice = () => {
      return selectedIngredients.reduce((acc, el) => acc + (el.type==='bun' ? el.price * 2 : el.price), 0)
    }
    setTotal(calculateTotalPrice())
  }, [selectedIngredients])

  const closeOrderModal = () => {
    dispatch(toggleOpenedOrderModal(false))
  }
  
  
  const handleConfirmButton = () => {
    // по нажатию на кнопку оформить заказ
    // собираем данные для отправки в api
    const ids = selectedIngredients.map(element => element?._id);
    dispatch(createOrderQuery(ids));
  }

  return (
    <div className={styles.order}>
      <span className='text text_type_digits-medium mr-2'>{total}</span>
      <CurrencyIcon type="primary" />
      <Button htmlType="button" type="primary" size="medium" disabled={!total} onClick={handleConfirmButton}>
          Оформить заказ
      </Button>
      {
        isLoading && <Preloader />
      }
      {
        isOpenedOrderModal &&
          <OrderDetails orderNumber={orderNumber} error={error} hasError={hasError} onClose={() => closeOrderModal()} />
      }
    </div>
  )
}