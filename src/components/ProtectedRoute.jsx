import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({allowedTypes}) => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  if (isLoading) return <div>Chargement...</div>;

  if (!isAuthenticated) return <Navigate to="/connexion" replace />;
  
  if(allowedTypes && !allowedTypes.includes(user.type)){
    return <Navigate to="/" replace />;
  }
  return <Outlet />
};

export default ProtectedRoute;