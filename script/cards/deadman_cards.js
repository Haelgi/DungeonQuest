import  {ew}  from '../eventWidows.js';
import  {player}  from '../player.js';
import  {game}  from '../game.js';
import  {heroes}  from '../cards/heroes.js';

class Card {
    constructor(id, name, type, cost, effect) {
        this.id = id;  
        this.name = name;  
        this.type = type;
        this.cost = cost;  
        this.effect = effect;
        this.title = 'Обшук мерця';  
        this.pack = 'deadman';
        this.btnName = 'Далі';          
    };
};

function rope(){
    player.treasureCardContainer.push(deadman_cards[3])
    game.drawTreasurePackCards()
    ew.removeAllEW();

    // "трофей" Вы нашли верёвку. 
    //TODO Когда Вы попадаете в комонату подземелья с Бездонной Ямой, 
    //TODO либо когда вытаскиваете Карту Катакомб Дыра в Потолке, 
    //TODO или Карту Ловушек Провал Пола, 
    //TODO Вы можете сбросить Верёвку, чтобы автоматически успешно выполнить проверку характеристик.
}

function smallHealingPotion(){
    player.treasureCardContainer.push(deadman_cards[6])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" Во время своего хода, 
    TODO Вы можете сбросить эту карту, 
    исцелив при этом 2 ранения Вашего героя. 
    Вы не можете использовать эту карту после смерти своего героя. 
    +150 золота*/
}

function scrollOfAgility(){
    player.treasureCardContainer.push(deadman_cards[8])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" 
    TODO Пытаясь выйти из Комнаты с Паутиною, 
    TODO либо из Комнаты с Завалом, 
    Вы можете сбросить эту карту вместо того, чтобы выполнять проверку характеристик. 
    Тогда, не выполняя проверку характеристик, 
    Вы можете выйти через любой из проходов комнаты на Ваш выбор.*/
}

function scrollOfLight(){
    player.treasureCardContainer.push(deadman_cards[9])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" Вы нашли свиток света. 
    Находясь в Катакомбах, 
    TODO Вы можете сбросить эту карту в начале своего хода 
    и взять три Карты Катакомб вместо одной, 
    после чего выбрать и разыграть одну из них, 
    а остальные две сбросить.*/
}

function deadmanCurse(){
    const damage = 2;
    let txt = `Ви отримали ${damage} поранень`

    game.changeHealth(-damage)
    if (heroes[player.hero].resolve > 0) {
        heroes[player.hero].resolve -= 1
        txt += ` і втратили 1 жетон рішучості`
    }

    ew.drawEW(txt)
    setTimeout(() => {
        ew.removeAllEW()
    }, 2000);
    /* Потревожив останки, 
    Вы стали жертвой проклятия. 
    Вы чувствуете потерю жизненной силы. 
    Получите 2 ранения и сбросьте 1 жетон решимости (если есть).*/
}


const deadman_cards = [
    /*0*/new Card(1, 'Пусто', 'empty', false, ()=>{ ew.removeAllEW() /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    /*1*/new Card(1, 'Пусто', 'empty', false, ()=>{ ew.removeAllEW() /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    /*2*/new Card(1, 'Пусто', 'empty', false, ()=>{ ew.removeAllEW() /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    
    /*3*/new Card(2, 'Веревка', 'treasure', false, ()=>{rope()}),
    /*4*/new Card(2, 'Веревка', 'treasure', false, ()=>{rope()}),
    /*5*/new Card(2, 'Веревка', 'treasure', false, ()=>{rope()}),
    
    /*6*/new Card(3, 'Малое Зелье Лечения', 'treasure', 150, ()=>{smallHealingPotion()}),
    /*7*/new Card(3, 'Малое Зелье Лечения', 'treasure', 150, ()=>{smallHealingPotion()}),
    
    /*8*/new Card(4, 'Свиток Проворства', 'treasure', false, ()=>{scrollOfAgility()}),
    /*9*/new Card(5, 'Свиток Света', 'treasure', false, ()=>{scrollOfLight()}),
    /*10*/new Card(6, 'Проклятие Мертвеца', 'event', false, ()=>{deadmanCurse()}),
    /*11*/new Card(7, 'Гроза Колдунов', 'treasure', 570, ()=>{ ew.removeAllEW() /* "трофей" В бою с колдуном, каждая Ваша успешная атака наносит не 1, а 2 ранения. По желанию Вы можете проигнорировать любой эффект Карты Колдуна. +570 золота*/}),
    /*12*/new Card(8, 'Медицинская Книга', 'treasure', 200, ()=>{ ew.removeAllEW() /* "трофей" В этой книге собрано множество редких медицинских рецептов, ее наверняка можно хорошо продать. +200 золота*/}),
    /*13*/new Card(9, 'Золотая Цепочка', 'treasure', 50, ()=>{ ew.removeAllEW() /* "трофей" На шее у скелета Вы нашли золотую цепочку. +50 золота*/}),
    
    /*14*/new Card(10, 'Ядовитая Кислота', 'treasure', 180, ()=>{ ew.removeAllEW() /* "трофей" Сбросьте эту карту непосредственно перед началом, или во время боя с монстром, чтобы смазать ядом свое оружие. В этом бою Ваши атаки наносят не 1, а 2 ранения противнику. +180 золота*/}),
    /*15*/new Card(11, 'Перемешивание Карт', 'event', false, ()=>{ ew.removeAllEW() /*Сбросьте эту карту. Затем перемешайте сброшенные и неиспользованные Карты Подземелья. Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/}),
]

export {deadman_cards}

// TODO закодировать функции карт мертвецов