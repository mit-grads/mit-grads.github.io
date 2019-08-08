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


const interval = new IntervalClass();

let roundCount = 10;
let roundCounter = 0;

let answerButtons;
let correctAnswer;
let playCallback;
renderedRoundNumber.textContent = +roundCounter + 1;
renderedTotalRounds.textContent = roundCount;

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
    const distance = Math.floor(Math.random() * 8);
    interval.setSecondNote(distance);

    const firstNote = interval.getFirstNote();
    const secondNote = interval.getSecondNote();


    const instrument = findById(instruments, 'trumpet');
    const duration = 1.5;
    const intervalType = 'melodic';

    playIntervalButton.removeEventListener('click', playCallback);

    playCallback = () => {
        playInterval(firstNote, secondNote, instrument, intervalType, duration);

    };


    playIntervalButton.addEventListener('click', playCallback);

    let answerOptionsArray = [];

    const option = new GenerateInterval(interval.scale);
    correctAnswer = option.scale[distance];
    option.removeInterval(correctAnswer);

    const answer1 = option.getRandomInterval();
    const answer2 = option.getRandomInterval();

    answerOptionsArray.push(correctAnswer);
    answerOptionsArray.push(answer1);
    answerOptionsArray.push(answer2);

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
    renderedRoundNumber.textContent = +roundCounter + 2;
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

    if(roundCounter < roundCount) {
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