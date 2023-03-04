import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './constructor-order.module.scss';
import OrderDetails from '../../order-details/order-details';
import Preloader from '../../preloader/preloader';
import { createOrderQuery } from '../../../services/orders/action-creators';
import { toggleOpenedOrderModal } from '../../../services/orders/order-slice';
import { allAddedSelector, totalPriceSelector, orderSelector } from '../../../services/burger/selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../../../utils/consts';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { IIngredient } from '../../../models/IIngredient';

export default function ConstructorOrder() {
  const dispatch = useAppDispatch();
  const { isOpenedOrderModal, isLoading, error, hasError} = useAppSelector(state => state.order);
  const { isAuth } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const order = useAppSelector(orderSelector);
  const totalPriceOrder = useAppSelector(totalPriceSelector);
  const allAddedIngredients = useAppSelector(allAddedSelector);

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
    const ids = allAddedIngredients.map((element: IIngredient) => element?._id);
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
        isOpenedOrderModal && order &&
          <OrderDetails orderNumber={order.number} error={error} hasError={hasError} onClose={() => closeOrderModal()} />
      }
    </div>
  )
}