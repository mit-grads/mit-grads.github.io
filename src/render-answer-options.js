

export function renderAnswerOption(answer, checked = false) {
    const div = document.createElement('div');
    // const intervalDiv = document.createElement('div');
    const intervalP = document.createElement('p');
    const intervalText = document.createTextNode(answer);
    intervalP.appendChild(intervalText);
    // intervalDiv.appendChild(intervalP);
    if(checked) {
        div.className = 'selected';
    }
    div.appendChild(intervalP);
    div.className += ' answer-button';

    return div;
}