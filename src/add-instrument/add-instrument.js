import { playNote } from '../playNote.js';
import { instruments } from '../data/instrument.js';

const instrumentForm = document.getElementById('instrument-input-form');
const playButton = document.getElementById('play');
const oscWaveform = document.getElementById('osc-waveform');
const oscAttack = document.getElementById('osc-attack');
const oscDecay = document.getElementById('osc-decay');
const oscSustain = document.getElementById('osc-sustain');
const oscRelease = document.getElementById('osc-release');
const filterType = document.getElementById('filter-type');
const filterFrequency = document.getElementById('filter-frequency');
const filterStartLevel = document.getElementById('filter-start-level');
const filterEndLevel = document.getElementById('filter-end-level');
const filterAttack = document.getElementById('filter-attack');
const filterDecay = document.getElementById('filter-decay');
const filterSustain = document.getElementById('filter-sustain');
const filterRelease = document.getElementById('filter-release');
const distortionMix = document.getElementById('distortion-mix');
const distortionAmount = document.getElementById('distortion-amount');
const distortionOversample = document.getElementById('distortion-oversample');
const reverbAmount = document.getElementById('reverb-amount');
const reverbTime = document.getElementById('reverb-time');
const reverbDecay = document.getElementById('reverb-decay');
const reverbDirection = document.getElementById('reverb-direction');
const delayAmount = document.getElementById('delay-amount');
const delayTime = document.getElementById('delay-time');
const delayFeedback = document.getElementById('delay-feedback');
const delayFilter = document.getElementById('delay-filter');



function getInstrument() {
    return {
        oscWaveform: oscWaveform.value,
        filterType: filterType.value,
        filterStartLevel: +filterStartLevel.value,
        filterEndLevel: +filterEndLevel.value,
        oscAttack: +oscAttack.value,
        oscDecay: +oscDecay.value,
        oscSustain: +oscSustain.value,
        oscRelease: +oscRelease.value,
        filterAttack: +filterAttack.value,
        filterDecay: +filterDecay.value,
        filterSustain: +filterSustain.value,
        filterRelease: +filterRelease.value,
        filterFrequency: +filterFrequency.value,
        distortionMix: +distortionMix.value,
        distortionAmount: +distortionAmount.value,
        distortionOversample: distortionOversample.value,
        delayAmount: +delayAmount.value,
        delayTime: +delayTime.value,
        delayFeedback: +delayFeedback.value,
        delayFilter: +delayFilter.value,
    };
}

playButton.addEventListener('click', () => {
    const instrument = getInstrument();
    playNote(instrument, 'A1', instrument.oscRelease);

});
