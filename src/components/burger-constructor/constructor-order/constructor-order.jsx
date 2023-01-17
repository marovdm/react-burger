import { useContext, useEffect, useReducer, useState } from 'react'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-order.module.scss'
import OrderDetails from '../../order-details/order-details'
import { SelectedInredientsContext } from '../../../services/burgerContext';
import { createOrder } from '../../../utils/burger-api';

// начальное состояние useReudcer
const initialState = { total: 0 };
// функция  useReudcer
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { total: action.payload }
    default:
      return state;
  }
}
export default function ConstructorOrder() {
  const {selected} = useContext(SelectedInredientsContext);
  const [totalState, dispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState({
    orderNumber: null,
    visibleOrderModal: false,
    isLoading: true,
    hasError: false
  });

  useEffect(() => {
    // подсчет общей стоимости заказа
    // если будка - то умножаем на два, т.к. булок в заказе 2
    const calculateTotalPrice = () => {
      return selected.reduce((acc, el) => acc + (el.type==='bun' ? el.price * 2 : el.price), 0)
    }
    dispatch({ type: 'UPDATE', payload: calculateTotalPrice() })
  }, [selected])
  
  
  const handleConfirmButton = () => {
    // по нажатию на кнопку оформить заказ
    // собираем данные для отправки в api
    const selectedIds = selected.map(element => element?._id);
    createOrder(selectedIds)
      .then(data => {
        if (data.success) {
          setState({ ...state, orderNumber: data.order.number, visibleOrderModal: true, isLoading: false })
        }
      })
      .catch(err => setState({ ...state, hasError: true, isLoading: false }))
  }

  return (
    <div className={styles.order}>
        <span className='text text_type_digits-medium mr-2'>{totalState.total}</span>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="medium" disabled={!totalState.total} onClick={handleConfirmButton}>
            Оформить заказ
        </Button>
        {
          state.visibleOrderModal && 
          <OrderDetails orderNumber={state.orderNumber} onClose={() => setState({...state, visibleOrderModal: false})} 
        />}
    </div>
  )
}