import { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.scss';
import Profile from '../../utils/api/profile';
import { setCredentials, setLoading } from '../../services/user/reducers/user-slice';

export default function ProfileForm() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [state, setState] = useState({
    ...user,
    password: ''
  });

  const handleChangeInput = (e) => {
    const {value, name} = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await Profile.updateProfile({...state})
      if (response.data.success) {
        dispatch(setCredentials(response.data.user))
      }
    } catch (err) {
      console.log(err);
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  const handleCancelUpdate = () => {
    setState({
      ...user,
      password: ''
    });
  }

  return (
    <form className={styles.profile_form} onSubmit={handleUpdateProfile}>
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
      />

      <Button htmlType="submit" type="primary" size="medium" extraClass='mr-8'>
        Сохранить
      </Button>

      <Button htmlType="button" type="primary" size="medium" onClick={handleCancelUpdate}>
        Отмена
      </Button>
    </form>
  )
}
