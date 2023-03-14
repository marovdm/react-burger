import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { IFeedDetail } from '../../../models/IFeed';
import { fetchBurgersData } from '../../../services/burger/reducers/action-creators';
import FeedItem from '../feed-item/feed-item';
import styles from '../feed.module.scss';

const FeedList = () => {
  const { orders } = useAppSelector(state => state.feed);
  const { burgersData } = useAppSelector(state => state.burgers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (burgersData.length) return;
    dispatch(fetchBurgersData());
  }, [burgersData, dispatch])

  return (
    <section className={`${styles.feed_section} ${styles.feed_section__left} pr-2 custom-scroll`}>
      {
        !!orders.length && orders.map((item: IFeedDetail) => 
          <FeedItem item={item} burgersData={burgersData} key={item._id} />
        )
      }
    </section>
  )
}

export default FeedList;