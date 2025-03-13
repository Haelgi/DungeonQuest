import  {game}  from './game.js';
import  {heroes}  from './cards/heroes.js';
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
        ew.removeTxt()
        document.querySelectorAll('button')?.forEach((item)=>{item.remove()})
        document.querySelectorAll('.dice-section')?.forEach((item)=>{item.remove()})
    }

    drawCardEW(card) {
        this.drawEW(card.title);
        this.drawCardsInEW(card);
        this.drawBtnInEW('btn_ew', card.btnName, ()=>{
            game.activeEvent = false
            if (card.effect() === undefined) return
            card.effect()
        });
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
        this.drawTitleInEW(texts);
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
    
        if(txt) ew.addTxt(texts);
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

        if (game.diceRollResultGlobal <= (valueIn)) {
            if (rolResult){
                this.drawEW('Успіх!', 'green');
                this.drawBtnInEW('next','Далі', ()=>{
                    if (trueFn) trueFn();
                    if (closeEW) this.removeAllEW()
                });
            }

            if (!rolResult){
                if (trueFn) trueFn();
                if (closeEW) this.removeAllEW()
            }
        }

        if (game.diceRollResultGlobal > valueIn && game.diceRollResultGlobal <= value) {
            this.drawEW('Провал....?');
            this.drawBtnInEW('add_resolve','Додати Рішучості', ()=>{
                const diff = game.diceRollResultGlobal - valueIn;
                game.changeResolve(-diff) ;
                this.removeLastEW()
                if (closeEW) this.removeAllEW()
                if (trueFn) trueFn();  
            });

            this.drawBtnInEW('next','Далі', ()=>{
                this.removeLastEW()
                if (closeEW) this.removeAllEW()
                if (falseFn) falseFn();
                game.changeResolve(+1);
            });
        }

        if (game.diceRollResultGlobal > value) {
            if (rolResult){
                this.drawEW('Провал!', 'red');
                this.drawBtnInEW('next','Далі', ()=>{
                    if (closeEW) this.removeAllEW()
                    if (falseFn) falseFn();
                });
                game.changeResolve(+1);
            }
            if (!rolResult){
                if (closeEW) this.removeAllEW()
                if (falseFn) falseFn();
                game.changeResolve(+1);
            }
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
            eventSection += `<div class="card" style="background-image: url('img/${card.pack}_cards/${card.pack}_${card.id}.jpg')"></div>`
        });

        element.insertAdjacentHTML('beforeend', eventSection);
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
        document.querySelector('.event-txt-container')?.remove()
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

    addBtnInEW(id, name, fn, bg, ){
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
    
}

export const ew = new EventWidows();