// set up an interval

// hard code instrument to 'trumpet'

// hard code duration to 2 seconds

// play the first note (hard-coded to 'A1')  

// play the second note

// if ascending: first note is interval.lowNote
//   

import { playNote } from './playNote.js';


export function playInterval(firstNote, secondNote, instrument, duration) {

    playNote(instrument, firstNote, duration);

    const pause = (duration * 1000) + 100;

    setTimeout(() => {
        playNote(instrument, secondNote, duration);
    }, pause);

}

