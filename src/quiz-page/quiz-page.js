import { playInterval } from '../playInterval.js';
import { findById, shuffle } from '../utils.js';
import { instruments } from '../data/instrument.js';
import { IntervalClass } from '../data/interval-class.js';
import { renderAnswerOption } from '../render-answer-options.js';
import { GenerateInterval } from '../quiz-page/generate-interval.js';
import { captureResults } from '../quiz-page/capture-results.js';


const playIntervalButton = document.getElementById('play-interval-button');
const choiceSection = document.getElementById('choice-section');
const nextButton = document.getElementById('next-button');

const interval = new IntervalClass();

let answerButtons;
let roundCounter = 0;
let correctAnswer;
let playCallback;

quizRound();

function quizRound() {
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
        if(i === 0) {
            const dom = renderAnswerOption(answerOptionsArray[i], true);
            choiceSection.appendChild(dom);
        } else {
            const dom = renderAnswerOption(answerOptionsArray[i], false);
            choiceSection.appendChild(dom);
        }
    }


    answerButtons = document.getElementsByClassName('answer-button');
    [...answerButtons].forEach((button) => {
        button.addEventListener('click', () => {
            [...answerButtons].forEach((button) => {
                button.classList.remove('selected');
            });
            button.classList.add('selected');
        });
    });

}


let resultsArray = [];

nextButton.addEventListener('click', () => {
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
    console.log(roundCounter, resultsArray);
    quizRound();

});




    // if(resultsArray.length === 0) {
    //     console.log('zero');
    //     const answerObj = {
    //         interval: correctAnswer,
    //         correct: 0,
    //         attempts: 1
    //     };

    //     if(selectedButton === correctAnswer) {
    //         answerObj.correct++;
    //     }
    //     resultsArray.push(answerObj);
    // } else {
    //     let found = false;
    //     // console.log('not zero');
    //     debugger;
    //     for(let i = 0; i < resultsArray.length; i++) {

    //         // console.log(resultsArray[i].interval === correctAnswer);
    //         if(resultsArray[i].interval === correctAnswer) {
    //             // console.log('match');
    //             resultsArray[i].attempts++;

    //             if(selectedButton === correctAnswer) {
    //                 resultsArray[i].correct++;
    //                 found = true;
    //             }
    //         }
    //     }

    //     if(!found) {
    //         // console.log('not match');
    //         const answerObj = {
    //             interval: correctAnswer,
    //             correct: 0,
    //             attempts: 1
    //         };

    //         if(selectedButton === correctAnswer) {
    //             answerObj.correct++;
    //         }
    //         resultsArray.push(answerObj);
    //     }
    // }