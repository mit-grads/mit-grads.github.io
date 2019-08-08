import { storage } from '../data/storage.js';
import { Sound } from '../data/sound.js';

const staffPlaceHolder = document.getElementById('staff-place-holder');
const instructions = document.getElementById('instructions');
const landingPageForm = document.getElementById('landing-page-form');
const userName = document.getElementById('user-name');
const backgroundMusic = new Sound('./assets/goldberg-variation-aria.mp3');

startMusic();
initializeUserName();
staffPlaceHolder.addEventListener('click', () => {
    showInstructions();
});
landingPageForm.addEventListener('submit', (event) => {
    goToQuizPage(event);
});


function initializeUserName() {
    const userInfo = storage.getCurrentUserInfo();
    if(userInfo) {
        userName.value = userInfo.name;
    }
}

function showInstructions() {
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
    backgroundMusic.play();
    setTimeout(() => backgroundMusic.stop(), 36 * 1000);
}
function stopMusic() {
    backgroundMusic.stop();
}
