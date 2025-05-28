import  {addScrolCardsEffect}  from './function/addScrolCardsEffect.js';

import  {game}  from './game.js';
import  {heroes}  from './cards/heroes.js';
import  {сrypt_cards}  from './cards/сrypt_cards.js';
import  {catacomb_cards}  from './cards/catacomb_cards.js';
import  {deadman_cards}  from './cards/deadman_cards.js';
import  {door_cards}  from './cards/door_cards.js';
import  {dungeon_cards}  from './cards/dungeon_cards.js';
import  {monster_cards}  from './cards/monster_cards.js';
import  {search_cards}  from './cards/search_cards.js';
import  {trap_cards}  from './cards/trap_cards.js';
import  {treasure_cards}  from './cards/treasure_cards.js';
import  {hero_card_abilitie}  from './cards/hero_card_abilitie.js';
import { player } from './player.js';

class EventWidows{

    static zIndex = 100;

    drawEW(title, color) {
        EventWidows.zIndex +=1;

        game.activeEvent = true
        const element = document.querySelector('body');
        element.insertAdjacentHTML('afterbegin', 
            `<div id="ew_${EventWidows.zIndex}" class="event-container" style="z-index: ${EventWidows.zIndex};">
                <div class="event-main">
                    <div class="title style="color:${color}""><h1>${title}</h1></div>
                </div>
            </div>`
        );
    }

    clear(){
        this.removeTxt()
        document.querySelectorAll('button')?.forEach((item)=>{item.remove()})
        document.querySelectorAll('.dice-section')?.forEach((item)=>{item.remove()})
    }

