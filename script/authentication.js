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
    showLobby()
});

btn_connect.addEventListener('click', function() {
    //#TODO отправить данные на сервер на проверку
    //#TODO если проверка провалена вывести сообщение об ошибке
    //#TODO если проверка пройдена
    alert(`Кооперативного режиму ще немає, але він вже в розробці!))`);
});

function createNewPlayer() {
    //#TODO поменять название переменной игрока, и вообще лучше получить список с сервера
    const player_0 = new Player(userName.value, userPassword.value)
    players.push(player_0);
    // alert(`${player_0.userName} ${player_0.userPassword}`); //проверка работы кнопки
}

function showLobby(){
    document.querySelector('.authentication').remove();
    document.querySelector('body').innerHTML = `
    <!-- Waiting Container-->
    <!-- Character Selection Container-->
    <div class="start-game-container ">
        <div class="dialog-form-container ">
            <div class="title">
                <h1>Dungeon Quest Online</h1>
                <p>Виберіть персонажа, та дочейкайтесь інших гравців</p>
            </div>
            <!-- Character Selection Container--> 
            <div class="character-selection-container">
                <div class="card hero dwarf" style="background-image: url('img/hero_tiles/card_dwarf.png')"><p>Гном-Воїн Тарвін</p></div>
                <div class="card hero enchantress active" style="background-image: url('img/hero_tiles/card_enchantress.png')"><p>Чародійка Арвен</p></div>
                <div class="card hero hunter " style="background-image: url('img/hero_tiles/card_hunter.png')"><p>Мисливець Фарн</p></div>
                <div class="card hero knight" style="background-image: url('img/hero_tiles/card_knight.png')"><p>Рицар Хьюгарт</p></div>
                <div class="card hero mage" style="background-image: url('img/hero_tiles/card_mage.png')"><p>Маг Геріон</p></div>
                <div class="card hero robber" style="background-image: url('img/hero_tiles/card_robber.png')"><p>Розбійниця Изабелла</p></div>
            </div>         
            <!-- End Character Selection Container-->            

            <!-- Player List Container--> 
            <div class="player-list-container">
                <table class="player-list">
                    <tr class="player_1">
                        <th class="id">1</th>
                        <th class="name">Halegi</th>
                        <th class="hero"></th>
                        <th class="ready">Вибирає</th>
                    </tr>
                   
                </table>
            </div>         
            <!-- End Player List Container-->            
        </div>

    </div>

    <!-- End Waiting Container-->
    `
}