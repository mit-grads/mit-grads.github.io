

export function renderAnswerOption(answer) {
    const div = document.createElement('div');
    div.className = 'answer-button';
    const intervalP = document.createElement('p');
    const intervalText = document.createTextNode(answer);
    intervalP.appendChild(intervalText);
    div.appendChild(intervalP);
    div.id = answer;

    return div;
}