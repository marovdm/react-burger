import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

type ProtectedRouteProps = {
  element: JSX.Element
}

const ProtectedRouteElement: FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = useAppSelector(state => state.user);
  const location = useLocation();

  return (
    isAuth ? element : <Navigate to="/login" state={{ from: location }} replace/>
  )
}

export default ProtectedRouteElement;