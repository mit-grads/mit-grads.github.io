

export function renderAnswerOption(answer, checked = false) {
    const div = document.createElement('div');
    div.className = 'answer-button';
    const intervalP = document.createElement('p');
    const intervalText = document.createTextNode(answer);
    intervalP.appendChild(intervalText);
    if(checked) {
        div.className += ' selected';
    }
    div.appendChild(intervalP);
    div.id = answer;

    return div;
}