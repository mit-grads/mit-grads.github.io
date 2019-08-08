import { storage } from '../data/storage.js';

const staffPlaceHolder = document.getElementById('staff-place-holder');
const instructions = document.getElementById('instructions');
const landingPageForm = document.getElementById('landing-page-form');
const userName = document.getElementById('user-name');
const backgroundMusic = document.getElementById('background-music');
const dirtyStickMusic = document.getElementById('dirty-stick-music');
const christmasMusic = document.getElementById('christmas-music');
const floydMusic = document.getElementById('floyd-music');
const synthesizerMusic = document.getElementById('synthesizer-music');
let themeMusic = backgroundMusic;

initializeTheme();
initializeUserName();
staffPlaceHolder.addEventListener('mouseover', () => {
    startMusic();
});
staffPlaceHolder.addEventListener('click', () => {
    showInstructions();
});
landingPageForm.addEventListener('submit', (event) => {
    goToQuizPage(event);
});

function initializeTheme() {
    const searchParams = new URLSearchParams(window.location.search);
    const themeId = searchParams.get('theme');
    if(themeId) {
        if(themeId.includes('dirty')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/dirty-splash.gif';
            themeMusic = dirtyStickMusic;
        } 
        else if(themeId.includes('space') || themeId.includes('synth')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/notes-in-space.gif';
            themeMusic = synthesizerMusic;
        }
        else if(themeId.includes('pink') || themeId.includes('floyd')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/eternity.gif';
            themeMusic = floydMusic;
        }
        else if(themeId.includes('xmas') || themeId.includes('christmas')) {
            staffPlaceHolder.querySelector('figure img').src = './assets/xmas-notes.gif';
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

        stopMusic();
        window.location = 'quiz-page.html';
    }
    else {
        userName.focus();
    }
}

function startMusic() {
    themeMusic.play();
    setTimeout(() => stopMusic(), 45 * 1000);
}
function stopMusic() {
    themeMusic.pause();
    themeMusic.currentTime = 0;
}
