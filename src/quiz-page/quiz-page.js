import { playInterval } from '../playInterval.js';
import { findById, shuffle, sortData } from '../utils.js';
import { instruments } from '../data/instrument.js';
import { IntervalClass } from '../data/interval-class.js';
import { renderAnswerOption } from '../render-answer-options.js';
import { GenerateInterval } from '../quiz-page/generate-interval.js';
import { captureResults } from '../quiz-page/capture-results.js';
import { storage } from '../data/storage.js';
import { chromaticIntervalReference } from '../data/notes.js';

const playIntervalButton = document.getElementById('play-interval-button');
const choiceSection = document.getElementById('choice-section');
const nextButton = document.getElementById('next-button');
const renderedRoundNumber = document.getElementById('round-number');
const renderedTotalRounds = document.getElementById('total-rounds');
const currentUserInfo = storage.getCurrentUserInfo();


const interval = new IntervalClass();

let totalRounds = 10;
let roundCounter = 0;
let roundCounterRendered = roundCounter;

let answerButtons;
let correctAnswer;
let playCallback;

renderedRoundNumber.textContent = roundCounterRendered + 1;
renderedTotalRounds.textContent = totalRounds;

let resultsArray = [];


quizRound();

function disableNextButton() {
    const isButtonSelected = document.getElementsByClassName('selected');
    if(isButtonSelected.length === 0) {
        nextButton.disabled = true;
    }
}

function quizRound() {
    disableNextButton();
    playIntervalButton.disabled = false;
    let playIntervalCounter = 1;
    //get user info:
     //if userinfo.random first note = true
    //set first note is equal to random, 
    //distance is equal to random +distance


    const distance = Math.floor(Math.random() * 8);
    interval.setSecondNote(distance);

    const firstNote = interval.getFirstNote();
    const secondNote = interval.getSecondNote();


    const instrument = findById(instruments, 'trumpet');
    const duration = +currentUserInfo.duration;
    const intervalType = currentUserInfo.intervalType;

    playIntervalButton.removeEventListener('click', playCallback);

    setTimeout(() => {
        playInterval(firstNote, secondNote, instrument, intervalType, duration);
    }, 1000);

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
    correctAnswer = intervalOptions.scale[distance];
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


    answerButtons = document.getElementsByClassName('answer-button');
    [...answerButtons].forEach((button) => {
        button.addEventListener('click', () => {
            [...answerButtons].forEach((button) => {
                button.classList.remove('selected');
            });
            button.classList.add('selected');
            nextButton.disabled = false;
        });
    });
}



nextButton.addEventListener('click', () => {
    disableNextButton();
    let selectedButton;
    const buttons = [...answerButtons];
    for(let i = 0; i < buttons.length; i++) {
        if(buttons[i].className === 'answer-button selected') {
            selectedButton = buttons[i].id;
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


});