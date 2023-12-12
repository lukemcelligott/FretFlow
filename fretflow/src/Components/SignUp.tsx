import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/SignUp.css';

import fretboardImg from '../assets/images/fretboard.jpg';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here (e.g., API call, validation)
        console.log('Email:', email);
        console.log('Password:', password);
        // Reset form fields after submission
        setEmail('');
        setPassword('');
    };

    return (
        <div className='body'>
            <div className='split-screen'>
                {/* Left content containing login form */}
                <div className='left-pane'>
                    <h1><b>Fret Flow</b></h1>
                    <h4>Sign Up</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                            </span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className='form-control text-input'
                                placeholder='Create a username'
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
                                placeholder='Create a password'
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
                                placeholder='Confirm password'
                            />
                        </div>
                        <Link to="/chord-identifier">
                            <button type="submit" className='btn btn-outline-success'>Sign Up</button>
                        </Link>
                    </form>
                    <div className='signup'>
                        <p>
                            Already have an account?
                            <Link to="/login">
                                <button type="submit" className='btn btn-outline-success'>Log in here!</button>
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

export default SignUpPage;