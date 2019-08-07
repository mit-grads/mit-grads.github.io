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

