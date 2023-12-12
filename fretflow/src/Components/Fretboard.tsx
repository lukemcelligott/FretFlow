import React, { useState } from 'react';
import axios from 'axios';

import './styles/Fretboard.css'

interface FretboardProps {
    strings: string[];
    numFrets: number;
}

const Fretboard: React.FC<FretboardProps> = ({ strings, numFrets }) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const initialGridContent: string[][] = Array.from({ length: numFrets }, () => new Array(strings.length).fill(''));
    const [gridContent, setGridContent] = useState<string[][]>(Array.from({ length: strings.length }, () => new Array(numFrets).fill('')));
    const reversedStrings = [...strings].reverse();
    const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
    const [chordName, setChordName] = useState<string>();
    const [showChord, setShowChord] = useState(false);

    const getNote = (stringIndex: number, fretIndex: number): string => {
        const tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
      
        const openNoteIndex = notes.indexOf(tuning[stringIndex]);
        const noteIndex = (openNoteIndex + fretIndex) % 12;
      
        return notes[noteIndex >= 0 ? noteIndex : noteIndex + 12];
    };
    
    const handleCellClick = (stringIndex: number, fretIndex: number) => {
        const note = getNote(stringIndex, fretIndex);
        const updatedGridContent = [...gridContent];
        const currentNote = gridContent[stringIndex][fretIndex]
        const currentRow = stringIndex;

        for (let i = 0; i < numFrets; i++) { // only allow one note per string (row)
            if (i !== fretIndex && updatedGridContent[currentRow][i] !== '') {
                removeNote(updatedGridContent[currentRow][i]);
                updatedGridContent[currentRow][i] = '';
            }
        }

        // add or remove cell note
        if (currentNote){
            updatedGridContent[stringIndex][fretIndex] = '';
            removeNote(currentNote); // remove note from array
        } else {
            updatedGridContent[stringIndex][fretIndex] = note;
            setSelectedNotes(prevNotes => {
                const newNotes = [...prevNotes, note];
                console.log(newNotes);
                return newNotes;
            });
        }
        setGridContent(updatedGridContent);
        setShowChord(true); // show chord text

        console.log(`Clicked on string ${strings[stringIndex]} fret ${fretIndex + 1}. Note: ${note}`);
    };

    const removeNote = (currentNote: string) => {
        const index = selectedNotes.indexOf(currentNote);

        if(index !== -1){
            selectedNotes.splice(index, 1);
        }
    }

    const clearTable = () => {
        setSelectedNotes([]); // clear selected notes array
        setShowChord(false); // hide chord text
        setGridContent(initialGridContent); // clear table
    }

    async function identifyChord(notes: string[]) {
        try {
            if(notes) { // call api endpoint
                const response = await axios.post('http://127.0.0.1:8000/api/identify-chord/', { notes });
                return response.data;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    identifyChord(selectedNotes).then((data => {
        if(data) {
            setChordName(data.chord);
            console.log('Chord name: ', data.chord);
        }
    }))

    return (
        <div className='fretboard-wrapper'>
            <button type='button' className='btn btn-outline-danger clearBtn' onClick={clearTable}>Clear</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {[...Array(numFrets)].map((_, index) => (
                            <th key={index}>{index}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reversedStrings.map((string, stringIndex) => (
                        <tr key={stringIndex}>
                            <td>{string}</td>
                            {[...Array(numFrets)].map((_, fretIndex) => (
                                <td className={`fret ${fretIndex === 0 ? 'no-background' : ''}`} key={fretIndex} onClick={() => handleCellClick(strings.length - stringIndex - 1, fretIndex)}>
                                    <div className='note-placed'>
                                        {gridContent[strings.length - stringIndex - 1][fretIndex]}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='chord-text'>
                {showChord && <h5>Chord: {chordName}</h5>}
                {!showChord && <h5>Chord:</h5>}
            </div>
        </div>
    );
};

export default Fretboard;