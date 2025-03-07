import  {loadTemplate}  from './function/loadTemplate.js';
import  {ew}  from './eventWidows.js';
import  {addScrolCardsEffect}  from './function/addScrolCardsEffect.js';
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
import { player } from './player.js';

// TODO создать метод завершение хода
// TODO добавить метод завершение хода в необходиміе ме На жаль, ви повернулись у попередню кымнатуста 

// TODO создать метод завершение игі
//  На жаль, ви повернулись у попередню кымнатуTODO добавить условия завершение игі


// На жаль, ви повернулись у попередню кымнату/ TODO попробовать создавать окно навешиванием методов цепочкой

class Game {

    constructor() {
        this.gameIdx;
        this.currentPlayerIndex = 0;
        this.playerList = [];
        this.authentication = false;

        this.body;
        this.playingField;
        this.activeEvent = false
        
        this.next = false;
        this.diceRollResultGlobal = 0;
        this.nextCoordinates;
        this.darkRoomCoordinates = {};

        this.day = 0; 
        this.gameFields; 
        this.startFields=[[0,0], [14,0], [0,11], [14,11]]; 
        this.treasuryFields=[[7,5], [7,6]]; 
        this.room_tiles; 
        this.dungeon_cards; 
        this.catacomb_cards; 
        this.deadman_cards; 
        this.trap_cards; 
        this.сrypt_cards; 
        this.door_cards; 
        this.search_cards; 
        this.treasure_cards; 
        this.monster_cards 
        this.dragon_cards;
        
        this.fillGamePacks();

    }

    fillGamePacks(){
        this.createGameFields() 

        this.refreshRoomTiles()
        this.refreshDungeonCards()
        this.refreshCatacombCards()
        this.refreshDeadmanCards()
        this.refreshTrapCards()
        this.refreshCryptCards()
        this.refreshDoorCards()
        this.refreshSearchCards()
        this.refreshTreasureCards()
        this.refreshMonsterCards()
        this.refreshDragonCards()
    }

    getCurrentPlayer(){return this.playerList[this.currentPlayerIndex]}

    createGameFields(){this.gameFields=Array(12).fill().map(() => Array(15).fill().map(() => ({})))}

    refreshRoomTiles(){ this.room_tiles = Array.from({ length: 130 }, (_, index) => index + 1) }
    refreshDungeonCards(){ this.dungeon_cards=Array.from({ length: 60 }, (_, index) => index + 1) }
    refreshCatacombCards(){ this.catacomb_cards=Array.from({ length: 50 }, (_, index) => index + 1) }
    refreshDeadmanCards(){this.deadman_cards=Array.from({ length: 16 }, (_, index) => index + 1)}
    refreshTrapCards(){this.trap_cards=Array.from({ length: 16 }, (_, index) => index + 1)}
    refreshCryptCards(){this.сrypt_cards=Array.from({ length: 16 }, (_, index) => index + 1)}
    refreshDoorCards(){this.door_cards=Array.from({ length: 16 }, (_, index) => index + 1)}
    refreshSearchCards(){this.search_cards=Array.from({ length: 32 }, (_, index) => index + 1)}
    refreshTreasureCards(){this.treasure_cards=Array.from({ length: 36 }, (_, index) => index + 1)}
    refreshMonsterCards(){this.monster_cards=Array.from({ length: 20 }, (_, index) => index + 1)}
    refreshDragonCards(){this.dragon_cards=Array.from({ length: 8 }, (_, index) => index + 1)}

    startPosition(){
        this.body = document.querySelector(`body`);
        this.playingField = document.querySelector(`.playing-field`);            
        this.drawAbilitieCard(this.getCurrentPlayer().hero);
        this.drawEffectCard(this.getCurrentPlayer());
        addScrolCardsEffect('.abilitie-card-container');
        addScrolCardsEffect('.effect-card-container');
        addScrolCardsEffect('.treasure-card-container');
    
        this.clickDoorIcon()
        this.clickGrilleIcon()
        this.clickCollapseIcon()
        this.clickAbyssIcon()
        this.clickWebIcon()
        this.clickBridgeIcon()
    };

