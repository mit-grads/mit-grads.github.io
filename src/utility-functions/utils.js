export function findById(items, id) {
    for(let i = 0; i < items.length; i++) {
        const item = items[i];
        if(item.id === id) {
            return item;
        }
    }
    return null;
}

// Fisher-Yates Shuffle. Source: https://javascript.info/task/shuffle

export function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function sortData(objArr) {
    objArr.sort((a, b) => {
        return (a.index) - (b.index);
    });
}