import { useMemo } from 'react'
import { useAppSelector } from '../../../hooks/redux-hooks';
import FeedItem from '../feed-item/feed-item';

type TFeedListPros = {
  page?: 'profile' | 'feed'
}

const FeedList = ({page}: TFeedListPros) => {
  const { orders } = useAppSelector(state => state.feed);
  const { burgersData } = useAppSelector(state => state.burgers);

  //Для страницы профиля приходит сортировка обратном порядке
  const orderSort= useMemo(() => {
    if (page !== 'profile') return orders;
    return[...orders].reverse();
  }, [orders, page])

  return (
    <>
      {
        !!orderSort.length && orderSort.map((item) => {
          return (
            <FeedItem item={item} burgersData={burgersData} key={item._id} withStatus={page === 'profile'} />
          )}
        )
      }
    </>
  )
}

export default FeedList;