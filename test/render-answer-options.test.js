import { renderAnswerOption } from '../src/render-answer-options.js';
const test = QUnit.test;

QUnit.module('render answer options');

test('render answer html', assert => {
    // arrange
    const expected = '<div><label for="choice"><img src="https://via.placeholder.com/150"></label><input type="radio" name="choice"></div>';
    
    const imageSrc = 'https://via.placeholder.com/150';

    // act
    const dom = renderAnswerOption(imageSrc);

    const html = dom.outerHTML;
    
    // assert
    assert.equal(html, expected);
});