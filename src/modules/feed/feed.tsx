import React, { useEffect } from 'react'
import FeedBoard from '../../components/feed/feed-board/feed-board';
import FeedList from '../../components/feed/feed-list/feed-list';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { connect, disconnect } from '../../services/feed/actions';
import { WS } from '../../utils/consts';

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
        <FeedList />
        <FeedBoard />
      </div>
    </>
  )
}

export default Feed;