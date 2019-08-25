import { 
    // try and avoid data types in names
    notesArrayObjects, // notes
    chromaticIntervalReference, 
    diatonicScale, 
    chromaticScale 
} from './notes.js';

export class IntervalClass {
    constructor(note = 'A1', scale = 'diatonic') {
        this.setFirstNote(note);
        this.secondNote = '';
        
        if(scale === 'diatonic') {
            this.scale = diatonicScale;
        }
        else { 
            this.scale = chromaticScale;
        }
    }
    
    getFirstNote() {
        return this.firstNote;
    }

    getSecondNote() {
        return this.secondNote;
    }

    setFirstNote(note) {
        this.startIndex = notesArrayObjects.findIndex((element) => element.name === note);
        if(this.startIndex >= 0) {
            this.firstNote = notesArrayObjects[this.startIndex].name;
        }
        else {
            this.firstNote = '';
        }
    }

    setSecondNote(distance, direction = 'ascending') {
        const intervalName = this.scale[distance];
        let chromaticDegrees = chromaticIntervalReference[intervalName];
        
        if(direction !== 'ascending') {
            chromaticDegrees *= -1;
        }
        
        this.secondNote = notesArrayObjects[this.startIndex + chromaticDegrees].name;
        
    }
}