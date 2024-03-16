import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AppMain from './pages/main/components/layout/AppMain';
import Login from './pages/authorization/Login';
import Register from './pages/authorization/Register';
import { useMediaQuery } from "@uidotdev/usehooks";

function App() {
  const isPhone = useMediaQuery("only screen and (max-width : 900px)");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppMain isPhone={isPhone} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
