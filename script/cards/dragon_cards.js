import  {ew}  from '../eventWidows.js';
import  {treasure_cards}  from './treasure_cards.js';
import  {game}  from '../game.js';
import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';

class Card {
    constructor(id, name, effect) {
        this.id = id;  
        this.name = name;  
        this.effect = effect;
        this.title = 'Перевірка Удачі';  
        this.pack = 'dragon';  
        this.btnName = 'Далі';
    };
};

function dragonSleep(){
    ew.removeAllEW()

    const cards = [game.getRundomElement(game.treasure_cards, treasure_cards),
                   game.getRundomElement(game.treasure_cards, treasure_cards)]

    game.distributionCards(cards)

    ew.drawEW('Скарбниця')
    ew.addPackCards(cards)
    addScrolCardsEffect('.event-deck-container', false)
    ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})


    /*Тяните 2 Карты Сокровищ. 
    В свой следующий ход Вы можете либо покинуть Сокровищницу, 
    либо остаться и вытянуть еще одну Карту Дракона.*/
}

const dragon_cards = [
    new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    
    new Card(2, 'Ярость Дракона', ()=>{ew.removeAllEW() /*Сбросьте все свои добытые в Сокровищнице Трофеи. Бросьте 2d6 и получите количество ранений, эквивалентное результату. Потом все остальные игроки в Сокровищнице испытывабт на себе описанный выше эффект. Замешайте все сброшенные Карты Дракона (эту включительно) обратно в колоду Карт Дракона.*/}),
]

export {dragon_cards}


// TODO закодировать функции карт Дверей