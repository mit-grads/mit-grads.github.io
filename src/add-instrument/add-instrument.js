import { playNote } from '../playNote.js';
import { storage } from '../data/storage.js';
import { findById } from '../utils.js';

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
const delayAmount = document.getElementById('delay-amount');
const delayTime = document.getElementById('delay-time');
const delayFeedback = document.getElementById('delay-feedback');
const delayFilter = document.getElementById('delay-filter');
const submitButton = document.getElementById('submit');
const submissionName = document.getElementById('submission-name');
const presetContainer = document.getElementById('preset-ul');

storage.preLoadInstruments();

const storedInstruments = storage.getInstruments();
storedInstruments.forEach((instrument) => {
    newLine(instrument.id, instrument.name);
});

updateDOM();

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

submitButton.addEventListener('click', () => {
    const newInstrument = getInstrument();
    newInstrument.name = submissionName.value;
    newInstrument.id = `${submissionName.value}-id`;
    storage.addCurrentInstrumentData(newInstrument);
    newLine(newInstrument.id, newInstrument.name);
    submissionName.value = '';
    updateDOM();
});



function newLine(id, name) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.id = id;
    button.textContent = name;
    button.className = 'preset';
    li.appendChild(button);
    presetContainer.appendChild(li);
}


function updateDOM() {

    const presetButtons = document.getElementsByClassName('preset');

    [...presetButtons].forEach((button) => {

        const instruments = storage.getInstruments();

        const instrument = findById(instruments, button.id);

        button.addEventListener('click', () => {
            console.log('click!');
            oscWaveform.value = instrument.oscWaveform;
            filterType.value = instrument.filterType;
            filterStartLevel.value = instrument.filterStartLevel;
            filterEndLevel.value = instrument.filterEndLevel;
            oscAttack.value = instrument.oscAttack;
            oscDecay.value = instrument.oscDecay;
            oscSustain.value = instrument.oscSustain;
            oscRelease.value = instrument.oscRelease;
            filterAttack.value = instrument.filterAttack;
            filterDecay.value = instrument.filterDecay;
            filterSustain.value = instrument.filterSustain;
            filterRelease.value = instrument.filterRelease;
            filterFrequency.value = instrument.filterFrequency;
            distortionMix.value = instrument.distortionMix;
            distortionAmount.value = instrument.distortionAmount;
            distortionOversample.value = instrument.distortionOversample;
            delayAmount.value = instrument.delayAmount;
            delayTime.value = instrument.delayTime;
            delayFeedback.value = instrument.delayFeedback;
            delayFilter.value = instrument.delayFilter;
        });
    });
}
