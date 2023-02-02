import { useState } from 'react';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


export default function Profile() {
  const [state, setState] = useState({
    name: '',
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
    <>
      <Input
        type={'text'}
        placeholder={'Имя'}
        icon={'EditIcon'}
        name={'name'}
        extraClass="mb-6"
        onChange={handleChangeInput}
        value={state.name}
      />
      <EmailInput
        onChange={handleChangeInput}
        value={state.email}
        name={'email'}
        isIcon={true}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={handleChangeInput}
        value={state.password}
        name={'password'}
        extraClass="mb-6"
      />
    </>
  )
}
