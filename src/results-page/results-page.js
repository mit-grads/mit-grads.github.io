const resultsTable = document.getElementById('results-table');

export function renderTable() {
    resultsTable.appendChild(renderTHead());
    // resultsTable.appendChild(renderTBody());
    // resultsTable.appendChild(renderTFoot());
}

function renderTHead() {
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
