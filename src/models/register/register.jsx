import { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

import { userRegister } from '../../services/user/reducers/action-creators';
import { useDispatch } from 'react-redux';
import { setAuth, setCredentials, setError, setLoading } from '../../services/user/reducers/user-slice';
import Auth from '../../utils/api/auth';
import { useNavigate } from 'react-router-dom';

const footerLinks = [
  {
    'text': 'Уже зарегистрированы?',
    'linkText': 'Войти',
    'href': '/login'
  },
];

export default function Register() {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await Auth.register({...state});
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
      if (response.status === 403 && response.data.message === "User already exists") {
        dispatch(setError('Пользователь с такими данными уже существует'))
      }
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <FormConstructor header={"Регистрация"} footerLinks={footerLinks}>
      <form onSubmit={handleRegister}>
        <div className="mb-20">
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChangeInput}
            value={state.name}
            name={'name'}
            extraClass="mb-6"
          />
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
        <Button htmlType="submit" type="primary" size="medium" disabled={!state.email || !state.name || !state.password}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </FormConstructor>
  )
}
