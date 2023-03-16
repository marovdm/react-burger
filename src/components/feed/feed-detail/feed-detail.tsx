
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getOrderInfo } from '../../../services/orders/actions/action-creators';
import { IIngredient } from '../../../models/IIngredient';

import classNames from 'classnames';
import cnBind from 'classnames/bind';

import styles from '../feed.module.scss';
import { calculatePrice } from '../../../utils/helpers/calculate-price';

const cx = cnBind.bind(styles);

const statusTranslate = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится'
};

type TForReduce = {
  [key: string]: number
}

interface IIngredientInOrder extends IIngredient {
  countInOrder: number
}

const FeedDetail = () => {
  const [ingredientsInOrder, setIngredientsInOrder] = useState<IIngredientInOrder[]>([])
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
      const countIngredients = viewedOrder.ingredients.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {} as TForReduce);

      const filtered = burgersData
        .filter((ingredient) => viewedOrder.ingredients.includes(ingredient._id))
        .map((ingredient) => { return { ...ingredient, countInOrder: countIngredients[ingredient._id] } });

      setIngredientsInOrder(filtered);
    }
  }, [burgersData, dispatch, id, viewedOrder]);

    // Вычисление стоимости заказа
    const orderPrice = useCallback(() => {
      if (!viewedOrder) return;
      const filteredToPrice = viewedOrder.ingredients.map(item => {
        return burgersData.find(el => el._id === item)
      }) as IIngredient[];
      return calculatePrice(filteredToPrice);
    }, [burgersData, viewedOrder]);

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
                let count = item.type === 'bun' ? 2 : item.countInOrder
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
              <span>{orderPrice()}</span>
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