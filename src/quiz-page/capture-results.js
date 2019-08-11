export function captureResults(correctAnswer, selected, resultsArray) {

    let found = false;

    for(let i = 0; i < resultsArray.length; i++) {
        if(resultsArray[i].interval === correctAnswer) {
            found = true;
            resultsArray[i].attempts++;

            if(correctAnswer === selected) {
                resultsArray[i].correct++;
            }
        }
    }

    if(!found) {
        const intervalObj = {
            interval: correctAnswer,
            correct: 0,
            attempts: 1
        };
        if(correctAnswer === selected) {
            intervalObj.correct++;
        }
        resultsArray.push(intervalObj);
    }
    
    return resultsArray;
}
