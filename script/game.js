import  {loadTemplate}  from './function/loadTemplate.js';
import  {ew}  from './eventWidows.js';
import  {addScrolCardsEffect}  from './function/addScrolCardsEffect.js';
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
        this.removePreviousTileField = false
        
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
        this.drawAbilitieCard(player.hero);
        this.drawEffectCard(player);
        addScrolCardsEffect('.abilitie-card-container');
        addScrolCardsEffect('.effect-card-container');
        addScrolCardsEffect('.treasure-card-container');
    
        this.clickDoorIcon()
        this.clickGrilleIcon()
        this.clickCollapseIcon()
        this.clickAbyssIcon()
        this.clickWebIcon()
        this.clickBridgeIcon()
        this.clickArrowIcon()
    };

    // Custom Event /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    playTrapEvent(){
        const card = this.getRundomElement(this.trap_cards, trap_cards)   
        this.drawCardEW(card);
    }

    playPitEvent(){
        const trueFn =()=> this.endMove()
        const falseFn =()=>{
            heroes[player.hero].health -=6           
            this.getDirectionCatacomb()
            this.drawHeroMitl(player.position[0], player.position[1]);
            this.endMove()
        } 

        this.diceRollEW('Зайшовши в кімнату у вас під ногами виявилася дуже крихка підлога, щоб не провалитися в катакомби перевірте свою Удачу.',`Ваша Удача:  ${heroes[player.hero].luck} `, heroes[player.hero].luck, false, 2, trueFn, falseFn)
    }

    playDungeonEvent(){
        const card = this.getRundomElement(this.dungeon_cards, dungeon_cards)   
        this.drawCardEW(dungeon_cards[34]);
    }

    playCatacombEvent(){
        const card = this.getRundomElement(this.catacomb_cards, catacomb_cards)   
        // this.drawCardEW(card);
        // TODO убрать хардкод с карт катакомб
        this.drawCardEW(catacomb_cards[25]);
    }
    
    playTreasuryEvent(){
        const card = this.getRundomElement(this.dragon_cards, dragon_cards)   
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
        this.gameFields[y][x]['r'] = Number(rotate);
    };

    // End Draw Interface Elements /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    // Template EventWindows /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    drawCardEW(card) {
        ew.drawEW(card.title);
        ew.drawCardsInEW(card);
        ew.drawBtnInEW('btn_ew', card.btnName, ()=>{
            this.activeEvent = false
            if (card.effect() === undefined) return
            card.effect()
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

    escapeCatacombEW(){
        ew.drawEW('Бажаєте покинути катакомби?')

        ew.drawBtnInEW('next', 'Так', ()=>{
            ew.removeAllEW()
            this.escapeCatacomb()
        }, 'green')

        ew.drawBtnInEW('close', 'Ні', ()=>{
            ew.removeAllEW()
        }, 'red')
    }

    escapeCatacomb(){
        player.catacomb = false
        const x = player.position[0]
        const y = player.position[1]
        this.removeHighlightFields(this.nextCoordinates)
        this.drawHeroMitl(x, y);
        this.checkRoomEvents()
        this.endMove()
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
        this.removeIcon('.catacomb-icon');
    }
            
    diceRollEW(title, txt, value, dexterity, diceCount, trueFn, falseFn) {
        let newValue = value;
        let texts = txt;
        const resolvePlayer = heroes[player.hero].resolve;
        const treasure = player.treasureCardContainer.length;
    
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
    }
    
    addDiceRollSection(  txt, value, dexterity, diceCount, trueFn, falseFn) {
        let newValue = value;
        let texts = txt;
        const resolvePlayer = heroes[player.hero].resolve;
        const treasure = player.treasureCardContainer.length;
    
        if (resolvePlayer > 0) {
            texts += ` + ${resolvePlayer} Рішучості`;
        }
    
        if (treasure > 0 && dexterity) {
            texts += ` - ${treasure} Спритності`;
            newValue -= treasure;
        }
    
        ew.drawTxtInEW(texts);
        ew.drawDiceInEW(diceCount);
        ew.drawBtnInEW('roll', 'Кинути Кубики', () => {
            ew.rollDiceFn();
            setTimeout(() => {
                this.rolResultEW(newValue, trueFn, falseFn);
            }, 1700);
        });
    }
    

    rolResultEW (value, trueFn, falseFn){
        if (this.diceRollResultGlobal <= (value)) {
            ew.drawEW('Успіх!', 'green');
            ew.drawBtnInEW('next','Далі', ()=>{
                if (trueFn) trueFn();
                ew.removeAllEW()
            });
        }

        if (this.diceRollResultGlobal > value && this.diceRollResultGlobal <= (value + heroes[player.hero].resolve )) {
            ew.drawEW('Провал....?');
            ew.drawBtnInEW('add_resolve','Додати Рішучості', ()=>{
                const diff = this.diceRollResultGlobal - value;
                heroes[player.hero].resolve -= Math.abs(diff);
                ew.removeAllEW()
                if (trueFn) trueFn();  
            });
            ew.drawBtnInEW('next','Далі', ()=>{
                ew.removeAllEW()
                if (falseFn) falseFn();
                heroes[player.hero].resolve +=1;
            });
        }

        if (this.diceRollResultGlobal > (value + heroes[player.hero].resolve)) {
            ew.drawEW('Провал!', 'red');
            ew.drawBtnInEW('next','Далі', ()=>{
                ew.removeAllEW()
                if (falseFn) falseFn();
            });
            heroes[player.hero].resolve +=1;
        }
    }

    
    isPlayerInTower() {
        if (!player.position) return false
        const [x, y] = player.position;
        return this.startFields.some(coord => coord[0] === x && coord[1] === y);
    }

    isPlayerInTreasury() {
        if (!player.position) return false
        const [x, y] = player.position;
        return this.treasuryFields.some(coord => coord[0] === x && coord[1] === y);
    }

    newCoordinate() {
        const [x, y] = player.position;
        const coordinates = [];

        if (x > 0 && this.checkOtherPlayer([x - 1, y]) && this.checkPermitWayNeighbour([x - 1, y], 'right', false)  && this.checkPermitWay([x, y],'left', true)) coordinates.push([x - 1, y]); 
        if (y > 0 && this.checkOtherPlayer([x, y - 1]) && this.checkPermitWayNeighbour([x, y - 1], 'down', false)  && this.checkPermitWay([x, y], 'up', true)) coordinates.push([x, y - 1]);   
        if (x < 14 && this.checkOtherPlayer([x + 1, y]) && this.checkPermitWayNeighbour([x + 1, y], 'left', false)  && this.checkPermitWay([x, y], 'right', true)) coordinates.push([x + 1, y]);  
        if (y < 11  && this.checkOtherPlayer([x, y + 1]) && this.checkPermitWayNeighbour([x, y + 1], 'up', false)  && this.checkPermitWay([x, y], 'down', true))  coordinates.push([x, y + 1]);  
        if (this.isPlayerInTower() && player.catacomb) coordinates.push(...this.startFields)
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
    
        if (permission === 'abyss' && !(player.position[0] === x && player.position[1] === y)) {

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
        
        if (value && room.special === 'collapse' && checkBarrier=== true && !player.catacomb) this.drawIcon(x,y, 'fa-solid fa-road-barrier', room.special, direction, true);
        if (value && room.special === 'web' && checkBarrier=== true && !player.catacomb) this.drawIcon(x,y, 'fa-solid fa-kip-sign', room.special, direction, true);
        
        if (value && room.special === 'bridge' && checkBarrier=== true && !player.catacomb) this.drawIcon(x,y, 'fa-solid fa-bridge-circle-exclamation', room.special, direction, true);

        if (typeof value === 'string' && checkBarrier=== true && !player.catacomb) {
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
        let activeId = Math.round((heroes[heroName].abilities.length-1)/2)

        heroes[heroName].abilities.forEach((item, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            abilitieCardContainer.innerHTML+=`
                <div id="${idx}" class="card-deck ${active}" style="background-image: url('img/abilitie_cards/abilitie_${heroName}_${item.id}.jpg')"></div>        
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

    checkEventCards(){
        if (player.eventCardContainer.length === 0 || this.activeEvent) return
        const [card] = player.eventCardContainer.splice(0, 1);
        this.drawCardEW(card)
    }

    checkMonsterCards(){
        if (!player.position) return
        if (this.gameFields[player.position[1]][player.position[0]]['m'] === undefined || this.activeEvent) return
        if (this.gameFields[player.position[1]][player.position[0]]['m'].length === 0) {
            delete this.gameFields[player.position[1]][player.position[0]]['m']
            return
        }
        
        const [card] = this.gameFields[player.position[1]][player.position[0]]['m'].splice(0, 1);
        this.drawCardEW(card)
    }

    makeMove() {
        let array;
        if (!player.position) array = this.startFields;
        if (player.position ) array = this.nextCoordinates;

        this.checkEventCards()
        this.checkMonsterCards()
    
        if (!document.querySelector(`.available-field`)) {
            this.highlightFields(array);    
        }
    
        this.playingField.removeEventListener('click', this.moveEventHandler); 
    
        this.moveEventHandler = (e) => {
            player.positionPrevious = player.position;

            if (e.target.closest('.door-icon')) return;
            if (e.target.closest('.grille-icon')) return;
            if (e.target.closest('.collapse-icon')) return;
            if (e.target.closest('.web-icon')) return;
            if (e.target.closest('.abyss-icon')) return;
            if (e.target.closest('.bridge-icon')) return; 
    
            if (e.target.closest('.available')) {
                this.removeAllIcon();

                if(this.removePreviousTileField) {
                    game.removePreviousTileField = false
                    this.removeTileField(player.positionPrevious[0], player.positionPrevious[1])
                }

                const field = e.target.parentElement;
                const x = Number(field.getAttribute('data-x'));
                const y = Number(field.getAttribute('data-y'));
                
                if (player.catacomb && !this.activeEvent) {
                    this.playCatacombEvent()
                    this.endMove()
                }
    
                if (field.classList.contains(`treasury`) && !player.positionTreasury && !player.catacomb) {
                    player.positionTreasury = true;
                    this.playTreasuryEvent();
                };
    
                if (field.classList.contains(`treasury`) 
                    && player.positionTreasury
                    && !player.catacomb) {
                    this.drawIcon(x, y, 'fa-regular fa-gem', 'treasure');
                    this.clickTreasureIcon(x, y);
                }
    
                this.removeHighlightFields(array);
                this.drawHeroMitl(x, y);

                if (!player.catacomb) this.nextCoordinates = this.newCoordinate();
                if (player.catacomb) this.nextCoordinates = this.newCoordinateInCatacomb();
    
                if (!room_tiles[this.gameFields[y][x]['id']]) return;

                this.checkRoomEvents()
    
                if(room_tiles[this.gameFields[y][x]['id']]?.special !== 'bridge' 
                   && room_tiles[this.gameFields[y][x]['id']]?.special !== 'corridor' 
                   && room_tiles[this.gameFields[y][x]['id']]?.special !== 'pit' 
                   && !player.positionTreasury
                   && !player.catacomb
                   && !player.extraMove) {
                    player.extraMove = false
                    this.endMove()      
                }
                

                player.extraMove = false
            }
    
            this.diceRollResultGlobal = 0;
        };
    
        this.playingField.addEventListener('click', this.moveEventHandler, { once: true });
    }

    checkRoomEvents(){
        const x = player.position[0]
        const y = player.position[1]

        if (!player.catacomb) this.nextCoordinates = this.newCoordinate();

        if (room_tiles[this.gameFields[y][x]['id']].dungeon && this.gameFields[y][x]['m'] === undefined && !this.activeEvent) this.playDungeonEvent();

        if (room_tiles[this.gameFields[y][x]['id']].trap && !this.activeEvent) this.playTrapEvent();
        if (room_tiles[this.gameFields[y][x]['id']].special === 'pit' && !this.activeEvent && !player.catacomb) this.playPitEvent();

        if (room_tiles[this.gameFields[y][x]['id']]?.special === 'rotate' && !player.catacomb) {
            this.rotateRoomTile(180)
            this.nextCoordinates = this.newCoordinate();
            this.endMove()
        };

        if (room_tiles[this.gameFields[y][x]['id']].special === 'dark' && !player.catacomb) {
            this.diceRollDarkRoomEW()  
        }

        if (room_tiles[this.gameFields[y][x]['id']].search 
            && (this.gameFields[y][x]['s'] === undefined || this.gameFields[y][x]['s'] < 2)
            && !player.catacomb
            && this.gameFields[y][x]['m'] === undefined) {
            this.drawIcon(x, y, 'fa-solid fa-magnifying-glass', 'search');
            this.clickSerchIcon();
        }
        
        if (room_tiles[this.gameFields[y][x]['id']].catacomb) {
            this.drawIcon(x, y, 'fa-solid fa-person-through-window', 'catacomb');
            this.clickCatacombIcon();
        }

        if(room_tiles[this.gameFields[y][x]['id']]?.special === 'bridge' && !player.catacomb) {
            this.removeCoordinateFromArray([player.positionPrevious[0],player.positionPrevious[1]], this.nextCoordinates)
        }
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
        }
    }

    queueEW(){
        const name = player.name;
        if(player.idx === this.currentPlayerIndex && this.playerList.length > 1){
            ew.drawEW(`${name}, ваш крок!`);
            ew.drawBtnInEW('close', 'Розпочати!', ()=> ew.removeAllEW())
        } 
        if(player.idx !== this.currentPlayerIndex) ew.drawEW(`Очівання гравця ${name}!`)
    }

    endMove(){
        this.toggleCurrentPlayer()
        this.queueEW()
        this.activeEvent = false
    }

    endGame(){
        console.log('Game Over')
    }

    rotateRoomTile(angl) {
        const [x, y] = player.position;
        const parentElement = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
        const childTileField = parentElement.querySelector('.tile-field');
        
        let rotate = this.gameFields[y][x]['r'];

        rotate = rotate + angl;

        if (rotate > 270) rotate = angl - 270;

        this.gameFields[y][x]['r'] = Number(rotate);
    
        if (childTileField) {
            childTileField.style.rotate = `${rotate}deg`;
        }
    }
    
    drawTileField(x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        const roomNumber = this.getRundomElement(this.room_tiles, room_tiles).number;
        let rotate;
        
        if (x > player.positionPrevious[0]) {rotate = 90}  
        if (x < player.positionPrevious[0]) {rotate = 270}  
        if (y > player.positionPrevious[1]) {rotate = 180}  
        if (y < player.positionPrevious[1]) {rotate = 0}  
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">`);
            
        this.gameFields[y][x]['id'] = roomNumber-1;
        this.gameFields[y][x]['r'] = Number(rotate);
        this.gameFields[y][x]['p'] = player.name;

        delete this.gameFields[player.position[1]][player.position[0]]['p'];
        
        return roomNumber
    };
    
    removeTileField(x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.querySelector(`.tile-map`).remove()
        field.classList.remove('shadow')
        this.gameFields[y][x] = [];

    };

    highlightFields(array){
        if (!array) return
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
        const hero_mitl = this.playingField.querySelector(`.hero_mitl.${player.hero}`);
        const hero_token_catacomb = this.playingField.querySelector(`.hero_token_catacomb.${player.hero}`);

        if (hero_mitl) {hero_mitl.remove()};
        if (hero_token_catacomb) {hero_token_catacomb.remove()};
        if (player.catacomb) {
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_token_catacomb ${player.hero}" src="img/hero_tiles/token/${player.hero}.png" alt="" style="rotate: ${player.catacombDirection}deg;">
            `);
        } else {
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_mitl ${player.hero}" src="img/hero_tiles/mitle/${player.hero}.png" alt="">
            `); 

            this.drawIcon(x, y, 'fa-regular fa-circle-xmark', 'end');
            this.clickEndIcon(x, y);
        }
        
                    
        player.position = [x, y];

        if (this.gameFields[y][x]['id'] === undefined 
            && !field.classList.contains(`start-field`) 
            && !field.classList.contains(`treasury`)
            && !player.catacomb) {
            this.drawTileField(x, y);
        }


    }

    drawMonsterToken(x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)

        field.insertAdjacentHTML('afterbegin', `
            <img class="token_monsters" src="img/monster_cards/token_monsters.png" alt="">
        `);

        this.gameFields[y][x]['m'] = [];
    }

    removeMonsterToken(x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)

        field.insertAdjacentHTML('afterbegin', `
            <img class="token_monsters" src="img/monster_cards/token_monsters.png" alt="">
        `);

        delete this.gameFields[y][x]['m'];
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
            const [x0,y0] = player.positionPrevious
            if (x===x0 && y===y0) return
        }

        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="${icon} ${selectorName}-icon"></i>
        `);
    }

    drawArrowIcon(x,y){
        let rotate;
        const [x2,y2] = player.position

        if (x > x2) rotate = 0
        if (x < x2) rotate = 180
        if (y > y2) rotate = 90
        if (y < y2) rotate = 270

        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        field.insertAdjacentHTML('afterbegin', `
            <i class="fa-solid fa-arrow-right arrow-icon" style="rotate: ${rotate}deg;"></i>
        `);
    }

    removeIcon(selectorName){
        const item = this.playingField.querySelectorAll(selectorName);
        if (item) item.forEach(element => {element.remove()});
    }

    clickSerchIcon(){
        const [x,y] = player.position
        const serchIcon = document.querySelector('.search-icon');
        serchIcon.addEventListener('click', () => {
            const card = this.getRundomElement(this.search_cards, search_cards)
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

    clickCatacombIcon(){
        const catacombIcon = document.querySelector('.catacomb-icon');
        catacombIcon.addEventListener('click', () => {
            this.getDirectionCatacomb()
            this.endMove()
        });
    };

    getDirectionCatacomb(){
        if (!player.catacomb) {
            this.getCoordinatesWithoutRoom().forEach(([x,y]) => this.drawArrowIcon(x,y));
    
            this.removeHighlightFields(this.nextCoordinates)
            this.nextCoordinates = []
            player.catacomb = true
            this.drawHeroMitl(player.position[0], player.position[1]);
            this.removeAllIcon()
    
            ew.drawEW('Виберіть напрямок руху у катакакомбах.')
            ew.drawTxtInEW('Змінити напрямок руху буде неможливо.')
            ew.drawBtnInEW('close', 'Далі', ()=>{
                ew.removeAllEW()
            })
            return
        }

        if (player.catacomb) {
            player.catacomb = false
            this.drawHeroMitl(player.position[0], player.position[1]);
            ew.drawEW('Ви вийщли з катакомб.')
            ew.drawBtnInEW('close', 'Далі', ()=>{
                ew.removeAllEW()
                this.endMove()
            })

            return
        }
    }

    getTunrDirectionCatacomb(){
        let cood = this.getCoordinatesWithoutRoom()
        this.removeCoordinateFromArray(player.positionPrevious, cood)
        cood.forEach(([x,y]) => this.drawArrowIcon(x,y));
    }

    getCoordinatesWithoutRoom(){
        const [x, y] = player.position;
        const coordinates = [];

        if (x > 0) coordinates.push([x - 1, y]); 
        if (y > 0) coordinates.push([x, y - 1]);   
        if (x < 14) coordinates.push([x + 1, y]);  
        if (y < 11)  coordinates.push([x, y + 1]);  
        return coordinates;
    }

    newCoordinateInCatacomb(){
        const [x, y] = player.position;
        let direction = Number(player.catacombDirection);

        let coordinates = [];

        if (x === 0 && direction === 270) {
            return this.getTunrDirectionCatacomb()
            
        }

        if (y === 0 && direction === 0){
            return this.getTunrDirectionCatacomb()
            
        }

        if (x === 14 && direction === 90) {
            return this.getTunrDirectionCatacomb()
            
        }

        if (y ===  11 && direction === 180) {
            return this.getTunrDirectionCatacomb()
        }

        switch (direction) {
            case 0:
                coordinates.push([x, y - 1])                
                break;
            case 90:
                coordinates.push([x + 1, y])                
                break;
            case 180:
                coordinates.push([x, y + 1])                
                break;
            case 270:
                coordinates.push([x - 1, y])                
                break;
        }

        return coordinates;
    }

    clickTreasureIcon(){
        const treasureIcon = document.querySelector('.treasure-icon');
        treasureIcon.addEventListener('click', () => {
            const card = this.getRundomElement(this.treasure_cards, treasure_cards)
            this.drawCardEW(card)
        });
    };

    clickDoorIcon(){
        this.playingField.addEventListener('click', (e) => {
            if(e.target.closest('.door-icon')) {
                const card = this.getRundomElement(this.door_cards, door_cards)
                this.drawCardEW(card)
                e.target.remove()
            }
        });
    };

    clickArrowIcon(){   
        this.playingField.addEventListener('click', (e) => {
            const hero_token_catacomb = this.playingField.querySelector(`.hero_token_catacomb.${player.hero}`);

            let rotate

            if(e.target.closest('.arrow-icon')) {
                const x = Number(e.target.parentElement.getAttribute('data-x'))
                const y = Number(e.target.parentElement.getAttribute('data-y'))

                this.nextCoordinates = [[x,y]]

                if (x > player.position[0]) rotate = 90 
                if (x < player.position[0]) rotate = 270 
                if (y > player.position[1]) rotate = 180 
                if (y < player.position[1]) rotate = 0

                
                player.catacombDirection = Number(rotate)
                this.drawHeroMitl(player.position[0], player.position[1]);

                this.removeIcon('.arrow-icon')
            }
        });
    };

    clickGrilleIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.grille-icon')) {
                const trueFn = ()=>  e.target.remove()
                const falseFn = ()=>  this.endMove()
                this.diceRollEW('На виході з кімнати перед вами впала решітка, заблокувавши вам шлях. Перевірте свою Силу.', `Ваша сила: ${heroes[player.hero].strength}`, heroes[player.hero].strength, false, 2, trueFn, falseFn)
            }
        });
    }

    clickCollapseIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.collapse-icon')) {
                const trueFn = ()=>  e.target.remove()
                const falseFn = ()=>  this.endMove()
                this.diceRollEW('Перед вами кімната заповнена уламками стелі що впала, щоб пройти на інший бік кімнати перевірте свою Спритність.', `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, 2, trueFn, falseFn)   
            }
        });
    }

    clickWebIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.web-icon')) {
                const trueFn = ()=>  e.target.remove()
                const falseFn = ()=>  this.endMove()
                this.diceRollEW('На виході з кімнати перед вами впала решітка, заблокувавши вам шлях. Перевірте свою Силу.', `Ваша сила: ${heroes[player.hero].strength}`, heroes[player.hero].strength, false, 2, trueFn, falseFn)
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
                        heroes[player.hero].health -= this.diceRollResultGlobal;
                        this.endMove()
                    };
                    
                    this.getDirectionCatacomb()
                    this.drawHeroMitl(player.position[0], player.position[1]);
                    this.diceRollEW('Ви впали з мосу у Катакомби. Киньте кубик для визначення отриманих ушкождень.',false, 6, false, 1, trueFn);
                } 
                this.diceRollEW('Перед вами кімната з глибокою прірвою, через яку перекинуто хитку дошку, щоб пройти на інший бік кімнати перевірте свою Спритність.', `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, 2, trueFn, falseFn)   
            }
        });
    }

    clickAbyssIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.abyss-icon')) {
                const trueFn = ()=> e.target.remove()
                const falseFn =()=>{
                    heroes[player.hero].health -=5
                    this.getDirectionCatacomb()
                    this.drawHeroMitl(player.position[0], player.position[1]);
                    this.endMove()
                } 
                this.diceRollEW('Кімнату розділило навпіл глибоким прірвою, щоб вийти з кімнати по той бік прірви перевірте Спритність.', `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, 2, trueFn, falseFn)   
            }
        });
    }
        
    createNewEvent(eventName){
        const event = new Event(eventName);
        document.dispatchEvent(event);
    }

    getRundomElement(idxArr, objArr){
        const randomIdx = this.rundom(idxArr.length);
        idxArr.splice(randomIdx, 1);
        return objArr[randomIdx]
    }
    
    rundom(maxValue){
        return Math.floor(Math.random() * maxValue);
    }
}


export const game = new Game();