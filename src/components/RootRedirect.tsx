import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    navigate(token ? '/home' : '/login');
  }, [navigate]);

  return null;
};

export default RootRedirect;
