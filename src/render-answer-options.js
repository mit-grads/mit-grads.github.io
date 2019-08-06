import { diatonicScale } from './data/notes.js';

export function renderAnswerOption(distance, checked = false){
    const div = document.createElement('div');

    const label = document.createElement('label');
    label.htmlFor = 'choice';
    const intervalDiv = document.createElement('div');
    const intervalP = document.createElement('p');
    const intervalText = document.createTextNode(diatonicScale[distance]);
    intervalP.appendChild(intervalText);
    intervalDiv.appendChild(intervalP);
    label.appendChild(intervalDiv);
    div.appendChild(label);

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    if(checked) {
        input.checked = true;
    }
    div.appendChild(input);

    return div;
}