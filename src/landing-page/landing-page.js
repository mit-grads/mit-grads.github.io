import { storage } from '../data/storage.js';
import { renderInstrumentOptionsToDom } from './render-instrument-DOM.js';

const splashImage = document.getElementById('splash-image');
const instructions = document.getElementById('instructions');
const landingPageForm = document.getElementById('landing-page-form');
const userName = document.getElementById('user-name');
const backgroundMusic = document.getElementById('background-music');
const dirtyStickMusic = document.getElementById('dirty-stick-music');
const christmasMusic = document.getElementById('christmas-music');
const floydMusic = document.getElementById('floyd-music');
const synthesizerMusic = document.getElementById('synthesizer-music');
const showSettingsButton = document.getElementById('show-settings-button');
const settingsForm = document.getElementById('settings-form');
const durationSpan = document.getElementById('duration-span');
const durationValue = document.getElementById('duration');
const numberOfAnswersSpan = document.getElementById('number-answers-span');
const numberOfAnswers = document.getElementById('number-answers');
const possibleInstrumentList = document.getElementById('instrument-type');
const numberOfQuestions = document.getElementById('number-questions');
const numberOfQuestionsSpan = document.getElementById('number-questions-span');
const preLoadedInstruments = storage.getInstruments();

let themeMusic = backgroundMusic;
initializeTheme();
initializeUserName();

splashImage.addEventListener('mouseover', () => {
    startMusic();
});

splashImage.addEventListener('click', () => {
    showInstructions();
});


showSettingsButton.addEventListener('click', () => {
    settingsForm.classList.remove('hidden');
});

storage.preLoadInstruments();
while(possibleInstrumentList.firstChild) {
    possibleInstrumentList.removeChild(possibleInstrumentList.firstChild);
}
for(let i = 0; i < preLoadedInstruments.length; i++) {
    const instrument = preLoadedInstruments[i];
    const dom = renderInstrumentOptionsToDom(instrument);
    possibleInstrumentList.appendChild(dom);
}

durationSpan.textContent = durationValue.value + ' seconds';
durationValue.addEventListener('input', () => {
    durationSpan.textContent = durationValue.value + ' seconds';
});

numberOfQuestionsSpan.textContent = numberOfQuestions.value;
numberOfQuestions.addEventListener('input', () => {
    numberOfQuestionsSpan.textContent = numberOfQuestions.value;
});

numberOfAnswersSpan.textContent = numberOfAnswers.value;
numberOfAnswers.addEventListener('input', () => {
    numberOfAnswersSpan.textContent = numberOfAnswers.value;
});

landingPageForm.addEventListener('submit', (event) => {
    goToQuizPage(event);
});

function initializeTheme() {
    const searchParams = new URLSearchParams(window.location.search);
    const themeId = searchParams.get('theme');
    if(themeId) {
        if(themeId.includes('dirty')) {
            splashImage.querySelector('figure img').src = './assets/dirty-splash.gif';
            themeMusic = dirtyStickMusic;
        } 
        else if(themeId.includes('space') || themeId.includes('synth')) {
            splashImage.querySelector('figure img').src = './assets/notes-in-space.gif';
            themeMusic = synthesizerMusic;
        }
        else if(themeId.includes('pink') || themeId.includes('floyd')) {
            splashImage.querySelector('figure img').src = './assets/eternity.gif';
            themeMusic = floydMusic;
        }
        else if(themeId.includes('xmas') || themeId.includes('christmas')) {
            splashImage.querySelector('figure img').src = './assets/xmas-notes.gif';
            themeMusic = christmasMusic;
        }
    }
}

function initializeUserName() {
    const userInfo = storage.getCurrentUserInfo();
    if(userInfo) {
        userName.value = userInfo.name;
    }
}

function showInstructions() {
    document.documentElement.scrollTop = document.body.scrollTop = window.pageYOffset = 0;
    splashImage.querySelector('figure').classList.add('fadeout');
    instructions.classList.add('displayed');
}

function goToQuizPage(event) {
    event.preventDefault();
    inputNewUserSettingsFromForm();
    stopMusic();
    window.location = 'quiz-page.html';
}

function startMusic() {
    themeMusic.play();
    setTimeout(() => stopMusic(), 45 * 1000);
}

function stopMusic() {
    themeMusic.pause();
    themeMusic.currentTime = 0;
}

function inputNewUserSettingsFromForm() {
    const formData = new FormData(landingPageForm);
    const userInfo = {
        name: formData.get('user-name'),
        instrumentType: formData.get('instrument-type'),
        intervalType: formData.get('interval-type'),
        randomFirstNote: formData.get('random-first-note'),
        duration: formData.get('duration'),
        playIntervalCount: formData.get('play-interval-counter'),
        numberOfQuestions: formData.get('number-questions'),
        numberOfAnswers: formData.get('number-answers'),
        soundEffects: formData.get('sound-effects')
    };
    storage.saveCurrentUserInfo(userInfo);
}