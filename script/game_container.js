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
// heroes[player.hero].resolve = 10

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
    drawAbilitieCard(player.hero);
    drawEffectCard(player);
    addScrolCardsEffect('.abilitie-card-container');
    addScrolCardsEffect('.effect-card-container');
    addScrolCardsEffect('.treasure-card-container');

    clickDoorIcon()
    clickGrilleIcon()
    clickCollapseIcon()
    clickAbyssIcon()
    clickWebIcon()


    playTrapEvent()
    playPitEvent()
    // playDungeonEvent()

    function playDungeonEvent(){
        document.addEventListener('dungeon', () => {
        const card = getRundomElement(game.dungeon_cards, dungeon_cards)   
        eventWindow(card);
    });}

    function playTrapEvent(){
        document.addEventListener('trap', () => {
        const card = getRundomElement(game.trap_cards, trap_cards)   
        eventWindow(card);
    });}

    function playPitEvent(){
        document.addEventListener('pit', () => {
            diceRollWindow('Перевірка на', 'Удача', heroes[player.hero].luck, 2, false, '', falseFn)
            function falseFn(){
                const field = document.querySelector(`[data-y="${player.position[1]}"][data-x="${player.position[0]}"]`)
                heroes[player.hero].health -=6
                //TODO вернуть вход в катакомбы
                // player.catacomb = true
                // putHeroMitl(field)
            } 
        // если false -6 hp игрок в катакомбах
            
    });}

    // end start position //////////////////////////////////////////////////////
    
    function drawFieldTileTests(roomNumber, rotate, x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)  
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">`
        );
            
        game.gameFields[y][x]['id'] = roomNumber-1;
        game.gameFields[y][x]['r'] = rotate;
    };
    
    drawFieldTileTests(59, '90', 1,  0);
    // drawFieldTileTests(46, '0', 1,  1);
    // drawFieldTileTests(2, 180, 1,  1);
    // drawFieldTileTests(5, 0, 0, 1);
    // drawFieldTileTests(15, 0, 1, 1);


    // start game //////////////////////////////////////////////////////

    function gameLoop() {
        sunTokenPosition(game.day);
        addCharacterTablet(player.hero);
        
        if (!player.position) makeMove(game.startFields);
        if (player.position){
            makeMove(nextCoordinates);
            shiftMitle()
            
        }
        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    function eventWindow(card) {
        let cards
        let eventSection = '';
        if (Array.isArray(card)) {
            cards = card;
        } else {
            cards = [card];
        }
        cards.forEach(card => {
            eventSection += `<div class="card" style="background-image: url('img/${card.pack}_cards/${card.pack}_${card.id}.jpg')"></div>`
        });

        body.insertAdjacentHTML('afterbegin', 
            `<div class="event-container">
                    <div class="event-main ">
                        <div class="title">
                            <h1>${card.title}</h1>
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

    function diceRollWindow(title, valueName, value, diceCount, closeBtn, trueFn, falseFn) {
    
        let diceContainers = '';    
        let count = 1;
        let diceResult = 0;
        let resolveInner = '';
        let closeBtnInner = '';
        const resolvePlayer = heroes[player.hero].resolve;
        if ( resolvePlayer > 0) resolveInner = `<p> Ваша Рішучість: +${resolvePlayer}</p>`;
        if (closeBtn) closeBtnInner = `<div class='roll-button'><button id='close'>Закрити</button></div>`;
    
        while (count <= diceCount) {
            diceContainers +=
                `<div class="dice-container">
                    <div id='dice${count}' class="dice dice-${count}">
                    <div class='side one'>
                        <div class="dot one-1"></div>
                    </div>
                    <div class='side two'>
                        <div class="dot two-1"></div>
                        <div class="dot two-2"></div>
                    </div>
                    <div class='side three'>
                        <div class="dot three-1"></div>
                        <div class="dot three-2"></div>
                        <div class="dot three-3"></div>
                    </div>
                    <div class='side four'>
                        <div class="dot four-1"></div>
                        <div class="dot four-2"></div>
                        <div class="dot four-3"></div>
                        <div class="dot four-4"></div>
                    </div>
                    <div class='side five'>
                        <div class="dot five-1"></div>
                        <div class="dot five-2"></div>
                        <div class="dot five-3"></div>
                        <div class="dot five-4"></div>
                        <div class="dot five-5"></div>
                    </div>
                    <div class='side six'>
                        <div class="dot six-1"></div>
                        <div class="dot six-2"></div>
                        <div class="dot six-3"></div>
                        <div class="dot six-4"></div>
                        <div class="dot six-5"></div>
                        <div class="dot six-6"></div>
                    </div>
                    </div>
                </div>`;
            count += 1;
        }
    
        document.body.insertAdjacentHTML('afterbegin', 
            `<div class="event-container">
                <div class="event-main">
                    <div class="title">
                        <h1>${title} ${valueName}</h1>
                    </div>
                    <div class="dice-section">${diceContainers}</div>
                    <div class='roll-button'>
                        <button id='roll'>Кинути Кубики</button>
                    </div>
                    ${closeBtnInner}
                    <p> Ваша ${valueName}: ${value} </p>
                    ${resolveInner}
                </div>
            </div>`
        );
    
        const diceElements = document.querySelectorAll('.dice');
        const btnRoll = document.getElementById('roll');
        const btnClose = document.getElementById('close');
    
        btnRoll.addEventListener('click', () => {
            rollAllDice();
            setTimeout(() => {
                diceResultWindow();
            }, 1700);
        });

        if (btnClose) {
            btnClose.addEventListener('click', () => {
                document.querySelector('.event-container').remove()
            });
        }

    
        function rollAllDice() {
            diceResult = 0;
            diceElements.forEach((dice) => {
                roll(dice); 
            });
        }
    
        function roll(dice) {
            const value = Math.floor((Math.random() * 6) + 1);
            diceResult += value;
    
            for (let i = 1; i <= 6; i++) {
                dice.classList.remove('show-' + i);
                if (value === i) {
                    dice.classList.add('show-' + i);
                }
            }
    
            btnRoll.remove();
        }
    
        function diceResultWindow() {
            let title;
            let addBtn = '';
    
            if (diceResult <= value) {
                title = '<h1 style="color:green;">Успіх!</h1>';
                if (trueFn) trueFn()
            }
    
            if (diceResult > value && diceResult <= (value + heroes[player.hero].resolve)) {
                title = '<h1 style="color:red;">Провал....?</h1>';
                addBtn = `<button class="btn" id="btn_add_resolve">Додати Рішучості</button>`;
            }
    
            if (diceResult > (value + heroes[player.hero].resolve)) {
                title = '<h1 style="color:red;">Провал!</h1>';
                heroes[player.hero].resolve +=1;
                if (falseFn) falseFn()
            }
    
            document.body.insertAdjacentHTML('afterbegin', 
                `<div class="event-container" style="z-index: 110;">
                    <div class="event-main ">
                        <div class="title"> ${title} </div>
                        ${addBtn}
                        <button class="btn" id="btn_close">Закрити</button>
                    </div>
                </div>`
            );
    
            const eventWindows = document.querySelectorAll('.event-container');
    
            document.getElementById('btn_add_resolve')?.addEventListener('click', () => {
                const diff = diceResult - value;
                if (heroes[player.hero].resolve >= diff) {
                    heroes[player.hero].resolve -= diff;
                    if (trueFn) trueFn();  
                    eventWindows.forEach((e) => e.remove());
                }
            });
    
            document.getElementById('btn_close').addEventListener('click', () => {
                eventWindows.forEach((e) => e.remove());
            });
        }
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

        if (x > 0 && checkOtherPlayer([x - 1, y]) && checkPermitWayNeighbour([x - 1, y], 'right', false)  && checkPermitWay([x, y],'left', true)) coordinates.push([x - 1, y]); 
        if (y > 0 && checkOtherPlayer([x, y - 1]) && checkPermitWayNeighbour([x, y - 1], 'down', false)  && checkPermitWay([x, y], 'up', true)) coordinates.push([x, y - 1]);   
        if (x < 14 && checkOtherPlayer([x + 1, y]) && checkPermitWayNeighbour([x + 1, y], 'left', false)  && checkPermitWay([x, y], 'right', true)) coordinates.push([x + 1, y]);  
        if (y < 11  && checkOtherPlayer([x, y + 1]) && checkPermitWayNeighbour([x, y + 1], 'up', false)  && checkPermitWay([x, y], 'down', true))  coordinates.push([x, y + 1]);  
        if (isPlayerInTower()) coordinates.push(...game.startFields)
        return coordinates;
    }

    function checkOtherPlayer(coordinat){
        const [x, y] = coordinat;
        if(!game.gameFields[y][x]['[id]']) return true
    }

    function checkPermitWayNeighbour(coordinat, direction , checkBarrier) {
        const [x, y] = coordinat;
        const tileIdx = game.gameFields[y][x]['id'];
        const room = room_tiles[tileIdx];
    
        if (!room) return true;

        let permission = checkPermitWay(coordinat, direction , checkBarrier);
    
        if (permission === 'abyss' && !(player.position[0] === x && player.position[1] === y)) {

            while (permission === 'abyss') {
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
                permission = checkPermitWay(coordinat, direction, checkBarrier);
            }
        }
    
        return permission;
    }
        
    function checkPermitWay(coordinat, direction, checkBarrier){
       
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
        
        if (value && room.special === 'collapse' && checkBarrier=== true) drawCollapseIcon(x,y, direction);
        if (value && room.special === 'web' && checkBarrier=== true) drawWebIcon(x,y, direction);

        if (typeof value === 'string' && checkBarrier=== true) {
            if (value === 'door') drawDoorIcon(x,y, direction);
            if (value === 'grille') drawGrilleIcon(x,y, direction);
            if (value === 'abyss') drawAbyssIcon(x,y, direction);

        };

        return value
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
        const fields = getElementsByData(array);
    
        if (!document.querySelector(`.available-field`)) {
            highlightFields(fields);
        }
    
        playingField.addEventListener('click', (e) => {
            player.positionPrevious = player.position

            if (e.target.closest('.grille-icon')) return
            if (e.target.closest('.collapse-icon')) return
            if (e.target.closest('.web-icon')) return
            if (e.target.closest('.abyss-icon')) return

            if (e.target.closest('.available')) {
                const field = e.target.parentElement;
                const x = Number(field.getAttribute('data-x'));
                const y = Number(field.getAttribute('data-y'));
                let roomNumber;
    
                if (game.gameFields[y][x]['id'] === undefined && !field.classList.contains(`start-field`) && !field.classList.contains(`treasury`)) {
                    roomNumber = drawFieldTile(field, x, y);
                }
    
                removeHighlightFields(fields);
                removeSearchIcon();
                removeDoorIcon();
                removeGrilleIcon();
                removeCollapseIcon()
                removeWebIcon()
                removeAbyssIcon()
    
                putHeroMitl(field);
                
                
                player.position = [x, y];
                nextCoordinates = newCoordinate();
                if (roomNumber && room_tiles[game.gameFields[y][x]['id']].special === 'rotate') {
                    rotateRoomTile()
                    nextCoordinates = newCoordinate();
                };
    
                if (!room_tiles[game.gameFields[y][x]['id']]) return;
                if (room_tiles[game.gameFields[y][x]['id']].dungeon) createNewEvent('dungeon');
                if (room_tiles[game.gameFields[y][x]['id']].trap) createNewEvent('trap');
                if (room_tiles[game.gameFields[y][x]['id']].special === 'pit') createNewEvent('pit');

                removeSearchIcon();
    
                if (room_tiles[game.gameFields[y][x]['id']].search && (game.gameFields[y][x]['s'] === undefined || game.gameFields[y][x]['s'] < 2)) {
                    drawSearchIcon(field);
                    clickSerchIcon(x, y);
                }
            }
        }, { once: true });
    }

    function rotateRoomTile() {
        const [x, y] = player.position;
        const rotateOld = game.gameFields[y][x]['r'];
        const parentElement = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
        const childTileField = parentElement.querySelector('.tile-field');

        let rotateNew;

        switch (rotateOld) {
            case '0':
                rotateNew = '180';
                break;
            case '90':
                rotateNew = '270';
                break;
            case '270':
                rotateNew = '90';
                break;
            case '180':
                rotateNew = '0';
                break;
        }

        game.gameFields[y][x]['r'] = rotateNew;
    

    
        if (childTileField) {
            childTileField.style.rotate = `${rotateNew}deg`;
        }
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
        game.gameFields[y][x]['r'] = String(rotate);
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
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_token_catacomb ${player.hero}" src="img/hero_tiles/token/${player.hero}.png" alt="" style="rotate: 0deg;">
            `);
        } else {
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_mitl ${player.hero}" src="img/hero_tiles/mitle/${player.hero}.png" alt="" style="top: ${top}px; left: ${left}px;">
            `); 
        }
    }

    function drawSearchIcon(field){
        const searchIcon = playingField.querySelector(`.search-icon`);
        if (searchIcon) searchIcon.remove()
        field.insertAdjacentHTML('afterbegin', `
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
        `);
    }

    function drawDoorIcon(x,y, direction){
        switch (direction) {
            case 'left':
                x = x - 1;
                break;
            case 'up':
                y = y - 1;
                break;
            case 'right':
                x = x + 1;
                break;
            case 'down':
                y = y + 1;
                break;
        }
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="fa-solid fa-door-closed door-icon"></i>
        `);
    }

    function drawGrilleIcon(x,y, direction){
        switch (direction) {
            case 'left':
                x = x - 1;
                break;
            case 'up':
                y = y - 1;
                break;
            case 'right':
                x = x + 1;
                break;
            case 'down':
                y = y + 1;
                break;
        }
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="fa-solid fa-dungeon grille-icon"></i>
        `);
    }

    function drawCollapseIcon(x,y, direction){
        switch (direction) {
            case 'left':
                x = x - 1;
                break;
            case 'up':
                y = y - 1;
                break;
            case 'right':
                x = x + 1;
                break;
            case 'down':
                y = y + 1;
                break;
        }
        const [x0,y0] = player.positionPrevious
        if (x===x0 && y===y0) return
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="fa-solid fa-road-barrier collapse-icon"></i>
        `);
    }

    function drawWebIcon(x,y, direction){
        switch (direction) {
            case 'left':
                x = x - 1;
                break;
            case 'up':
                y = y - 1;
                break;
            case 'right':
                x = x + 1;
                break;
            case 'down':
                y = y + 1;
                break;
        }
        const [x0,y0] = player.positionPrevious
        if (x===x0 && y===y0) return
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="fa-solid fa-kip-sign web-icon"></i>
        `);
    }

    function drawAbyssIcon(x,y, direction){
        switch (direction) {
            case 'left':
                x = x - 1;
                break;
            case 'up':
                y = y - 1;
                break;
            case 'right':
                x = x + 1;
                break;
            case 'down':
                y = y + 1;
                break;
        }
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="fa-solid fa-arrow-up-from-ground-water abyss-icon"></i>
        `);
    }

    function removeSearchIcon(){
        const searchIcon = playingField.querySelector(`.search-icon`);
        if (searchIcon) searchIcon.remove()
    }

    function removeDoorIcon(){
        const doorIcon = playingField.querySelectorAll(`.door-icon`);
        if (doorIcon) doorIcon.forEach(element => {element.remove()});
    }

    function removeGrilleIcon(){
        const grilleIcon = playingField.querySelector(`.grille-icon`);
        if (grilleIcon) grilleIcon.remove()
    }

    function removeCollapseIcon(){
        const collapseIcon = playingField.querySelectorAll(`.collapse-icon`);
        if (collapseIcon) collapseIcon.forEach(element => {element.remove()});
    }

    function removeWebIcon(){
        const webIcon = playingField.querySelectorAll(`.web-icon`);
        if (webIcon) webIcon.forEach(element => {element.remove()});
    }

    function removeAbyssIcon(){
        const abyssIcon = playingField.querySelectorAll(`.abyss-icon`);
        if (abyssIcon) abyssIcon.forEach(element => {element.remove()});
    }


    function shiftMitle(){
        const heroMitl = document.querySelector('.hero_mitl');
        if (!heroMitl) return
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

    function clickSerchIcon(x,y){
        const serchIcon = document.querySelector('.search-icon');
        serchIcon.addEventListener('click', () => {
            const card = getRundomElement(game.search_cards, search_cards)
            eventWindow(card)
            removeSearchIcon()

            if (game.gameFields[y][x]['s']===undefined) {
                game.gameFields[y][x]['s'] = 1
            } else {
                game.gameFields[y][x]['s'] += 1
            }

        });
    };

    function clickDoorIcon(){
        playingField.addEventListener('click', (e) => {
            if(e.target.closest('.door-icon')) {
                e.target.remove()
                const card = getRundomElement(game.door_cards, door_cards)
                eventWindow(card)
            }
        });
    };

    function clickGrilleIcon() {
        playingField.addEventListener('click', (e) => {
            if (e.target.closest('.grille-icon')) {
                function trueFn(){e.target.remove()} 
                diceRollWindow('Перевірка на', 'Силa', heroes[player.hero].strength, 2, true, trueFn)
            }
        });
    }

    function clickCollapseIcon() {
        playingField.addEventListener('click', (e) => {
            if (e.target.closest('.collapse-icon')) {
                function trueFn(){e.target.remove()}
                diceRollWindow('Перевірка на', 'Спритність', heroes[player.hero].dexterity, 2, true, trueFn)   
            }
        });
    }

    function clickWebIcon() {
        playingField.addEventListener('click', (e) => {
            if (e.target.closest('.web-icon')) {
                function trueFn(){e.target.remove()}
                diceRollWindow('Перевірка на', 'Силa', heroes[player.hero].strength, 2, true, trueFn)   
            }
        });
    }

    function clickAbyssIcon() {
        playingField.addEventListener('click', (e) => {
            if (e.target.closest('.abyss-icon')) {
                function trueFn(){e.target.remove()}
                diceRollWindow('Перевірка на', 'Спритність', heroes[player.hero].dexterity, true, trueFn)   
            }
        });
    }
        
    function createNewEvent(eventName){
        const event = new Event(eventName);
        document.dispatchEvent(event);
    }
}
