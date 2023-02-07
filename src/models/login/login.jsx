import { useState,useEffect } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../services/user/reducers/action-creators';

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
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();

  const { isAuth, hasError,  } = useSelector(state => state.user);

  useEffect(() => {
    if (isAuth && !hasError) {
      console.log(state)
      navigate(state?.from.pathname || '/profile');
    }

  }, [isAuth, hasError, navigate, state])

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(userLogin({...loginForm}));
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
