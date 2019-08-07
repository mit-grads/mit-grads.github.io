import { GenerateInterval } from '../src/quiz-page/generate-interval.js';
import { captureResults } from '../src/quiz-page/capture-results.js';

const test = QUnit.test;

QUnit.module('quiz-page');

test('generate random interval', assert => {
    // arrange
    const scale = [1, 2];
    const interval = new GenerateInterval(scale);
    const expected = 1;
    // act
    interval.getRandomInterval();
    const result = interval.scale.length;
    // assert
    assert.equal(result, expected);
});


test('if played interval is not in array, push interval object', assert => {

    // arrange
    const expected = {
        interval: 'major second',
        correct: 0,
        attempt: 1,
    };

    const correctAnswer = 'major second';
    const selected = 'major third';
    const resultsArray = [];

    // act

    const results = captureResults(correctAnswer, selected, resultsArray);

    // assert
    assert.deepEqual(results[0], expected);
});


test('correct answer', assert => {

    // arrange
    const expected = {
        interval: 'major second',
        correct: 1,
        attempt: 1,
    };

    const correctAnswer = 'major second';
    const selected = 'major second';
    const resultsArray = [];

    // act

    const results = captureResults(correctAnswer, selected, resultsArray);

    // assert
    assert.deepEqual(results[0], expected);
});



test('object not found in non empty array', assert => {

    // arrange
    const expected = [{
        interval: 'major second',
        correct: 0,
        attempt: 1,
    }, {
        interval: 'major third',
        correct: 0,
        attempt: 1,
    }
    ];

    const correctAnswer = 'major third';
    const selected = 'major second';
    const resultsArray = [{
        interval: 'major second',
        correct: 0,
        attempt: 1,
    }];

    // act

    const results = captureResults(correctAnswer, selected, resultsArray);

    // assert
    assert.deepEqual(results, expected);
});


test('correct answer', assert => {

    // arrange
    const expected = [{
        interval: 'major second',
        correct: 0,
        attempt: 1,
    }, {
        interval: 'major third',
        correct: 1,
        attempt: 1,
    }
    ];

    const correctAnswer = 'major third';
    const selected = 'major third';
    const resultsArray = [{
        interval: 'major second',
        correct: 0,
        attempt: 1,
    }];

    // act

    const results = captureResults(correctAnswer, selected, resultsArray);

    // assert
    assert.deepEqual(results, expected);
});

test('object found in non empty array', assert => {

    // arrange
    const expected = [{
        interval: 'major second',
        correct: 0,
        attempt: 2,
    }];

    const correctAnswer = 'major second';
    const selected = 'major third';
    const resultsArray = [{
        interval: 'major second',
        correct: 0,
        attempt: 1,
    }];

    // act

    const results = captureResults(correctAnswer, selected, resultsArray);

    // assert
    assert.deepEqual(results, expected);
});

test('object correct', assert => {

    // arrange
    const expected = [{
        interval: 'major second',
        correct: 1,
        attempt: 2,
    }];

    const correctAnswer = 'major second';
    const selected = 'major second';
    const resultsArray = [{
        interval: 'major second',
        correct: 0,
        attempt: 1,
    }];

    // act

    const results = captureResults(correctAnswer, selected, resultsArray);

    // assert
    assert.deepEqual(results, expected);
});


test('second found object', assert => {

    // arrange
    const expected = [{
        interval: 'major second',
        correct: 1,
        attempt: 2,
    }, {
        interval: 'major third',
        correct: 1,
        attempt: 2,
    }, {
        interval: 'perfect fourth',
        correct: 1,
        attempt: 2,
    }, {
        interval: 'perfect fifth',
        correct: 1,
        attempt: 2,
    }, {
        interval: 'major sixth',
        correct: 1,
        attempt: 2,
    },


    ];

    const correctAnswer = 'major third';
    const selected = 'major third';

    const resultsArray = [{
        interval: 'major second',
        correct: 1,
        attempt: 2,
    }, {
        interval: 'major third',
        correct: 0,
        attempt: 1,
    }, {
        interval: 'perfect fourth',
        correct: 1,
        attempt: 2,
    }, {
        interval: 'perfect fifth',
        correct: 1,
        attempt: 2,
    }, {
        interval: 'major sixth',
        correct: 1,
        attempt: 2,
    },
    ];
    // act

    const results = captureResults(correctAnswer, selected, resultsArray);

    // assert
    assert.deepEqual(results, expected);
});