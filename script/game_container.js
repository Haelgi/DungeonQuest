// import  {game, player}  from './authentication.js';
import  {scrolCards}  from './scrolCards.js';
import  {room_tiles}  from './room_tiles.js';


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

    // start position //////////////////////////////////////////////////////
    addCharacterTablet(player.hero);
    drawAbilitieCard(player.hero);
    scrolCards('.abilitie-card-container');
    makeMove(game.startFields);

    // end start position //////////////////////////////////////////////////////
    
    // start game //////////////////////////////////////////////////////
    function gameLoop() {
        sunTokenPosition(game.day);
        if (player.position){
            makeMove(newCoordinate());
        }
        
        

        requestAnimationFrame(gameLoop);
    };
    
    requestAnimationFrame(gameLoop);
    

    //TODO разворот тайла в нужное положение
    //TODO добавить свойства для тайлов
    //TODO вписать ход игры
    //TODO написать условие для движения тайла солца по дням


    function newCoordinate() {
        const [x, y] = player.position;
        const coordinates = [];
        x > 0 && coordinates.push([x - 1, y]);   
        x < 14 && coordinates.push([x + 1, y]);  
        y > 0 && coordinates.push([x, y - 1]);   
        y < 11 && coordinates.push([x, y + 1]);  
        return coordinates;
    }
    
    function getElementsByData(array){
        const fields = [];
        array.forEach( e => {
            const field = document.querySelector(`[data-y="${e[1]}"][data-x="${e[0]}"]`);
            fields.push(field)
        });
        return fields
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

    function addCharacterTablet(heroObj){
        const characterTablet = document.querySelector(`.character-tablet-container`);
        characterTablet.innerHTML=`
            <div class="hero-tablet shadow" style="background-image: url('img/hero_tiles/tablet/${String(heroObj.name)}.jpg')">
                <div class="hero-value resolve-value">${heroObj.resolve}</div>
                <div class="hero-value strength-value">${heroObj.strength}</div>
                <div class="hero-value dexterity-value">${heroObj.dexterity}</div>
                <div class="hero-value defense-value">${heroObj.defense}</div>
                <div class="hero-value luck-value">${heroObj.luck}</div>
                <div class="hero-value health-value">${heroObj.health}</div>             
            </div>
        `;
    };

    function drawAbilitieCard(heroObj){
        const abilitieCardContainer = document.querySelector(`.abilitie-card-container`);
        heroObj.abilities.forEach((abilitie, idx) => {
            abilitieCardContainer.innerHTML+=`
                <div id="${idx}" class="card-deck " style="background-image: url(${abilitie.source})"></div>        
            `
        });
    };

    function makeMove(array) {
        const fields = getElementsByData(array);
        if (!document.querySelector(`.available-field`)){
            highlightFields(fields);
        }

        playingField.addEventListener('click', (e)=> {
            if(e.target.closest('.available')){
                const field = e.target.parentElement;
                const x = Number(field.getAttribute('data-x')); 
                const y = Number(field.getAttribute('data-y'));
                player.position = [x, y];
                // TODO отправить позицию на сервер
                if (!field.querySelector(`.tile-map`) && !field.classList.contains(`start-field`)){
                    drawFieldTile(field);
                };
                putHeroMitl(field)
                removeHighlightFields(fields);
            }
        }, { once: true } );
        
    }

    function drawFieldTile(field){
        const roomNumber = getRundomElement(game.room_tiles, room_tiles).number;
        //TODO взять номер тайла из массива и удалить его из массива 
        //TODO отрисовать рандомный тайл 
        //TODO направление следующего хода управлять тайлом 

        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: 0deg;">
        `);

    };

    function getRundomElement(idxArr, objArr){
        const randomIdx = Math.floor(Math.random() * idxArr.length);
        idxArr.splice(randomIdx, 1);
        return objArr[randomIdx]
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