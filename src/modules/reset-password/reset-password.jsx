import { useState, useEffect } from 'react';
import { Button, Input, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';
import { setError, setLoading } from '../../services/user/reducers/user-slice';
import Auth from '../../utils/api/auth';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { URLS } from '../../utils/consts';

const footerLinks = [
  {
    'text': 'Вспомнили пароль?',
    'linkText': 'Войти',
    'href': '/login'
  },
  
];

export default function ResetPasssword() {
  const [state, setState] = useState({
    password: '',
    token: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Если пользователь сразу переходит на /reset-password, минуя предыдущий шаг - вернем его
    if (location.state !== 'reset') {
      navigate(URLS.FORGOT_PASSWORD);
    }
  }, [location, navigate]);
 

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleResetPassword = async(e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await Auth.resetPassword({...state});
      if (response.data.success && response.data.message === 'Password successfully reset') {
        dispatch(setError(''));
        navigate(URLS.PROFILE);
      }
    } catch (err) {
      const {response} = err;
      if (response.status === 404 && response.data.message === "Incorrect reset token") {
        dispatch(setError('Неверный код из письма'))
      }
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <FormConstructor header={"Восстановление пароля"} footerLinks={footerLinks}>
      <form onSubmit={handleResetPassword}>
        <div className="mb-20">
          <PasswordInput
            onChange={handleChangeInput}
            placeholder={'Введите новый пароль'}
            value={state.password}
            name={'password'}
            extraClass="mb-6"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChangeInput}
            value={state.token}
            name={'token'}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="medium" disabled={!state.password || !state.token}>
            Сохранить
          </Button>
        </div>
      </form>
    </FormConstructor>
  )
}
