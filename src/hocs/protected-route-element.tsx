import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

type ProtectedRouteProps = {
  element: ReactNode
}

export default function ProtectedRouteElement ({ element }: ProtectedRouteProps) {
  const { isAuth } = useAppSelector(state => state.user);
  const location = useLocation();

  return (
    isAuth ? element : <Navigate to="/login" state={{ from: location }} replace/>
  )
}