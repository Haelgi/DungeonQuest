import  {Game}  from './game.js';
import  {Player}  from './player.js';


const userName = document.getElementById('userName');
const userPassword = document.getElementById('userPassword');
const btn_new_game = document.getElementById('btn_new_game');
const btn_connect = document.getElementById('btn_connect');


btn_new_game.addEventListener('click', function() {
    createNewGame()
    createNewPlayer(userName.value)
    //#TODO отправить данные на сервер на проверку
    //#TODO если проверка провалена вывести сообщение об ошибке
    //#TODO если проверка пройдена
    showLobby()
});

btn_connect.addEventListener('click', function() {
    //#TODO отправить данные на сервер на проверку
    //#TODO если проверка провалена вывести сообщение об ошибке
    //#TODO если проверка пройдена
    alert(`Кооперативного режиму ще немає, але він вже в розробці!))`);
});

function createNewGame(){
    const newGame = new Game();
}

function createNewPlayer(userName) {
    //#TODO поменять название переменной игрока, и вообще лучше получить список с сервера
    const playerIdx = newGame.playerList.length;
    const player = new Player(userName, playerIdx)
    newGame.playerList.push(player);
    // alert(`${player_0.userName} ${player_0.userPassword}`); //проверка работы кнопки
}


function showLobby(){
    document.querySelector('.authentication').remove();
    fetch('../templates/lobby.html').then(response => response.text())
    .then(data => {document.getElementById('body').innerHTML = data;});
    // document.querySelector('.authentication').classList.add('hidden');
    // document.querySelector('.start-game-container').classList.remove('hidden');
}

