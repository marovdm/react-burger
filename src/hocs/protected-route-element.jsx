import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRouteElement ({ element }) {
  const { isAuth, hasError, error } = useSelector(state => state.user);
  const location = useLocation();

  if (hasError) {
    return (
      <>
        {error && <p className="text text_type_main-medium">{ error }</p>}
        <Link to={'/'}>Вернуться на главную</Link>
      </>
    )
  }

  return (
    isAuth ? element : <Navigate to="/login" state={{ from: location }} replace/>
  )
}
