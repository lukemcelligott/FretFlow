import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Header from './Header';
import Fretboard from './Fretboard';

function ChordIdentifierPage() {
    const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
    const numFrets = 16;

    return (
        <div className='identifierWrapper'>
            <Header />

            <Fretboard strings={strings} numFrets={numFrets}/>
        </div>
    );
}

export default ChordIdentifierPage;