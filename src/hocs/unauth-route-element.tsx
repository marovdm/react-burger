import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';


type UnAuthRouteProps = {
  element: JSX.Element
}

// HOC роутов для неавторизованных пользователей
const UnAuthRouteElement: FC<UnAuthRouteProps> = ({ element }) => {
  const { isAuth } = useAppSelector(state => state.user);
  const location = useLocation();

  return (
    !isAuth ? element : <Navigate to={location.state?.from.pathname || '/profile'} replace/>
  )
}

export default UnAuthRouteElement;