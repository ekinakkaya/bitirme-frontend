// NavigationUtils.js
import { useNavigate } from 'react-router-dom';

export const useNavigateToLoginPage = () => {
  const navigate = useNavigate();
  return () => navigate('/login');
};