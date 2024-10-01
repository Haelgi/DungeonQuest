import  {Game}  from './game.js';
import  {Player}  from './player.js';

let game, player;

export function authentication(){    
    const userName = document.getElementById('userName');
    const userPassword = document.getElementById('userPassword');
    const btn_connect = document.getElementById('btn_connect');
    const btn_new_game = document.getElementById('btn_new_game');

    

    btn_new_game.addEventListener('click', function() {
        if (userName.value && userPassword.value){
            createNewGame()
            createNewPlayer(userName.value)
            //#TODO отправить данные на сервер на проверку
            //#TODO если проверка провалена вывести сообщение об ошибке
            //#TODO если проверка пройдена
            console.log(game, player)
        }
    });

    btn_connect.addEventListener('click', function() {
        if (userName.value && userPassword.value){
            //#TODO отправить данные на сервер на проверку
            //#TODO если проверка провалена вывести сообщение об ошибке
            //#TODO если проверка пройдена
            alert(`Кооперативного режиму ще немає, але він вже в розробці!))`);
        }
    });

    function createNewGame(){
        game = new Game();
    }

    function createNewPlayer(name) {
        //#TODO поменять название переменной игрока, и вообще лучше получить список с сервера
        const playerIdx = game.playerList.length;
        player = new Player(name, playerIdx)
        game.playerList.push(player);
        // alert(`${player_0.userName} ${player_0.userPassword}`); //проверка работы кнопки
    }

    return game, player
}

