import { useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';
import { setLoading } from '../../services/user/reducers/user-slice';
import { useDispatch } from 'react-redux';
import Auth from '../../utils/api/auth';
import { useNavigate } from 'react-router-dom';

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
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    const {value} = event.target;
    setState({
      email: value,
    });
  };

  const handleForgot = async(e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await Auth.forgotPassword({...state});
      if (response.data.success && response.data.message === 'Reset email sent') {
        navigate('/reset-password', {state: 'reset'});
      }
    } catch (err) {
      const {response} = err;
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <FormConstructor header={"Восстановление пароля"} footerLinks={footerLinks}>
      <form onSubmit={handleForgot}>
        <div className="mb-20">
          <EmailInput
            onChange={handleChangeEmail}
            value={state.email}
            placeholder={'Укажите e-mail'}
            name={'email'}
            isIcon={false}
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="medium" disabled={!state.email}>
            Восстановить
          </Button>
        </div>
      </form>
    </FormConstructor>
  )
}
