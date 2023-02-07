import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRouteElement ({ element }) {
  const { isAuth } = useSelector(state => state.user);
  const location = useLocation();


  return (
    isAuth ? element : <Navigate to="/login" state={{ from: location }} replace/>
  )
}
