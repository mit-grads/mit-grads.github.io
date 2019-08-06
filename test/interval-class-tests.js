import { IntervalClass } from '../src/data/interval-class.js';
import { diatonicIntervalReference } from '../src/data/notes.js';

const test = QUnit.test;
QUnit.module('Interval Class Tests');

test('test the constructor and setting the start note', assert => {
    const interval = new IntervalClass('A1', true);
    assert.equal(interval.getLowNote(), 'A1');

    const interval2 = new IntervalClass('G2', true);
    assert.equal(interval2.getLowNote(), 'G2');
});

test('test creation of intervals with diatonic tones', assert => {
    const interval = new IntervalClass('A1', true);

    interval.setInterval(diatonicIntervalReference['whole tone']);
    assert.equal(interval.highNote, 'B1');

    interval.setInterval(4);
    assert.equal(interval.highNote, 'E1');
});    

test('test creation of intervals with chromatic tones', assert => {
    const interval = new IntervalClass('A1', false);

    interval.setInterval(12);
    assert.equal(interval.highNote, 'A2');

    interval.setInterval(7);
    assert.equal(interval.highNote, 'E1');
});    

test('test creation of intervals with diatonic tones - and with different starting notes', assert => {
    const interval = new IntervalClass('C1', true);
    interval.setInterval(7);
    assert.equal(interval.highNote, 'C2');
    
    const interval2 = new IntervalClass('G1', true);
    interval2.setInterval(4);
    assert.equal(interval.highNote, 'C2');
});    

test('test creation of intervals with chromatic tones - and with different starting notes', assert => {
    const interval = new IntervalClass('C1', false);
    interval.setInterval(12);
    assert.equal(interval.highNote, 'C2');
    
    const interval2 = new IntervalClass('G1', false);
    interval2.setInterval(10);
    assert.equal(interval.highNote, 'C2');
});    
