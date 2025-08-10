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
import { hero_card_abilitie } from './cards/hero_card_abilitie.js';


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
        this.dayMax = 38;
        this.end_Move = false;
        this.game_Over = false; 
        this.gameFields; 
        this.startFields=[[0,0], [14,0], [0,11], [14,11]]; 
        this.treasuryFields=[[7,5], [7,6]]; 
        this.knowledgeTheCatacombCards = []
        this.foresightSearchCard = []
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

    reset() {
        this.gameIdx = undefined;
        this.currentPlayerIndex = 0;
        this.playerList = [];
        this.authentication = false;

        this.body = undefined;
        this.playingField = undefined;
        this.activeEvent = false;
        this.removePreviousTileField = false;
        this.next = false;
        this.diceRollResultGlobal = 0;
        this.nextCoordinates = undefined;
        this.darkRoomCoordinates = {};

        this.day = 0;
        this.dayMax = 38;
        this.game_Over = false;
        this.gameFields = undefined;
        this.startFields = [[0,0], [14,0], [0,11], [14,11]];
        this.treasuryFields = [[7,5], [7,6]];
        this.knowledgeTheCatacombCards = [];
        this.foresightSearchCard = [];
        this.room_tiles = undefined;
        this.dungeon_cards = undefined;
        this.catacomb_cards = undefined;
        this.deadman_cards = undefined;
        this.trap_cards = undefined;
        this.сrypt_cards = undefined;
        this.door_cards = undefined;
        this.search_cards = undefined;
        this.treasure_cards = undefined;
        this.monster_cards = undefined;
        this.dragon_cards = undefined;

        this.fillGamePacks();
    }

    getGameObj(){
        return {
            gameIdx: this.gameIdx,
            currentPlayerIndex: this.currentPlayerIndex,
            playerList:this.playerList,
            authentication:this.authentication,

            body:this.body,

            nextCoordinates: this.nextCoordinates,
            darkRoomCoordinates: this.darkRoomCoordinates,

            day:this.day, 
            dayMax:this.dayMax,

            gameFields:this.gameFields,

            room_tiles:this.room_tiles, 
            dungeon_cards:this.dungeon_cards, 
            catacomb_cards:this.catacomb_cards, 
            deadman_cards:this.deadman_cards, 
            trap_cards:this.trap_cards, 
            сrypt_cards:this.сrypt_cards, 
            door_cards:this.door_cards, 
            search_cards:this.search_cards, 
            treasure_cards:this.treasure_cards, 
            monster_cards:this.monster_cards,
            dragon_cards:this.dragon_cards
        }
   
    }

    setGameObj(obj){
        this.gameIdx = obj.gameIdx
        this.currentPlayerIndex = obj.currentPlayerIndex
        this.playerList = obj.playerList
        this.authentication = obj.authentication

        this.body = obj.body

        this.nextCoordinates = obj.nextCoordinates,

        this.day = obj. day
        this.dayMax = obj.dayMax

        this.gameFields = obj.gameFields

        this.room_tiles = obj.room_tiles
        this.dungeon_cards = obj.dungeon_cards
        this.catacomb_cards = obj.catacomb_cards
        this.deadman_cards = obj.deadman_cards
        this.trap_cards = obj.trap_cards
        this.сrypt_cards = obj.сrypt_cards
        this.door_cards = obj.door_cards
        this.search_cards = obj.search_cards
        this.treasure_cards = obj.treasure_cards
        this.monster_cards = obj.monster_cards
        this.dragon_cards = obj.dragon_cards
    }
    

    fillGamePacks(){
        console.log(`[LOG] Fill game packs`)
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

        if(this.getLocalData('savedGame')) {
            this.setGameObj(this.getLocalData('savedGame'));
            Object.assign(player, this.getLocalData('savedPlayer'))
        }
    }

    getCurrentPlayer(){return this.playerList[this.currentPlayerIndex]}

    createGameFields(){this.gameFields=Array(12).fill().map(() => Array(15).fill().map(() => ({})))}

    refreshRoomTiles(){ this.room_tiles = Array.from({ length: 130 }, (_, index) => index + 1) }
    refreshDungeonCards(){ this.dungeon_cards=Array.from({ length: 59 }, (_, index) => index + 1) }
    refreshCatacombCards(){ this.catacomb_cards=Array.from({ length: 49 }, (_, index) => index + 1) }
    refreshDeadmanCards(){this.deadman_cards=Array.from({ length: 15 }, (_, index) => index + 1)}
    refreshTrapCards(){this.trap_cards=Array.from({ length: 15 }, (_, index) => index + 1)}
    refreshCryptCards(){this.сrypt_cards=Array.from({ length: 15 }, (_, index) => index + 1)}
    refreshDoorCards(){this.door_cards=Array.from({ length: 15 }, (_, index) => index + 1)}
    refreshSearchCards(){this.search_cards=Array.from({ length: 31 }, (_, index) => index + 1)}
    refreshTreasureCards(){this.treasure_cards=Array.from({ length: 36 }, (_, index) => index + 1)}
    refreshMonsterCards(){this.monster_cards=Array.from({ length: 20 }, (_, index) => index + 1)}
    refreshDragonCards(){this.dragon_cards=Array.from({ length: 8 }, (_, index) => index + 1)}

    startPosition(){
        console.log(`[LOG] Start position`)
        this.body = document.querySelector(`body`);
        this.playingField = document.querySelector(`.playing-field`);    
        this.addCharacterTablet(player.hero);  
        this.createAbilitieCardContainer()      
        this.drawAbilitiePackCards();
        this.drawEventPackCards();
        this.drawTreasurePackCards()
    
        this.clickCloseBtn()
        this.clickDoorIcon()
        this.clickGrilleIcon()
        this.clickCollapseIcon()
        this.clickAbyssIcon()
        this.clickWebIcon()
        this.clickBridgeIcon()
        this.clickArrowIcon()

        if(this.getLocalData('savedGame')) {
            this.gameFields.forEach((line, y) => {
                line.forEach((cell, x) => {
                    if (cell.id !== undefined) this.drawFieldTileTests(cell.id+1, cell.r, x, y);
                })
            })
            if (!player.continue_game) this.drawHeroMitl(player.position[0], player.position[1]); 

            if (!player.catacomb) this.nextCoordinates = this.newCoordinate();
            if (player.catacomb) this.nextCoordinates = this.newCoordinateInCatacomb();
            if (player.continue_game) {
                this.nextCoordinates = game.startFields
            }

            player.continue_game = false;
        }
    };

    createAbilitieCardContainer(){
        player.abilitieCardContainer = [...heroes[player.hero].abilities]
    }

    changeHealth(value){
        let damage = value

        if (player.unbrokenSpirit !== 0 && value < 0){
            const heroHealth = player.health + damage

            if (heroHealth < 1) damage = 1 - player.health
        }

        if (player.health < 1) return this.gameOver()

        player.health += damage
        this.addCharacterTablet(player.hero);
    }

    changeResolve(value){
        player.resolve += value
        this.addCharacterTablet(player.hero);
    }

    playTrapEvent(){
        const card = this.getRundomElement(this.trap_cards, trap_cards)   
        ew.drawCardEW(card);
    }

    playPitEvent(){
        const trueFn =()=> this.endMove()
        const falseFn =()=>{
            this.changeHealth(-6)       
            this.getDirectionCatacomb()
            this.drawHeroMitl(player.position[0], player.position[1]);
        } 

        ew.diceRollEW('Зайшовши в кімнату у вас під ногами виявилася дуже крихка підлога, щоб не провалитися в катакомби перевірте свою Удачу.',`Ваша Удача:  ${heroes[player.hero].luck} `, heroes[player.hero].luck, false, 2, trueFn, falseFn, true, true)
        
        if (this.checkCardNameInPack(player.treasureCardContainer, deadman_cards[3].name)){
            ew.drawBtnInEW('btn_close', `Використати ${deadman_cards[3].name}, щоб не впасти`, ()=>{
                this.removeCurrentCardNameFromPack(player.treasureCardContainer, deadman_cards[3].name)
                this.drawTreasurePackCards()
                ew.removeAllEW()
                trueFn()
            })
        }
    }

    playDungeonEvent(){
        const card = this.getRundomElement(this.dungeon_cards, dungeon_cards)   
        ew.drawCardEW(card);
    }

    playCatacombEvent(){
        const condition = player.catacomb && game.checkCardNameInPack(player.abilitieCardContainer, 'Знание Катакомб')
        const txtFor = `Використати?`

        const elseFn = ()=>{
            ew.removeAllEW()
            let card

            if (this.knowledgeTheCatacombCards.length !== 0) {
                [card] = this.knowledgeTheCatacombCards.splice(0, 1);
            } else {
                card = this.getRundomElement(this.catacomb_cards, catacomb_cards)   
            }
            
            ew.drawCardEW(card);
            
            if(game.checkCardNameInPack(player.catacombCardContainer, catacomb_cards[20].name)) {
                ew.addBtnInEW(`btn_holeInCeiling`, `Спробувати ${catacomb_cards[20].name}`, ()=>{
                    ew.removeAllEW()
                    ew.drawCardEW(catacomb_cards[20]);
                })
            }

            if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[12].name)) {
                game.changeHealth(1)
                ew.drawEW(`Ви отримали 1 очко здоров'я!`);
                setTimeout(ew.removeLastEW, 1200);
            }
        }
        ew.drawCoiceEW(condition, txtFor, hero_card_abilitie[player.hero][4], ()=>this.knowledgeTheCatacombs(), ()=>elseFn())

        if (this.checkCardNameInPack(player.eventCardContainer, catacomb_cards[38].name)){
            ew.drawEW(`Ви отримали 1 поранення`)
            setTimeout(() => ew.removeLastEW(), 1200);
            game.changeHealth(-1)
             
        }
    }
    
    playTreasuryEvent(){
        if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[18].name)) {
            player.extraDragonCard += 1
        }

        if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[25].name)) {
            ew.drawCardEW(treasure_cards[25])
            return
        } 

        const card = this.getRundomElement(this.dragon_cards, dragon_cards)   
        ew.drawCardEW(card);
    }
     
    drawFieldTileTests(roomNumber, rotate, x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)  
        
        field.classList.add('shadow')
        field.insertAdjacentHTML('afterbegin', `
            <img class="tile-field tile-map" src="img/room_tiles/room_${roomNumber}.jpg" alt="" style="rotate: ${rotate}deg;">`
        );
            
        this.gameFields[y][x]['id'] = roomNumber-1;
        this.gameFields[y][x]['r'] = Number(rotate);
    };
    
    removeAllIcon(){
        console.log(`[LOG] remove all icon`)
        this.removeIcon('.search-icon');
        this.removeIcon('.treasure-icon');
        this.removeIcon('.end-icon');
        this.removeIcon('.out-from-tower-icon');
        this.removeBarrierIcon()
    }
    
    removeBarrierIcon(){
        console.log(`[LOG] remove barrier icon`)
        this.removeIcon('.door-icon');
        this.removeIcon('.grille-icon');
        this.removeIcon('.collapse-icon');
        this.removeIcon('.web-icon');
        this.removeIcon('.bridge-icon');
        this.removeIcon('.abyss-icon');
        this.removeIcon('.catacomb-icon');
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

    isPlayerLeftTreasury(){
        if (this.checkCardNameInPack(player.treasureCardContainer, treasure_cards[26].name)) {
            const islastPositionTreasury = this.treasuryFields.some(coord => coord[0] === player.positionPrevious[0] && coord[1] === player.positionPrevious[1])
            const isNewPositionTreasury = this.treasuryFields.some(coord => coord[0] === player.position[0] && coord[1] === player.position[1])
            if (islastPositionTreasury && !isNewPositionTreasury) {
                ew.drawCardEW(treasure_cards[26])
            }
        }
    }

    newCoordinate(withoutDoors) {
        if (!player.position) return this.startFields;
        const [x, y] = player.position;
        const coordinates = [];

        if (x > 0 && this.checkOtherPlayer([x - 1, y]) && this.checkPermitWayNeighbour([x - 1, y], 'right', false, withoutDoors)  && this.checkPermitWay([x, y],'left', true, withoutDoors)) coordinates.push([x - 1, y]); 
        if (y > 0 && this.checkOtherPlayer([x, y - 1]) && this.checkPermitWayNeighbour([x, y - 1], 'down', false, withoutDoors)  && this.checkPermitWay([x, y], 'up', true, withoutDoors)) coordinates.push([x, y - 1]);   
        if (x < 14 && this.checkOtherPlayer([x + 1, y]) && this.checkPermitWayNeighbour([x + 1, y], 'left', false, withoutDoors)  && this.checkPermitWay([x, y], 'right', true, withoutDoors)) coordinates.push([x + 1, y]); 
        if (y < 11  && this.checkOtherPlayer([x, y + 1]) && this.checkPermitWayNeighbour([x, y + 1], 'up', false, withoutDoors)  && this.checkPermitWay([x, y], 'down', true, withoutDoors))  coordinates.push([x, y + 1]);  
        if (this.isPlayerInTower() && !player.catacomb) coordinates.push(...this.startFields)

        return coordinates;
    }

    checkOtherPlayer(coordinat){
        const [x, y] = coordinat;
        if(!this.gameFields[y][x]['[id]']) return true
    }

    checkPermitWayNeighbour(coordinat, direction, checkBarrier, withoutDoors) {
        const [x, y] = coordinat;
        const tileIdx = this.gameFields[y][x]['id'];
        const room = room_tiles[tileIdx];
    
        if (!room && withoutDoors) return false;
        if (!room) return true;
    
        let permission = this.checkPermitWay(coordinat, direction, checkBarrier);
        let rotationAttempts = 0; 
        const maxRotations = 4; 
    
        while (permission === 'abyss' && rotationAttempts < maxRotations) {
            switch (this.gameFields[y][x]['r']) {
                case 0:
                    this.gameFields[y][x]['r'] = 180;
                    break;
                case 90:
                    this.gameFields[y][x]['r'] = 270;
                    break;
                case 270:
                    this.gameFields[y][x]['r'] = 90;
                    break;
                case 180:
                    this.gameFields[y][x]['r'] = 0;
                    break;
            }
            permission = this.checkPermitWay(coordinat, direction, checkBarrier);
            rotationAttempts++;
        }
    
        if (rotationAttempts >= maxRotations) {
            console.warn(`Cancel loop in ${tileIdx} (${x}, ${y}).`);
            return false; 
        }
    
        return permission;
    }
        
    checkPermitWay(coordinat, direction, checkBarrier, withoutDoors){
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
        
        if (typeof value !== 'boolean' && checkBarrier && withoutDoors && !player.catacomb) return false
        
        if (value && room.special === 'collapse' && checkBarrier=== true && !player.catacomb) this.drawIcon(x,y, 'fa-solid fa-road-barrier', room.special, direction, true);
        if (value && room.special === 'web' && checkBarrier=== true && !player.catacomb) this.drawIcon(x,y, 'fa-solid fa-kip-sign', room.special, direction, true);
        
        if (value && room.special === 'bridge' && checkBarrier=== true && !player.catacomb) this.drawIcon(x,y, 'fa-solid fa-bridge-circle-exclamation', room.special, direction, true);

        if (typeof value === 'string' && checkBarrier=== true && !player.catacomb ) {
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
        if (array === undefined) return
        array.forEach( _ => {
            const field = document.querySelector(`[data-y="${_[1]}"][data-x="${_[0]}"]`);
            fields.push(field)
        });
        return fields
    }

    sunTokenPosition(day){
        if (this.game_Over) return
        if (day > this.dayMax) {
            if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[24].name)){
                this.dayMax +=4
                return
            }
            this.gameOver()
            return 
        };
        const token_sun = document.querySelector(`.token_sun`);
        if (token_sun) token_sun.remove();
        const dayContainer = document.querySelector(`[day="${day}"]`);
        if (!dayContainer) return
        dayContainer.innerHTML=`
            <div class="token_sun"></div>
        `;
    };

    addCharacterTablet(heroName){
        const characterTablet = document.querySelector(`.character-tablet-container`);
        characterTablet.innerHTML=`
            <div class="hero-tablet shadow" style="background-image: url('img/hero_tiles/tablet/${heroName}.jpg')">
                <div class="hero-value resolve-value">${player.resolve}</div>
                <div class="hero-value strength-value">${heroes[heroName].strength}</div>
                <div class="hero-value dexterity-value">${heroes[heroName].dexterity}</div>
                <div class="hero-value defense-value">${heroes[heroName].defense}</div>
                <div class="hero-value luck-value">${heroes[heroName].luck}</div>
                <div class="hero-value health-value">${player.health}</div>             
                <div class="hero-value gold-value"><i class="fa-solid fa-coins"></i>   ${player.gold}</div>             
            </div>
        `;
    };

    updateGoldValue(){
        const cards = player.treasureCardContainer
        let gold = 0
        if (cards.length === 0) return

        cards.forEach(card => {
            if (card.cost) gold += card.cost
        });

        player.gold = gold
        this.addCharacterTablet(player.hero)
    }

    updatePackCardsEW(packCards){
        const element = document.querySelector('.event-main');
        const cardDeckContainer = element.querySelector('.card-deck-container');

        let activeId = Math.round((packCards.length-1)/2)
        let inner ='';

        packCards.forEach((card, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            inner += `
                <div id="${idx}" class="card-deck ${active}" style="background-image: url('img/${card.pack}_cards/${card.pack}_${card.id}.jpg')"></div>        
            `
        });

        cardDeckContainer.innerHTML = inner
    }

    drawAbilitiePackCards(){
        const abilitieCardContainer = document.querySelector(`.abilitie-card-container`);
        let activeId = Math.round((heroes[player.hero].abilities.length-1)/2)
        let inner ='';

        player.abilitieCardContainer.forEach((item, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            inner+=`
                <div id="${idx}"  sours="heroes" pack="abilities" class="card-deck ${active}" style="background-image: url('img/abilitie_cards/abilitie_${player.hero}_${item.id}.jpg')"></div>        
            `
        });
        abilitieCardContainer.innerHTML=inner;

        addScrolCardsEffect('.abilitie-card-container');
    };

    drawEventPackCards(){
        const eventCardContainer = document.querySelector(`.event-card-container`);
        let activeId = Math.round((player.eventCardContainer.length + player.endMoveEventCardContainer - 2) / 2) 
        let inner ='';

        player.eventCardContainer.forEach((item, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            inner+=`
                <div id="${idx}" pack="eventCardContainer" class="card-deck ${active}" style="background-image: url('img/${item.pack}_cards/${item.pack}_${item.id}.jpg')"></div>        
            `
        });

        player.endMoveEventCardContainer.forEach((item, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            inner+=`
                <div id="${idx}" sours="player" pack="endMoveEventCardContainer" class="card-deck ${active}" style="background-image: url('img/${item.pack}_cards/${item.pack}_${item.id}.jpg')"></div>        
            `
        });
        eventCardContainer.innerHTML=inner;

        addScrolCardsEffect('.event-card-container');
    };

    drawTreasurePackCards(){
        const treasureCardContainer = document.querySelector(`.treasure-card-container`);
        let activeId = Math.round((player.treasureCardContainer.length-1)/2)
        let inner ='';

        player.treasureCardContainer.forEach((item, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            inner+=`
                <div id="${idx}" sours="player" pack="treasureCardContainer" class="card-deck ${active}" style="background-image: url('img/${item.pack}_cards/${item.pack}_${item.id}.jpg')"></div>        
            `
        });
        treasureCardContainer.innerHTML=inner;
        this.updateGoldValue()

        addScrolCardsEffect('.treasure-card-container');
    };

    drawCatacombPackCards(){
        const catacombCardContainer = document.querySelector(`.catacomb-card-container`);
        let activeId = Math.round((player.catacombCardContainer.length-1)/2)
        let inner ='';

        player.catacombCardContainer.forEach((item, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            inner+=`
                <div id="${idx}" sours="player" pack="catacombCardContainer" class="card-deck ${active}" style="background-image: url('img/${item.pack}_cards/${item.pack}_${item.id}.jpg')"></div>        
            `
        });
        catacombCardContainer.innerHTML=inner;

        addScrolCardsEffect('.treasure-card-container');
    };

    checkCurseOfTheSorcerer(){
        if(player.curseResolve && player.resolve > player.oldResolve) {
            console.log(`[LOG] check Curse Of The Sorcerer`)
            const diff = player.resolve - player.oldResolve  
            this.changeHealth(-diff) 
            player.oldResolve = player.resolve
        }
    }

    checkEventCards(){
        if (!player.eventCardContainer.length) return;
        
        console.log(`[LOG] check Event Cards`)
        

        
        let i = player.eventCardContainer.length

        const processNext = () => {
            if (i === 0) return;
            i -= 1;

            const card = player.eventCardContainer.shift();

            if (this.checkCardNameInPack(player.eventCardContainer, catacomb_cards[38].name)) {
                if (!player.catacomb) return
                player.eventCardContainer.push(catacomb_cards[38])
                this.drawEventPackCards()
            }
            
            if (!game.checkCardNameInPack(player.eventCardContainer, trap_cards[8].name)){
                player.eventCardContainer.push(trap_cards[8])
                this.drawEventPackCards()
            }
            
            if (!game.checkCardNameInPack(player.eventCardContainer, trap_cards[9].name)){
                player.eventCardContainer.push(trap_cards[9])
                this.drawEventPackCards()
            }

            this.drawEventPackCards()

            this.activeEvent = true;
            player.checkEventCards = true;
            ew.drawCardEW(card)

            const waitUntilReady = () => {
                if (this.end_Move) {
                    this.end_Move = false;
                    return
                }

                if (!this.activeEvent && !player.checkEventCards) {
                    processNext();
                } else {
                    setTimeout(waitUntilReady, 100);
                }
            };

            waitUntilReady();
        };

        processNext();
        
    }

    checkEndMoveEventCardContainer(){
        if (!player.endMoveEventCardContainer.length) return;
        
        console.log(`[LOG] check Event Cards`)
        
        if (this.checkCardNameInPack(player.endMoveEventCardContainer, catacomb_cards[38].name) && !player.catacomb) {
            this.removeCurrentCardNameFromPack(player.endMoveEventCardContainer, catacomb_cards[38].name)
            this.drawEventPackCards()
        }
        
        let i = player.endMoveEventCardContainer.length

        const processNext = () => {
            if (i === 0) return;
            i -= 1;

            const card = player.endMoveEventCardContainer.shift();
            this.drawEventPackCards()

            this.activeEvent = true;
            player.checkEventCards = true;
            ew.drawCardEW(card)

            const waitUntilReady = () => {
                if (this.end_Move) {
                    this.end_Move = false;
                    return
                }
                
                if (!this.activeEvent && !player.checkEventCards) {
                    processNext();
                } else {
                    setTimeout(waitUntilReady, 100);
                }
            };

            waitUntilReady();
        };

        processNext();
    }

    checkCatacombCards(){
        if (player.catacombCardContainer.length === 0 || this.activeEvent || player.checkEventCards) return
        console.log(`[LOG] check Catacomb Cards`)
        this.activeEvent = true
        player.checkEventCards = true
        const [card] = player.catacombCardContainer.splice(0, 1);
        ew.drawCardEW(card)
    }

    checkMonsterCards(){
        if (!player.position) return
        if (this.gameFields[player.position[1]][player.position[0]]['m'] === undefined || this.activeEvent) return
        if (this.gameFields[player.position[1]][player.position[0]]['m'].length === 0) {
            delete this.gameFields[player.position[1]][player.position[0]]['m']
            return
        }
        console.log(`[LOG] check Monster Cards`)

        const [card] = this.gameFields[player.position[1]][player.position[0]]['m'].splice(0, 1);
        ew.drawCardEW(card)
    }

    saveGame(){
        localStorage.setItem('savedGame', JSON.stringify(this.getGameObj()));
        localStorage.setItem('savedPlayer', JSON.stringify(player));
        console.log('[LOG] Save game');
    }

    getLocalData(txt){
        return JSON.parse(localStorage.getItem(txt));
    }

    makeMove() {
        let new_coords;

        player.ambushRoom = false
        player.surroundedMonsters = false
        player.positionPrevious = player.position;
        player.escapeBattle = true

        if (player.skipMove !== 0) {
            player.skipMove -= 1
            this.endMove()
            return
        }
        
        if (!player.catacomb) this.nextCoordinates = this.newCoordinate();
        if (player.catacomb) this.nextCoordinates = this.newCoordinateInCatacomb();

        if (!player.position) new_coords = this.startFields;
        if (player.position) new_coords = this.nextCoordinates;
        
        this.highlightFields(new_coords); 
        
        this.drawCatacombIcon()
        this.drawSearchIcon()   
        this.drawTowerIcon()  
        
        if (player.escapeCatacomb) {
            player.escapeCatacomb = false
            this.removeHighlightFields();
            this.removeAllIcon();
        }
        
        this.drawEndMoveIcon() 
        
        this.checkCurseOfTheSorcerer()
        this.checkEventCards()
        this.checkCatacombCards()
        this.checkMonsterCards()
    

        this.playingField.removeEventListener('click', this.moveEventHandler); 


        this.moveEventHandler = (e) => {
            if (
                e.target.closest('.search-icon') ||
                e.target.closest('.end-icon') ||
                e.target.closest('.catacomb-icon') ||
                e.target.closest('.out-from-tower-icon') ||
                e.target.closest('.treasure-icon') ||
                e.target.closest('.door-icon') ||
                e.target.closest('.grille-icon') ||
                e.target.closest('.collapse-icon') ||
                e.target.closest('.web-icon') ||
                e.target.closest('.abyss-icon') ||
                e.target.closest('.bridge-icon')
            ) return;
            
            
            if (e.target.closest('.available')) {
                
                this.removeAllIcon();
                
                if(this.removePreviousTileField) {
                    game.removePreviousTileField = false
                    this.removeTileField(player.positionPrevious[0], player.positionPrevious[1])
                }
                
                const field = e.target.parentElement;
                if (!field) return;
                const x = Number(field.getAttribute('data-x'));
                const y = Number(field.getAttribute('data-y'));
                
                if (player.catacomb && !this.activeEvent) {
                    this.playCatacombEvent()
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
                
                this.drawHeroMitl(x, y);
                this.removeHighlightFields();

                if(room_tiles[this.gameFields[y][x]['id']]?.special == 'corridor') {
                    this.makeMove()  
                    return    
                }
                
                this.isPlayerLeftTreasury()
                this.checkRoomEvents()
            }
    
            this.diceRollResultGlobal = 0;
            this.saveGame();
        };
    
        this.playingField.addEventListener('click', this.moveEventHandler);
    }

    

    checkRoomEvents(){
        const x = player.position[0]
        const y = player.position[1]

        if (this.gameFields[y][x]['id'] === undefined) return

        if (room_tiles[this.gameFields[y][x]['id']].dungeon && this.gameFields[y][x]['m'] === undefined && !this.activeEvent) this.playDungeonEvent();

        if (room_tiles[this.gameFields[y][x]['id']].trap && !this.activeEvent) this.playTrapEvent();
        if (room_tiles[this.gameFields[y][x]['id']].special === 'pit' && !this.activeEvent && !player.catacomb) this.playPitEvent();

        if (room_tiles[this.gameFields[y][x]['id']]?.special === 'rotate' && !player.catacomb) {
            this.rotateRoomTile(180)
            this.nextCoordinates = this.newCoordinate();
        };

        if (room_tiles[this.gameFields[y][x]['id']].special === 'dark' && !player.catacomb) {
            ew.diceRollDarkRoomEW()  
        }

        if(room_tiles[this.gameFields[y][x]['id']]?.special === 'bridge' && !player.catacomb) {
            this.removeCoordinateFromArray([player.positionPrevious[0],player.positionPrevious[1]], this.nextCoordinates)
        }
    }
    

    drawTowerIcon(){
        const x = player.position[0]
        const y = player.position[1]

        if (this.isPlayerInTower()) {
            this.drawIcon(x, y, 'fa-solid fa-arrow-right-from-bracket', 'out-from-tower');
            this.clickTowerIcon(x, y);
        }
    }

    drawCatacombIcon(){
        if (!player.position) return
        const x = player.position[0]
        const y = player.position[1]
        
        if(this.gameFields[y][x]['id']== undefined)return
        if (room_tiles[this.gameFields[y][x]['id']].catacomb || this.gameFields[y][x]['c']) {
            this.drawIcon(x, y, 'fa-solid fa-person-through-window', 'catacomb');
            this.clickCatacombIcon();
        }
    }

    drawEndMoveIcon(){
        if (!player.position) return
        const x = player.position[0]
        const y = player.position[1]
        this.drawIcon(x, y, 'fa-regular fa-circle-xmark', 'end');
        this.clickEndIcon(x, y);
    }


    drawSearchIcon(){
        if (!player.position) return
        const x = player.position[0]
        const y = player.position[1]

        if(this.gameFields[y][x]['id']== undefined)return
        if (room_tiles[this.gameFields[y][x]['id']].search 
            && (this.gameFields[y][x]['s'] === undefined || this.gameFields[y][x]['s'] < 2)
            && !player.catacomb
            && this.gameFields[y][x]['m'] === undefined) {
            this.drawIcon(x, y, 'fa-solid fa-magnifying-glass', 'search');
            this.clickSerchIcon();
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
        if (this.currentPlayerIndex < this.playerList.length - 1) {
            this.currentPlayerIndex += 1;
        } else {
            this.currentPlayerIndex = 0;
            this.day += 1;
            this.sunTokenPosition(this.day);
        }
    }

    queueEW(){
        const name = player.name;
        let txt = `${name}, ваш крок!`;
        if (this.playerList.length == 1) txt  = `Новий день!`;


        if(player.idx === this.currentPlayerIndex){
            ew.drawEW(txt);
            ew.drawBtnInEW('close', 'Далі', ()=> {
                ew.removeLastEW()
                this.makeMove();
            })
        } 
        if(player.idx !== this.currentPlayerIndex) ew.drawEW(`Очівання гравця ${name}!`)
    }

    endMove(){
        this.end_Move = true
        if (player.endMoveEventCardContainer.length !== 0) {
            this.checkEndMoveEventCardContainer()
            return 
        }
        
        if (player.extraMove > 0) {
            console.log(`[LOG] Extra Move`)
            player.extraMove -= 1
            player.checkEventCards = true
            this.makeMove()
            return
        }
        
        if (player.unbrokenSpirit !== 0){
            this.unbrokenSpirit -= 1
        }
        
        if (player.skipMove == 0){
            this.checkEndMoveEventCardContainer()
        }
        console.log(`[LOG] End Move`)

        this.sunTokenPosition(game.day)

        this.toggleCurrentPlayer()
        this.queueEW()
    }

    gameOver(){
        if (this.game_Over) return
        this.game_Over = true

        console.log(`[LOG] Game Over`)

        ew.removeAllEW()

        let txt = `Ви можете завершити цю партію, та почати все спочатку, натиснувши кнопку "Завершити". </br> </br>`

        if (this.day < this.dayMax) txt += `Ви можете продовжити цю партію іншим персонажем, натиснувши кнопку "Продовжити". </br></br> `
        
        ew.drawEW(`Гра закінчена! Ви загинули!`);
        ew.addTxt(txt);
        ew.addBtnInEW('restart', 'Завершити', ()=>this.endGame())
        
        if (this.day < this.dayMax) ew.addBtnInEW('continue', 'Продовжити', ()=>this.continueGame())

    }

    removeLocalStorage() {
        if (localStorage.getItem("savedGame") !== null) {
            localStorage.removeItem("savedGame");
            localStorage.removeItem("savedPlayer");
        }
    }

    endGame() {
        console.log(`[LOG] Return to Authentication`)
        this.removeLocalStorage();
        this.game_Over = true
        const event = new Event('returnToAuthentication');
        document.dispatchEvent(event);  
    }

    endGameInTower(){
        ew.removeAllEW()
        const gold = player.gold
        let txt = `Гра закінчена! </br> </br> `
        if (gold == 0) txt = `Ви не змогли винести з підземелля бодай чогось цінного, але ви вижили!`
        if (gold > 0) txt = `Вітаю!</br> Ви відкорили підземелля і змогли винести з нього ${gold} золотих монет, та зберегти своє житя!`
        ew.drawEW(txt);
        ew.addBtnInEW('continue', 'Продовжити', ()=>{this.endGame()})
    }

    continueGame() {
        console.log(`[LOG] Continue Game`)
        this.game_Over = false;
        player.continue_game = true;
        const event = new Event('returnToLobby');
        document.dispatchEvent(event);  
    }


    rotateRoomTile(angl) {
        const [x, y] = player.position;
        const parentElement = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
        const childTileField = parentElement.querySelector('.tile-field');
        
        let rotate = this.gameFields[y][x]['r'];

        rotate = rotate + angl;
        
        if (rotate > 270) rotate -= 360;

        this.gameFields[y][x]['r'] = Number(rotate);
    
        if (childTileField) {
            childTileField.style.rotate = `${rotate}deg`;
        }
    }

    rotateCatacombDirection(angl) {
        let rotate = player.catacombDirection

        rotate = rotate + angl;
        
        if (rotate > 270) rotate -= 360;

        player.catacombDirection = rotate
    }
    
    drawTileField(x, y, roomNumber){

        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        if (!roomNumber) roomNumber = this.getRundomElement(this.room_tiles, room_tiles).number;
        if (room_tiles[this.gameFields[y][x]['id']]?.special == 'corridor') player.extraMove += 1;

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

        console.log(`[LOG] room`, roomNumber, `rotate:`, rotate)
        
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
        if (this.game_Over) return
        console.log(`[LOG] Highlight Fields`)
        const fields = this.getElementsByData(array);
        fields.forEach(field => {
            if (!field) return
            field.classList.add('available')
            field.insertAdjacentHTML('afterbegin', `
                <div class="available-field"></div>
            `);
        });
    };

    removeHighlightFields(array){
        let fields;
        if (!array) fields = this.playingField.querySelectorAll(`.available`)
        if (array) fields = this.getElementsByData(array);
        if (fields === undefined) return
        console.log(`[LOG] Remove Highlight Fields`)
        this.removeBarrierIcon()
        fields.forEach(field => {
            field.classList.remove('available')
            const highlight = field.querySelector(`.available-field`);
            if (!highlight) return
            highlight.remove();
        });
    };

    drawHeroMitl(x, y){
        player.position = [x, y];
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
        const hero_mitl = this.playingField.querySelector(`.hero_mitl.${player.hero}`);
        const hero_token_catacomb = this.playingField.querySelector(`.hero_token_catacomb.${player.hero}`);
        if (!field) return
        if (hero_mitl) {hero_mitl.remove()};
        if (hero_token_catacomb) {hero_token_catacomb.remove()};
        if (player.catacomb) {
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_token_catacomb ${player.hero}" src="img/hero_tiles/token/${player.hero}.png" alt="" style="rotate: ${player.catacombDirection}deg;">
            `);
            this.drawEndMoveIcon()
        } else {
            field.insertAdjacentHTML('afterbegin', `
                <img class="hero_mitl ${player.hero}" src="img/hero_tiles/mitle/${player.hero}.png" alt="">
            `); 

            this.drawEndMoveIcon()
        }

        if (this.gameFields[y][x]['id'] === undefined 
            && !field.classList.contains(`start-field`) 
            && !field.classList.contains(`treasury`)
            && !player.catacomb) {
            this.drawTileField(x, y);
        }
        
        this.saveGame();
    }



    drawMonsterToken(x, y, card){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)

        field.insertAdjacentHTML('afterbegin', `
            <img class="token_monsters" src="img/monster_cards/token_monsters.png" alt="">
        `);

        this.gameFields[y][x]['m'] = [];
        if (card) this.gameFields[y][x]['m'].push(card)
    }

    drawCatacombToken(x, y){
        const field = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)

        field.insertAdjacentHTML('afterbegin', `
            <img class="token_catacombs" src="img/catacomb_cards/token_catacombs.jpg" alt="">
        `);

        this.gameFields[y][x]['c'] = true;
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
        if (field.querySelector(`.${selectorName}-icon`)) return
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
        serchIcon.addEventListener('click', (e) => {
            e.target.remove();
            this.removeHighlightFields(this.nextCoordinates)
            let card
            if (this.foresightSearchCard.length !== 0) {
                [card] = this.foresightSearchCard.splice(0, 1);
            } else {
                card = this.getRundomElement(this.search_cards, search_cards)   
            }            

            ew.drawCardEW(card)

            if (this.gameFields[y][x]['s']===undefined) {
                this.gameFields[y][x]['s'] = 1
            } else {
                this.gameFields[y][x]['s'] += 1
            }
        });
    };

    clickEndIcon(){
        const endIcon = document.querySelector('.end-icon');
        endIcon.addEventListener('click', () => {
            ew.drawEW(`Ви впевнені що хочете завершити хід?`);
            ew.addBtnInEW('btn_end_move', 'Так', ()=>{
                ew.removeLastEW()
                this.endMove()
            })
            ew.addBtnInEW('btn_clouse', 'Ні', ()=>ew.removeLastEW())
        });
    };

    clickCatacombIcon(){
        const catacombIcon = document.querySelector('.catacomb-icon');
        catacombIcon.addEventListener('click', () => {
            this.getDirectionCatacomb()
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
            ew.drawTitleInEW('Змінити напрямок руху буде неможливо.')
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
            this.playTreasuryEvent()
        });
    };

    clickTowerIcon(){
        const icon = document.querySelector('.out-from-tower-icon');    

        icon.addEventListener('click', () => {
            ew.drawEW(`Ви впевнені що хочете завершити гру?`);
            ew.addBtnInEW('btn_end_game', 'Так', ()=>this.endGameInTower())
            ew.addBtnInEW('btn_clouse', 'Ні', ()=>ew.removeAllEW())
        });
    };


    clickDoorIcon(){
        this.playingField.addEventListener('click', (e) => {
            if(e.target.closest('.door-icon')) {
                const card = this.getRundomElement(this.door_cards, door_cards)
                ew.drawCardEW(card)
                player.doorEventTarget = e.target
                if (card.name !== `${door_cards[7].name}`) e.target.remove()
                
                if (this.checkCardNameInPack(player.treasureCardContainer, search_cards[20].name)) {
                    ew.drawBtnInEW('btn_close', `Використати ${search_cards[20].name}`, ()=>{
                        e.target.remove()
                        ew.removeAllEW()
                        this.removeCurrentCardNameFromPack(player.treasureCardContainer, search_cards[20].name)
                        this.drawTreasurePackCards()
                    })
                }  
            }
        });
    };

    clickCloseBtn(){
        const btn = document.querySelector('.btn-close-game');
            btn.addEventListener('click', () => {
            ew.drawEW(`Ви впевнені що хочете завершити гру?`);
            ew.addBtnInEW('btn_end_game', 'Так', ()=>this.endGame())
            ew.addBtnInEW('btn_clouse', 'Ні', ()=>ew.removeAllEW())
        });
    };

    clickArrowIcon(){   
        this.playingField.addEventListener('click', (e) => {

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

                if (player.hero == 'hunter'){
                    const card = this.getRundomElement(this.catacomb_cards, catacomb_cards)   
                    ew.drawCardEW(card);
                }
            }
        });
    };

    clickGrilleIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.grille-icon')) {
                const trueFn = ()=>  {
                    e.target.remove()
                    ew.removeAllEW()
                }
                const falseFn = ()=>  {
                    ew.removeAllEW()
                }
                ew.diceRollEW('На виході з кімнати перед вами впала решітка, заблокувавши вам шлях. Перевірте свою Силу.', `Ваша сила: ${heroes[player.hero].strength}`, heroes[player.hero].strength, false, 2, trueFn, falseFn, true, true)

                if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[17].name)) {}
                ew.drawBtnInEW(`btn_close`, `Використати ${treasure_cards[17].name} що б пройти без перевірки`, ()=>{
                    ew.removeAllEW()
                    this.removeIcon('.grille-icon')
                })
            }
        });
    }

    clickCollapseIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.collapse-icon')) {
                const trueFn = ()=>  {
                    e.target.remove()
                    ew.removeAllEW()
                }
                const falseFn = ()=>  {
                    ew.removeAllEW()
                }
                ew.diceRollEW('Перед вами кімната заповнена уламками стелі що впала, щоб пройти на інший бік кімнати перевірте свою Спритність.', `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, 2, trueFn, falseFn, true, true)   
                
                if (this.checkCardNameInPack(player.treasureCardContainer, deadman_cards[8].name)) {
                    ew.drawBtnInEW('btn_close', `Використати ${deadman_cards[8].name}`, ()=>{
                        e.target.remove()
                        ew.removeAllEW()
                        this.removeCurrentCardNameFromPack(player.treasureCardContainer, deadman_cards[8].name)
                        this.drawTreasurePackCards()
                    })
                }               
            }
        });
    }

    clickWebIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.web-icon')) {
                const trueFn = ()=>  {
                    e.target.remove()
                    ew.removeAllEW()
                }
                const falseFn = ()=>  {
                    ew.removeAllEW()
                }
                ew.diceRollEW('Кімнату оплутала павутиння заблокувавши вам шлях. Перевірте свою Силу.', `Ваша сила: ${heroes[player.hero].strength}`, heroes[player.hero].strength, false, 2, trueFn, falseFn, true, true)
                
                if (this.checkCardNameInPack(player.treasureCardContainer, deadman_cards[8].name)) {
                    ew.drawBtnInEW('btn_close', `Використати ${deadman_cards[8].name}`, ()=>{
                        e.target.remove()
                        ew.removeAllEW()
                        this.removeCurrentCardNameFromPack(player.treasureCardContainer, deadman_cards[8].name)
                        this.drawTreasurePackCards()
                    })
                }            
            }
        });
    }

    clickBridgeIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.bridge-icon')) {
                const trueFn = ()=>  {
                    e.target.remove()
                    ew.removeAllEW()
                }
                const falseFn = ()=>{
                    ew.removeAllEW()
                    this.removeIcon('.bridge-icon');
                    const result = ()=>  {
                        ew.removeLastEW()
                        const damage = this.diceRollResultGlobal
                        this.changeHealth(-damage);
                        ew.removeLastEW()
                        ew.drawEW(`Ви отримали ${damage} пораненнь`)
                        setTimeout(() => {
                            ew.removeLastEW()
                        }, 2000);
                    };
                    
                    this.getDirectionCatacomb()
                    this.drawHeroMitl(player.position[0], player.position[1]);
                    ew.diceRollEW('Ви впали з мосу у Катакомби. Киньте кубик для визначення отриманих ушкождень.',false, 6, false, 1, result, false, true);
                } 

                ew.diceRollEW('Перед вами кімната з глибокою прірвою, через яку перекинуто хитку дошку, щоб пройти на інший бік кімнати перевірте свою Спритність.', `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, 2, trueFn, falseFn, true, true)   
                
                if (this.checkCardNameInPack(player.treasureCardContainer, сrypt_cards[9].name)) {
                    ew.drawBtnInEW('btn_close', `Використати ${сrypt_cards[9].name}`, ()=>{
                        e.target.remove()
                        ew.removeAllEW()
                        this.removeCurrentCardNameFromPack(player.treasureCardContainer, сrypt_cards[9].name)
                        this.drawTreasurePackCards()
                    })
                }
            }
        });
    }

    clickAbyssIcon() {
        this.playingField.addEventListener('click', (e) => {
            if (e.target.closest('.abyss-icon')) {
                const trueFn = ()=> {
                    this.removeIcon('.abyss-icon')
                    ew.removeAllEW()
                };
                const falseFn =()=>{
                    ew.removeAllEW()
                    this.changeHealth(-5);
                    this.getDirectionCatacomb();
                    this.drawHeroMitl(player.position[0], player.position[1]);
                } 
                ew.diceRollEW('Кімнату розділило навпіл глибоким прірвою, щоб вийти з кімнати по той бік прірви перевірте Спритність.', `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, 2, trueFn, falseFn, true, true)   
                
                if (this.checkCardNameInPack(player.treasureCardContainer, сrypt_cards[9].name)) {
                    ew.drawBtnInEW('btn_close', `Використати ${сrypt_cards[9].name}`, ()=>{
                        e.target.remove()
                        ew.removeAllEW()
                        this.removeCurrentCardNameFromPack(player.treasureCardContainer, сrypt_cards[9].name)
                        this.drawTreasurePackCards()
                    })
                }           
            }
        });
    }
        
    createNewEvent(eventName){
        const event = new Event(eventName);
        document.dispatchEvent(event);
    }

    getRundomElement(idxArr, objArr){
        if (idxArr.length < 3) {
            if (idxArr === this.сrypt_cards) this.refreshCryptCards();
            if (idxArr === this.catacomb_cards) this.refreshCatacombCards();
            if (idxArr === this.deadman_cards) this.refreshDeadmanCards();
            if (idxArr === this.door_cards) this.refreshDoorCards();
            if (idxArr === this.dungeon_cards) this.refreshDungeonCards();
            if (idxArr === this.room_tiles) this.refreshRoomTiles();
            if (idxArr === this.search_cards) this.refreshSearchCards();
            if (idxArr === this.trap_cards) this.refreshTrapCards();
        }


        const randomIdx = this.random(idxArr.length);
        const obj = idxArr.splice(randomIdx, 1);
        return objArr[obj - 1]
    }
    
    random(maxValue){
        return Math.floor(Math.random() * maxValue);
    }

    removeRandomCardFromPack(pack){
        const maxValue = pack.length-1
        if (maxValue < 1) return
        const randomId = Math.floor(Math.random() * maxValue)
        pack.splice(randomId, 1)
    }

    distributionCards(arr){
        arr.forEach(card => {
            if (card.type === 'treasure') player.treasureCardContainer.push(card)
            if (card.type === 'event') player.eventCardContainer.push(card)
        });

        this.drawEventPackCards();
        this.drawTreasurePackCards()
        this.updateGoldValue()
    }

    subtractArrays(arr1, arr2, key) {
        return arr1.filter(obj1 => !arr2.some(obj2 => obj1[key] === obj2[key]));
    }

    getSomeCards(arr1, arr2, count){
        const cards = [];
        for (let i = 0; i < count; i++) {
            cards.push(game.getRundomElement(arr1, arr2));
        }
        game.distributionCards(cards)
        return cards
    }

    removeCurrentCardNameFromPack(arr, keyValue){
        const index = arr.findIndex(obj => obj?.name === keyValue);
        if (index !== -1) {
            arr.splice(index, 1);
        }
    }

    checkCardNameInPack(arr, name){
        return arr.some(card => card.name === name)
    }

    moveToAnyCell() {
        this.removeHighlightFields(this.nextCoordinates)
        this.removeAllIcon()
        const toRemove = new Set(["0,0", "14,0", "0,11", "14,11", "7,5", "7,6"]);
        const arr = Array.from({ length: 12 }, (_, y) => Array.from({ length: 15 }, (_, x) => [x, y])).flat().filter(([x, y]) => !toRemove.has(`${x},${y}`));
        this.nextCoordinates = arr
    }

    findClosestByCost(arr, target) {
        return arr.reduce((closest, item) => {
            if (typeof item.cost !== 'number') return closest;

            if (!closest || Math.abs(item.cost - target) < Math.abs(closest.cost - target) )  return item;

            return closest;
        }, null);
    }

    knowledgeTheCatacombs(){
        const length = 4
        let emptyFelds = []
        const cardsForChoice = [this.getRundomElement(this.catacomb_cards, catacomb_cards),
                                this.getRundomElement(this.catacomb_cards, catacomb_cards),
                                this.getRundomElement(this.catacomb_cards, catacomb_cards),
                                this.getRundomElement(this.catacomb_cards, catacomb_cards)]
        
        ew.clear()
        ew.addEmptyFeldForCard(length)
        ew.addPackCards(cardsForChoice)

        addScrolCardsEffect('.event-deck-container', (e)=> {
            const [card] = removeCardFromPack(e)

            emptyFelds.push(card)
            drawCardToFeld(length)
        });

        ew.addBtnInEW('btn_next', 'Вибрати', ()=>{
            ew.removeAllEW()
            this.knowledgeTheCatacombCards.push(...emptyFelds)
            emptyFelds = []
            this.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Знание Катакомб')
            this.drawAbilitiePackCards()
            const [card] = this.knowledgeTheCatacombCards.splice(0, 1);
            ew.drawCardEW(card);
        })

        const btnNext = document.getElementById('btn_next')
        btnNext.style.display = 'none'

        addScrolCardsEffect('.event-deck-container', (e)=> {
            const [card] = removeCardFromPack(e)

            emptyFelds.push(card)
            drawCardToFeld(length)
        });
        function removeCardFromPack(e) {
            const id = e.target.getAttribute('id')
            const card = cardsForChoice.splice(id, 1)

            ew.updatePackCardsEW(cardsForChoice)

            return card
        }  

        function drawCardToFeld(count){
                
            if(emptyFelds.length >= 1) btnNext.style.display = 'block'
            if(emptyFelds.length < 1) btnNext.style.display = 'none'
            
            for (let i = 0; i < count; i++) {

                const feld = document.getElementById(`card-feld-${i}`)
                if (!feld) continue;

                if(emptyFelds[i] === undefined) {
                    feld.innerHTML = ''
                    continue; 
                }

                feld.innerHTML = `<div id="${i}" class="card" style="background-image: url('img/${emptyFelds[i].pack}_cards/${emptyFelds[i].pack}_${emptyFelds[i].id}.jpg')"></div>`

                feld.onclick = () => {
                    const [card] = emptyFelds.splice(i, 1)
                    if(card) {
                        cardsForChoice.push(card)
                        ew.updatePackCardsEW(cardsForChoice)
                        drawCardToFeld(count)  
                    }
                }
            }
        }
    }
    
}


export const game = new Game();