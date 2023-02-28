import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';


type UnAuthRouteProps = {
  element: ReactNode
}

// HOC роутов для неавторизованных пользователей
export default function UnAuthRouteElement ({ element }: UnAuthRouteProps) {
  const { isAuth } = useAppSelector(state => state.user);
  const location = useLocation();

  return (
    !isAuth ? element : <Navigate to={location.state?.from.pathname || '/profile'} replace/>
  )
}