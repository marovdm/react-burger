import { useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';
import { resetPassword } from '../../utils/api/user-api';

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

  const handleForgot = () => {
    resetPassword(state.email)
      .then(res => {
        if (res.success) {
          console.log('SUCCESS');
          // TODO Rewrite with ROUTER methods
          window.location.pathname = '/reset-password';
        }
      })
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
          <Button htmlType="button" type="primary" size="medium" onClick={handleForgot}>
            Восстановить
          </Button>
        </div>
      </form>
    </FormConstructor>
  )
}
