import { playInterval } from '../playInterval.js';
import { findById } from '../utils.js';
import { instruments } from '../data/instrument.js';
import { IntervalClass } from '../data/interval-class.js';
import { renderAnswerOption } from '../render-answer-options.js';
import { GenerateInterval } from '../quiz-page/generate-interval.js';


const playIntervalButton = document.getElementById('play-interval-button');
const choiceSection = document.getElementById('choice-section');

const interval = new IntervalClass();
const distance = Math.floor(Math.random() * 8);
interval.setSecondNote(distance);

const firstNote = interval.getFirstNote();
const secondNote = interval.getSecondNote();

const instrument = findById(instruments, 'trumpet');
const duration = 1.5;
const intervalType = 'melodic';

playIntervalButton.addEventListener('click', () => {
    playInterval(firstNote, secondNote, instrument, intervalType, duration);
});


let answerOptionsArray = [];

const option = new GenerateInterval(interval.scale);
const correctAnswer = option.scale[distance];
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

const answerButtons = document.getElementsByClassName('answer-button');
[...answerButtons].forEach((button) => {
    button.addEventListener('click', () => {
        [...answerButtons].forEach((button) => {
            button.classList.remove('selected');
        });
        button.classList.add('selected');
    });
});



// Fisher-Yates Shuffle. Source: https://javascript.info/task/shuffle

function shuffle(arr) { 
    for(let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
