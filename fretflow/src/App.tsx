import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './App.css'
import LoginPage from './Components/Login';
import SignUpPage from './Components/SignUp'
import ChordIdentifierPage from './Components/ChordIdentifier';
import ProgressionPage from './Components/Progression';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/chord-identifier" element={<ChordIdentifierPage />} />
        <Route path="/chord-progressions" element={<ProgressionPage />} />
        
        <Route path='/' element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