    choiceCardEW(cardIn){
        this.removeAllEW()
        this.drawCardEW(hero_card_abilitie['robber'][4])

        const length = 1
        let emptyFelds = []
        const cardsForChoice = [cardIn,
                                this.getCardSamePack(cardIn)]
        
        this.clear()
        this.addEmptyFeldForCard(length)
        this.addPackCards(cardsForChoice)

        addScrolCardsEffect('.event-deck-container', (e)=> {
            const [card] = removeCardFromPack(e)

            emptyFelds.push(card)
            drawCardToFeld(length)
        });

        this.addBtnInEW('btn_next', 'Вибрати', ()=>{
            this.removeAllEW()
            const [card] = emptyFelds
            emptyFelds = [] 
            this.drawCardEW(card)
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

    getCardSamePack(card){
        if (card.pack == 'crypt') return game.getRundomElement(game.сrypt_cards, сrypt_cards) 
        if (card.pack == 'catacomb') return game.getRundomElement(game.catacomb_cards, catacomb_cards) 
        if (card.pack == 'deadman') return game.getRundomElement(game.deadman_cards, deadman_cards) 
        if (card.pack == 'door') return game.getRundomElement(game.door_cards, door_cards) 
        if (card.pack == 'dungeon') return game.getRundomElement(game.dungeon_cards, dungeon_cards) 
        if (card.pack == 'monster') return game.getRundomElement(game.monster_cards, monster_cards) 
        if (card.pack == 'search') return game.getRundomElement(game.search_cards, search_cards) 
        if (card.pack == 'trap') return game.getRundomElement(game.trap_cards, сrypt_cards) 
        if (card.pack == 'treasure') return game.getRundomElement(game.treasure_cards, treasure_cards) 
    }

    drawCardEW(card) {
        this.drawEW(card.title);
        this.drawCardsInEW(card);
        this.drawBtnInEW('btn_ew', card.btnName, ()=>{
            game.activeEvent = true
            if (card.effect() === undefined) return
            card.effect()
        });

        if (player.hero == 'hunter' && card.name == 'Капкан') {
            this.drawBtnInEW('btn_hunter', 'Скинути Капкан, та взяти іншу карту', ()=>{
                ew.removeLastEW()
                const cardNext = this.getCardSamePack(card)
                this.drawCardEW(cardNext)
            })
        }

        if (player.hero == 'knight' && card.pack == 'monster') {
            game.changeResolve(1)
            this.drawEW(`Ви отримали 1 рішучості!`);
            setTimeout(this.removeLastEW, 1200);           
        }

        if (game.checkCardNameInPack(player.abilitieCardContainer, 'Шестое Чувство')
            && card.pack !== 'dragon'){
                this.drawBtnInEW('btn_sixSense', `Використати Шестое Чувство`, ()=>{
                    game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Шестое Чувство')
                    game.drawAbilitiePackCards()
                    this.choiceCardEW(card)
                })
        }

        if (card.pack == 'trap'
            && game.checkCardNameInPack(player.abilitieCardContainer, 'Обнаружение Ловушек')){
                this.drawBtnInEW('btn_close', `Використати Обнаружение Ловушек`, ()=>{
                    game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Обнаружение Ловушек')
                    game.drawAbilitiePackCards()
                    this.removeAllEW()
                })
        }

        if (card.pack == 'trap'
            && game.checkCardNameInPack(player.abilitieCardContainer, 'Легкая Поступь')){
                this.drawBtnInEW('btn_close', `Використати Легкая Поступь`, ()=>{
                    game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Легкая Поступь')
                    game.drawAbilitiePackCards()
                    this.removeAllEW()
                })
        }

        if (card.pack == 'catacomb'
            && game.checkCardNameInPack(player.abilitieCardContainer, 'Крепкие Доспехи')){
                this.drawBtnInEW('btn_close', `Використати Крепкие Доспехи`, ()=>{
                    game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Крепкие Доспехи')
                    game.drawAbilitiePackCards()
                    this.removeAllEW()
                })
        }

        if (card.pack == 'dungeon'
            && game.checkCardNameInPack(player.abilitieCardContainer, 'Крепкие Доспехи')){
                this.drawBtnInEW('btn_close', `Використати Крепкие Доспехи`, ()=>{
                    game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Крепкие Доспехи')
                    game.drawAbilitiePackCards()
                    this.removeAllEW()
                })
        }

        if (card.pack == 'trap'
            && game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[15].name)) {
            game.changeHealth(1)
            this.drawEW(`Ви отримали 1 очко здоров'я!`);
            setTimeout(this.removeLastEW, 1200);
        }

        if (player.hero == 'hunter' && card.pack == 'trap'){
            game.changeResolve(1)
            this.drawEW(`Ви отримали 1 рішучості!`);
            setTimeout(this.removeLastEW, 1200);

        }
    }

    diceRollEW(title, txt, value, dexterity, diceCount, trueFn, falseFn, rolResult, closeEW) {
        let newValue = value;
        let texts = txt;
        let resolve = false;
        const resolvePlayer = heroes[player.hero].resolve;
        const treasure = player.treasureCardContainer.length;
    
        if (resolvePlayer > 0) {
            texts += ` + ${resolvePlayer} Рішучості`;
            resolve = true;
        }
    
        if (treasure > 0 && dexterity) {
            texts += ` - ${treasure} Спритності`;
            newValue -= treasure;
        }
    
        this.drawEW(title);
        if (txt) this.drawTitleInEW(texts);
        this.drawDiceInEW(diceCount);
        this.drawBtnInEW('roll', 'Кинути Кубики', () => {
            this.rollDiceFn();
            setTimeout(() => {
                this.rolResultEW(resolve, newValue, trueFn, falseFn, rolResult, closeEW);
            }, 1700);
        });
    }

    addDiceRollSection( txt, value, dexterity, resolve, diceCount, trueFn, falseFn, rolResult, closeEW) {
        let newValue = value;
        let texts = txt;
        const resolvePlayer = heroes[player.hero].resolve;
        const treasure = player.treasureCardContainer.length;
    
        if (resolvePlayer > 0 && resolve) {
            texts += `<br> + ${resolvePlayer} Рішучості`;
        }
    
        if (treasure > 0 && dexterity) {
            texts += `<br> - ${treasure} за трофеї`;
            newValue -= treasure;
        }
    
        if(txt) this.addTxt(texts);
        this.drawDiceInEW(diceCount);
        this.drawBtnInEW('roll', 'Кинути Кубики', () => {
            this.rollDiceFn();
            setTimeout(() => {
                this.rolResultEW(resolve, newValue, trueFn, falseFn, rolResult, closeEW);
            }, 1700);
        });
    }

    removeDiceRollSection(){
        this.removeTxt()
        this.removeDiceInEW()
        this.removeRawBtnInEW('roll')
    }

    addNumberSectionForChoice() {
        const element = document.querySelector('.event-main');
        element.insertAdjacentHTML('beforeend', 
            `<div class="number-for-choice-section">
                <div class="number-for-choice">1</div>
                <div class="number-for-choice">2</div>
                <div class="number-for-choice">3</div>
                <div class="number-for-choice">4</div>
                <div class="number-for-choice">5</div>
                <div class="number-for-choice">6</div>
            </div>`);
        
        const numberForChoiceSection = document.querySelector('.number-for-choice-section');
        
        numberForChoiceSection.addEventListener('click', (e) => {
            e.target.classList.toggle('active');
            this.toggleNumber(player.choiceNumber, +e.target.innerText);
            
            const btnChoice = document.getElementById('btnChoice')
            btnChoice.style.display = 'none'

            if(player.choiceNumber.length === 2) btnChoice.style.display = 'block'
            if(player.choiceNumber.length !== 2) btnChoice.style.display = 'none'
        });
    }

    removeNumberSectionForChoice(){
        document.querySelector('.number-for-choice-section')?.remove()
    }

    toggleNumber(arr, num) {
        const index = arr.indexOf(num);
        if (index === -1) {
            arr.push(num);
        } else {
            arr.splice(index, 1);
        }
        return arr;
    }

    
    addBattleDiceRollSection(trueValue, resolve, diceCount, trueFn, falseFn) {
        let newValue = trueValue;
        const resolvePlayer = heroes[player.hero].resolve;
    
        if (resolvePlayer > 0 && resolve) {
            texts += `<br> + ${resolvePlayer} Рішучості`;
        }
    
        if (treasure > 0 && dexterity) {
            texts += `<br> - ${treasure} за трофеї`;
            newValue -= treasure;
        }
    
        this.drawDiceInEW(diceCount);
        this.drawBtnInEW('roll', 'Кинути Кубики', () => {
            this.rollDiceFn();
            setTimeout(() => {
                this.rolResultEW(resolve, newValue, trueFn, falseFn, rolResult, closeEW);
            }, 1700);
        });
    }

    rolResultEW (resolve, valueIn, trueFn, falseFn, rolResult, closeEW){

        let value = valueIn

        if (resolve) value += heroes[player.hero].resolve

        if (game.diceRollResultGlobal <= valueIn) {
            if (rolResult){
            this.drawEW(`Результат: ${game.diceRollResultGlobal}`, 'green');
            this.drawBtnInEW('next','Далі', ()=>{
                if (closeEW) this.removeLastEW()
                if (trueFn) trueFn();
            });
            }

            if (!rolResult){
                if (closeEW) this.removeLastEW()
                if (trueFn) trueFn();
            }
        }

        if (game.diceRollResultGlobal > valueIn && game.diceRollResultGlobal <= value) {
            this.drawEW(`Результат: ${game.diceRollResultGlobal}`);
            this.drawBtnInEW('add_resolve','Додати Рішучості', ()=>{
                const diff = game.diceRollResultGlobal - valueIn;
                game.changeResolve(-diff) ;
                this.removeLastEW()
                if (closeEW) this.removeLastEW()
                if (trueFn) trueFn();  
            });

            this.drawBtnInEW('next','Далі', ()=>{
                this.removeLastEW()
                if (closeEW) this.removeLastEW()
                if (falseFn) falseFn();
                game.changeResolve(+1);
            });
        }

        if (game.diceRollResultGlobal > value) {
            if (rolResult){
                this.drawEW(`Результат: ${game.diceRollResultGlobal}`, 'red');                
                this.drawBtnInEW('next','Далі', ()=>{
                    if (closeEW) this.removeLastEW()
                    if (falseFn) falseFn();
                });
                game.changeResolve(+1);
            }

            if (!rolResult){
                if (closeEW) this.removeLastEW()
                if (falseFn) falseFn();
                game.changeResolve(+1);
            }
        }

        this.everyRollIsTrue(resolve, valueIn, trueFn, falseFn, rolResult, closeEW)
        this.addPointToDiceResult(resolve, valueIn, trueFn, falseFn, rolResult, closeEW)
        this.rerollDice(resolve, valueIn, trueFn, falseFn, rolResult, closeEW)
        this.willToWin(resolve, valueIn, trueFn, falseFn, rolResult, closeEW)

    }

    everyRollIsTrue(resolve, valueIn, trueFn, falseFn, rolResult, closeEW){
        if (game.diceRollResultGlobal > valueIn
            && game.checkCardNameInPack(player.abilitieCardContainer, 'Второе дыхание')
            && !player.fightWithMonsters) {
                this.drawBtnInEW('btn_secondBreath', 'Використати Второе дыхание', ()=>{
                    this.removeLastEW()
                    game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Второе дыхание')
                    game.drawAbilitiePackCards()
                    if (rolResult){
                    this.drawEW(`Ви пройшли перевірку!`, 'green');
                    this.drawBtnInEW('next','Далі', ()=>{
                        if (closeEW) this.removeLastEW()
                        if (trueFn) trueFn();
                    });
                    }

                    if (!rolResult){
                        if (closeEW) this.removeLastEW()
                        if (trueFn) trueFn();
                    }                   
                })
        }
    }

    rerollDice(resolve, valueIn, trueFn, falseFn, rolResult, closeEW){
        if (game.checkCardNameInPack(player.treasureCardContainer, 'Магическое Кольцо')){
            this.drawBtnInEW('btn_ring', 'Перекінути кубік (за 290 золота)', ()=>{
                this.removeLastEW()
                game.removeCurrentCardNameFromPack(player.treasureCardContainer, 'Магическое Кольцо')
                game.drawTreasurePackCards()
                this.rollDiceFn();
                setTimeout(() => {
                    this.rolResultEW(resolve, valueIn, trueFn, falseFn, rolResult, closeEW);
                }, 1700);
            })
        }
    }

    willToWin(resolve, valueIn, trueFn, falseFn, rolResult, closeEW){
        if (game.checkCardNameInPack(player.abilitieCardContainer, 'Воля к победе')){
            this.drawBtnInEW('btn_ring', 'Перекінути кубік за Воля к победе', ()=>{
                player.willToWin -= 1
                this.removeLastEW()
                if (player.willToWin === 0) game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Воля к победе')
                game.drawAbilitiePackCards()
                this.rollDiceFn();
                setTimeout(() => {
                    this.rolResultEW(resolve, valueIn, trueFn, falseFn, rolResult, closeEW);
                }, 1700);
            })
        }
    }


    addPointToDiceResult(resolve, valueIn, trueFn, falseFn, rolResult, closeEW){
        if (player.treasureCardContainer.some(card => card.name === treasure_cards[32].name)
            && game.diceRollResultGlobal < valueIn){
            this.drawBtnInEW('btn_add', 'Додати 1 до результату (за 170 золота)', ()=>{
                this.removeLastEW()
                game.removeCurrentCardNameFromPack(player.treasureCardContainer, treasure_cards[32].name)
                game.drawTreasurePackCards()
                game.diceRollResultGlobal +=1
                this.rolResultEW (resolve, valueIn, trueFn, falseFn, rolResult, closeEW)
            })
        }
    }

    endMoveEW() {
        this.drawEW('Завершити свій хід?');
        this.drawBtnInEW('btn_yes', 'Так', ()=>{
            this.removeAllEW()
            game.endMove()
        }, 'green');

        this.drawBtnInEW('btn_no', 'Ні', ()=>{
            this.removeAllEW()
        }, 'red');
    }

    removeTitile(){
        document.querySelector('.event-main').querySelector('.title').remove();
    }

    addTitleToEW(txt){
        const main = document.querySelector('.event-main');
        main.insertAdjacentHTML('afterbegin', 
            `<div class="title"><h1>${txt}</h1></div>`
        );
    }

    removeAllEW(){
        game.activeEvent = false
        player.checkEventCards = true

        const elements = document.querySelectorAll('.event-container')
        elements.forEach(element => {
            element.remove()
            EventWidows.zIndex = 100;
        });
    }

    removeLastEW(){
        const element = document.getElementById(`ew_${EventWidows.zIndex}`)
        element.remove()
        EventWidows.zIndex -= 1;
    }

    drawCardsInEW(card) {
        const element = document.querySelector('.event-main');

        let cards
        let eventSection = '';

        if (Array.isArray(card)) {
            cards = card;
        } else {
            cards = [card];
        }

        cards.forEach(card => {
            if (card.pack === 'abilitie') return eventSection += `<div class="card" style="background-image: url('img/${card.pack}_cards/${card.pack}_${player.hero}_${card.id}.jpg')"></div>`
            eventSection += `<div class="card" style="background-image: url('img/${card.pack}_cards/${card.pack}_${card.id}.jpg')"></div>`
        });

        element.insertAdjacentHTML('beforeend', eventSection);
    }

    drawTileInEW(tileId){
        const element = document.querySelector('.event-main');
        const eventSection = `<img id="${tileId}" class="tile-field tile-map shadow choice-tile" src="img/room_tiles/room_${tileId}.jpg" alt="" style="rotate: 0deg; height: 200px; width: 200px; margin: 10px;">`
        element.insertAdjacentHTML('beforeend', eventSection);
        return element
    }

    addTxt(txt){
        let container = document.querySelector('.event-main');

        if (!container.querySelector('.event-txt-container')) {
            container.innerHTML += `<div class="event-txt-container"></div>`
        }
        
        container = document.querySelector('.event-txt-container')
        container.insertAdjacentHTML('beforeend',`<p class="event-txt">${txt}</p>`)
    }

    removeTxt(){
        document.querySelectorAll('.event-txt-container')?.forEach((item)=>{item.remove()})
    }

    diceRollDarkRoomEW() {
        game.nextCoordinates = []
        this.drawEW('Ви потрапили у Темну Кімнату і намагаєтесь покинути її на дотик. Удача визначить ваш напрямок.');
        this.drawDiceInEW(1)
        const trueFn = ()=>{
            this.rollDiceFn()  
            setTimeout(() => {
                this.removeAllEW();
                if (!game.darkRoomCoordinates[game.diceRollResultGlobal]) return this.diceRollDarkRoomEW();
                game.nextCoordinates = [game.darkRoomCoordinates[game.diceRollResultGlobal]];
                game.activeEvent = false
            }, 1700);
        }
        this.drawBtnInEW('roll', 'Кинути Кубики', trueFn)

        if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[11].name)) {
            this.addBtnInEW('btn_skip', 'Пропустити кидок (за 290 золота)', ()=>{
                this.removeLastEW()
                game.removeCurrentCardNameFromPack(player.treasureCardContainer, treasure_cards[11].name)
                game.drawTreasurePackCards()
                game.nextCoordinates = game.newCoordinate()
                game.activeEvent = false
            })
        }
    }

