import { renderTable } from '../src/results-page/results-page.js';
import { storage } from '../src/data/storage.js';

const test = QUnit.test;

QUnit.module('render results page');

test('render results page html', assert => {
    // arrange
    const expected = '<thead><th>Interval</th><th>Correct</th><th>Attempts</th></thead><tbody><tr><td>Major 3rd</td><td>2</td><td>3</td></tr><tr><td>Perfect 4th</td><td>1</td><td>3</td></tr><tr><td>Major 7th</td><td>2</td><td>4</td></tr></tbody><tfoot><th>Total</th><th>5</th><th>10</th></tfoot>';
    const results = [{
        interval: 'Major 3rd',
        correctCount: 2,
        attempts: 3
    }, {
        interval: 'Perfect 4th',
        correctCount: 1,
        attempts: 3
    }, {
        interval: 'Major 7th',
        correctCount: 2,
        attempts: 4
    }];
    storage.saveQuizResults(results);

    // act
    const dom = renderTable();
    const html = dom.outerHTML;
    
    // assert
    assert.equal(html, expected);
});