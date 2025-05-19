import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userService } from '../services/userService';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole = 'admin' }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setIsAllowed(false);
          setIsLoading(false);
          return;
        }

        const user = await userService.getCurrentUser();
        setIsAllowed(user.role === requiredRole);
      } catch (error) {
        setIsAllowed(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  if (isLoading) {
    return null;
  }

  return isAllowed ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;