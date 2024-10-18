// import  {game, player}  from './authentication.js';
import  {loadTemplate}  from './function/loadTemplate.js';
import  {addScrolCardsEffect}  from './function/addScrolCardsEffect.js';
import  {diceRoll}  from './function/diceRoll.js';
import  {getRundomElement, rundom}  from './function/getRundomElement.js';
import  {heroes}  from './cards/heroes.js';
import  {room_tiles}  from './cards/room_tiles.js';
import  {dungeon_cards}  from './cards/dungeon_cards.js';
import  {catacomb_cards}  from './cards/catacomb_cards.js';
import  {deadman_cards}  from './cards/deadman_cards.js';
import  {trap_cards}  from './cards/trap_cards.js';
import  {сrypt_cards}  from './cards/сrypt_cards.js';
import  {door_cards}  from './cards/door_cards.js';
import  {search_cards}  from './cards/search_cards.js';
import  {treasure_cards}  from './cards/treasure_cards.js';
import  {monster_cards}  from './cards/monster_cards.js';
import  {dragon_cards}  from './cards/dragon_cards.js';


///////////////////////////// TODO удалить потом //////////////////////////////////////
import  {Game}  from './game.js';
import  {Player}  from './player.js';

export const player = new Player();
player.idx = 0; 
player.name = 'Олег'; 
player.hero = 'enchantress'; 
player.authentication = true;
// player.effectCardContainer = [dungeon_cards[52], dungeon_cards[52]];

export const game = new Game();
game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 
//////////////////////////////////////////////////////////////////////////////////////


