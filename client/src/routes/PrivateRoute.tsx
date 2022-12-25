import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute() {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to="signup" />;
}
