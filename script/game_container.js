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

    const playingField = document.querySelector(`.playing-field`);
    const startFields = document.querySelectorAll(`.start-field`);
    // start position //////////////////////////////////////////////////////
    sunTokenPosition(game.day);
    addCharacterTablet();
    drawAbilitieCard()
    scrolCards('.abilitie-card-container')
    makeMove(startFields);
        
    //TODO выбор дотсупного поля для хода
    //TODO помещение туда нового тайла 
    //TODO разворот тайла в нужное положение
    //TODO создать класс для тайлов
    //TODO добавить свойства для тайлов
    //TODO записать позицию игрока
    //TODO ставить на позицию митл надземный илим подземный в зависимости от зашел игрок в катакомбы или нет
    //TODO вписать ход игры
    //TODO написать условие для движения тайла солца по дням



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

    function makeMove(fields) {
        highlightFields(fields);

        playingField.addEventListener('click', (e)=> {
            if(e.target.closest('.available')){
                const field = e.target.parentElement;
                const x = field.getAttribute('data-x'); 
                const y = field.getAttribute('data-y');
                player.position = {x:x, y:y};
                putHeroMitl(field)
                removeHighlightFields(fields);
            }
        }, { once: true } );
        
    }

    function highlightFields(fields){
        playingField.classList.add('shading')
        fields.forEach(field => {
            field.classList.add('available')
            field.insertAdjacentHTML('afterbegin', `
                <div class="available-field"></div>
            `);
        });
    };

    function removeHighlightFields(fields){
        playingField.classList.remove('shading')
        fields.forEach(field => {
            field.classList.remove('available')
            const highlight = field.querySelector(`.available-field`);
            highlight.remove();
        });
    };

    function putHeroMitl(field){
        const hero_mitl = playingField.querySelector(`.hero_mitl.${player.hero.name}`);
        const hero_token_catacomb = playingField.querySelector(`.hero_token_catacomb.${player.hero.name}`);
        hero_mitl && hero_mitl.remove();
        hero_token_catacomb && hero_token_catacomb.remove();
        field.innerHTML += player.catacomb
        ? `<img class="hero_token_catacomb ${player.hero.name}" src="img/hero_tiles/token/${player.hero.name}.png" alt="" style="rotate: 0deg;">`
        : `<img class="hero_mitl ${player.hero.name}" src="img/hero_tiles/mitle/${player.hero.name}.png" alt="">`;

    }
}