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
player.resolve=4; 
player.strength=6; 
player.dexterity=6; 
player.defense=4; 
player.luck=5; 
player.health=16; 

const game = new Game();
game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 
//////////////////////////////////////////////////////////////////////////////////////

export function game_container() {

    const timerContainer = document.querySelector('.head-timer-container');
    const characterCardContainer = document.querySelector('.character-card-container');

    // start position //////////////////////////////////////////////////////
    sunTokenPosition(game.day);
    addCharacterTablet();








    
    //TODO отрисовать нужного героя
    //TODO стартовые значения героев зашить в класс + добавить их свойства
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
    //TODO написать условие для движения тайла солца по дням

}

function sunTokenPosition(day){
    if (day > 38) return;
    const token_sun = document.querySelector(`.token_sun`);
    if (token_sun) token_sun.remove();
    const dayContainer = document.querySelector(`[day="${day}"]`);
    dayContainer.innerHTML=`
        <div class="token_sun"></div>
    `;
};

function addCharacterTablet(){
    const characterTablet = document.querySelector(`.character-tablet-container`);
    characterTablet.innerHTML=`
        <div class="hero-tablet shadow" style="background-image: url('img/hero_tiles/tablet/${player.hero}.jpg')">
            <div class="hero-value resolve-value">${player.resolve}</div>
            <div class="hero-value strength-value">${player.strength}</div>
            <div class="hero-value dexterity-value">${player.dexterity}</div>
            <div class="hero-value defense-value">${player.defense}</div>
            <div class="hero-value luck-value">${player.luck}</div>
            <div class="hero-value health-value">${player.health}</div>             
        </div>
    `;
};