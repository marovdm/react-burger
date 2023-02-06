import { useState } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Auth from '../../utils/api/auth';
import { setAuth, setCredentials, setError, setLoading } from '../../services/user/reducers/user-slice';
import { USER } from '../../utils/consts';

const footerLinks = [
  {
    'text': 'Вы — новый пользователь?',
    'linkText': 'Зарегистрироваться',
    'href': '/register'
  },
  {
    'text': 'Забыли пароль?',
    'linkText': 'Восстановить пароль',
    'href': '/forgot-password'
  }
];

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    hasError: false
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setLoginForm({
      ...loginForm,
      hasError: false,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await Auth.login({...loginForm});
      if (response.data.success) {
        const { user, accessToken, refreshToken } = response.data;
        const authToken = accessToken.split('Bearer ')[1];
  
        localStorage.setItem('accessToken', authToken);
        localStorage.setItem('refreshToken', refreshToken);
          
        dispatch(setError(''));
        dispatch(setCredentials(user));
        dispatch(setAuth(true));
        navigate(state?.path || '/profile');
      }
    } catch (err) {
      const {response} = err;
      if (response.status === 401 && response.data.message === "email or password are incorrect") {

        dispatch(setError('Неправильный логин или пароль'))
      }
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <FormConstructor header={"Вход"} footerLinks={footerLinks}>
      <form onSubmit={handleLogin}>
        <div className="mb-20">
          <EmailInput
            onChange={handleChangeInput}
            value={loginForm.email}
            name={'email'}
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={handleChangeInput}
            value={loginForm.password}
            name={'password'}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
    </FormConstructor>      
  )
}
