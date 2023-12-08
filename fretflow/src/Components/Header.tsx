import React, { useState } from 'react';
import logo from './logo.svg';
import './styles/Header.css'

import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <ul className='header-container'>
                <li className='page-btn'>
                    <Link to="/chord-identifier">
                        <button type='button' className='btn header-btn'>Chord Identifier</button>
                    </Link>
                </li>
                <li className='page-btn'>
                    <Link to="/chord-progressions">
                        <button type='button' className='btn header-btn'>Chord Progressions</button>
                    </Link>
                </li>
                <li className='page-btn'>
                    <Link to="/login">
                        <button type='button' className='btn header-btn'>Saved Songs</button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;