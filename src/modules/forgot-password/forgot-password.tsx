import { useState, FormEvent, ChangeEvent } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';
import { setError, setLoading } from '../../services/user/user-slice';
import Auth from '../../utils/api/auth';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../../utils/consts';
import { useAppDispatch } from '../../hooks/redux-hooks';

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeEmail = (e:ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setState({
      email: value,
    });
  };

  const handleForgot = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await Auth.forgotPassword({...state});
      if (response.data.success && response.data.message === 'Reset email sent') {
        navigate(URLS.RESET_PASSWORD, {state: 'reset'});
      }
    } catch (err: any) {
      const {response} = err;
      if (response.status === 404) {
        dispatch(setError('Произошла ошибка, попробуйте позже'));
      }
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
