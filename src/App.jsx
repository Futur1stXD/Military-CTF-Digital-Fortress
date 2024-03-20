import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AppMain from './pages/main/components/layout/AppMain';
import Login from './pages/authorization/Login';
import Register from './pages/authorization/Register';
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState, useEffect } from 'react';
import Rules from './pages/main/components/Rules';
import Profile from './pages/user/Profile';
import Team from './pages/main/components/Team_create.jsx';
import {message} from 'antd';
import Banner from './pages/main/components/Banner.jsx';
import AdminPanel from './pages/admin/AdminPanel.jsx';



function App() {
  const isPhone = useMediaQuery("only screen and (max-width : 1000px)");

  const [token] = useState(localStorage.getItem('token') || '');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token) {
      fetchAuthStatus();
    }
  }, [token]);

  const [messageApi, contextHolder] = message.useMessage();

    const errorMessage = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };


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
        errorMessage("Ошибка авторизации");
      }
    } catch (error) {
      console.error('Error fetching authentication status:', error.message);
      errorMessage("Ошибка авторизации");
    }
  };

  return (
    <BrowserRouter>
        {contextHolder}
        <Routes>
          <Route path='/' element={<AppMain isPhone={isPhone} authenticated={authorized} />} />
          <Route path='/login' element={<Login authenticated={authorized} />} />
          <Route path='/register' element={<Register authenticated={authorized} />} />
          <Route path='/rules' element={<Rules isPhone={isPhone} authenticated={authorized} />} />
          <Route path='/profile' element={<Profile token={token} authenticated={authorized} isPhone={isPhone} />} />
          <Route path='/team' element={<Team isPhone={isPhone} authenticated={authorized} token={token} />} />
          <Route path='/ctf' element={<Banner authenticated={authorized} token={token} isPhone={isPhone} />} />
          <Route path='/org/admin' element={<AdminPanel token={token} authenticated={authorized}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
