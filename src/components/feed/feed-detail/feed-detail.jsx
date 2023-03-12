import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react'
import styles from '../feed.module.scss';

const FeedDetail = () => {
  return (
    <div className={styles.feed_detail}>
      <p className={`${styles.feed_detail__title} text text_type_digits-default mb-10`}>#034533</p>
      <h5 className='text text_type_main-medium mb-6'>
        Black Hole Singularity острый бургер
      </h5>
      <p className='text text_type_main-default mb-15 text_color_success'>
        Выполнен
      </p>
      <h5 className='text text_type_main-medium mb-6'>
        Состав:
      </h5>
      <ul className={`${styles.feed_detail__list} custom-scroll mb-10`}>
        <li className={styles.feed_detail__item}>
          <span className={styles.feed_detail__preview}></span>
          <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          <span className={`${styles.feed_detail__price} text text_type_digits-default`}>2 x 20</span>
        </li>
        <li className={styles.feed_detail__item}>
          <span className={styles.feed_detail__preview}></span>
          <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
            2 x 20 
            <CurrencyIcon type="primary" />
          </span>
        </li>
        <li className={styles.feed_detail__item}>
          <span className={styles.feed_detail__preview}></span>
          <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
            2 x 20 
            <CurrencyIcon type="primary" />
          </span>
        </li>
        <li className={styles.feed_detail__item}>
          <span className={styles.feed_detail__preview}></span>
          <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
            2 x 20 
            <CurrencyIcon type="primary" />
          </span>
        </li>
        <li className={styles.feed_detail__item}>
          <span className={styles.feed_detail__preview}></span>
          <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
            2 x 20 
            <CurrencyIcon type="primary" />
          </span>
        </li>
        <li className={styles.feed_detail__item}>
          <span className={styles.feed_detail__preview}></span>
          <span className='text text_type_main-default'>Флюоресцентная булка R2-D3</span>
          <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
            <span>2 x 20</span> 
            <CurrencyIcon type="primary" />
          </span>
        </li>
      </ul>
      <div className={styles.feed_row}>
        <span className='text text_type_main-default text_color_inactive'>Вчера, 13:50</span>
        <span className={`${styles.feed_detail__price} text text_type_digits-default`}>
          <span>510</span>
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  )
}

export default FeedDetail