    removeDiceInEW(){
        document.querySelector('.dice-section')?.remove()
    }

    drawDiceInEW(diceCount){
        const element = document.querySelector('.event-main');
        let diceContainers ='';
        let count = 1;

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

        element.insertAdjacentHTML('beforeend', `<div class="dice-section">${diceContainers}</div>`);
    }

    drawBtnInEW(id, name, fn, bg){
        const element = document.querySelector('.event-main');
        element.insertAdjacentHTML('beforeend', `<button id=${id} style="background:${bg}">${name}</button>`);
        document.getElementById(id).addEventListener('click', () => fn(), {once: true});
    }

    addBtnInEW(id, name, fn, bg){
        const element = document.querySelector('.event-main');
        element.insertAdjacentHTML('beforeend', `<div class="btn-section"><button id=${id} style="background:${bg}">${name}</button></div>`);
        document.getElementById(id).addEventListener('click', () => fn(), {once: true});
    }

    removeRawBtnInEW(id){
        document.getElementById(id)?.remove()
    }

    addEmptyFeldForCard(feldCount){
        const element = document.querySelector('.event-main');
        let emptyFelds ='';
        let count = 0;

        while (count <= feldCount - 1) {
            emptyFelds +=
                `<div id="card-feld-${count}" class="card-feld"></div>`;
            count += 1;
        }

        element.insertAdjacentHTML('beforeend', `<div class="card-feld-section">${emptyFelds}</div>`);
    }

