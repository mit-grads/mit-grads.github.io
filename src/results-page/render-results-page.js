export function renderTHead() {
    const headerRow = document.createElement('thead');

    const headers = ['Interval', 'Correct', 'Attempts'];
    for(let i = 0; i < headers.length; i++) {
        const headerCell = document.createElement('th');
        headerCell.textContent = headers[i];
        headerRow.appendChild(headerCell);
    }
    
    return headerRow;
}

export function renderTBody(results) {
    const tBody = document.createElement('tbody');

    results.forEach(element => {
        const tRow = document.createElement('tr');
        const tData1 = document.createElement('td');
        const tData2 = document.createElement('td');
        const tData3 = document.createElement('td');
        tData1.textContent = element.interval;
        tData2.textContent = element.correct;
        tData3.textContent = element.attempts;
        tRow.appendChild(tData1);
        tRow.appendChild(tData2);
        tRow.appendChild(tData3);
        tBody.appendChild(tRow);
    });
    return tBody;
}

export function renderTFoot(totalCorrect, totalAttempts) {
    const tFoot = document.createElement('tfoot');
    const footCell1 = document.createElement('th'); 
    const footCell2 = document.createElement('th'); 
    const footCell3 = document.createElement('th');
    footCell1.textContent = 'Total';
    footCell2.textContent = totalCorrect;
    footCell3.textContent = totalAttempts;
    tFoot.appendChild(footCell1);
    tFoot.appendChild(footCell2);
    tFoot.appendChild(footCell3);
    return tFoot;
}
