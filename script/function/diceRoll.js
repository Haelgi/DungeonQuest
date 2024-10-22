export function diceRoll() {
    const diceOne = document.getElementById('dice1');
    const diceTwo = document.getElementById('dice2');
    const diceBtn = document.getElementById('roll');

    diceBtn.onclick = function () {roll();};

    function roll() {

    const valueOne  = Math.floor((Math.random() * 6) + 1);
    const valueTwo   = Math.floor((Math.random() * 6) + 1);
    
    // console.log(valueOne + ' ' + valueTwo);

    for (let i = 1; i <= 6; i++) {
        diceOne.classList.remove('show-' + i);
        if (valueOne === i) {
        diceOne.classList.add('show-' + i);
        }
    }

    for (let k = 1; k <= 6; k++) {
        diceTwo.classList.remove('show-' + k);
        if (valueTwo === k) {
        diceTwo.classList.add('show-' + k);
        }
    } 
    setTimeout(roll(), 1000);
    }
}