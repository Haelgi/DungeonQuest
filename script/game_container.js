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
player.hero = heroes['enchantress']; 
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
            shiftMitle()
        }
        
        

        requestAnimationFrame(gameLoop);
    };
    
    requestAnimationFrame(gameLoop);
    

    //TODO добавить свойства для тайлов
    //TODO вписать ход игры
    //TODO написать условие для движения тайла солца по дням


    function newCoordinate() {
        const [x, y] = player.position;
        const coordinates = [];
        
        if (x > 0 && checkPermitWay('left')) coordinates.push([x - 1, y]); 
        if (y > 0 && checkPermitWay('up')) coordinates.push([x, y - 1]);   
        if (x < 14 && checkPermitWay('right')) coordinates.push([x + 1, y]);  
        if (y < 11 && checkPermitWay('down'))  coordinates.push([x, y + 1]);  
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
                // TODO отправить позицию на сервер
                if (!field.querySelector(`.tile-map`) && !field.classList.contains(`start-field`) && !field.classList.contains(`treasury`)){
                    drawFieldTile(field, x, y);
                };
                putHeroMitl(field, x, y)
                removeHighlightFields(fields);
                player.position = [x, y];
            }
        }, { once: true } );
        
    }

    function checkPermitWay(direction){
        const room = room_tiles[player.roomIdx];
        if (!room) return true
        
        
        const directionMapping = {
            0: direction,
            90: {
                up: 'left',
                right: 'up',
                down : 'right',
                left : 'down',
            },
            180: {
                right : 'left',
                down : 'up',
                left : 'right',
                up : 'down',
            },
            270: {
                down: 'left',
                left : 'up',
                up : 'right',
                right : 'down',
            }
        };
        
        const newDirection = directionMapping[player.roomRotate][direction];
        const value = room[newDirection];

        if (typeof value === 'string') {
            if (value === 'door') {
                // TODO запустить проверку
                return true
            }
            if (value === 'grille') {
                // TODO запустить проверку
                return true
            }
        }
        if (value) return true
    }

    function drawFieldTile(field, x, y){
        const roomNumber = getRundomElement(game.room_tiles, room_tiles).number;
        
        let rotate;
        
        if (x > player.position[0]) {rotate = 90}  
        if (x < player.position[0]) {rotate = 270}  
        if (y > player.position[1]) {rotate = 180}  
        if (y < player.position[1]) {rotate = 0}  
        
        //TODO направление следующего хода управлять тайлом 
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">
            `);
            
        player.roomIdx = roomNumber-1;
        player.roomRotate = rotate;
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

    function putHeroMitl(field, x, y){
        const hero_mitl = playingField.querySelector(`.hero_mitl.${player.hero.name}`);
        const hero_token_catacomb = playingField.querySelector(`.hero_token_catacomb.${player.hero.name}`);
        let top = -10;
        let left = 10;
        // позиционирование митла на входе в новую комнату
        // if (!field.classList.contains(`start-field`) && !field.classList.contains(`treasury`)){
        //     if (x > player.position[0]) {top = -10; left= -30;}; 
        //     if (x < player.position[0]) {top = -10; left= 55;};  
        //     if (y > player.position[1]) {top = -50; left= 10;}; 
        //     if (y < player.position[1]) {top = 40; left= 10;}; 
        // };

        if (hero_mitl) {hero_mitl.remove()};
        if (hero_token_catacomb) {hero_token_catacomb.remove()};
        if (player.catacomb) {
            field.innerHTML +=`<img class="hero_token_catacomb ${player.hero.name}" src="img/hero_tiles/token/${player.hero.name}.png" alt="" style="rotate: 0deg;">`
        } else {
            field.innerHTML +=`<img class="hero_mitl ${player.hero.name}" src="img/hero_tiles/mitle/${player.hero.name}.png" alt="" style="top: ${top}px; left: ${left}px;">`
        }
    }

    function shiftMitle(){
        const heroMitl = document.querySelector('.hero_mitl');
        const currentField = heroMitl.parentElement;
        currentField.addEventListener('mouseenter', () => {
            heroMitl.style.top = '-60px';
            heroMitl.style.left = '-40px';
        });
        
        currentField.addEventListener('mouseleave', () => {
            heroMitl.style.top = '-10px';
            heroMitl.style.left = '10px';
        });
    };    
}
