import { renderAnswerOption } from '../src/quiz-page/render-answer-options.js';
const test = QUnit.test;

QUnit.module('render answer options');

test('render answer html', assert => {
    // arrange
    const expected = '<div class="answer-button" id="5"><p>5</p></div>';


    const distance = 5;

    // act
    const dom = renderAnswerOption(distance);
    const html = dom.outerHTML;

    // assert
    assert.equal(html, expected);
});