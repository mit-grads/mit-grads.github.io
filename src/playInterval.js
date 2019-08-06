import { playNote } from './playNote.js';


export function playInterval(firstNote, secondNote, instrument, type = 'melodic', duration) {

    if(type === 'melodic') {

        playNote(instrument, firstNote, duration);

        const pause = (duration * 1000);

        setTimeout(() => {
            playNote(instrument, secondNote, duration);
        }, pause);

    } else if(type === 'harmonic') {
        playNote(instrument, firstNote, duration);
        playNote(instrument, secondNote, duration);

    }



}

