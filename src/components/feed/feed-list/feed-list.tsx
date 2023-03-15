import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { IFeedDetail } from '../../../models/IFeed';
import { fetchBurgersData } from '../../../services/burger/actions/action-creators';
import FeedItem from '../feed-item/feed-item';

type TFeedListPros = {
  page?: 'profile' | 'feed'
}

const FeedList = ({page}: TFeedListPros) => {
  const { orders } = useAppSelector(state => state.feed);
  const { burgersData } = useAppSelector(state => state.burgers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!burgersData.length) dispatch(fetchBurgersData());
  }, [burgersData, dispatch]);

  //Для страницы профиля приходит сортировка обратном порядке
  const orderSort= useMemo(() => {
    if (page !== 'profile') return orders;
    return[...orders].reverse();
  }, [orders, page])

  return (
    <>
      {
        !!orderSort.length && orderSort.map((item: IFeedDetail) => {
          return (
            <FeedItem item={item} burgersData={burgersData} key={item._id} withStatus={page === 'profile'} />
          )}
        )
      }
    </>
  )
}

export default FeedList;