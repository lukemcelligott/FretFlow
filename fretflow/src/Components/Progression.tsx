import { useState } from 'react';
import axios from 'axios';

import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css';
import './styles/Progression.css';

import Header from './Header';

function ProgressionPage() {
    interface ChordParams {
        key: string;
        acc: string;
        major_minor: string;
    }

    // interface ChordProgressionResponse {
    //     chord_progression: string[];
    // }

    const [activeTab, setActiveTab] = useState('generate-pane'); // Initially set to the ID of the first tab

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    const [selectedKey, setKeyItem] = useState('Select a key');
    const [selectedAcc, setAccItem] = useState('Select an accidental');
    const [selectedMajorMinor, setMajorMinorItem] = useState('Select major/minor');
    const [chordsInKey, setChordsInKey] = useState<string[]>();

    const handleKeyClick = (text: string) => {
        setKeyItem(text);
    };

    const handleAccClick = (text: string) => {
        setAccItem(text);
    };
    
    const handleMajorMinorClick = (text: string) => {
        setMajorMinorItem(text);
    };

    const handleGenerateClick = async () => {
        const chordParams: ChordParams = {
            key: selectedKey,
            acc: selectedAcc,
            major_minor: selectedMajorMinor
        };

        try {
            if(chordParams) { // call api endpoint
                const response = await axios.get('http://127.0.0.1:8000/api/gen-progression/', {
                    params: chordParams
                });

                const generatedChords: string[] = response.data.chord_progression;
                setChordsInKey(generatedChords);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                    {/* Generate progressions tab */}
                    <div className="tab-content" id="pills-tabContent p-3">
                        <div className={`tab-pane fade ${activeTab === 'generate-pane' ? 'show active' : ''}`} id="generate-pane" role="tabpanel" aria-labelledby="generate-tab">
                            <div className="form-group addinfo">
                                <label htmlFor="generate-textarea"><h4>Generate a chord progression!</h4></label>
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
                                            <Dropdown.Item href="#" onClick={() => handleAccClick('')}>None</Dropdown.Item>
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
                                    <button className='btn btn-success' onClick={handleGenerateClick}>Generate</button>
                                </div>
                                {/* Displayed content */}
                                <div className='gen-content'>
                                    <h4>Chords in key:</h4>
                                    <table className="table table-dark chord-table">
                                        <thead>
                                            <tr>
                                                <th scope="col">I</th>
                                                <th scope="col">ii</th>
                                                <th scope="col">iii</th>
                                                <th scope="col">IV</th>
                                                <th scope="col">V</th>
                                                <th scope="col">vi</th>
                                                <th scope="col">vii°</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {chordsInKey?.map((chord, index) => (
                                                    <td key={index}>
                                                        {
                                                            index === 0 || index === 3 || index === 4 ? `${chord} maj` :
                                                            index === 1 || index === 2 || index === 5 ? `${chord} min` :
                                                            index === 6 ? `${chord} dim` : chord
                                                        }
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Popular progressions tab */}
                        <div className={`tab-pane fade ${activeTab === 'popular-pane' ? 'show active' : ''}`} id="popular-pane" role="tabpanel" aria-labelledby="popular-tab">
                            <div className="form-group addinfo">
                                <label htmlFor="popular-textarea"><h5>Choose from a variety of popular chord progressions!</h5></label>
                                <div className='popular-wrapper'>
                                    <div className='popular-left'>
                                        <div className='chord-prog'>
                                            Alternative:
                                            <div className='chord-struct'>VI iv i v</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Energetic:
                                            <div className='chord-struct'>I iii IV vi</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Happy:
                                            <div className='chord-struct'>I V I IV</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Pop:
                                            <div className='chord-struct'>i VI III VII</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Psychedelic:
                                            <div className='chord-struct'>I7 I7 IV V</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Simple:
                                            <div className='chord-struct'>I IV I IV</div>
                                        </div>
                                    </div>
                                    <div className='popular-right'>
                                        <div className='chord-prog'>
                                            Blues:
                                            <div className='chord-struct'>i VII iv v7</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Grungy:
                                            <div className='chord-struct'>i iv III VI</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Melancholy:
                                            <div className='chord-struct'>i i iv VI</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Pop Funk:
                                            <div className='chord-struct'>vi V iii IV</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Sad:
                                            <div className='chord-struct'>i iv v v</div>
                                        </div>
                                        <div className='chord-prog'>
                                            Soothing:
                                            <div className='chord-struct'>I I vi I</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div> 
    )
    
}

export default ProgressionPage;