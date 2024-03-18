import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AppMain from './pages/main/components/layout/AppMain';
import Login from './pages/authorization/Login';
import Register from './pages/authorization/Register';
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState, useEffect } from 'react';
import Rules from './pages/main/components/Rules';



function App() {
  const isPhone = useMediaQuery("only screen and (max-width : 900px)");

  const [token] = useState(localStorage.getItem('token') || '');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token) {
      fetchAuthStatus();
    }
  }, [token]);


  const fetchAuthStatus = async() => {
    try {
      const response = await fetch('http://localhost:8080/user/getAuth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setAuthorized(data.authenticated);
      } else {
        console.error('Error fetching authentication status:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching authentication status:', error.message);
    }
  };

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppMain isPhone={isPhone} authorized={authorized} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/rules' element={<Rules authorized={authorized} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
