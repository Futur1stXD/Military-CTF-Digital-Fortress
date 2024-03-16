import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Authorization from './pages/authorization/Auth';
import AppHeader from './pages/main/components/layout/AppHeader';
import AppMain from './pages/main/components/layout/AppMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppMain />} />
        <Route path='/login' element={<Authorization />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
