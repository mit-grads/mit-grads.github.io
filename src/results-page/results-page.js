import { renderTHead, renderTBody, renderTFoot } from '/src/results-page/render-results-page.js';
import { storage } from '/src/data/storage.js';

const userName = document.getElementById('user-name');
const userCorrectAnswers = document.getElementById('user-correct-answers');
const numberOfRounds = document.getElementById('number-of-rounds');
const resultsTable = document.getElementById('results-table');

const userInfo = storage.getCurrentUserInfo();
const quizResults = storage.getQuizResults(userInfo.name);

let totalCorrect = 0;
let totalAttempts = 0;
quizResults.forEach(element => {
    totalCorrect += element.correct;
    totalAttempts += element.attempts;
});

userName.textContent = userInfo.name;
userCorrectAnswers.textContent = totalCorrect;
numberOfRounds.textContent = totalAttempts;
renderTable(quizResults);


function renderTable(quizResults) {
    resultsTable.appendChild(renderTHead());
    resultsTable.appendChild(renderTBody(quizResults));
    resultsTable.appendChild(renderTFoot(totalCorrect, totalAttempts));
}
