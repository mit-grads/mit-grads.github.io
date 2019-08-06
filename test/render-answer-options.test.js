import { renderAnswerOption } from '../src/render-answer-options.js';
const test = QUnit.test;

QUnit.module('render answer options');

test('render answer html', assert => {
    // arrange
    const expected = '<div><label for="choice"><div><p>major sixth</p></div></label><input type="radio" name="choice"></div>';
    
    const distance = 5;

    // act
    const dom = renderAnswerOption(distance);
    const html = dom.outerHTML;
    
    // assert
    assert.equal(html, expected);
});