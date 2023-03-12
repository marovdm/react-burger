import React from 'react'
import FeedItem from '../feed-item/feed-item';
import styles from '../feed.module.scss';

const FeedList = () => {
  return (
    <section className={`${styles.feed_section} ${styles.feed_section__left} custom-scroll`}>
      <FeedItem />
      <FeedItem />
      <FeedItem />
      <FeedItem />
      <FeedItem />
      <FeedItem />
    </section>
  )
}

export default FeedList;