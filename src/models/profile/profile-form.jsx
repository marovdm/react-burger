import { useRef, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.scss';
import Profile from '../../utils/api/profile';
import { setCredentials, setLoading } from '../../services/user/reducers/user-slice';

export default function ProfileForm() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [disabledName, setDisabledName] = useState(true);
  const [state, setState] = useState({
    ...user,
    password: ''
  });

  const inputRef = useRef(null);

  const onIconClick = () => {
    setDisabledName(false)
    setTimeout(() => inputRef.current.focus(), 0);
  }

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
      console.warn(err);
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
        required
        ref={inputRef}
        disabled={disabledName}
        onIconClick={onIconClick}
        extraClass='mb-6 profile_input'
        onChange={handleChangeInput}
        value={state.name}
      />
      <EmailInput
        onChange={handleChangeInput}
        value={state.email}
        name={'email'}
        required
        isIcon={true}
        extraClass="mb-6"
        errorText="Введите корректный e-mail"
      />
      <PasswordInput
        onChange={handleChangeInput}
        value={state.password}
        name={'password'}
        extraClass="mb-6"
        required
      />

      <Button 
        htmlType="submit" 
        type="primary" 
        size="medium" 
        extraClass='mr-8' 
        disabled={!state.name || !state.email || !state.password}
      >
        Сохранить
      </Button>

      <Button htmlType="button" type="primary" size="medium" onClick={handleCancelUpdate}>
        Отмена
      </Button>
    </form>
  )
}
