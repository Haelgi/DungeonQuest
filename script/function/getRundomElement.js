export function getRundomElement(idxArr, objArr){
    const randomIdx = rundom(idxArr.length);
    idxArr.splice(randomIdx, 1);
    return objArr[randomIdx]
}

export function rundom(maxValue){
    return Math.floor(Math.random() * maxValue);
}