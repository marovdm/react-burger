import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

type ProtectedRouteProps = {
  element: JSX.Element,
  anonymous?: boolean
}

const ProtectedRouteElement: FC<ProtectedRouteProps> = ({ element, anonymous = false }) => {
  const { isAuth } = useAppSelector(state => state.user);
  const location = useLocation();
  
  const from = location.state?.from || '/profile';

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuth) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuth) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}} replace/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

export default ProtectedRouteElement;