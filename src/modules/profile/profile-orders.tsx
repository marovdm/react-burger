
import { useEffect } from "react";
import FeedList from "../../components/feed/feed-list/feed-list";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { connect, disconnect } from "../../services/feed/actions/actions";
import { WS } from "../../utils/consts";

import styles from './profile.module.scss';

export default function ProfileOrders() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const url = `${WS.WS_USER_ORDERS}?token=${accessToken}`;
    dispatch(connect(url));

    return () => {   
      dispatch(disconnect());
    }
  }, [dispatch]);

  return (
    <div className={`${styles.profile_orders} pr-2 custom-scroll`}>
      <FeedList page="profile" />
    </div>
  )
}
