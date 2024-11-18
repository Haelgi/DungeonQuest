import  {game}  from './game.js';

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
        document.getElementById(id).remove()
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

}

export const ew = new EventWidows();