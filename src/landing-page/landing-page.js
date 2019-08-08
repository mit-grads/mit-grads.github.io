import { storage } from '../data/storage.js';
import { Sound } from '../data/sound.js';

const staffPlaceHolder = document.getElementById('staff-place-holder');
const instructions = document.getElementById('instructions');
const landingPageForm = document.getElementById('landing-page-form');
const userName = document.getElementById('user-name');
const backgroundMusic = new Sound('./assets/goldberg-variation-aria.mp3');
const dirtyStickMusic = new Sound('./assets/the-workout.mp3');
const christmasMusic = new Sound('./assets/xmas.mp3');
const floydMusic = new Sound('./assets/pink-floyd-have-a-cigar.mp3');
const synthesizerMusic = new Sound('./assets/the-polish-ambassador-synthesizer.mp3');

startMusic(backgroundMusic);
initializePage();
initializeUserName();
staffPlaceHolder.addEventListener('click', () => {
    showInstructions();
});
landingPageForm.addEventListener('submit', (event) => {
    goToQuizPage(event);
});

function initializePage() {
    const searchParams = new URLSearchParams(window.location.search);
    const themeId = searchParams.get('theme');
    if(themeId) {
        if(themeId.includes('dirty')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/dirty-splash.gif';
            stopMusic(backgroundMusic);
            startMusic(dirtyStickMusic);
        } 
        else if(themeId.includes('space') || themeId.includes('synth')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/notes-in-space.gif';
            stopMusic(backgroundMusic);
            startMusic(synthesizerMusic);
        }
        else if(themeId.includes('pink') || themeId.includes('floyd')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/eternity.gif';
            stopMusic(backgroundMusic);
            startMusic(floydMusic);
        }
        else if(themeId.includes('xmas') || themeId.includes('christmas')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/xmas-notes.gif';
            stopMusic(backgroundMusic);
            startMusic(christmasMusic);
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
    staffPlaceHolder.querySelector('figure').classList.add('fadeout');
    instructions.classList.add('displayed');
}

function goToQuizPage(event) {
    event.preventDefault();
    if(userName.value && userName.value !== '') {
        const userInfo = {
            name: userName.value
        };
        storage.saveCurrentUserInfo(userInfo);

        stopMusic(backgroundMusic);
        stopMusic(dirtyStickMusic);
        window.location = 'quiz-page.html';
    }
    else {
        userName.focus();
    }
}

function startMusic(music) {
    music.play();
    setTimeout(() => music.stop(), 36 * 1000);
}
function stopMusic(music) {
    music.stop();
}
