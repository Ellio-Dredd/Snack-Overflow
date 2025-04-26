import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
export const UserContext = createContext();

// Create a Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // New: Check if there's a token on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Load user from localStorage
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); // Save user info
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