    // Custom Event /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    playTrapEvent(){
        this.activeEvent = true
        const card = getRundomElement(this.trap_cards, trap_cards)   
        this.drawCardEW(card);
    }

    playPitEvent(){
        this.activeEvent = true
        const trueFn =()=> this.endMove()
        const falseFn =()=>{
            heroes[this.getCurrentPlayer().hero].health -=6
            //TODO вернуть вход в катакомбі
            //На жаль, ви повернулись у попередню кымнату             
            this.getCurrentPlayer().catacomb = true
            this.drawHeroMitl(this.getCurrentPlayer().position[0], this.getCurrentPlayer().position[1]);
            this.endMove()
        } 

        this.diceRollEW('Зайшовши в кімнату у вас під ногами виявилася дуже крихка підлога, щоб не провалитися в катакомби перевірте свою Удачу.',`Ваша Удача:  ${heroes[this.getCurrentPlayer().hero].luck} `, heroes[this.getCurrentPlayer().hero].luck, false, 2, trueFn, falseFn)
    }

    playDungeonEvent(){
        this.activeEvent = true
        const card = getRundomElement(this.dungeon_cards, dungeon_cards)   
        this.drawCardEW(card);
    }
    
    playTreasuryEvent(){
        const card = getRundomElement(this.dragon_cards, dragon_cards)   
        this.drawCardEW(card);
    }

    // End Custom Event /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Draw Interface Elements /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
           
    drawFieldTileTests(roomNumber, rotate, x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)  
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">`
        );
            
        this.gameFields[y][x]['id'] = roomNumber-1;
        this.gameFields[y][x]['r'] = rotate;
    };

    // End Draw Interface Elements /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    // Template EventWindows /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    drawCardEW(card) {
        ew.drawEW(card.title);
        ew.drawCardsInEW(card);
        ew.drawBtnInEW('btn', card.btnName, ()=>{
            this.activeEvent = false
            ew.removeAllEW()
            if (card.effect() === undefined) return
            this.drawCardEW(card.effect())
        });
    }
    
    endMoveEW() {
        ew.drawEW('Завершити свій хід?');
        ew.drawBtnInEW('btn_yes', 'Так', ()=>{
            ew.removeAllEW()
            this.endMove()
        }, 'green');

        ew.drawBtnInEW('btn_no', 'Ні', ()=>{
            ew.removeAllEW()
        }, 'red');
    }

    diceRollDarkRoomEW() {
        this.nextCoordinates = []
        ew.drawEW('Ви потрапили у Темну Кімнату і намагаєтесь покинути її на дотик. Удача визначить ваш напрямок.');
        ew.drawDiceInEW(1)
        const trueFn = ()=>{
            ew.rollDiceFn()  
            setTimeout(() => {
                ew.removeAllEW();
                if (!this.darkRoomCoordinates[this.diceRollResultGlobal]) return this.diceRollDarkRoomEW();
                this.nextCoordinates = [this.darkRoomCoordinates[this.diceRollResultGlobal]];
                this.activeEvent = false
            }, 1700);
        }
        ew.drawBtnInEW('roll', 'Кинути Кубики', trueFn)
    }
    
    removeAllIcon(){
        this.removeIcon('.search-icon');
        this.removeIcon('.treasure-icon');
        this.removeIcon('.door-icon');
        this.removeIcon('.grille-icon');
        this.removeIcon('.collapse-icon');
        this.removeIcon('.web-icon');
        this.removeIcon('.bridge-icon');
        this.removeIcon('.abyss-icon');
        this.removeIcon('.end-icon');

    }
            
    diceRollEW(title, txt, value, dexterity, diceCount, trueFn, falseFn) {
        let newValue = value;
        let texts = txt;
        const resolvePlayer = heroes[this.getCurrentPlayer().hero].resolve;
        const treasure = this.getCurrentPlayer().treasureCardContainer.length;
    
        if (resolvePlayer > 0) {
            texts += ` + ${resolvePlayer} Рішучості`;
        }
    
        if (treasure > 0 && dexterity) {
            texts += ` - ${treasure} Спритності`;
            newValue -= treasure;
        }
    
        ew.drawEW(title);
        ew.drawTxtInEW(texts);
        ew.drawDiceInEW(diceCount);
        ew.drawBtnInEW('roll', 'Кинути Кубики', () => {
            ew.rollDiceFn();
            setTimeout(() => {
                this.rolResultEW(newValue, trueFn, falseFn);
            }, 1700);
        });
        ew.drawBtnInEW('close', 'Закрити', () => ew.removeAllEW(), 'red');
    }
    

    rolResultEW (value, trueFn, falseFn){
        if (this.diceRollResultGlobal <= (value)) {
            ew.drawEW('Успіх!', 'green');
            ew.drawBtnInEW('next','Далі', ()=>{
                if (trueFn) trueFn();
                ew.removeAllEW()
            });
        }

        if (this.diceRollResultGlobal > value && this.diceRollResultGlobal <= (value + heroes[this.getCurrentPlayer().hero].resolve )) {
            ew.drawEW('Провал....?');
            ew.drawBtnInEW('add_resolve','Додати Рішучості', ()=>{
                const diff = this.diceRollResultGlobal - value;
                heroes[this.getCurrentPlayer().hero].resolve -= Math.abs(diff);
                ew.removeAllEW()
                if (trueFn) trueFn();  
            });
            ew.drawBtnInEW('next','Далі', ()=>{
                ew.removeAllEW()
                if (falseFn) falseFn();
                heroes[this.getCurrentPlayer().hero].resolve +=1;
            });
        }

        if (this.diceRollResultGlobal > (value + heroes[this.getCurrentPlayer().hero].resolve)) {
            ew.drawEW('Провал!', 'red');
            ew.drawBtnInEW('next','Далі', ()=>{
                ew.removeAllEW()
                if (falseFn) falseFn();
            });
            heroes[this.getCurrentPlayer().hero].resolve +=1;
        }
    }

    
    isPlayerInTower() {
        if (!this.getCurrentPlayer().position) return false
        const [x, y] = this.getCurrentPlayer().position;
        return this.startFields.some(coord => coord[0] === x && coord[1] === y);
    }

    isPlayerInTreasury() {
        if (!this.getCurrentPlayer().position) return false
        const [x, y] = this.getCurrentPlayer().position;
        return this.treasuryFields.some(coord => coord[0] === x && coord[1] === y);
    }

    newCoordinate() {
        const [x, y] = this.getCurrentPlayer().position;
        const coordinates = [];

        if (x > 0 && this.checkOtherPlayer([x - 1, y]) && this.checkPermitWayNeighbour([x - 1, y], 'right', false)  && this.checkPermitWay([x, y],'left', true)) coordinates.push([x - 1, y]); 
        if (y > 0 && this.checkOtherPlayer([x, y - 1]) && this.checkPermitWayNeighbour([x, y - 1], 'down', false)  && this.checkPermitWay([x, y], 'up', true)) coordinates.push([x, y - 1]);   
        if (x < 14 && this.checkOtherPlayer([x + 1, y]) && this.checkPermitWayNeighbour([x + 1, y], 'left', false)  && this.checkPermitWay([x, y], 'right', true)) coordinates.push([x + 1, y]);  
        if (y < 11  && this.checkOtherPlayer([x, y + 1]) && this.checkPermitWayNeighbour([x, y + 1], 'up', false)  && this.checkPermitWay([x, y], 'down', true))  coordinates.push([x, y + 1]);  
        if (this.isPlayerInTower()) coordinates.push(...this.startFields)
        return coordinates;
    }

    checkOtherPlayer(coordinat){
        const [x, y] = coordinat;
        if(!this.gameFields[y][x]['[id]']) return true
    }

    checkPermitWayNeighbour(coordinat, direction , checkBarrier) {
        const [x, y] = coordinat;
        const tileIdx = this.gameFields[y][x]['id'];
        const room = room_tiles[tileIdx];
    
        if (!room) return true;

        let permission = this.checkPermitWay(coordinat, direction , checkBarrier);
    
        if (permission === 'abyss' && !(this.getCurrentPlayer().position[0] === x && this.getCurrentPlayer().position[1] === y)) {

            while (permission === 'abyss') {
                switch (this.gameFields[y][x]['r']) {
                    case '0':
                        this.gameFields[y][x]['r'] = '180';
                        break;
                    case '90':
                        this.gameFields[y][x]['r'] = '270';
                        break;
                    case '270':
                        this.gameFields[y][x]['r'] = '90';
                        break;
                    case '180':
                        this.gameFields[y][x]['r'] = '0';
                        break;
                }
                permission = this.checkPermitWay(coordinat, direction, checkBarrier);
            }
        }

        return permission;
    }
        
    checkPermitWay(coordinat, direction, checkBarrier){
        
        const [x, y] = coordinat;
        const tileIdx = this.gameFields[y][x]['id'];
        const room = room_tiles[tileIdx];
        let newCoord= ''

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

        const newDirection = directionMapping[this.gameFields[y][x]['r']][direction];
        const value = room[newDirection];
        
        if (value && room.special === 'collapse' && checkBarrier=== true) this.drawIcon(x,y, 'fa-solid fa-road-barrier', room.special, direction, true);
        if (value && room.special === 'web' && checkBarrier=== true) this.drawIcon(x,y, 'fa-solid fa-kip-sign', room.special, direction, true);
        
        if (value && room.special === 'bridge' && checkBarrier=== true) this.drawIcon(x,y, 'fa-solid fa-bridge-circle-exclamation', room.special, direction, true);

        if (typeof value === 'string' && checkBarrier=== true) {
            if (value === 'door') this.drawIcon(x,y, 'fa-solid fa-door-closed', 'door', direction);
            if (value === 'grille') this.drawIcon(x,y, 'fa-solid fa-dungeon', 'grille', direction);
            if (value === 'abyss') this.drawIcon(x,y, 'fa-solid fa-arrow-up-from-ground-water', 'abyss', direction);

        };

        if (value !== false && room.special === 'dark' && checkBarrier=== true) {
            switch (direction) {
                case 'left':
                    newCoord = [x - 1, y];
                    break;
                case 'up':
                    newCoord = [x, y - 1];
                    break;
                case 'right':
                    newCoord = [x + 1, y];
                    break;
                case 'down':
                    newCoord = [x, y + 1];
                    break;
            }

            value.forEach(element => {
                this.darkRoomCoordinates[element] = newCoord    
            });

        }
        
        return value
    }
    
    getElementsByData(array){
        const fields = [];
        array.forEach( _ => {
            const field = document.querySelector(`[data-y="${_[1]}"][data-x="${_[0]}"]`);
            fields.push(field)
        });
        return fields
    }

    sunTokenPosition(day){
        console.log(day)
        if (day > 38) return this.endGame();
        const token_sun = document.querySelector(`.token_sun`);
        if (token_sun) token_sun.remove();
        const dayContainer = document.querySelector(`[day="${day}"]`);
        dayContainer.innerHTML=`
            <div class="token_sun"></div>
        `;
    };

    addCharacterTablet(heroName){
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

    drawAbilitieCard(heroName){
        const abilitieCardContainer = document.querySelector(`.abilitie-card-container`);
        heroes[heroName].abilities.forEach((item, idx) => {
            abilitieCardContainer.innerHTML+=`
                <div id="${idx}" class="card-deck " style="background-image: url('img/abilitie_cards/abilitie_${heroName}_${item.id}.jpg')"></div>        
            `
        });
    };

    drawEffectCard(player){
        const abilitieCardContainer = document.querySelector(`.effect-card-container`);
        player.effectCardContainer.forEach((card) => {
            abilitieCardContainer.innerHTML+=`
                <div id="${card.id}" class="card-deck " style="background-image: url('img/${card.getPack}_cards/${card.getPack}_${card.id}.jpg')"></div>        
            `
        });
    };

    makeMove() {
        let array;
        if (!this.getCurrentPlayer().position) array = this.startFields;
        if (this.getCurrentPlayer().position) array =this.nextCoordinates;
    
        if (!document.querySelector(`.available-field`)) {
            this.highlightFields(array);
        }
    
        this.playingField.removeEventListener('click', this.moveEventHandler); 
    
        this.moveEventHandler = (e) => {
            this.getCurrentPlayer().positionPrevious = this.getCurrentPlayer().position;
    
            if (e.target.closest('.door-icon')) return;
            if (e.target.closest('.grille-icon')) return;
            if (e.target.closest('.collapse-icon')) return;
            if (e.target.closest('.web-icon')) return;
            if (e.target.closest('.abyss-icon')) return;
            if (e.target.closest('.bridge-icon')) return;
    
            if (e.target.closest('.available')) {
                this.removeAllIcon();
    
                const field = e.target.parentElement;
                const x = Number(field.getAttribute('data-x'));
                const y = Number(field.getAttribute('data-y'));
                let roomNumber;
    
                if (field.classList.contains(`treasury`) && !this.getCurrentPlayer().positionTreasury) {
                    this.getCurrentPlayer().positionTreasury = true;
                    this.playTreasuryEvent();
                };
    
                if (field.classList.contains(`treasury`) && this.getCurrentPlayer().positionTreasury) {
                    this.drawIcon(x, y, 'fa-regular fa-gem', 'treasure');
                    this.clickTreasureIcon(x, y);
                }
    
                if (this.gameFields[y][x]['id'] === undefined && !field.classList.contains(`start-field`) && !field.classList.contains(`treasury`)) {
                    roomNumber = this.drawFieldTile(x, y);
                }
    
                this.removeHighlightFields(array);
                this.drawHeroMitl(x, y);
                this.nextCoordinates = this.newCoordinate();
    
                if (!room_tiles[this.gameFields[y][x]['id']]) return;
    
                if (room_tiles[this.gameFields[y][x]['id']].dungeon && !this.activeEvent) this.playDungeonEvent();
    
                if (room_tiles[this.gameFields[y][x]['id']].trap && !this.activeEvent) this.playTrapEvent();
                if (room_tiles[this.gameFields[y][x]['id']].special === 'pit' && !this.activeEvent) this.playPitEvent();
    
                if (room_tiles[this.gameFields[y][x]['id']]?.special === 'rotate') {
                    this.rotateRoomTile()
                    this.nextCoordinates = this.newCoordinate();
                    this.endMove()
                };
    
                if (room_tiles[this.gameFields[y][x]['id']].special === 'dark') {
                    this.diceRollDarkRoomEW()  
                }
    
                if (room_tiles[this.gameFields[y][x]['id']].search && (this.gameFields[y][x]['s'] === undefined || this.gameFields[y][x]['s'] < 2)) {
                    this.drawIcon(x, y, 'fa-solid fa-magnifying-glass', 'search');
                    this.clickSerchIcon();
                }
                if(room_tiles[this.gameFields[y][x]['id']]?.special === 'bridge') {
                    this.removeCoordinateFromArray([player.positionPrevious[0],player.positionPrevious[1]], this.nextCoordinates)
                }
    
                if(room_tiles[this.gameFields[y][x]['id']]?.special !== 'bridge' 
                    && room_tiles[this.gameFields[y][x]['id']]?.special !== 'corridor' 
                    && room_tiles[this.gameFields[y][x]['id']]?.special !== 'pit' 
                    && !this.getCurrentPlayer().positionTreasury) {
                    this.endMove()      
                }
            }
    
            this.diceRollResultGlobal = 0;
        };
    
        this.playingField.addEventListener('click', this.moveEventHandler, { once: true });
    }

    removeCoordinateFromArray(elem, arr){
        const index = arr.findIndex(item => 
            item[0] === elem[0] && item[1] === elem[1]
        );
        if (index !== -1) {
            arr.splice(index, 1);
        }
    }

    toggleCurrentPlayer(){
        if (this.playerList.length -1 < this.currentPlayerIndex) this.currentPlayerIndex += 1;
        if (this.playerList.length -1 === this.currentPlayerIndex) {
            this.currentPlayerIndex += 0;
            this.day += 1;
            console.log(this.day)
        }
    }

    queueEW(){
        const name = this.getCurrentPlayer().name;
        if(player.idx === this.currentPlayerIndex && this.playerList.length > 1){
            ew.drawEW(`${name}, ваш крок!`);
            ew.drawBtnInEW('close', 'Розпочати!', ()=> ew.removeAllEW())
        } 
        if(player.idx !== this.currentPlayerIndex){
            console.log('else')
            ew.drawEW(`Очівання гравця ${name}!`)
        }
    }

    endMove(){
        console.log('endMove()')
        this.toggleCurrentPlayer()
        this.queueEW()
        this.activeEvent = false
    }

    endGame(){
        console.log('Game Over')
    }

    rotateRoomTile() {
        const [x, y] = this.getCurrentPlayer().position;
        const rotateOld = this.gameFields[y][x]['r'];
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

        this.gameFields[y][x]['r'] = rotateNew;
    

    
        if (childTileField) {
            childTileField.style.rotate = `${rotateNew}deg`;
        }
    }
    
    drawFieldTile(x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        const roomNumber = getRundomElement(this.room_tiles, room_tiles).number;
        let rotate;
        
        if (x > this.getCurrentPlayer().positionPrevious[0]) {rotate = '90'}  
        if (x < this.getCurrentPlayer().positionPrevious[0]) {rotate = '270'}  
        if (y > this.getCurrentPlayer().positionPrevious[1]) {rotate = '180'}  
        if (y < this.getCurrentPlayer().positionPrevious[1]) {rotate = '0'}  
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">`);
            
        this.gameFields[y][x]['id'] = roomNumber-1;
        this.gameFields[y][x]['r'] = String(rotate);
        this.gameFields[y][x]['p'] = this.getCurrentPlayer().name;

        delete this.gameFields[this.getCurrentPlayer().position[1]][this.getCurrentPlayer().position[0]]['p'];
        
        return roomNumber
    };

    highlightFields(array){
        const fields = this.getElementsByData(array);
        fields.forEach(field => {
            field.classList.add('available')
            field.insertAdjacentHTML('afterbegin', `
                <div class="available-field"></div>
            `);
        });
    };

    removeHighlightFields(array){
        const fields = this.getElementsByData(array);
        fields.forEach(field => {
            field.classList.remove('available')
            const highlight = field.querySelector(`.available-field`);
            highlight.remove();
        });
    };

    drawHeroMitl(x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        const hero_mitl = this.playingField.querySelector(`.hero_mitl.${this.getCurrentPlayer().hero}`);
        const hero_token_catacomb = this.playingField.querySelector(`.hero_token_catacomb.${this.getCurrentPlayer().hero}`);

        if (hero_mitl) {hero_mitl.remove()};
        if (hero_token_catacomb) {hero_token_catacomb.remove()};
        if (this.getCurrentPlayer().catacomb) {
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_token_catacomb ${this.getCurrentPlayer().hero}" src="img/hero_tiles/token/${this.getCurrentPlayer().hero}.png" alt="" style="rotate: 0deg;">
            `);
        } else {
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_mitl ${this.getCurrentPlayer().hero}" src="img/hero_tiles/mitle/${this.getCurrentPlayer().hero}.png" alt="">
            `); 
        }
        
        this.drawIcon(x, y, 'fa-regular fa-circle-xmark', 'end');
        this.clickEndIcon(x, y);            
        this.getCurrentPlayer().position = [x, y];
        if (this.gameFields[y][x]['id'] === undefined && !field.classList.contains(`start-field`) && !field.classList.contains(`treasury`)) {
            this.drawFieldTile(x, y);
        }
    }

    drawIcon(x,y, icon, selectorName ,direction, drawPrevious){
        if (direction){
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
        }

        if (drawPrevious) {
            const [x0,y0] = this.getCurrentPlayer().positionPrevious
            if (x===x0 && y===y0) return
        }

        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="${icon} ${selectorName}-icon"></i>
        `);
    }

    removeIcon(selectorName){
        const item = this.playingField.querySelectorAll(selectorName);
        if (item) item.forEach(element => {element.remove()});
    }

    clickSerchIcon(){
        const [x,y] = this.getCurrentPlayer().position
        const serchIcon = document.querySelector('.search-icon');
        serchIcon.addEventListener('click', () => {
            const card = getRundomElement(this.search_cards, search_cards)
            this.drawCardEW(card)
            this.removeIcon('.search-icon');

            if (this.gameFields[y][x]['s']===undefined) {
                this.gameFields[y][x]['s'] = 1
            } else {
                this.gameFields[y][x]['s'] += 1
            }
            this.endMove()

        });
    };

    clickEndIcon(){
        const endIcon = document.querySelector('.end-icon');
        endIcon.addEventListener('click', () => {
            this.endMoveEW()
        });
    };

    clickTreasureIcon(){
        const treasureIcon = document.querySelector('.treasure-icon');
        treasureIcon.addEventListener('click', () => {
            const card = getRundomElement(this.treasure_cards, treasure_cards)
            this.drawCardEW(card)
        });
    };

    clickDoorIcon(){
        this.playingField.addEventListener('click', (e) => {
            if(e.target.closest('.door-icon')) {
                const card = getRundomElement(this.door_cards, door_cards)
                this.drawCardEW(card)
                e.target.remove()
            }
        });
    };

    clickGrilleIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.grille-icon')) {
                const trueFn = ()=>  e.target.remove()
                const falseFn = ()=>  this.endMove()
                this.diceRollEW('На виході з кімнати перед вами впала решітка, заблокувавши вам шлях. Перевірте свою Силу.', `Ваша сила: ${heroes[this.getCurrentPlayer().hero].strength}`, heroes[this.getCurrentPlayer().hero].strength, false, 2, trueFn, falseFn)
            }
        });
    }

    clickCollapseIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.collapse-icon')) {
                const trueFn = ()=>  e.target.remove()
                const falseFn = ()=>  this.endMove()
                this.diceRollEW('Перед вами кімната заповнена уламками стелі що впала, щоб пройти на інший бік кімнати перевірте свою Спритність.', `Ваша cпритність: ${heroes[this.getCurrentPlayer().hero].dexterity}`, heroes[this.getCurrentPlayer().hero].dexterity, true, 2, trueFn, falseFn)   
            }
        });
    }

    clickWebIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.web-icon')) {
                const trueFn = ()=>  e.target.remove()
                const falseFn = ()=>  this.endMove()
                this.diceRollEW('На виході з кімнати перед вами впала решітка, заблокувавши вам шлях. Перевірте свою Силу.', `Ваша сила: ${heroes[this.getCurrentPlayer().hero].strength}`, heroes[this.getCurrentPlayer().hero].strength, false, 2, trueFn, falseFn)
            }
        });
    }

    clickBridgeIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.bridge-icon')) {
                const trueFn = ()=>  e.target.remove()
                const falseFn = ()=>{
                    this.removeIcon('.bridge-icon');
                    const trueFn = ()=>  {
                        heroes[this.getCurrentPlayer().hero].health -= this.diceRollResultGlobal;
                        this.endMove()
                    };
                    
                    //TODO вернуть вход в катакомбі
                    //На жаль, ви повернулись у попередню кымнату                 
                    this.getCurrentPlayer().catacomb = true
                    this.drawHeroMitl(this.getCurrentPlayer().position[0], this.getCurrentPlayer().position[1]);
                    this.diceRollEW('Ви впали з мосу у Катакомби. Киньте кубик для визначення отриманих ушкождень.',false, 6, false, 1, trueFn);
                } 
                this.diceRollEW('Перед вами кімната з глибокою прірвою, через яку перекинуто хитку дошку, щоб пройти на інший бік кімнати перевірте свою Спритність.', `Ваша cпритність: ${heroes[this.getCurrentPlayer().hero].dexterity}`, heroes[this.getCurrentPlayer().hero].dexterity, true, 2, trueFn, falseFn)   
            }
        });
    }

    clickAbyssIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.abyss-icon')) {
                const trueFn = ()=> e.target.remove()
                const falseFn =()=>{
                    heroes[this.getCurrentPlayer().hero].health -=5
                    //TODO вернуть вход в катакомбі
                    //На жаль, ви повернулись у попередню кымнату             
                    this.getCurrentPlayer().catacomb = true
                    this.drawHeroMitl(this.getCurrentPlayer().position[0], this.getCurrentPlayer().position[1]);
                    this.endMove()
                } 
                this.diceRollEW('Кімнату розділило навпіл глибоким прірвою, щоб вийти з кімнати по той бік прірви перевірте Спритність.', `Ваша cпритність: ${heroes[this.getCurrentPlayer().hero].dexterity}`, heroes[this.getCurrentPlayer().hero].dexterity, true, 2, trueFn, falseFn)   
            }
        });
    }
        
    createNewEvent(eventName){
        const event = new Event(eventName);
        document.dispatchEvent(event);
    }
}


export const game = new Game();