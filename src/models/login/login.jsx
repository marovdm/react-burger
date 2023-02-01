import { useState } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

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
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <FormConstructor header={"Вход"} footerLinks={footerLinks}>
      <form>
        <div className="mb-20">
          <EmailInput
            onChange={handleChangeInput}
            value={state.email}
            name={'email'}
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={handleChangeInput}
            value={state.password}
            name={'password'}
            extraClass="mb-6"
          />
          <Button htmlType="button" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
    </FormConstructor>      
  )
}
