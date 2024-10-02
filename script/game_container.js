// import  {game, player}  from './authentication.js';

///////////////////////////// TODO удалить потом //////////////////////////////////////
import  {Game}  from './game.js';
import  {Player}  from './player.js';

const player = new Player();
player.idx = 0; 
player.name = 'Олег'; 
player.hero = 'dwarf'; 
player.heroName = 'Гном-Воїн Тарвін';
player.authentication = true; 

const game = new Game();
game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 
//////////////////////////////////////////////////////////////////////////////////////

export function game_container() {

    const timerContainer = document.querySelector('.head-timer-container');

    function moveSunToken(day){
        if (day > 38) return;
        document.querySelector(`.token_sun`).remove();
        const dayContainer = document.querySelector(`[day="${day}"]`);
        dayContainer.innerHTML=`
            <div class="token_sun"></div>
        `;
    };

    moveSunToken(0);


    //TODO привязать дни к обьекту игры
    //TODO написать условие для движения тайла солца по дням

    //TODO найти контейнер с картачками игрока
    //TODO отрисовать нужного героя
    //TODO прицепить уровни жизней карточки героя к обьекту игрока
    //TODO отрисовать стартовые наборы карт на руку
    //TODO навесить анимацию перелистывания на колоды карт
    
    //TODO выбор стартовой позиции
    //TODO помещение туда нового тайла 
    //TODO разворот тайла в нужное положение
    //TODO создать класс для тайлов
    //TODO добавить свойства для тайлов
    //TODO записать позицию игрока
    //TODO ставить на позицию митл надземный илим подземный в зависимости от зашел игрок в катакомбы или нет
    //TODO вписать ход игры
    
    console.log(game)
}
