import React, { useState } from 'react';

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

    const getNote = (stringIndex: number, fretIndex: number): string => {
        const tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
      
        const openNoteIndex = notes.indexOf(tuning[stringIndex]);
        const noteIndex = (openNoteIndex + fretIndex + 1) % 12;
      
        return notes[noteIndex >= 0 ? noteIndex : noteIndex + 12];
    };
    
    const handleCellClick = (stringIndex: number, fretIndex: number) => {
        const note = getNote(stringIndex, fretIndex);
        const updatedGridContent = [...gridContent];
        const currentNote = gridContent[stringIndex][fretIndex]

        const currentRow = stringIndex;

        for (let i = 0; i < numFrets; i++) {
            if (i !== fretIndex && updatedGridContent[currentRow][i] !== '') {
                updatedGridContent[currentRow][i] = '';
            }
        }

        // add or remove cell note
        if (currentNote){
            updatedGridContent[stringIndex][fretIndex] = '';
        } else {
            updatedGridContent[stringIndex][fretIndex] = note;
            setSelectedNotes(prevNotes => {
                const newNotes = [...prevNotes, note];
                console.log(newNotes);
                return newNotes;
            });
        }
        setGridContent(updatedGridContent);
        console.log(`Clicked on string ${strings[stringIndex]} fret ${fretIndex + 1}. Note: ${note}`);
        console.log(`Chord `, calculateChord(selectedNotes));
    };

    const calculateChord = (notes: string[]) : string => {
        const noteToNumber: { [key: string]: number } = {
            'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
            'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
            'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
          };
        
          const intervals: number[] = [];
        
          // Calculate intervals between consecutive notes
          for (let i = 1; i < notes.length; i++) {
            const diff = (noteToNumber[notes[i]] - noteToNumber[notes[i - 1]] + 12) % 12;
            intervals.push(diff);
          }
        
          const uniqueIntervals = Array.from(new Set(intervals)).sort((a, b) => a - b);
          const intervalsStr = uniqueIntervals.join(',');
        
          // Determine the root note
          const rootNote = notes[0];
        
          // Check intervals against known chord patterns
          switch (intervalsStr) {
            case '3':
              return `${rootNote} Minor`;
            case '4':
              return `${rootNote} Major`;
            case '3,4':
              return `${rootNote} Minor 7th`;
            case '3,7':
              return `${rootNote} Major`;
            case '4,7':
              return `${rootNote} Sus4`;
            case '3,4,7':
              return `${rootNote} Major 7th`;
            default:
              return 'Unknown';
          }
    }

    const clearTable = () => {
        setGridContent(initialGridContent);
    }

    return (
        <div className='fretboard-wrapper'>
            <button type='button' className='btn btn-outline-danger clearBtn' onClick={clearTable}>Clear</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {[...Array(numFrets)].map((_, index) => (
                            <th key={index}>{index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {reversedStrings.map((string, stringIndex) => (
                        <tr key={stringIndex}>
                            <td>{string}</td>
                            {[...Array(numFrets)].map((_, fretIndex) => (
                                <td key={fretIndex} onClick={() => handleCellClick(strings.length - stringIndex - 1, fretIndex)}>
                                    {gridContent[strings.length - stringIndex - 1][fretIndex]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Fretboard;