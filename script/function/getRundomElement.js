export function getRundomElement(idxArr, objArr){
    const randomIdx = Math.floor(Math.random() * idxArr.length);
    idxArr.splice(randomIdx, 1);
    return objArr[randomIdx]
}