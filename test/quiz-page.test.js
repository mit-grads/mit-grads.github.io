import { GenerateInterval } from '../src/quiz-page/generate-interval.js';

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