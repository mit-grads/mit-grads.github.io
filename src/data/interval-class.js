import { notes, noteArray } from './notes.js';

export class IntervalClass {
    constructor(note = 'A1', scale = 'diatonic') {
        this.startIndex = noteArray.indexOf(note);
        if(notes[note]) {
            this.firstNote = note;
        }
        else {
            this.firstNote = '';
        }
        this.secondNote = '';
        if(scale === 'diatonic') {
            this.scaleDegrees = [0, 2, 4, 5, 7, 9, 11, 12];
        }
        else { 
            this.scaleDegrees = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }

    getFirstNote() {
        return noteArray[this.startIndex];
    }
    getSecondNote() {
        return this.secondNote;
    }
    setSecondNote(distance, direction = 'ascending') {
        if(direction === 'ascending') {
            this.secondNote = noteArray[this.startIndex + this.scaleDegrees[distance]];
        }
        else {
            this.secondNote = noteArray[this.startIndex - this.scaleDegrees[distance]];
        }
    }
    randomizeInterval() {
        this.upperNote = notes['C1'];
    }
}