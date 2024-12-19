import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { getAuthToken } from "../../services/apiService";

const Logout = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  
  useEffect(() => {
    token && logout();
    localStorage.removeItem('user');
    window.location.href = '/login';
  }, []);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
