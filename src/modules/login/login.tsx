import { useState, FormEvent } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

import { userLogin } from '../../services/user/reducers/action-creators';
import { useAppDispatch } from '../../hooks/redux-hooks';

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
  const dispatch = useAppDispatch();

  const handleChangeInput = (e: FormEvent<HTMLInputElement>) => {
    const {value, name} = e.currentTarget;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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
          {/* errorText="Введите корректный e-mail" */}
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
