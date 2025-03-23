import  {ew}  from '../eventWidows.js';
import  {player}  from '../player.js';
import  {heroes}  from '../cards/heroes.js';
import  {game}  from '../game.js';

class Card {
    constructor(id, name, type, cost, effect) {
        this.id = id;  
        this.name = name;  
        this.type = type;
        this.cost = cost;  
        this.effect = effect;
        this.title = 'Обшук Склепу';  
        this.pack = 'сrypt';  
        this.btnName = 'Далі';
    };
};


function smallHealingPotion(){
    player.treasureCardContainer.push(сrypt_cards[3])
    game.drawTreasurePackCards()
    ew.removeAllEW()

    /* "трофей" Во время своего хода, 
    Вы можете сбросить эту карту, исцелив при этом 2 ранения Вашего героя. 
    Вы не можете использовать эту карту после смерти своего героя. +150 золота*/
}

function vesselWithGold(){
    player.treasureCardContainer.push(сrypt_cards[5])
    game.drawTreasurePackCards()
    ew.removeAllEW()

    /* "трофей" Вы нашли в склепе сосуд, наполненный золотыми монетами. +250 золота*/
}

function trollSmasher(){
    player.treasureCardContainer.push(сrypt_cards[6])
    game.drawTreasurePackCards()
    ew.removeAllEW()

    /* "трофей" Пока эта карта у Вас, в бою с троллем, каждая 
    TODO Ваша успешная атака наносит 2 ранения вместо 1. +500 золота*/
}

function livingDead(){
    ew.removeRawBtnInEW('btn_ew');
    let count = 0;
    let falseCount = 0;

    const trueFn = () => {
        ew.drawEW(`Вдало!`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            nextCheck();
        }, 1200);
    };

    const falseFn = () => {
        falseCount++;
        game.changeHealth(-2);
        ew.drawEW(`Ви отримали 2 поранення`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            nextCheck();
        }, 1200);
    };

    function checkParameters(txt, param) {
        ew.addDiceRollSection(`Ваша ${txt}: ${param}`, param, false, true, 2, trueFn, falseFn, false, false);
    }

    function nextCheck() {
        if (count === 0) {
            checkParameters('Удача', heroes[player.hero].luck);
            count++;
        } else if (count === 1) {
            checkParameters('Cпритність', heroes[player.hero].dexterity);
            count++;
        } else if (count === 2) {
            checkParameters('Сила', heroes[player.hero].strength);
            count++;
        } else if (count === 3) {
            if (falseCount < 3) ew.removeAllEW();
            if (falseCount === 3) {
                let txt = 'Ви не пройшли перевірку. ';
                if (heroes[player.hero].resolve > 0) {
                    heroes[player.hero].resolve -= 1;
                    txt += `</br> Ви втрачаєте 1 жетон рішучості`
                }
                ew.drawEW(txt)
                setTimeout(() => {
                    ew.removeAllEW();
                }, 1200);
            }
        } 
    }

    nextCheck();

    /* Один из мертвецов в склепе внезапно ожил и атаковал. 
    Выполните проверку Удачи, Ловкости и Силы. 
    За каждую проваленную проверку получите по 2 ранения. 
    Если все проверки провалены, сбросьте 1 жетон решимости (если есть).*/
}

function volatilePotion(){
    player.treasureCardContainer.push(сrypt_cards[8])
    game.drawTreasurePackCards()
    ew.removeAllEW()

    /* TODO Вы можете сбросить зелье в начале своего хода 
    и бросить 2d6: 
    2 - Вы погибаете; 
    3-5 - Вы получаете 4 раны; 
    6-7 - Ничего не происходит; 
    8-10 - Вы излечиваете 3 ранения; 
    11-12 - Вы полностью излечиваетесь.*/
}

