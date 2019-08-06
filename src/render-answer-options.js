

export function renderAnswerOption(imageSrc){
    const div = document.createElement('div');

    const label = document.createElement('label');
    label.htmlFor = 'choice';
    const image = document.createElement('img');
    image.src = imageSrc;
    label.appendChild(image);
    div.appendChild(label);

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    div.appendChild(input);

    return div;
}