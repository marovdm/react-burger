import React, { useEffect } from 'react'
import FeedBoard from '../../components/feed/feed-board/feed-board';
import FeedList from '../../components/feed/feed-list/feed-list';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { connect, disconnect } from '../../services/feed/actions';
import { WS } from '../../utils/consts';

import styles from '../../components/feed/feed.module.scss';
import Preloader from '../../components/preloader/preloader';

const Feed = () => {
  const { isLoading, connectionError } = useAppSelector(state => state.feed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(WS.WS_ALL_ORDERS))

    return () => {    
      dispatch(disconnect())
    }
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />
  }

  if (connectionError) {
    <h3 className="text text_type_main-large">{connectionError}</h3>
  }

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