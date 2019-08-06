import { playInterval } from '../playInterval.js';
import { findById } from '../utils.js';
import { instruments } from '../data/instrument.js';
import { IntervalClass } from '../data/interval-class.js';
import { renderAnswerOption } from '../render-answer-options.js';

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


const dom = renderAnswerOption(distance, false);
choiceSection.appendChild(dom);