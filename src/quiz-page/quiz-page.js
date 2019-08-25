import { playInterval } from '../playInterval.js';
import { findById, shuffle, sortData } from '../utils.js';
import { instruments } from '../data/instrument.js';
import { IntervalClass } from '../data/interval-class.js';
import { renderAnswerOption } from '../render-answer-options.js';
import { GenerateInterval } from '../quiz-page/generate-interval.js';
import { captureResults } from '../quiz-page/capture-results.js';
import { storage } from '../data/storage.js';
import { chromaticIntervalReference, notesArrayObjects, diatonicScale } from '../data/notes.js';

const playIntervalButton = document.getElementById('play-interval-button');
const choiceSection = document.getElementById('choice-section');
const nextButton = document.getElementById('next-button');
const renderedRoundNumber = document.getElementById('round-number');
const renderedTotalRounds = document.getElementById('total-rounds');
const instructionsDisplay = document.getElementById('instructions-display');
const answerContainer = document.querySelector('.answer-container');
const incorrectNoise = document.getElementById('incorrect-sfx');
const incorrectJarringNoise = document.getElementById('incorrect-jarring-sfx');
const correctNoise = document.getElementById('correct-sfx');
const correctJarringNoise = document.getElementById('correct-jarring-sfx');
const currentUserInfo = storage.getCurrentUserInfo();
const popUp = document.getElementById('pop-up');

popUp.addEventListener('click', () => {
    popUp.classList.add('no-show');
    quizRound();
});

function popupDisplay() {
    popUp.classList.remove('no-show');
}
popupDisplay();

let note;
function setNote() {
    if(currentUserInfo.randomFirstNote === 'yes') {
        const randomNum = Math.floor(Math.random() * 12);
        note = notesArrayObjects[randomNum].name;
    } else {
        note = 'A1';
    }
}

setNote();

let totalRounds = currentUserInfo.numberOfQuestions;
let roundCounter = 0;
let roundCounterRendered = roundCounter;
let instructionsVisible = false;
let answerButtons;
let correctAnswer;
let playCallback;

renderedRoundNumber.textContent = roundCounterRendered + 1;
renderedTotalRounds.textContent = totalRounds;

let resultsArray = [];
let lastIntervalUsedArray = [];


const interval = new IntervalClass(note);


instructionsDisplay.addEventListener('click', () => {
    const instructionsSlider = document.querySelector('.instructions-slider');
    if(instructionsVisible) {
        instructionsSlider.classList.remove('displayed');
        instructionsDisplay.textContent = 'View Instructions';
        instructionsVisible = false;
    }
    else {
        instructionsSlider.classList.add('displayed');
        instructionsDisplay.textContent = 'Hide Instructions';
        instructionsVisible = true;
    }
});

function quizRound() {
    disableNextButton();
    playIntervalButton.disabled = false;
    let playIntervalCounter = 1;

    setNote();

    interval.setFirstNote(note);

    let intervalDistance = Math.floor(Math.random() * diatonicScale.length);
    lastIntervalUsedArray.push(intervalDistance);

    if(lastIntervalUsedArray.length === 2) {
        if(lastIntervalUsedArray[0] === intervalDistance) {
            if(intervalDistance === diatonicScale.length - 1) {
                intervalDistance = 0;
            } else {
                intervalDistance = intervalDistance + 1;
            }
        }
        lastIntervalUsedArray.splice(0, 1);
    }

    interval.setSecondNote(intervalDistance);
    
    const firstNote = interval.getFirstNote();
    const secondNote = interval.getSecondNote();

    const instrument = findById(instruments, currentUserInfo.instrumentType);
    const duration = +currentUserInfo.duration;
    const intervalType = currentUserInfo.intervalType;

    playIntervalButton.removeEventListener('click', playCallback);

    setTimeout(() => {
        playInterval(firstNote, secondNote, instrument, intervalType, duration);
    }, 2000);

    playCallback = () => {
        playInterval(firstNote, secondNote, instrument, intervalType, duration);

        playIntervalCounter++;
        if(playIntervalCounter >= +currentUserInfo.playIntervalCount) {
            playIntervalButton.disabled = true;
        }
    };

    playIntervalButton.addEventListener('click', playCallback);

    let answerOptionsArray = [];

    const intervalOptions = new GenerateInterval(interval.scale);
    correctAnswer = intervalOptions.scale[intervalDistance];
    intervalOptions.removeInterval(correctAnswer);
    answerOptionsArray.push(correctAnswer);

    let numberOfAnswers = +currentUserInfo.numberOfAnswers - 1;
    if(numberOfAnswers > intervalOptions.length) {
        numberOfAnswers = intervalOptions.length;
    }

    for(let i = 0; i < numberOfAnswers; i++) {
        const answer = intervalOptions.getRandomInterval();
        answerOptionsArray.push(answer);
    }

    answerOptionsArray = shuffle(answerOptionsArray);

    for(let i = 0; i < answerOptionsArray.length; i++) {
        const dom = renderAnswerOption(answerOptionsArray[i]);
        choiceSection.appendChild(dom);
    }

    answerButtons = document.querySelectorAl('.answer-button');
    answerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            answerButtons.forEach((button) => {
                button.classList.remove('selected');
            });
            button.classList.add('selected');
            nextButton.disabled = false;
        });
    });
}

function addThenRemoveFromAnswers(className) {
    answerContainer.classList.add(className);
    setTimeout(() => answerContainer.classList.remove(className), 400);        
}

nextButton.addEventListener('click', () => {
    disableNextButton();
    let selectedButton;
    answerButtons.forEach(button => {
        if(button.className === 'answer-button selected') {
            selectedButton = button.id;
        }
    });

    if(currentUserInfo.soundEffects === 'some') {
        if(selectedButton === correctAnswer) {
            addThenRemoveFromAnswers('correct');
            correctNoise.play();
        }
        else {
            addThenRemoveFromAnswers('incorrect');
            incorrectNoise.play();
        }
    }
    else if(currentUserInfo.soundEffects === 'jarring') {
        if(selectedButton === correctAnswer) {
            addThenRemoveFromAnswers('correct-jarring');
            correctJarringNoise.play();
        }
        else {
            addThenRemoveFromAnswers('incorrect-jarring');
            incorrectJarringNoise.play();
        }
    }

    resultsArray = captureResults(correctAnswer, selectedButton, resultsArray);

    while(choiceSection.firstChild) {
        choiceSection.removeChild(choiceSection.firstChild);
    }

    roundCounter++;
    roundCounterRendered = roundCounter;
    if(roundCounterRendered >= totalRounds) {
        roundCounterRendered = totalRounds - 1;
    }
    renderedRoundNumber.textContent = roundCounterRendered + 1;

    if(roundCounter < totalRounds) {
        quizRound();
    } else {
        afterLastRound();
    }
});

function afterLastRound() {
    resultsArray.forEach((line) => {
        line.index = chromaticIntervalReference[line.interval];
    });
    sortData(resultsArray);
    resultsArray.forEach((line) => {
        delete line.index;
    });
    const currentUser = storage.getCurrentUserInfo();
    storage.saveQuizResults(resultsArray, currentUser.name);
    window.location = 'results-page.html';
}

function disableNextButton() {
    const isButtonSelected = document.getElementsByClassName('selected');
    if(isButtonSelected.length === 0) {
        nextButton.disabled = true;
    }
}