    addPackCards(packCards){
        const element = document.querySelector('.event-main');
        
        let activeId = Math.round((packCards.length-1)/2)
        let cardDeckContainer ='';

        packCards.forEach((card, idx) => {
            let active = ''
            if(idx === activeId) active = 'active'
            cardDeckContainer += `
                <div id="${idx}" class="card-deck ${active}" style="background-image: url('img/${card.pack}_cards/${card.pack}_${card.id}.jpg')"></div>        
            `
        });

        element.insertAdjacentHTML('beforeend', `<div class="card-deck-container event-deck-container">${cardDeckContainer}</div>`);
        game.updateGoldValue()
    }
    
    removePackCardsInEW(){
        document.querySelectorAll('.event-deck-container')?.forEach(item => {item.remove()});
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

    drawTitleInEW(text){
        const element = document.querySelector('.title');
        element.insertAdjacentHTML('beforeend', `<p>${text}</p>`);
    }

    rollDiceFn() {
        const diceElements = document.querySelectorAll('.dice');
        let diceResult = 0;

        diceElements.forEach((dice) => {
            const value = Math.floor((Math.random() * 6) + 1);
            diceResult += value;
        
            for (let i = 1; i <= 6; i++) {
                dice.classList.remove('show-' + i);
                if (value === i) {
                    dice.classList.add('show-' + i);
                }
            }
        });

        game.diceRollResultGlobal = diceResult;
    }

    escapeCatacombEW(){
        this.drawEW('Бажаєте покинути катакомби?')
    
        this.drawBtnInEW('next', 'Так', ()=>{
            this.removeAllEW()
            this.escapeCatacomb()
        }, 'green')
    
        this.drawBtnInEW('close', 'Ні', ()=>{
            this.removeAllEW()
        }, 'red')
    }
    
    escapeCatacomb(){
        const x = player.position[0]
        const y = player.position[1]
        player.catacomb = false
        game.gameFields[y][x]['c'] = true
        game.removeHighlightFields(game.nextCoordinates)
        game.drawHeroMitl(x, y);
        game.drawCatacombToken(x, y)
        game.checkRoomEvents()
        game.endMove()
    }

    addBattleSection(card, endBattleFn){
        
        let attack = player.attack

        if (game.checkCardNameInPack(player.treasureCardContainer, deadman_cards[11].name) 
            && (player.fightWithSorcerer)) attack += 1

        if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[20].name) 
            && (player.fightWithDemon || player.fightWithSkeleton)) attack += 1

