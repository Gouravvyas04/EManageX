import './index.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { validateCredentials } from './utils/authUtils';

const App = () => {
  const [user, setUser] = useState("");
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setUser(userData.role);
        setLoggedInUserData(userData.data);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  const handleLogin = (email, password) => {
    const result = validateCredentials(email, password, userData);

    if (result.isValid) {
      setUser(result.role);
      setLoggedInUserData(result.data);
      localStorage.setItem('loggedInUser', JSON.stringify({
        role: result.role,
        data: result.data
      }));
      return true;
    }
    return false;
  };

  return (
    <Router>
      <div className='bg-[#0a0a0a] min-h-screen'>
        <Toaster />
        <Routes>
          {/* Redirect to login if not logged in */}
          <Route path="/" element={!user ? <Login handleLogin={handleLogin} /> :  <Navigate to={user === "admin" ? "/admin" : "/employee"} replace />}/>

          {/* Admin Dashboard Route */}
          <Route
            path="/admin" element={ user === "admin" ? <AdminDashboard changeUser={setUser} /> : <Navigate to="/" replace />}/>

          {/* Employee Dashboard Route */}
          <Route
            path="/employee"
            element={
              user === "employee" ? (
                <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Catch-all route for invalid paths */}
          <Route path="/" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
