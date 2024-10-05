// import  {game, player}  from './authentication.js';
import  {scrolCards}  from './scrolCards.js';

///////////////////////////// TODO удалить потом //////////////////////////////////////
import  {Game}  from './game.js';
import  {Player}  from './player.js';
import  {heroes}  from './heroes.js';

const player = new Player();
player.idx = 0; 
player.name = 'Олег'; 
player.hero = heroes['robber']; 
player.authentication = true;


const game = new Game();
game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 
//////////////////////////////////////////////////////////////////////////////////////

export function game_container() {
    // start position //////////////////////////////////////////////////////
    sunTokenPosition(game.day);
    addCharacterTablet();
    drawAbilitieCard()
    scrolCards('.abilitie-card-container')
    //TODO выбор стартовой позиции
    const startFields = document.querySelectorAll(`.start-field`);
    selectAvailableField(startFields)

    function selectAvailableField(fields, func){
        const playingField = document.querySelector(`.playing-field`);
        playingField.classList.add('shading')
        fields.forEach(field => {
            field.insertAdjacentHTML('afterbegin', `
                <div class="available-field"></div>
            `);
        });
    }
    
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
        <div class="hero-tablet shadow" style="background-image: url('img/hero_tiles/tablet/${String(player.hero.name)}.jpg')">
            <div class="hero-value resolve-value">${player.hero.resolve}</div>
            <div class="hero-value strength-value">${player.hero.strength}</div>
            <div class="hero-value dexterity-value">${player.hero.dexterity}</div>
            <div class="hero-value defense-value">${player.hero.defense}</div>
            <div class="hero-value luck-value">${player.hero.luck}</div>
            <div class="hero-value health-value">${player.hero.health}</div>             
        </div>
    `;
};

function drawAbilitieCard(){
    const abilitieCardContainer = document.querySelector(`.abilitie-card-container`);
    player.hero.abilities.forEach((abilitie, idx) => {
        abilitieCardContainer.innerHTML+=`
            <div id="${idx}" class="card-deck " style="background-image: url(${abilitie.source})"></div>        
        `
    });
};
