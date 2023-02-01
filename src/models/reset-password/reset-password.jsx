import { useState } from 'react';
import { Button, Input, PasswordInput,  } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

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
    code: ''
  })

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <FormConstructor header={"Восстановление пароля"} footerLinks={footerLinks}>
      <form>
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
            value={state.code}
            name={'name'}
            extraClass="mb-6"
          />
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </FormConstructor>
  )
}
