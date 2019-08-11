import { findById } from '../utils.js';
import { instruments } from './instrument.js';
const QUIZ_RESULTS_KEY = 'mit-historical-quiz-results';
const CURRENT_USER_INFO_KEY = 'mit-current-user-info';
const INSTRUMENTS_KEY = 'instruments';

export const storage = {
    storage: window.localStorage,
    save(key, item) {
        this.storage.setItem(key, JSON.stringify(item));
    },
    get(key) {
        return JSON.parse(this.storage.getItem(key));
    },
    getQuizResults(name = 'default') {
        const results = this.get(QUIZ_RESULTS_KEY + '-' + name);
        if(results) {
            return results;
        }
        return [];
    },
    saveQuizResults(results, name = 'default') {
        this.save(QUIZ_RESULTS_KEY + '-' + name, results);
    },
    getCurrentUserInfo() {
        const info = this.get(CURRENT_USER_INFO_KEY);
        if(info) {
            return info;
        }
        return null;
    },
    saveCurrentUserInfo(info) {
        this.save(CURRENT_USER_INFO_KEY, info);
    },
    addCurrentInstrumentData(data) {
        const storedInstruments = this.getInstruments();
        storedInstruments.push(data);
        this.save(INSTRUMENTS_KEY, storedInstruments);
    },
    getInstruments() {
        const storedInstruments = this.get(INSTRUMENTS_KEY);

        if(storedInstruments) {
            return storedInstruments;
        }
        return [];
    },
    preLoadInstruments() {
        const loadedInstruments = this.getInstruments();
        instruments.forEach((instrument) => {
            const found = findById(loadedInstruments, instrument.id);
            if(!found) {
                this.addCurrentInstrumentData(instrument);
            }
        });
    }

};
