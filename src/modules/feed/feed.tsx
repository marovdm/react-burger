import React, { useEffect } from 'react'
import FeedBoard from '../../components/feed/feed-board/feed-board';
import FeedList from '../../components/feed/feed-list/feed-list';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { connect, disconnect } from '../../services/feed/actions';
import { WS } from '../../utils/consts';

import styles from '../../components/feed/feed.module.scss';

const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(WS.WS_ALL_ORDERS))

    return () => {
      console.log('destroy');      
      dispatch(disconnect())
    }
  }, [dispatch])

  return (
    <>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <div className='row'>
        <section className={`${styles.feed_section} ${styles.feed_section__left} pr-2 custom-scroll`}>
          <FeedList  />
        </section>
        <section className={styles.feed_section}>
          <FeedBoard />
        </section>
      </div>
    </>
  )
}

export default Feed;