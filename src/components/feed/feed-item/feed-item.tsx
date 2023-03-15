import {FC, useCallback, useMemo} from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IFeedDetail } from '../../../models/IFeed';
import { IIngredient } from '../../../models/IIngredient';

import styles from '../feed.module.scss';
import FeedIngredient from './feed-ingredient';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import cnBind from 'classnames/bind';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { viewDetailOrder } from '../../../services/feed/actions/actions';

type TFeedItem = {
  item: IFeedDetail,
  burgersData: IIngredient[],
  withStatus?: boolean
};

const statusTranslate = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится'
}

const cx = cnBind.bind(styles);

const FeedItem: FC<TFeedItem> = ({item, burgersData, withStatus}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const maxIngredientsViewed = 6;
  const classes = classNames(
    cx('text_type_main-default mt-2',{
      'text_color_success': item.status === 'done',
    })
  );
  const usedIngredients = useMemo(() => {
    // ингредиенты в заказе
    const ingredientsInOrder = item.ingredients;
    // отфильтрованные данные
    return burgersData.filter(ingredient => ingredientsInOrder.includes(ingredient._id))
  }, [burgersData, item.ingredients]);

  // Вычисление стоимости заказа
  const calculatePrice = useCallback(() => {
    return usedIngredients.reduce((acc, el) => acc + (el.type==='bun' ? el.price * 2 : el.price), 0)
  }, [usedIngredients]);

  // видимые ингредиенты в заказе
  const previewIngredients = useMemo(() => {
    return usedIngredients.slice(0, maxIngredientsViewed)
  }, [usedIngredients]);

  // для открытия модалки
  const handleViewDetailOrder = () => {
    dispatch(viewDetailOrder(item));
    console.log('location', location)
    navigate(`${location.pathname}/${item.number}`, {state: { background: {...location, type: 'feed'}} })
  }

  return (
    <div className={`${styles.feed_item} p-6`} onClick={()=> handleViewDetailOrder()}>
      <div className={`${styles.feed_row} text_type_main-default mb-6`}>
        <span>#{item.number}</span>
        <FormattedDate className='text_color_inactive' date={new Date(item.createdAt)} />
      </div>
      <div className='mb-6'>
        <h5 className='text text_type_main-medium'>
          {item.name}
        </h5>
        {
          !!withStatus && <p className={classes}>
            {statusTranslate[item.status]}
          </p>
        }
      </div>
      <div className={styles.feed_row}>
        <ul className={styles.feed_item__ingredients}>
          {
            !!previewIngredients.length && previewIngredients.map((item: IIngredient, idx) => {
              let diff = usedIngredients.length - previewIngredients.length
              return (
                <FeedIngredient 
                  imgSrc={item.image_mobile} 
                  styleWrapper={{ right: `${idx * 20}px`, zIndex: maxIngredientsViewed - idx }}
                  styleImg={{opacity: !!diff && maxIngredientsViewed === idx + 1 ? 0.6 : 1 }}
                  key={item._id}
                >
                  { maxIngredientsViewed === idx + 1 ? (
                    <span className='text text_type_digits-default'>
                     { !!diff && `+${diff}`}
                    </span>
                  ) : null}
                </FeedIngredient>
              )
            })
          }
        </ul>
        <div className={`${styles.feed_item__price} text text_type_digits-default`}>
          <>{calculatePrice()}</>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default FeedItem