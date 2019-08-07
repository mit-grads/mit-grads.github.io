import { renderTHead, renderTBody, renderTFoot } from '../src/results-page/render-results-page.js';

const test = QUnit.test;

QUnit.module('render results page');

test('render THead html', assert => {
    const expected = '<thead><th>Interval</th><th>Correct</th><th>Attempts</th></thead>';
    
    const dom = renderTHead();
    const html = dom.outerHTML;
    
    assert.equal(html, expected);
});


test('render TBody html', assert => {
    const expected = '<tbody><tr><td>Major 3rd</td><td>2</td><td>3</td></tr><tr><td>Perfect 4th</td><td>1</td><td>3</td></tr><tr><td>Major 7th</td><td>2</td><td>4</td></tr></tbody>';
    const results = [{
        interval: 'Major 3rd',
        correct: 2,
        attempts: 3
    }, {
        interval: 'Perfect 4th',
        correct: 1,
        attempts: 3
    }, {
        interval: 'Major 7th',
        correct: 2,
        attempts: 4
    }];

    const dom = renderTBody(results);
    const html = dom.outerHTML;

    assert.equal(html, expected);
});


test('render TFoot html', assert => {
    
    const expected = '<tfoot><th>Total</th><th>5</th><th>10</th></tfoot>';
    const results = [{
        interval: 'Major 3rd',
        correct: 2,
        attempts: 3
    }, {
        interval: 'Perfect 4th',
        correct: 1,
        attempts: 3
    }, {
        interval: 'Major 7th',
        correct: 2,
        attempts: 4
    }];

    const dom = renderTFoot(5, 10);
    const html = dom.outerHTML;

    assert.equal(html, expected);
});

