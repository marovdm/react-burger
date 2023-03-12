import React from 'react'
import styles from '../feed.module.scss';

const FeedItem = () => {
  return (
    <div className={`${styles.feed_item} p-6`}>
      <div className={`${styles.feed_row} text_type_main-default mb-6`}>
        <span>#034535</span>
        <span className='text_color_inactive'>Сегодня, 16:20</span>
      </div>
      <h5 className='text text_type_main-medium mb-6'>
        Death Star Starship Main бургер
      </h5>
      <div>

      </div>
    </div>
  )
}

export default FeedItem