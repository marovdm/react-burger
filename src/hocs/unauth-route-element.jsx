import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// HOC роутов для неавторизованных пользователей
export default function UnAuthRouteElement ({ element }) {
  const { isAuth } = useSelector(state => state.user);
  const location = useLocation();

  return (
    !isAuth ? element : <Navigate to={location.state?.from.pathname || '/profile'} replace/>
  )
}

UnAuthRouteElement.propTypes = {
  element: PropTypes.node.isRequired
}