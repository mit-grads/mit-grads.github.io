const QUIZ_RESULTS_KEY = 'mit-historical-quiz-results';

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
};
