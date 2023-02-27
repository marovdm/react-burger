import { Ref, FormEvent, useRef, useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.scss';
import Profile from '../../utils/api/profile';
import { setCredentials, setLoading } from '../../services/user/reducers/user-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.user);
  const [disabledName, setDisabledName] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [state, setState] = useState({
    ...user,
    password: ''
  });

  const inputRef: Ref<HTMLInputElement> = useRef(null);

  const onIconClick = () => {
    setDisabledName(false);
    console.log(inputRef);
    
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  const handleChangeInput = (e: FormEvent<HTMLInputElement>) => {
    const {value, name} = e.currentTarget;
    setState({
      ...state,
      [name]: value,
    });
    if (!showControls) setShowControls(true);
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
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

    setShowControls(false);
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
      />
      <PasswordInput
        onChange={handleChangeInput}
        value={state.password}
        name={'password'}
        extraClass="mb-6"
        required
      />
      {
        showControls && (
          <>
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
          </>
        )
      }
     
    </form>
  )
}
