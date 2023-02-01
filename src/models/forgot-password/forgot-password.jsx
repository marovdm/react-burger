import { useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

const footerLinks = [
  {
    'text': 'Вспомнили пароль?',
    'linkText': 'Войти',
    'href': '/login'
  },
];

export default function ForgotPasssword() {
  const [state, setState] = useState({
    email: ''
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
          <EmailInput
            onChange={handleChangeInput}
            value={state.email}
            placeholder={'Укажите e-mail'}
            name={'email'}
            isIcon={false}
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
