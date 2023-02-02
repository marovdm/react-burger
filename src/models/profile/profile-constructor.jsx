import { NavLink, useMatch } from 'react-router-dom';
import classNames from 'classnames';
import cnBind from 'classnames/bind';

import styles from './profile-constructor.module.scss';
import Profile from './profile';
import ProfileOrders from './profile-orders';
import { useMemo } from 'react';
const cx = cnBind.bind(styles);

export default function ProfileConstructor() {
  const matchProfile = useMatch('profile');
  const matchProfileOrders= useMatch('profile/orders/');
  const matchOrder= useMatch('profile/orders/:id');

  const link = classNames('text_type_main-medium text_color_inactive', cx('profile_link'));
  const activeLink = classNames('text_type_main-medium', cx('profile_link'));

  const content = useMemo(() => {
    return (
      matchProfile ? <Profile /> :
      matchProfileOrders ? <ProfileOrders /> : 
      matchOrder ? <ProfileOrders /> : <p>Sorry</p>
    )

  }, [matchProfile, matchProfileOrders, matchOrder]);

  return (
    <main className={styles.profile}>
      <aside className={styles.profile_menu}>
        <NavLink className={({isActive}) => isActive ? activeLink : link} to="/profile" end>Профиль</NavLink>
        <NavLink className={({isActive}) => isActive ? activeLink : link} to="/profile/orders" end>История заказов</NavLink>
        <NavLink className={({isActive}) => isActive ? activeLink : link} to="/logout">Выход</NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </aside>
      <section className={styles.profile_content}>
        {content}
      </section>
    </main>
  )
}
