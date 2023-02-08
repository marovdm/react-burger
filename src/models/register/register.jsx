import { useState, useEffect } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

import { userRegister } from '../../services/user/reducers/action-creators';
import { useDispatch, useSelector } from 'react-redux';
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

  const { isAuth, hasError } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && !hasError) {
      navigate('/profile');
    }

  }, [isAuth, hasError, navigate])

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch(userRegister({...state}));
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
            errorText="Введите корректный e-mail"
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
