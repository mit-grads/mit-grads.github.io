/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { findById } from '../src/utils.js';
import { notes } from '../src/data/notes.js';
import { instruments } from '../src/data/instrument.js';

const button = document.getElementById('bweh');

const instrument = findById(instruments, 'trumpet');


button.addEventListener('click', () => {
    playNote(instrument, 'A1', 2);
});


function playNote(instrument, note, duration) {

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
    osc.amp(.5);

    const frequency = notes[note];
    osc.freq(frequency);

    filterEnv.play(filter);
    env.play(osc);
}