function scrollOfLightness(){
    player.treasureCardContainer.push(сrypt_cards[9])
    game.drawTreasurePackCards()
    ew.removeAllEW()

    /* "трофей" 
    TODO В Комнате с Мостом, Вы можете сбросить эту карту, 
    чтобы проверка характеристик перед прохождением моста автоматически засчиталась Успешной. 
    В Комнате с Обрывом, Вы можете сбросить эту карту, 
    чтобы выйти из прохода комнаты на противоположной стороне обрыва.*/
}

function scrollOfInvisibility(){
    player.treasureCardContainer.push(сrypt_cards[10])
    game.drawTreasurePackCards()
    ew.removeAllEW()
    /* "трофей" Пытаясь убежать во время боя с монстром, 
    TODO Вы можете сбросить эту карту; 
    тогда проверка Ловкости атоматически будет считаться Успешной 
    и Вы не получите штрафных ранений за побег.*/
}

function smallSpeedPotion(){
    player.treasureCardContainer.push(сrypt_cards[11])
    game.drawTreasurePackCards()
    ew.removeAllEW()
    /* "трофей" 
    TODO Сбросив эту карту во время своего хода, 
    Вы можете совершить еще один дополнительный ход по завершении текущего. +225 золота*/
}

function goldenVessel(){
    player.treasureCardContainer.push(сrypt_cards[12])
    game.drawTreasurePackCards()
    ew.removeAllEW()
    /* "трофей" Обыскивая склеп, Вы нашли золотой сосуд. +90 золота*/
}

function goldenStatuette(){
    player.treasureCardContainer.push(сrypt_cards[13])
    game.drawTreasurePackCards()
    ew.removeAllEW()
    /* "трофей" В склепе Вы нашли красивую золотую статуэтку. +120 золота*/
}

function preciousBrooch(){
    player.treasureCardContainer.push(сrypt_cards[13])
    game.drawTreasurePackCards()
    ew.removeAllEW()
    /* "трофей" Обыскивая склеп, Вы нашли красивую брошь, наверняка весьма ценную. +170 золота*/
}

function cardShuffling(){
    game.refreshCryptCards()
    ew.removeAllEW()
    const card = game.getRundomElement(game.сrypt_cards, сrypt_cards)

    ew.drawCardEW(card);
}

const сrypt_cards = [
    /*0*/new Card(1, 'Пусто', false, false, ()=>{ew.removeAllEW()}),
    /*1*/new Card(1, 'Пусто', false, false, ()=>{ew.removeAllEW()}),
    /*2*/new Card(1, 'Пусто', false, false, ()=>{ew.removeAllEW()}),
    
    /*3*/new Card(2, 'Малое Зелье Лечения', 'treasure', 150, ()=>{smallHealingPotion()}),
    /*4*/new Card(2, 'Малое Зелье Лечения', 'treasure', 150, ()=>{smallHealingPotion()}),
    
    /*5*/new Card(3, 'Сосуд с золотом', 'treasure', 250, ()=>{vesselWithGold()}),
    /*6*/new Card(4, 'Сокрушитель Тролей', 'treasure', 500, ()=>{trollSmasher()}),
    /*7*/new Card(5, 'Оживший Мертвец', false, false, ()=>{livingDead()}),
    /*8*/new Card(6, 'Изменчивое Зелье', false, false, ()=>{volatilePotion()}),
    /*9*/new Card(7, 'Свиток Легкости', 'treasure', false, ()=>{scrollOfLightness()}),
    /*10*/new Card(8, 'Свиток Невидимости', 'treasure', false, ()=>{scrollOfInvisibility()}),
    /*11*/new Card(9, 'Малое Зелье Скорости', 'treasure', 225, ()=>{smallSpeedPotion()}),
    /*12*/new Card(10, 'Золотой Сосуд', 'treasure', 90, ()=>{goldenVessel()}),
    /*13*/new Card(11, 'Золотая Статуэтка', 'treasure', 120, ()=>{goldenStatuette()}),
    /*14*/new Card(12, 'Драгоценная Брошь', 'treasure', 170, ()=>{preciousBrooch()}),
    /*15*/new Card(13, 'Перемешивание Карт', 'event', false, ()=>{cardShuffling()}),
]

export {сrypt_cards}