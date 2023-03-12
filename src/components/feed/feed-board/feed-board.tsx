import React from 'react'
import styles from '../feed.module.scss';

const FeedBoard = () => {
  return (
    <section className={styles.feed_section}>
      <div className={`${styles.feed_row} mb-15`}>
        <div className={styles.feed_status}>
          <h5 className='text text_type_main-medium mb-6'>
            Готовы:
          </h5>
          <ul className={`${styles.feed_list}`}>
            <li className='text text_type_digits-default text_color_success'>034533</li>
            <li className='text text_type_digits-default text_color_success'>034532</li>
            <li className='text text_type_digits-default text_color_success'>034530</li>
            <li className='text text_type_digits-default text_color_success'>034527</li>
            <li className='text text_type_digits-default text_color_success'>034525</li>
          </ul>
        </div>
        <div className={styles.feed_status}>
          <h5 className='text text_type_main-medium mb-6'>
            В работе:
          </h5>
          <ul className={styles.feed_list}>
            <li className='text text_type_digits-default'>034538</li>
            <li className='text text_type_digits-default'>034541</li>
            <li className='text text_type_digits-default'>034542</li>
          </ul>
        </div>
      </div>

      <>
        <h5 className='text text_type_main-medium'>
          Выполнено за все время:
        </h5>
        <p className={`${styles.feed_count} text text_type_digits-large mb-15`}>28 752</p>
      </>

      <>
        <h5 className='text text_type_main-medium'>
          Выполнено за сегодня:
        </h5>
        <p className={`${styles.feed_count} text text_type_digits-large`}>138</p>
      </>
    </section>
  )
}

export default FeedBoard;