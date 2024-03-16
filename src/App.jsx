import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AppMain from './pages/main/components/layout/AppMain';
import Login from './pages/authorization/Login';
import Register from './pages/authorization/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppMain />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
