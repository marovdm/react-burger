import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import cnBind from 'classnames/bind';

import styles from './profile.module.scss';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const cx = cnBind.bind(styles);

export default function Profile() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })

  const link = classNames('text text_type_main-medium text_color_inactive', cx('profile_link'));
  const activeLink = classNames('text text_type_main-medium', cx('profile_link'));

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className={styles.profile}>
      <aside className={styles.profile_menu}>
        <NavLink className={({isActive}) => isActive ? activeLink : link} to="/profile">Профиль</NavLink>
        <NavLink className={({isActive}) => isActive ? activeLink : link} to="/profile/orders">История заказов</NavLink>
        <NavLink className={({isActive}) => isActive ? activeLink : link} to="/logout">Выход</NavLink>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </aside>
      <section className={styles.menu}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          name={'name'}
          extraClass="mb-6"
          onChange={handleChangeInput}
          value={state.name}
        />
        <EmailInput
          onChange={handleChangeInput}
          value={state.email}
          name={'email'}
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChangeInput}
          value={state.password}
          name={'password'}
          extraClass="mb-6"
          isIcon={true}
        />
      </section>
    </main>
  )
}
