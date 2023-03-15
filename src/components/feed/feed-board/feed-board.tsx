import React from 'react'
import { useAppSelector } from '../../../hooks/redux-hooks';
import { doneOrdersSelector, inWorksOrdersSelector } from '../../../services/feed/selectors/selectors';
import styles from '../feed.module.scss';

const FeedBoard = () => {
  const { total, totalToday } = useAppSelector(state => state.feed);
  const doneOrders = useAppSelector(doneOrdersSelector);
  const inWorksOrders = useAppSelector(inWorksOrdersSelector);

  return (
    <>
      <div className='row mb-15'>
        <div className={styles.feed_status}>
          <h5 className={`${styles.feed_status__title} text text_type_main-medium mb-6`}>
            Готовы:
          </h5>
          {
            !!doneOrders.length && <ul className={`${styles.feed_list}`}>
            {
              doneOrders.map(order => 
                <li className='text text_type_digits-default text_color_success' key={order._id}>{order.number}</li>
              )}
          </ul>
          }
        </div>
        <div className={styles.feed_status}>
          <h5 className={`${styles.feed_status__title} text text_type_main-medium mb-6`}>
            В работе:
          </h5>
          {
            !!inWorksOrders.length && <ul className={styles.feed_list}>
              {
                inWorksOrders.map(order => 
                  <li className='text text_type_digits-default text_color_success' key={order._id}>{order.number}</li>
              )}
            </ul>
          }
        </div>
      </div>

      <>
        <h5 className='text text_type_main-medium'>
          Выполнено за все время:
        </h5>
        <p className={`${styles.feed_count} text text_type_digits-large mb-15`}>{total}</p>
      </>

      <>
        <h5 className='text text_type_main-medium'>
          Выполнено за сегодня:
        </h5>
        <p className={`${styles.feed_count} text text_type_digits-large`}>{totalToday}</p>
      </>
    </>
  )
}

export default FeedBoard;