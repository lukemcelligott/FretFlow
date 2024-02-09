import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Analytics } from '@vercel/analytics/react';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './App.css'
import LoginPage from './Components/Login';
import SignUpPage from './Components/SignUp'
import ChordIdentifierPage from './Components/ChordIdentifier';
import ProgressionPage from './Components/Progression';

function App() {
  //const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');

    if(!userToken || userToken === 'undefined') {
      setIsLoggedIn(false)
    }

    setIsLoggedIn(true);
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Private */}
        <Route path="/chord-identifier" element={isLoggedIn ? (<ChordIdentifierPage />) : (<Navigate to="/login" replace />)}/>
        <Route path="/chord-progressions" element={isLoggedIn ? (<ProgressionPage />) : (<Navigate to="/login" replace />)}/>
        
        {/* Redirects */}
        <Route path='/' element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
      
      <Analytics />
    </BrowserRouter>
  )
}

export default App
