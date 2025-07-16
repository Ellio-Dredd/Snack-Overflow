import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Load user from localStorage
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData); // Store user data in context
    localStorage.setItem('token', token); // Store token
    localStorage.setItem('user', JSON.stringify(userData)); // Store user info in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
