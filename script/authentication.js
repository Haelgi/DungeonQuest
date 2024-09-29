import { Player, players } from './player.js'


const userName = document.getElementById('userName');
const userPassword = document.getElementById('userPassword');
const btn_new_game = document.getElementById('btn_new_game');
const btn_connect = document.getElementById('btn_connect');

btn_new_game.addEventListener('click', function() {
    createNewPlayer()
    //#TODO отправить данные на сервер на проверку
    //#TODO если проверка провалена вывести сообщение об ошибке
    //#TODO если проверка пройдена
    console.log(1, players)
    showLobby()
    console.log(2, players)

});

btn_connect.addEventListener('click', function() {
    //#TODO отправить данные на сервер на проверку
    //#TODO если проверка провалена вывести сообщение об ошибке
    //#TODO если проверка пройдена
    alert(`Кооперативного режиму ще немає, але він вже в розробці!))`);
});

function createNewPlayer() {
    //#TODO поменять название переменной игрока, и вообще лучше получить список с сервера
    const player_0 = new Player(userName.value)
    players.push(player_0);
    // alert(`${player_0.userName} ${player_0.userPassword}`); //проверка работы кнопки
}

function showLobby(){
    document.querySelector('.authentication').classList.add('hidden');
    document.querySelector('.start-game-container').classList.remove('hidden');
}

