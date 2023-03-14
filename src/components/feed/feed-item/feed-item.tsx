import {FC, useCallback, useMemo} from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IFeedDetail } from '../../../models/IFeed';
import { IIngredient } from '../../../models/IIngredient';

import styles from '../feed.module.scss';
import FeedIngredient from './feed-ingredient';
import { Link } from 'react-router-dom';

type TFeedItem = {
  item: IFeedDetail,
  burgersData: IIngredient[]
}

const FeedItem: FC<TFeedItem> = ({item, burgersData}) => {
  const maxIngredientsViewed = 6;

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

  const previewIngredients = useMemo(() => {
    return usedIngredients.slice(0, maxIngredientsViewed)
  }, [])

  return (
    <Link to={`/feed/${item.number}`} className={`${styles.feed_item} p-6`}>
      <div className={`${styles.feed_row} text_type_main-default mb-6`}>
        <span>#{item.number}</span>
        <FormattedDate className='text_color_inactive' date={new Date(item.createdAt)} />
      </div>
      <h5 className='text text_type_main-medium mb-6'>
        {item.name}
      </h5>
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
    </Link>
  )
}

export default FeedItem