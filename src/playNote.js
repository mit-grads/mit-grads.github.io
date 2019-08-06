/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { findById } from '../src/utils.js';
import { notes } from '../src/data/notes.js';
import { instruments } from '../src/data/instrument.js';
import { playInterval } from './playInterval.js';
import { IntervalClass } from './data/interval-class.js';

const duration = 1.5;

const interval = new IntervalClass();

const distance = Math.floor(Math.random() * 8);

interval.setSecondNote(distance);

const firstNote = interval.getFirstNote();
const secondNote = interval.getSecondNote();


const button = document.getElementById('bweh');

const instrument = findById(instruments, 'trumpet');

const intervalType = 'melodic';

button.addEventListener('click', () => {
    playInterval(firstNote, secondNote, instrument, intervalType, duration);
});


export function playNote(instrument, note, duration) {

    let env = new p5.Envelope();
    let filterEnv = new p5.Envelope();
    let osc = new p5.Oscillator();
    let filter;

    switch(instrument.filterType) {
        case 'low pass':
            filter = new p5.LowPass();
            break;
        case 'high pass':
            filter = new p5.HighPass();
            break;
        case 'band pass':
            filter = new p5.BandPass();
            break;
    }
    let attackLevel = instrument.attackLevel;
    let releaseLevel = instrument.releaseLevel;
    let filterAttackLevel = instrument.filterAttackLevel;
    let filterReleaseLevel = instrument.filterReleaseLevel;

    let oA = instrument.attackTime;
    let oD = instrument.decayTime;
    let oS = instrument.susPercent;
    let oR = duration;

    let fA = instrument.filterAttackTime;
    let fD = instrument.filterDecayTime;
    let fS = instrument.filterSusPercent;
    let fR = duration;

    filter.freq(instrument.filterFrequency);

    osc.stop();
    osc.start();

    env.setADSR(oA, oD, oS, oR);
    env.setRange(attackLevel, releaseLevel);

    filterEnv.setADSR(fA, fD, fS, fR);
    filterEnv.setRange(filterAttackLevel, filterReleaseLevel);

    osc.disconnect();
    osc.connect(filter);

    osc.setType(instrument.oscType);
    osc.amp(1);

    const frequency = notes[note];
    osc.freq(frequency);

    filterEnv.play(filter);
    env.play(osc);
}