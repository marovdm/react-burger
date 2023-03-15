import { useEffect } from 'react';
import FeedDetail from '../../components/feed/feed-detail/feed-detail';
import Preloader from '../../components/preloader/preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchBurgersData } from '../../services/burger/reducers/action-creators';
import styles from './feed-detail-container.module.scss'

const FeedDetailContainer = () => {
  const { burgersData, isLoading, hasError, error } = useAppSelector(state => state.burgers);
  const dispatch = useAppDispatch();

  useEffect(() => { 
    if (!burgersData.length) dispatch(fetchBurgersData());
  }, [burgersData.length, dispatch]);

  if (isLoading) {
    return <Preloader />
  }

  if (hasError && error) {
    <h3 className="text text_type_main-large">{error}</h3>
  }
  
  return (
    <div className={styles.detail}>
      <FeedDetail />
    </div>
  )
}

export default FeedDetailContainer;