import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute() {
  const { isAuth } = useAuth();

  return !isAuth ? <Outlet /> : <Navigate to="/" />;
}
