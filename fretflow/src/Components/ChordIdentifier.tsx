//import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import './styles/ChordIdentifier.css';

import Header from './Header';
import Fretboard from './Fretboard';

function ChordIdentifierPage() {
    const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
    const numFrets = 17;

    return (
        <div>
            <Header />
            <div className="container card shadow d-flex justify-content-center mt-5 id-wrapper">
                <div className='card-title'>
                    <h3>Fretboard</h3>
                </div>
                <Fretboard strings={strings} numFrets={numFrets}/>
            </div>
        </div>
    );
}

export default ChordIdentifierPage;