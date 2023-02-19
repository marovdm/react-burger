import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-order.module.scss';
import OrderDetails from '../../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../preloader/preloader';
import { createOrderQuery } from '../../../services/burger/reducers/action-creators';
import { toggleOpenedOrderModal } from '../../../services/burger/reducers/order-slice';
import { allAddedSelector, totalPriceSelector } from '../../../services/burger/selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../../../utils/consts';

export default function ConstructorOrder() {
  const dispatch = useDispatch();
  const {order, isOpenedOrderModal, isLoading, error, hasError} = useSelector(state => state.order);
  const { isAuth } = useSelector(state => state.user);
  const navigate = useNavigate();

  const totalPriceOrder = useSelector(totalPriceSelector);
  const allAddedIngredients = useSelector(allAddedSelector);

  const closeOrderModal = () => {
    dispatch(toggleOpenedOrderModal(false))
  }
  
  const handleConfirmButton = () => {
    // по нажатию на кнопку оформить заказ
    // проверяем авторизован ли пользователь
    if (!isAuth) {
      navigate(URLS.MAIN, { state: { from: { pathname: '/' }} });
      return;
    }
    const ids = allAddedIngredients.map(element => element?._id);
    dispatch(createOrderQuery(ids));
  }

  return (
    <div className={styles.order}>
      <span className='text text_type_digits-medium mr-2'>{totalPriceOrder}</span>
      <CurrencyIcon type="primary" />
      <Button htmlType="button" type="primary" size="medium" disabled={!totalPriceOrder} onClick={handleConfirmButton}>
          Оформить заказ
      </Button>
      {
        isLoading && <Preloader />
      }
      {
        isOpenedOrderModal &&
          <OrderDetails orderNumber={order?.number} error={error} hasError={hasError} onClose={() => closeOrderModal()} />
      }
    </div>
  )
}