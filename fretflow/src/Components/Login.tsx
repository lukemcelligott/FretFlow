import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './styles/Login.css';

import fretboardImg from '../assets/images/fretboard.jpg';
import { Link, Navigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const loginAPI = 'http://127.0.0.1:8000/api/auth/';

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) { // not null username and password
            setError('Please enter username and password');
            return;
        }

        const userCreds = {
            username: username,
            password: password,
        }

        try {
            const response = await axios.post(loginAPI, userCreds); // api call
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('user-token', token);
            setLoggedIn(true);
        } catch (error) {
            setError('Invalid username or password');
        }

        // Reset form fields after submission
        setUsername('');
        setPassword('');
    };

    return (
        <div className='body'>
            <div className='split-screen'>
                {/* Left content containing login form */}
                <div className='left-pane'>
                    <h1><b>Fret Flow</b></h1>
                    <h4>Login</h4>
                    <form onSubmit={handleSubmit}>
                        {error && <div className='error-message'>{error}</div>}
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                            </span>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                className='form-control text-input'
                                placeholder='Username'
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
                                </svg>
                            </span>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                className='form-control text-input'
                                placeholder='Password'
                            />
                        </div>
                        <button type="submit" className='btn btn-outline-success'>Login</button>
                        {loggedIn && <Navigate replace to="/chord-identifier" />}                  
                    </form>
                    <div className='signup'>
                        <p>
                            Don't have an account?
                            <Link to="/signup">
                                <button type="submit" className='btn btn-outline-success signup-btn'>Sign up here!</button>
                            </Link>
                        </p>
                    </div>
                </div>
                {/* Right content containing fretboard image*/}
                <div className='right-pane'>
                    <img src={fretboardImg} alt='Fretboard'></img>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;