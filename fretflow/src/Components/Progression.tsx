import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css';
import './styles/Progression.css';

import Header from './Header';

function ProgressionPage() {
    const [activeTab, setActiveTab] = useState('generate-pane'); // Initially set to the ID of the first tab

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const [selectedKey, setKeyItem] = useState('Select a key');
    const [selectedAcc, setAccItem] = useState('Select an accidental');
    const [selectedMajorMinor, setMajorMinorItem] = useState('Select major/minor');

    const handleKeyClick = (text: string) => {
        setKeyItem(text);
    };

    const handleAccClick = (text: string) => {
        setAccItem(text);
    };
    
    const handleMajorMinorClick = (text: string) => {
        setMajorMinorItem(text);
    };

    return (
        <div className='progression-wrapper'>
            <Header />
            
            <div className='body'>
                <div className="container card shadow d-flex justify-content-center mt-5">
                    <ul className="nav nav-pills mb-3 shadow-sm" id="progression-tabs" role="tablist">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'generate-pane' ? 'active' : ''}`} id="generate-tab" data-toggle="pill" href="#generate-pane" role="tab" aria-controls="generate-pane" aria-selected={activeTab === 'generate-pane'} onClick={() => handleTabChange('generate-pane')}>Generate</a>
                        </li>
                        <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'popular-pane' ? 'active' : ''}`} id="popular-tab" data-toggle="pill" href="#popular-pane" role="tab" aria-controls="popular-pane" aria-selected={activeTab === 'popular-pane'} onClick={() => handleTabChange('popular-pane')}>Popular</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent p-3">
                        <div className={`tab-pane fade ${activeTab === 'generate-pane' ? 'show active' : ''}`} id="generate-pane" role="tabpanel" aria-labelledby="generate-tab">
                            <div className="form-group addinfo">
                                <label htmlFor="generate-textarea">Generate a chord progression!</label>
                                <div className="input-group selections">
                                    {/* Key dropdown */}
                                    <Dropdown className='dropdown'>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            {selectedKey}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='dropdown-menu'>
                                            <Dropdown.Item href="#" onClick={() => handleKeyClick('A')}>A</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => handleKeyClick('B')}>B</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => handleKeyClick('C')}>C</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => handleKeyClick('D')}>D</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => handleKeyClick('E')}>E</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => handleKeyClick('F')}>F</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => handleKeyClick('G')}>G</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {/* Accidentals dropdown */}
                                    <Dropdown className='dropdown'>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            {selectedAcc}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='dropdown-menu'>
                                            <Dropdown.Item href="#" onClick={() => handleAccClick('#')}>#</Dropdown.Item>
                                            <Dropdown.Item href="#" onClick={() => handleAccClick('♭')}>♭</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {/* Major/Minor dropdown */}
                                    <Dropdown className='dropdown'>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            {selectedMajorMinor}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='dropdown-menu'>
                                            <Dropdown.Item href="#" className='dropdown-item' onClick={() => handleMajorMinorClick('Major')}>Major</Dropdown.Item>
                                            <Dropdown.Item href="#" className='dropdown-item' onClick={() => handleMajorMinorClick('Minor')}>Minor</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <button className='btn btn-success'>Generate</button>
                                </div>
                            </div>
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'popular-pane' ? 'show active' : ''}`} id="popular-pane" role="tabpanel" aria-labelledby="popular-tab">
                            <div className="form-group addinfo">
                                <label htmlFor="popular-textarea">Choose from a variety of popular chord progressions!</label>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div> 
    )
    
}

export default ProgressionPage;