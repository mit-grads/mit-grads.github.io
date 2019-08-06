import { notes, noteArray } from './notes.js';

export class IntervalClass {
    constructor(note = 'A1', diatonic = true) {
        this.lowIndex = noteArray.indexOf(note);
        this.highIndex = -1;
        if(notes[note]) {
            this.lowNote = note;
        }
        else {
            this.lowNote = '';
        }
        this.highNote = '';
        if(diatonic) {
            this.halfSteps = [0, 2, 4, 5, 7, 9, 11, 12];
        }
        else { 
            this.halfSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }

    getLowNote() {
        return noteArray[this.lowIndex];
    }
    getHighNote() {
        return this.highNote;
    }
    setInterval(distance) {
        this.highNote = noteArray[this.lowIndex + this.halfSteps[distance]];
    }
    randomizeInterval() {
        this.upperNote = notes['C1'];
    }
}