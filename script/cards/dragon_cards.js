import  {ew}  from '../eventWidows.js';
import  {treasure_cards}  from './treasure_cards.js';
import  {game}  from '../game.js';
import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';
import { player } from '../player.js';

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

    if (player.extraDragonCard > 0) {
        ew.drawEW('Ви повинні витягнути ще одну карту дракона')
        setTimeout(() => {
            ew.removeAllEW()
            player.extraDragonCard -= 1
            const card = game.getRundomElement(game.dragon_cards, dragon_cards)
            ew.drawCardEW(card)
        }, 1200);
        return
    }
    
    
    const cards = [game.getRundomElement(game.treasure_cards, treasure_cards),
                   game.getRundomElement(game.treasure_cards, treasure_cards)]

    game.distributionCards(cards)
    player.positionTreasuryCards.push(...cards)

    ew.drawEW('Скарбниця')
    ew.addPackCards(cards)
    addScrolCardsEffect('.event-deck-container', false)
    ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})


    /*Тяните 2 Карты Сокровищ. 
    В свой следующий ход Вы можете либо покинуть Сокровищницу, 
    либо остаться и вытянуть еще одну Карту Дракона.*/
}

function dragonsFury(){

    // TODO для многопользовательской игры добавить код ключ для действия на всех игроков
    
    
    ew.clear()

    const normalBehavior = ()=>{
        const damage = game.diceRollResultGlobal
        
        game.changeHealth(-damage)
        
        player.treasureCardContainer = game.subtractArrays(player.treasureCardContainer, player.positionTreasuryCards, "name")
        game.drawTreasurePackCards()
    
        player.positionTreasuryCards = [];
        ew.drawEW(`Ви отримали ${damage} поранення, та втратили скарби`)
        setTimeout(() => {
            ew.removeAllEW()
            if (player.hero == 'knight') {
                game.changeHealth(1)
                ew.drawEW(`Ви зцілили 1 поранення`)
                setTimeout(() => ew.removeLastEW, 1200);
            }
        }, 2000);
    }

    const dragonFighter = ()=>{
        if (game.diceRollResultGlobal>7) {
            const damage = game.diceRollResultGlobal - 7
        
            game.changeHealth(-damage)
            
            player.treasureCardContainer = game.subtractArrays(player.treasureCardContainer, player.positionTreasuryCards, "name")
            game.drawTreasurePackCards()
        
            player.positionTreasuryCards = [];
            ew.drawEW(`Ви отримали ${damage} поранення, та втратили скарби`)
            setTimeout(() => {
                ew.removeAllEW()
                game.changeHealth(1)
                ew.drawEW(`Ви зцілили 1 поранення`)
                setTimeout(() => ew.removeLastEW, 1200);
            }, 2000);
        }

        if (game.diceRollResultGlobal<=7
            && game.diceRollResultGlobal>=5){
                player.treasureCardContainer = game.subtractArrays(player.treasureCardContainer, player.positionTreasuryCards, "name")
                game.drawTreasurePackCards()
            
                player.positionTreasuryCards = [];
                ew.drawEW(`Ви не отримали поранення, але втратили скарби`)
                setTimeout(() => {
                    ew.removeAllEW()
                    game.changeHealth(1)
                    ew.drawEW(`Ви зцілили 1 поранення`)
                    setTimeout(() => ew.removeLastEW, 1200);
                }, 2000);
        }

        if (game.diceRollResultGlobal<=4){
                ew.drawEW(`Ви не отримали поранення, та зберігли скарби`)
                setTimeout(() => {
                    ew.removeAllEW()
                }, 2000);
        }
    }

    const ifDragonFighter = ()=>{
        if (!game.checkCardNameInPack(player.abilitieCardContainer, 'Борец с Драконом')) return normalBehavior()
        dragonFighter()    
    }
    
    const result = ()=>{
        ifDragonFighter()
    }

    ew.addDiceRollSection(false, 12, false, true, 2, result, false, true, true)

     /*Сбросьте все свои добытые в Сокровищнице Трофеи. 
     Бросьте 2d6 и получите количество ранений, эквивалентное результату. 
     Потом все остальные игроки в Сокровищнице испытывабт на себе описанный выше эффект. 
     Замешайте все сброшенные Карты Дракона (эту включительно) обратно в колоду Карт Дракона.*/
}

const dragon_cards = [
    /*0*/new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    /*1*/new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    /*2*/new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    /*3*/new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    /*4*/new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    /*5*/new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    /*6*/new Card(1, 'Дракон Спит', ()=>{dragonSleep()}),
    
    /*7*/new Card(2, 'Ярость Дракона', ()=>{dragonsFury()})
]

export {dragon_cards}
