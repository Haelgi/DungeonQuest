import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';
import  {ew}  from '../eventWidows.js';
import  {player}  from '../player.js';
import  {game}  from '../game.js';
import  {catacomb_cards}  from '../cards/catacomb_cards.js';

class Card {
    constructor(id, name, type, cost, effect, clickFn) {
        this.id = id;  
        this.name = name;  
        this.type = type;
        this.cost = cost;  
        this.effect = effect;
        this.clickFn = clickFn;
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
    // Когда Вы попадаете в комонату подземелья с Бездонной Ямой, 
    // либо когда вытаскиваете Карту Катакомб Дыра в Потолке, 
    // или Карту Ловушек Провал Пола, 
    // Вы можете сбросить Верёвку, чтобы автоматически успешно выполнить проверку характеристик.
}

function smallHealingPotion(){
    player.treasureCardContainer.push(deadman_cards[6])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" Во время своего хода, 
     Вы можете сбросить эту карту, 
    исцелив при этом 2 ранения Вашего героя. 
    Вы не можете использовать эту карту после смерти своего героя. 
    +150 золота*/
}

function smallHealingPotionFn(){
    ew.removeAllEW()
    const healing = 2;
    game.changeHealth(healing);
    ew.drawEW(`Ви зцілили ${healing} поранення`);
    setTimeout(() => ew.removeLastEW(), 1200);
    game.removeCurrentCardNameFromPack(player.treasureCardContainer, deadman_cards[6].name);
    game.drawTreasurePackCards()
}

function scrollOfAgility(){
    player.treasureCardContainer.push(deadman_cards[8])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" 
     Пытаясь выйти из Комнаты с Паутиною, 
     либо из Комнаты с Завалом, 
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
     Вы можете сбросить эту карту в начале своего хода 
    и взять три Карты Катакомб вместо одной, 
    после чего выбрать и разыграть одну из них, 
    а остальные две сбросить.*/
}

function scrollOfLightFn(){
    if (!player.catacomb) {
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);
            return
    }
    
    game.removeCurrentCardNameFromPack(player.treasureCardContainer, deadman_cards[9].name);
    game.drawTreasurePackCards()

    const length = 1
    let emptyFelds = []
    const cardsForChoice = [game.getRundomElement(game.catacomb_cards, catacomb_cards),
                            game.getRundomElement(game.catacomb_cards, catacomb_cards),
                            game.getRundomElement(game.catacomb_cards, catacomb_cards)]
    
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
        game.removeCurrentCardNameFromPack(player.abilitieCardContainer, deadman_cards[9].name)
        game.drawAbilitiePackCards()
        ew.drawCardEW(...emptyFelds)
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

function deadmanCurse(){
    const damage = 2;
    let txt = `Ви отримали ${damage} поранень`

    game.changeHealth(-damage)
    if (player.resolve > 0) {
        player.resolve -= 1
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

function thunderstormOfSorcerers(){
    player.treasureCardContainer.push(deadman_cards[11])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" В бою с колдуном, 
    каждая Ваша успешная атака наносит не 1, а 2 ранения. 
     По желанию Вы можете проигнорировать любой эффект Карты Колдуна. +570 золота*/
}

function medicalBook(){
    player.treasureCardContainer.push(deadman_cards[12])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" В этой книге собрано множество редких медицинских рецептов, 
    ее наверняка можно хорошо продать. +200 золота*/
}

function goldenChain(){
    player.treasureCardContainer.push(deadman_cards[13])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" На шее у скелета Вы нашли золотую цепочку. +50 золота*/
}

function poisonousAcid(){
    player.treasureCardContainer.push(deadman_cards[14])
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" Сбросьте эту карту непосредственно перед началом, 
    или во время боя с монстром, чтобы смазать ядом свое оружие. 
    В этом бою Ваши атаки наносят не 1, а 2 ранения противнику. +180 золота*/
}

function cardShuffling(){
    game.refreshDeadmanCards()
    ew.removeAllEW()
    const card = game.getRundomElement(game.deadman_cards, deadman_cards)

    ew.drawCardEW(card);

    /*Сбросьте эту карту. 
    Затем перемешайте сброшенные и неиспользованные Карты Подземелья. 
    Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/
}



const deadman_cards = [
    /*0*/new Card(1, 'Пусто', 'empty', false, ()=>{ ew.removeAllEW() /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    /*1*/new Card(1, 'Пусто', 'empty', false, ()=>{ ew.removeAllEW() /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    /*2*/new Card(1, 'Пусто', 'empty', false, ()=>{ ew.removeAllEW() /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    
    /*3*/new Card(2, 'Веревка', 'treasure', false, ()=>{rope()}),
    /*4*/new Card(2, 'Веревка', 'treasure', false, ()=>{rope()}),
    /*5*/new Card(2, 'Веревка', 'treasure', false, ()=>{rope()}),
    
    /*6*/new Card(3, 'Малое Зелье Лечения', 'treasure', 150, ()=>{smallHealingPotion()}, smallHealingPotionFn),
    /*7*/new Card(3, 'Малое Зелье Лечения', 'treasure', 150, ()=>{smallHealingPotion()}, smallHealingPotionFn),
    
    /*8*/new Card(4, 'Свиток Проворства', 'treasure', false, ()=>{scrollOfAgility()}),
    /*9*/new Card(5, 'Свиток Света', 'treasure', false, ()=>{scrollOfLight()}, scrollOfLightFn),
    /*10*/new Card(6, 'Проклятие Мертвеца', 'event', false, ()=>{deadmanCurse()}),
    /*11*/new Card(7, 'Гроза Колдунов', 'treasure', 570, ()=>{thunderstormOfSorcerers()}),
    /*12*/new Card(8, 'Медицинская Книга', 'treasure', 200, ()=>{medicalBook()}),
    /*13*/new Card(9, 'Золотая Цепочка', 'treasure', 50, ()=>{goldenChain()}),
    
    /*14*/new Card(10, 'Ядовитая Кислота', 'treasure', 180, ()=>{poisonousAcid()})
]

export {deadman_cards}