export function game_container() {

    const body = document.querySelector(`body`);
    const playingField = document.querySelector(`.playing-field`);
    
    let nextCoordinates;

    // start position //////////////////////////////////////////////////////
    addCharacterTablet(player.hero);
    drawAbilitieCard(player.hero);
    drawEffectCard(player);
    addScrolCardsEffect('.abilitie-card-container');
    addScrolCardsEffect('.effect-card-container');
    addScrolCardsEffect('.treasure-card-container');
    makeMove(game.startFields);

    // end start position //////////////////////////////////////////////////////
    
    function drawFieldTileTests(roomNumber, rotate, x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)  
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">`);
            
        game.gameFields[y][x]['id'] = roomNumber-1;
        game.gameFields[y][x]['r'] = rotate;
    };
    
    drawFieldTileTests(1, 90, 1, 0);
    // drawFieldTileTests(15, 90, 0, 1);
    // drawFieldTileTests(15, 0, 1, 1);




    // start game //////////////////////////////////////////////////////
    function gameLoop() {
        sunTokenPosition(game.day);
        if (player.position){
            makeMove(nextCoordinates);
            shiftMitle()
        }
        requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);

    function checkDungeonCard(roomNumber) {
        if (!roomNumber) return
        if (room_tiles[roomNumber-1].dungeon) {   
            const card = getRundomElement(game.dungeon_cards, dungeon_cards)   
            eventWindow(card);
        };   
    };

    function eventWindow(card) {
        let cards
        let eventSection = '';
        if (Array.isArray(card)) {
            cards = card;
        } else {
            cards = [card];
        }
        cards.forEach(card => {
            eventSection += `<div class="card" style="background-image: url('img/${card.getPack()}_cards/${card.getPack()}_${card.id}.jpg')"></div>`
        });

        body.insertAdjacentHTML('afterbegin', 
            `<div class="event-container">
                    <div class="event-main ">
                        <div class="title">
                            <h1>${card.getTitle()}</h1>
                        </div>

                        <div class="event-section">
                            ${eventSection}
                        </div>

                        <button class="btn" id="btn_event">${card.btnName}</button>
                    </div>
                </div>
            `);

            const eventContainer = body.querySelector('.event-container');
            const btn = body.querySelector('#btn_event');

            btn.addEventListener('click', ()=>{
                eventContainer.remove()
                if (card.effect() === undefined) return
                eventWindow(card.effect())
            });
    }

    function isPlayerInTower() {
        if (!player.position) return false
        const [x, y] = player.position;
        return game.startFields.some(coord => coord[0] === x && coord[1] === y);
    }

    function isPlayerInTreasury() {
        if (!player.position) return false
        const [x, y] = player.position;
        return game.treasuryFields.some(coord => coord[0] === x && coord[1] === y);
    }

    function newCoordinate() {
        const [x, y] = player.position;
        const coordinates = [];
        // const ifPlayerInTower = game.startFields.some(coord => coord[0] === x && coord[1] === y);

        if (x > 0 && checkPermitWay([x, y],'left') && checkOtherPlayer([x - 1, y]) && checkPermitWayNeighbour([x - 1, y], 'right') ) coordinates.push([x - 1, y]); 
        if (y > 0 && checkPermitWay([x, y], 'up') && checkOtherPlayer([x, y - 1]) && checkPermitWayNeighbour([x, y - 1], 'down') ) coordinates.push([x, y - 1]);   
        if (x < 14 && checkPermitWay([x, y], 'right') && checkOtherPlayer([x + 1, y]) && checkPermitWayNeighbour([x + 1, y], 'left') ) coordinates.push([x + 1, y]);  
        if (y < 11 && checkPermitWay([x, y], 'down')  && checkOtherPlayer([x, y + 1]) && checkPermitWayNeighbour([x, y + 1], 'up') )  coordinates.push([x, y + 1]);  
        if (isPlayerInTower()) coordinates.push(...game.startFields)
        return coordinates;
    }

    function checkOtherPlayer(coordinat){
        const [x, y] = coordinat;
        if(!game.gameFields[y][x]['[id]']) return true
    }

    function checkPermitWayNeighbour(coordinat, direction) {
        const [x, y] = coordinat;
        const tileIdx = game.gameFields[y][x]['id'];
        const room = room_tiles[tileIdx];
    
        if (!room) return true;

        let permission = checkPermitWay(coordinat, direction);
    
        if (room.special === 'abyss' && !(player.position[0] === x && player.position[1] === y) && !permission) {

            while (!permission) {
                switch (game.gameFields[y][x]['r']) {
                    case '0':
                        game.gameFields[y][x]['r'] = '180';
                        break;
                    case '90':
                        game.gameFields[y][x]['r'] = '270';
                        break;
                    case '270':
                        game.gameFields[y][x]['r'] = '90';
                        break;
                    case '180':
                        game.gameFields[y][x]['r'] = '0';
                        break;
                }
                permission = checkPermitWay(coordinat, direction);
            }
        }
    
        return permission;
    }
        
    function checkPermitWay(coordinat, direction){
       
        const [x, y] = coordinat;
        const tileIdx = game.gameFields[y][x]['id'];
        const room = room_tiles[tileIdx];

        if (!room) return true

        const directionMapping = {
            '0': {
                'left' : 'left',
                'up': 'up',
                'right': 'right',
                'down' : 'down',
            },
            '90': {
                'left' : 'down',
                'up': 'left',
                'right': 'up',
                'down' : 'right',
            },
            '180': {
                'left' : 'right',
                'up' : 'down',
                'right' : 'left',
                'down' : 'up',
            },
            '270': {
                'left' : 'up',
                'up' : 'right',
                'right' : 'down',
                'down': 'left',
            }
        };

        const newDirection = directionMapping[game.gameFields[y][x]['r']][direction];
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

        if (!value) return false
        return true
    }
    
    function getElementsByData(array){
        const fields = [];
        array.forEach( _ => {
            const field = document.querySelector(`[data-y="${_[1]}"][data-x="${_[0]}"]`);
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

    function addCharacterTablet(heroName){
        const characterTablet = document.querySelector(`.character-tablet-container`);
        characterTablet.innerHTML=`
            <div class="hero-tablet shadow" style="background-image: url('img/hero_tiles/tablet/${heroName}.jpg')">
                <div class="hero-value resolve-value">${heroes[heroName].resolve}</div>
                <div class="hero-value strength-value">${heroes[heroName].strength}</div>
                <div class="hero-value dexterity-value">${heroes[heroName].dexterity}</div>
                <div class="hero-value defense-value">${heroes[heroName].defense}</div>
                <div class="hero-value luck-value">${heroes[heroName].luck}</div>
                <div class="hero-value health-value">${heroes[heroName].health}</div>             
            </div>
        `;
    };

    function drawAbilitieCard(heroName){
        const abilitieCardContainer = document.querySelector(`.abilitie-card-container`);
        heroes[heroName].abilities.forEach((item, idx) => {
            abilitieCardContainer.innerHTML+=`
                <div id="${idx}" class="card-deck " style="background-image: url('img/abilitie_cards/abilitie_${heroName}_${item.id}.jpg')"></div>        
            `
        });
    };

    function drawEffectCard(player){
        const abilitieCardContainer = document.querySelector(`.effect-card-container`);
        player.effectCardContainer.forEach((card) => {
            abilitieCardContainer.innerHTML+=`
                <div id="${card.id}" class="card-deck " style="background-image: url('img/${card.getPack}_cards/${card.getPack}_${card.id}.jpg')"></div>        
            `
        });
    };

    function makeMove(array) {
        // TODO добавить условия проверки разрешения сделать ход
        const fields = getElementsByData(array);
        
        if (!document.querySelector(`.available-field`)){
            highlightFields(fields);
        }

        playingField.addEventListener('click', (e)=> {
            if(e.target.closest('.available')){
                const field = e.target.parentElement;
                const x = Number(field.getAttribute('data-x')); 
                const y = Number(field.getAttribute('data-y'));
                let roomNumber;
                console.log(game.gameFields[y][x]['id'])
                console.log(field.classList.contains(`start-field`))
                console.log(!field.classList.contains(`treasury`))
                if (game.gameFields[y][x]['id'] === undefined && !field.classList.contains(`start-field`) && !field.classList.contains(`treasury`)){
                    roomNumber = drawFieldTile(field, x, y);

                };
                putHeroMitl(field);

                removeHighlightFields(fields);
                player.position = [x, y];
                nextCoordinates = newCoordinate()


            }
        }, { once: true } );
        
    }

    function drawFieldTile(field, x, y){
        const roomNumber = getRundomElement(game.room_tiles, room_tiles).number;
        let rotate;
        
        if (x > player.position[0]) {rotate = '90'}  
        if (x < player.position[0]) {rotate = '270'}  
        if (y > player.position[1]) {rotate = '180'}  
        if (y < player.position[1]) {rotate = '0'}  
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">`);
            
        game.gameFields[y][x]['id'] = roomNumber-1;
        game.gameFields[y][x]['r'] = rotate;
        game.gameFields[y][x]['p'] = player.name;

        delete game.gameFields[player.position[1]][player.position[0]]['p'];
        return roomNumber
    };

    function highlightFields(fields){
        fields.forEach(field => {
            field.classList.add('available')
            field.insertAdjacentHTML('afterbegin', `
                <div class="available-field"></div>
            `);
        });
    };

    function removeHighlightFields(fields){
        fields.forEach(field => {
            field.classList.remove('available')
            const highlight = field.querySelector(`.available-field`);
            highlight.remove();
        });
    };

    function putHeroMitl(field){
        const hero_mitl = playingField.querySelector(`.hero_mitl.${player.hero}`);
        const hero_token_catacomb = playingField.querySelector(`.hero_token_catacomb.${player.hero}`);
        let top = -10;
        let left = 10;

        if (hero_mitl) {hero_mitl.remove()};
        if (hero_token_catacomb) {hero_token_catacomb.remove()};
        if (player.catacomb) {
            field.innerHTML +=`<img class="hero_token_catacomb ${player.hero}" src="img/hero_tiles/token/${player.hero}.png" alt="" style="rotate: 0deg;">`
        } else {
            field.innerHTML +=`<img class="hero_mitl ${player.hero}" src="img/hero_tiles/mitle/${player.hero}.png" alt="" style="top: ${top}px; left: ${left}px;">`
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
