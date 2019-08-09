
export function renderInstrumentOptionsToDom(instrument) {
    const option = document.createElement('option');
    option.value = instrument.id;
    option.textContent = instrument.name;
    return option;
}