        if (game.checkCardNameInPack(player.treasureCardContainer, сrypt_cards[6].name) 
            && player.fightWithTroll) attack += 1

        if (game.checkCardNameInPack(player.treasureCardContainer, catacomb_cards[48].name) 
            && player.fightWithGolem) attack += 1

        this.clear()
        this.addTxt(`
            ${player.hero.toUpperCase()}<br>
            <i id="pl_hp" class="fa-solid fa-heart" style="color:red; font-size: 25px; margin: 10px auto;">${heroes[player.hero].health}</i><br>
        `)

        this.addTxt(`
            <i style="font-size: 30px;"> </i><br>
            <i style="font-size: 25px;">VS</i><br>
        `)

        this.addTxt(`
            ${card.name.toUpperCase()}<br>
            <i id="em_hp" class="fa-solid fa-heart" style="color:red; font-size: 25px; margin: 20px auto;">${card.health}</i><br>
        `)

        const trueFn = ()=>{ 
            let result = 3
            if(player.hero == 'mage' && player.mageFirstThrow){
                if(game.diceRollResultGlobal >= 4){
                    card.health -= 1
                    this.drawEW(`${card.name} отримав ${1} поранення від Удару Блискавкою`)
                    setTimeout(() => {
                        this.removeLastEW()
                        this.clear()
                        this.addBattleSection(card, endBattleFn)
                        player.mageFirstThrow = false
                    }, 2000);
                } 

                if(game.diceRollResultGlobal < 4){
                    this.drawEW(`${card.name} ухилився від Удару Блискавкою`)
                    setTimeout(() => {
                        this.removeLastEW()
                        this.clear()
                        this.addBattleSection(card, endBattleFn)
                        player.mageFirstThrow = false
                    }, 2000);
                }

                return               
            }

            if (player.combatMagic) result = 4

            if(game.diceRollResultGlobal <= result){
                card.health -= attack
                this.drawEW(`${card.name} отримав ${attack} поранення`)
                setTimeout(() => {
                    this.removeLastEW()
                    this.clear()
                    this.addBattleSection(card, endBattleFn)
                }, 1200);
            }

            if(game.diceRollResultGlobal > result){
                let damage = 1
                game.changeHealth(-damage)
                this.drawEW(`Ви отримали ${damage} поранення`)
                setTimeout(() => {
                    this.removeLastEW()
                    this.clear()
                    this.addBattleSection(card, endBattleFn)
                }, 1200);
            }
        }

