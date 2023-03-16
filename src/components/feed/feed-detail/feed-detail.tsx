
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getOrderInfo } from '../../../services/orders/actions/action-creators';
import { IIngredient } from '../../../models/IIngredient';

import classNames from 'classnames';
import cnBind from 'classnames/bind';

import styles from '../feed.module.scss';

const cx = cnBind.bind(styles);

const statusTranslate = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится'
}

const FeedDetail = () => {
  const [ingredientsInOrder, setIngredientsInOrder] = useState<IIngredient[]>([])
  const { burgersData } = useAppSelector(state => state.burgers);
  const { viewedOrder } = useAppSelector(state => state.feed);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const classes = classNames(
    cx('text text_type_main-default mb-15',{
      'text_color_success': viewedOrder?.status === 'done',
    })
  );

  useEffect(() => {
    if (!viewedOrder && id) dispatch(getOrderInfo(id));
    
    if (burgersData.length && viewedOrder) {
      const filtered = burgersData.filter((ingredient) => viewedOrder.ingredients.includes(ingredient._id));
      setIngredientsInOrder(filtered);
    }
  }, [burgersData, dispatch, id, viewedOrder]);

    // Вычисление стоимости заказа
    const calculatePrice = useCallback(() => {
      return ingredientsInOrder.reduce((acc, el) => acc + (el.type==='bun' ? el.price * 2 : el.price), 0)
    }, [ingredientsInOrder]);

  return (
    <>
    {
      viewedOrder && (
        <div className={styles.feed_detail}>
          <p className={`${styles.feed_detail__title} text text_type_digits-default mb-10`}>{viewedOrder.number}</p>
          <h5 className='text text_type_main-medium mb-6'>
            {viewedOrder.name}
          </h5>
          <p className={classes}>
            {statusTranslate[viewedOrder.status]}
          </p>
          <h5 className='text text_type_main-medium mb-6'>
            Состав:
          </h5>
          <ul className={`${styles.feed_detail__list} custom-scroll mb-10`}>
            {
              !!ingredientsInOrder.length && ingredientsInOrder.map((item) => {
                let count = item.type === 'bun' ? 2 : 1
                return (
                  <li className={styles.feed_detail__item} key={item._id}>
                    <span className={styles.feed_detail__preview}>
                      <img src={item.image_mobile} alt="ingredient" />
                    </span>
                    <span className='text text_type_main-default'>{item.name}</span>
                    <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
                      {count} x  {item.price} 
                      <CurrencyIcon type="primary" />
                    </span>
                </li>
                )
              })
            }
          </ul>
          <div className={styles.feed_row}>
            <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(viewedOrder.createdAt)} />
            <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
              <span>{calculatePrice()}</span>
              <CurrencyIcon type="primary" />
            </span>
          </div>
        </div>
      )
    }
    </>
  )
}

export default FeedDetail;