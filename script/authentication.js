import  {game}  from './game.js';
import  {player}  from './player.js';

export function authentication(){    
    const userName = document.getElementById('userName');
    const userPassword = document.getElementById('userPassword');
    const btn_connect = document.getElementById('btn_connect');
    const btn_new_game = document.getElementById('btn_new_game');

    

    btn_new_game.addEventListener('click', function() {
        if (userName.value && userPassword.value){
            createNewPlayer(userName.value)
            //#TODO отправить данные на сервер на проверку
            //#TODO если проверка провалена вывести сообщение об ошибке
            //#TODO если проверка пройдена
            // game.authentication = true
            const event = new Event('authenticated');
            document.dispatchEvent(event);  

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

    function createNewPlayer(name) {
        const playerIdx = game.playerList.length;
        player.name = name;
        player.playerIdx=playerIdx
        game.playerList.push(player);
    }

}