        this.addDiceRollSection(false, 6, false, true, 1, trueFn, false, true, true)
        
        this.escapeM()
        this.combatMagic()
        
        this.useCardForDamage(player.treasureCardContainer, treasure_cards[1], 2, card, endBattleFn)
        this.useCardForDamage(player.treasureCardContainer, treasure_cards[4], 3, card, endBattleFn)
        
        this.useCardForDamage(player.abilitieCardContainer, hero_card_abilitie.dwarf[0], 2, card, endBattleFn)
        this.useCardForDamage(player.abilitieCardContainer, hero_card_abilitie.enchantress[0], 2, card, endBattleFn)
        this.useCardForDamage(player.abilitieCardContainer, hero_card_abilitie.hunter[0], 2, card, endBattleFn)
        this.useCardForDamage(player.abilitieCardContainer, hero_card_abilitie.knight[0], 2, card, endBattleFn)
        this.useCardForDamage(player.abilitieCardContainer, hero_card_abilitie.mage[0], 2, card, endBattleFn)
        this.useCardForDamage(player.abilitieCardContainer, hero_card_abilitie.robber[0], 2, card, endBattleFn)
        
        if (player.escapeBattle && !player.ambushRoom && !player.surroundedMonsters) this.drawBtnInEW('btn_esc','Втекти', ()=>this.escapeBattle(card))

