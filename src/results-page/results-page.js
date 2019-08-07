import { storage } from '../data/storage.js';

const resultsTable = document.getElementById('results-table');

export function renderTable() {
    resultsTable.appendChild(renderTHead());
    // resultsTable.appendChild(renderTBody());
    // resultsTable.appendChild(renderTFoot());
}

export function renderTHead() {
    const headerRow = document.createElement('thead');
    const headerCell1 = document.createElement('th');
    const headerCell2 = document.createElement('th');
    const headerCell3 = document.createElement('th');
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    headerRow.appendChild(headerCell3);
    headerCell1.textContent = 'Interval';
    headerCell2.textContent = 'Correct';
    headerCell3.textContent = 'Attempts';
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

export function renderTFoot(results) {
    const tFoot = document.createElement('tfoot');
    const footCell1 = document.createElement('th'); 
    const footCell2 = document.createElement('th'); 
    const footCell3 = document.createElement('th');
    footCell1.textContent = 'Total';
    let totalCorrect = 0;
    let totalAttempts = 0;
    results.forEach(element => {
        totalCorrect += element.correct;
        totalAttempts += element.attempts;
    });
    footCell2.textContent = totalCorrect;
    footCell3.textContent = totalAttempts;
    tFoot.appendChild(footCell1);
    tFoot.appendChild(footCell2);
    tFoot.appendChild(footCell3);
    return tFoot;
}
