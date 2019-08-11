import { renderTHead, renderTBody, renderTFoot } from '/src/results-page/render-results-page.js';
import { storage } from '/src/data/storage.js';

const userName = document.getElementById('user-name');
const userCorrectPercent = document.getElementById('user-correct-percent');
const resultsTable = document.getElementById('results-table');
const resultsComment = document.getElementById('results-comment');

const userInfo = storage.getCurrentUserInfo();
const quizResults = storage.getQuizResults(userInfo.name);

let totalCorrect = 0;
let totalAttempts = 0;

quizResults.forEach(element => {
    totalCorrect += element.correct;
    totalAttempts += element.attempts;
});

userName.textContent = userInfo.name;
const percentCorrect = (totalCorrect / totalAttempts * 100);
userCorrectPercent.textContent = percentCorrect + '%';

if(percentCorrect === 100) {
    resultsComment.textContent = 'Wow! You really know your intervals! Great Job!';
} else if(percentCorrect < 100 && percentCorrect >= 90) {
    resultsComment.textContent = 'You did really well! Congrats!';
} else if(percentCorrect < 90 && percentCorrect >= 80) {
    resultsComment.textContent = 'You did well, but I bet you can do better.';
} else if(percentCorrect < 80 && percentCorrect >= 70) {
    resultsComment.textContent = 'Hmm, I think you could use some more studying.';
} else if(percentCorrect < 70 && percentCorrect >= 60) {
    resultsComment.textContent = 'Definitely need to study more.';
} else if(percentCorrect < 60 && percentCorrect >= 50) {
    resultsComment.textContent = 'Your glass is (more than) half full!';
} else if(percentCorrect < 50 && percentCorrect >= 40) {
    resultsComment.textContent = 'You win some,  and you lose some. You lost this one.';
} else if(percentCorrect < 40 && percentCorrect > 30) {
    resultsComment.textContent = 'Yeah... lets try that again.';
} else if(percentCorrect < 30 && percentCorrect >= 20) {
    resultsComment.textContent = 'Hmm... do you know what you\'re doing?';
} else if(percentCorrect < 20 && percentCorrect >= 10) {
    resultsComment.textContent = 'F for effort!';
} else {
    resultsComment.textContent = 'Maybe you should look into plumbing!';
}

renderTable(quizResults);

function renderTable(quizResults) {
    resultsTable.appendChild(renderTHead());
    resultsTable.appendChild(renderTBody(quizResults));
    resultsTable.appendChild(renderTFoot(totalCorrect, totalAttempts));
}
