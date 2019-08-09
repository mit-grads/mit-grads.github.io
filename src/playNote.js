/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { notesArrayObjects } from './data/notes.js';

export function playNote(instrument, note, duration) {

    let audioContext = new AudioContext();

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
    let filterAttackLevel = instrument.filterStartLevel;
    let filterReleaseLevel = instrument.filterEndLevel;

    let oA = instrument.oscAttack;
    let oD = instrument.oscDecay;
    let oS = instrument.oscSustain;
    let oR = duration;

    let fA = instrument.filterAttack;
    let fD = instrument.filterDecay;
    let fS = instrument.filterSustain;
    let fR = instrument.filterRelease;

    filter.freq(instrument.filterFrequency);

    osc.disconnect();

    osc.stop();
    osc.start();

    env.setADSR(oA, oD, oS, oR);
    env.setRange(1, 0);

    filterEnv.setADSR(fA, fD, fS, fR);
    filterEnv.setRange(filterAttackLevel, filterReleaseLevel);

    osc.setType(instrument.oscWaveform);
    osc.amp(.5);

    const noteObject = notesArrayObjects.find((element) => {
        return element.name === note;
    });

    osc.freq(noteObject.frequency);

    let distortion = new p5.Distortion();
    distortion.set(instrument.distortionAmount, instrument.distortionOversample);
    distortion.drywet(instrument.distortionMix);
    let delay = new p5.Delay();
    delay.delayTime(instrument.delayTime);
    delay.feedback(instrument.delayFeedback);
    delay.filter(instrument.delayFilter);
    delay.amp(instrument.delayAmount);

    filter.chain(distortion, delay);

    filterEnv.setInput(filter);

    filterEnv.play(filter);
    osc.connect(filter);

    env.play(osc);

    setTimeout(() => {
        osc.disconnect();
        distortion.disconnect();
        filter.disconnect();
        filterEnv.disconnect();
        env.disconnect();
        delay.disconnect();
        audioContext.suspend();
        audioContext.close();
    }, duration * 1000);

}