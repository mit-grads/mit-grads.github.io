import { renderInstrumentOptionsToDom } from '../src/landing-page/render-instrument-DOM.js';
import { instruments } from '../src/data/instrument.js';

const test = QUnit.test;

QUnit.module('landing page');

test('render quiz options to dom', assert => {
    // arrange
    const expected = '<option value="trumpet">Trumpet</option>';
    const instrument = instruments[0];

    // act
    const dom = renderInstrumentOptionsToDom(instrument);
    const html = dom.outerHTML;

    // assert
    assert.equal(html, expected);
});