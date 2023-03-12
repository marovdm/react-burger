import React from 'react'
import FeedBoard from '../../components/feed/feed-board/feed-board';
import FeedList from '../../components/feed/feed-list/feed-list';

const Feed = () => {
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