import { storage } from '../src/data/storage.js';

const test = QUnit.test;

QUnit.module('Store Tests');

storage.storage = window.sessionStorage;

QUnit.testStart(() => {
    storage.storage.clear();
});

test('test get and save', assert => {
    const key = 'testData';
    const item = { code: 'product master' };
    storage.save(key, item);
    assert.deepEqual(storage.get(key), item);
});

test('test get results data when quiz results are empty', assert => {
    assert.deepEqual(storage.getQuizResults(), []);
});

test('test save and get quiz results', assert => {
    const expected = [{
        code: 'interval-1',
        timesShown: 1,
        timesCorrect: 1
    }, {
        code: 'interval-2',
        timesShown: 0,
        timesCorrect: 0
    }, {
        code: 'interval-3',
        timesShown: 6,
        timesCorrect: 2
    }];
    storage.saveQuizResults(expected);
    assert.deepEqual(storage.getQuizResults(), expected);
});


test('get preloaded instruments', assert => {

    // arrange
    const expected = {
        id: 'trumpet',
        name: 'Trumpet',
        filterType: 'low pass',
        oscWaveform: 'sawtooth',
        filterStartLevel: 1,
        filterEndLevel: 0,
        oscAttack: 0.01,
        oscDecay: 0.2,
        oscSustain: 0.75,
        oscRelease: 1.5,
        filterAttack: 0.01,
        filterDecay: 0.2,
        filterSustain: .75,
        filterRelease: 1.5,
        filterFrequency: 2000,
        distortionMix: 0,
        distortionAmount: 0.001,
        distortionOversample: 'none',
        delayAmount: 0,
        delayTime: 0.001,
        delayFeedback: 0.001,
        delayFilter: 0,
    };

    // act
    storage.preLoadInstruments();
    const result = storage.getInstruments();

    // assert
    assert.deepEqual(result[0], expected);
});

test('save instrument', assert => {

    // arrange
    const expected = {
        delayAmount: 0,
        delayFeedback: 0.001,
        delayFilter: 0.001,
        delayTime: 0.001,
        distortionAmount: 0.001,
        distortionMix: 0,
        distortionOversample: 'none',
        filterAttack: 0,
        filterDecay: 0.2,
        filterEndLevel: 0,
        filterFrequency: 894,
        filterRelease: 1.03,
        filterStartLevel: 1,
        filterSustain: 0.75,
        filterType: 'high pass',
        id: 'banjo-id',
        name: 'Banjo',
        oscAttack: 0,
        oscDecay: 0.32,
        oscRelease: 1.5,
        oscSustain: 0.3,
        oscWaveform: 'sawtooth'
    };

    // act
    storage.preLoadInstruments();
    storage.addCurrentInstrumentData(expected);
    const result = storage.getInstruments();
    // assert
    assert.deepEqual(result[1], expected);
});