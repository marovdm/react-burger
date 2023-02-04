import { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import FormConstructor from '../form-constructor/form-constructor';

import { userRegister } from '../../services/user/reducers/action-creators';
import { useDispatch } from 'react-redux';

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

  const handleChangeInput = (event) => {
    const {value, name} = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleRegister = () => {
    dispatch(userRegister({...state}));
  }

  return (
    <FormConstructor header={"Регистрация"} footerLinks={footerLinks}>
      <form>
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
          <Button htmlType="button" type="primary" size="medium" onClick={handleRegister}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </FormConstructor>
  )
}
