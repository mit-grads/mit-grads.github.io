import { IntervalClass } from '../src/data/interval-class.js';
// import { diatonicIntervalReference } from '../src/data/notes.js';

const test = QUnit.test;
QUnit.module('Interval Class Tests');

test('test the constructor and setting the start note', assert => {
    const interval = new IntervalClass('A1', 'diatonic');
    assert.equal(interval.getFirstNote(), 'A1');

    const interval2 = new IntervalClass('G2', 'diatonic');
    assert.equal(interval2.getFirstNote(), 'G2');
});

test('test creation of intervals with diatonic tones', assert => {
    const interval = new IntervalClass('A1', 'diatonic');

    interval.setSecondNote(4);
    assert.equal(interval.secondNote, 'E1');
    interval.setSecondNote(7);
    assert.equal(interval.secondNote, 'A2');
});    

test('test creation of intervals with chromatic tones', assert => {
    const interval = new IntervalClass('A1', 'chromatic');

    interval.setSecondNote(1);
    assert.equal(interval.secondNote, 'A#1 / Bb1');

    interval.setSecondNote(12);
    assert.equal(interval.secondNote, 'A2');

    interval.setSecondNote(7);
    assert.equal(interval.secondNote, 'E1');
});    

test('test creation of intervals with diatonic tones - and with different starting notes', assert => {
    const interval = new IntervalClass('C1', 'diatonic');
    interval.setSecondNote(7);
    assert.equal(interval.secondNote, 'C2');
    
    const interval2 = new IntervalClass('G1', 'diatonic');
    interval2.setSecondNote(4);
    assert.equal(interval.secondNote, 'C2');
});    

// test('test creation of intervals with chromatic tones - and with different starting notes', assert => {
//     const interval = new IntervalClass('C1', 'chromatic');
//     interval.setSecondNote(12);
//     assert.equal(interval.highNote, 'C2');
    
//     const interval2 = new IntervalClass('G1', 'chromatic');
//     interval2.setSecondNote(10);
//     assert.equal(interval.highNote, 'C2');
// });    