        if (card.health < 1) {
            player.combatMagic = false
            player.mageFirstThrow = true
            this.drawEW(`${card.name} переможений!`)

            if (player.hero == 'enchantress'
                && player.fightWithSorcerer){
                    game.changeResolve(1)
                    this.drawEW(`Ви отримали 1 Рішучість!`);
                }


            if (game.checkCardNameInPack(player.treasureCardContainer, treasure_cards[19].name) 
                && player.fightWithMonsters) {
                this.addTxt('Ви зцілили 1 своє поранення')
                game.changeHealth(1)
            }

            setTimeout(() => {
                this.removeAllEW()
                player.fightWithMonsters = false;
                endBattleFn()
            }, 2000);
            return
        }

        if (heroes[player.hero].health === 0) {
            this.drawEW(`Ви загинули(`)
            setTimeout(() => {
                this.removeAllEW()
                player.fightWithMonsters = false;
                player.combatMagic = false
                player.mageFirstThrow = true
                game.endGame()
            }, 2000);
            return
        }
    }

    escapeM(){
        if (game.checkCardNameInPack(player.abilitieCardContainer, 'Побег')){
            this.drawBtnInEW('btn_escM', 'Використати Побег', ()=>{
                player.combatMagic = false
                player.mageFirstThrow = true                
                game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Побег')
                game.drawAbilitiePackCards()
                this.drawEW('Ви змогли втекли')
                setTimeout(() => this.removeAllEW(), 1200);
            })
        }       
    }

    combatMagic(){
        if (game.checkCardNameInPack(player.abilitieCardContainer, 'Боевая Магия')){
            this.drawBtnInEW('btn_cmbMg', 'Використати Боевая Магия', ()=>{
                this.removeRawBtnInEW('btn_cmbMg')
                player.combatMagic = true
                game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Боевая Магия')
                game.drawAbilitiePackCards()
            })
        }
    }

    useCardForDamage(packCards, cardObj, damage, card, endBattleFn){
        if (player.fightWithMonsters 
            && packCards.some(card => card.name === `${cardObj.name}`)) {
                let txt = `Використати ${cardObj.name} ${damage} пораннення`
                if (cardObj.cost) txt += ` за ${cardObj.cost} золота`
                this.drawBtnInEW(`btn_card_${cardObj.id}`, txt, () => {
                    game.removeCurrentCardNameFromPack(packCards, `${cardObj.name}`);
                    game.updateGoldValue()
                    game.drawTreasurePackCards()
                    game.drawAbilitiePackCards()
                    this.removeRawBtnInEW(`btn_crystal_${cardObj.id}`);
                    card.health -= damage;
                    this.drawEW(`${card.name} отримав ${damage} поранення`);
                    setTimeout(() => {
                        this.removeLastEW();
                        this.clear();
                        this.addBattleSection(card, endBattleFn);
                    }, 1200);
                });
        }
    } 

    escapeBattle(card, endBattleFn){
        const trueFn = ()=>{
            let damage = card.penalty
            game.changeHealth(-damage)
            this.drawEW(`Ви змогли втекти, але отримали ${damage} поранень`)
            player.combatMagic = false
            player.mageFirstThrow = true            
            setTimeout(() => {
                game.drawMonsterToken(player.position[0], player.position[1], card)
                player.extraMove = true
                player.fightWithMonsters = false
                game.removeAllIcon()
                this.removeAllEW()
            }, 2000);

        }

        const falseFn = ()=>{
            this.drawEW(`Ви НЕ змогли втекти`)
            player.escapeBattle = false
            setTimeout(() => {
                this.removeLastEW()
                this.addBattleSection(card, endBattleFn)
            }, 1200);
            
        }

        this.drawBtnInEwIfSomeCardInTreasure(treasure_cards[8], 
            'Гарантована втеча та 4 поранення', ()=>{
                this.removeAllEW()
                game.changeHealth(-4)
            }, ()=>{   
                this.clear()
                this.addDiceRollSection( `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true, 2, trueFn, falseFn, true, true)
            }
        )

        this.drawBtnInEwIfSomeCardInTreasure(сrypt_cards[10], 
            `Гарантована втеча`, ()=>{
                this.removeAllEW()
                game.removeCurrentCardNameFromPack(player.treasureCardContainer, сrypt_cards[10].name)
                game.drawTreasurePackCards()
            }, ()=>{   
                this.clear()
                this.addDiceRollSection( `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true, 2, trueFn, falseFn, true, true)
            }
        )

    }

    drawBtnInEwIfSomeCardInTreasure(card, txtFor, fn, elseFn){
        let txt = `Використати ${card.name}`
        if (txtFor) txt += ` ${txtFor}`
        if (card.cost) txt += ` за ${card.cost} золота`

        if (game.checkCardNameInPack(player.treasureCardContainer, `${card.name}`)) {
            this.drawBtnInEW(`btn_card_${card.id}`, txt , () => {
                game.removeCurrentCardNameFromPack(player.treasureCardContainer, `${card.name}`);
                game.updateGoldValue()
                game.drawTreasurePackCards()
                if (fn) fn();
            });
            if (elseFn) this.drawBtnInEW('btn_next', 'Далі', ()=>elseFn())
        } else {
            if (elseFn) elseFn();
        }
    }

    drawCoiceEW(condition, txtFor, card, fn, elseFn){
        if (condition) {
            this.drawEW(txtFor)
            if (card) this.drawCardsInEW(card)
            this.drawBtnInEW(`btn_next`, `Використати`, () => {if (fn) fn()});
            if (elseFn) this.drawBtnInEW('btn_close', 'Пропустити', ()=>elseFn())
        } else {
            if (elseFn) elseFn();
        }
    }   

}

export const ew = new EventWidows();