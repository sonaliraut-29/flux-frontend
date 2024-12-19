import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Login function
export const login = (email, password) => {
  return axios
    .post(`${API_URL}login`, { email, password })
    .then(response => {
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.success));
      }
      return response.data;
    });
};

// Register function
export const register = (name, email, password) => {
  return axios
    .post(`${API_URL}register`, { name, email, password })
    .then(response => response.data);
};

// Get current user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

// Logout
export const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token =  user ? user.token : null;

  try {
    const response = await axios.get(
      `${API_URL}logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
};