import FeedDetail from '../../components/feed/feed-detail/feed-detail';
import Preloader from '../../components/preloader/preloader';
import { useAppSelector } from '../../hooks/redux-hooks';
import styles from './feed-detail-container.module.scss'

const FeedDetailContainer = () => {
  const { isLoading, hasError, error } = useAppSelector(state => state.burgers);

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