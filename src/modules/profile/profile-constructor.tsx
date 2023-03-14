import { useEffect, useMemo } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import classNames from 'classnames';
import cnBind from 'classnames/bind';

import ProfileOrders from './profile-orders';
import Preloader from '../../components/preloader/preloader';
import ProfileForm from './profile-form';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchUserProfile, userLogout } from '../../services/user/action-creators';

import styles from './profile.module.scss';
const cx = cnBind.bind(styles);

export default function ProfileConstructor() {
  const {isLoading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const matchProfile = useMatch('profile');
  const matchProfileOrders= useMatch('profile/orders/');
  const matchOrder= useMatch('profile/orders/:id');

  const link = classNames('text_type_main-medium text_color_inactive', cx('profile_link'));
  const activeLink = classNames('text_type_main-medium', cx('profile_link'));

  useEffect(() => {
    dispatch(fetchUserProfile()); 
  }, [dispatch])

  const content = useMemo(() => {
    return (
      matchProfile ? <ProfileForm /> :
      matchProfileOrders ? <ProfileOrders /> : 
      matchOrder ? <ProfileOrders /> : <p>Sorry</p>
    )

  }, [matchProfile, matchProfileOrders, matchOrder]);

  const handleLogout = async () => {
    dispatch(userLogout());
  }

  return (
    <>
      {
        isLoading ? 
        <Preloader /> : (
          <main className={styles.profile}>
            <aside className={styles.profile_menu}>
              <NavLink className={({isActive}) => isActive ? activeLink : link} to="/profile" end>Профиль</NavLink>
              <NavLink className={({isActive}) => isActive ? activeLink : link} to="/profile/orders" end>История заказов</NavLink>
              <p className={link} onClick={handleLogout}>Выход</p>
              <p className="text text_type_main-default text_color_inactive mt-20">
                В этом разделе вы можете
                изменить свои персональные данные
              </p>
            </aside>
            <section>
              {content}
            </section>
          </main>
        )
      }
    </>
  )
}
