import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';
import  {game}  from '../game.js';
import  {ew}  from '../eventWidows.js';
import  {player}  from '../player.js';
import  {heroes}  from '../cards/heroes.js';
import {trap_cards} from './trap_cards.js';
import  {monster_cards}  from './monster_cards.js';

class Card {
    constructor(id, name, type, cost, effect) {
        this.id = id;  
        this.name = name;  
        this.type = type;
        this.cost = cost;
        this.effect = effect;
        this.btnName = 'Далі';
        this.title = 'Події Катакомб';  
        this.pack = 'catacomb';    
    };
};

function hiddenTrap(){
    ew.removeAllEW()

    ew.drawCardEW(game.getRundomElement(game.trap_cards, trap_cards))

    /*По своей неосторожности Вы активировали ловушку. 
    Тяните Карту Ловушки.*/
}

function holeInCeiling(){
    ew.removeRawBtnInEW('btn_ew')

    function trueFn(){
        player.holeInCeiling = false
        ew.escapeCatacombEW()
    }

    function falseFn(){
        player.catacombCardContainer.push(catacomb_cards[20])
        player.holeInCeiling = true
        ew.drawEW(`Ви не пройшли перевірку`)
        setTimeout(() => {
            ew.removeAllEW()
        }, 2000);
    }

    ew.addDiceRollSection( `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true, 2, trueFn, falseFn, false, false)

    player.treasureCardContainer.forEach((card, id) => {

        if(card.pack === 'deadman' && card.id === 2 ){
            
            const rope = ()=>{
                ew.drawCardEW(card)
                ew.removeTitile()
                ew.removeRawBtnInEW('btn_ew')
    
                ew.drawBtnInEW('btn_next','Використати Мотузку', ()=>{
                    player.treasureCardContainer.pop(id,1)
                    ew.removeAllEW()
                    ew.escapeCatacombEW()
                })
    
                ew.drawBtnInEW('btn_close','Назад', ()=>{
                    ew.removeLastEW()
                    ew.removeRawBtnInEW('btn_rope')
                    ew.drawBtnInEW('btn_rope','Використати Мотузку', rope)
                })
            }
    
            ew.drawBtnInEW('btn_rope','Використати Мотузку', rope)
        }
    });

    /*Выполните проверку Ловкости. 
    Если проверка Успешна, то Вы можете покинуть Катакомбы. 
    Если проверка провалена, можете повторить проверку в свой следующий ход вместо того, чтобы взять новую Карту Катакомб. 
    Если у Вас есть Верёвка, то можете сбросить её и автоматически Успешно пройти проверку.*/
}

function doorWithRiddle(){
    ew.removeRawBtnInEW('btn_ew')
    
    const trueFn = ()=> {
        player.catacombCardContainer.forEach((card, id)=>{
            if(card.pack === 'catacomb' && card.id === 5 ) {
                player.catacombCardContainer.splice(id,1)
            }
        })

        ew.removeAllEW()
        ew.escapeCatacombEW()
    }

    const falseFn = ()=> {
        ew.removeAllEW()
        player.catacombCardContainer.push(catacomb_cards[22])
        game.endMove()
    }

    function luck(){
        ew.clear()
        ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn, falseFn)
    }

    player.catacombCardContainer.forEach((card)=>{
        if(card.pack === 'catacomb' && card.id === 5 ) {
            ew.drawBtnInEW('btn_close','Далі', ()=>{ew.removeAllEW()})
        }
    })

    ew.drawBtnInEW('btn_luk','Перевірити Удачу',luck)

    /*Вы стоите перед закрытой дверью. 
    Чтобы открыть замок, необходимо решить головоломку. 
    Проведите проверку Удачи. 
    В случае успеха Вы можете покинуть Катакомбы, иначе Ваш ход заканчивается. 
    В свой следующий ход Вы можете провести проверку Удачи еще раз, вместо того, чтобы тянуть Карту Катакомб.*/
}

function enchantedRoots(){
    let count = 3
    let countFalse = 3
    let damage = 2

    const trueFn = ()=> {
        if(count <= 0){
            ew.drawEW('Ви змогли виплутатись')
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
            return
        }

        count -= 1

        ew.drawEW('Вдало')
        setTimeout(() => {
            ew.removeLastEW()
            strength()
        }, 1200);
    }

    const falseFn = ()=> {
        if(count <= 0 && countFalse <= 0) damage = 1
        count -= 1
        countFalse -= 1
        game.changeHealth(- damage)

        ew.drawEW('Провал')
        setTimeout(() => {
            ew.removeLastEW()
            strength()
        }, 1200);
    }

    function strength(){
        ew.clear()
        ew.addDiceRollSection(`Ваша Сила : ${heroes[player.hero].strength}`, heroes[player.hero].strength, false,true, 2, trueFn, falseFn, false, false)
    }

    strength()

     /*Вас опутали заколдованные корни. 
     Чтобы вырваться, выполните 3 проверки Силы подряд. 
     Получите по 2 ранению за каждую проваленную проверку. 
     Если все 3 проверки были провалены, продолжайте выполнять проверку Силы и получать по 1 ранению за ее провал до первого Успеха. 
     Потом сбросьте эту карту.*/
}

function hailOfArrows(){

    const trueFn = ()=> {
        ew.drawEW('Ви захистилися та вбили нападника')
        setTimeout(() => {
            ew.removeAllEW()
            game.endMove()
        }, 1200);

    }

    const falseFn = ()=> {
        ew.removeAllEW()
        const cards = [game.getRundomElement(game.monster_cards, monster_cards),
            game.getRundomElement(game.monster_cards, monster_cards)]
        const sumPenalty = cards[0].penalty + cards[1].penalty

        game.changeHealth(-sumPenalty)
        
        ew.drawEW('Напад монстрів')
        ew.addPackCards(cards)
        ew.addTxt(`Ви ухилилися від стріл і за вами погналися монстри.<br>Вам вдалося втекти, але ви отримали ${sumPenalty} поранення`)
        ew.drawBtnInEW('btn_next', 'Далі', ()=>{ew.removeAllEW()});
        addScrolCardsEffect('.event-deck-container', false)
    }

    ew.removeRawBtnInEW('btn_ew')
    ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn, falseFn, false, false)


    /*Монстр атакует Вас из лука. 
    Выполните проверку Удачи. 
    В случае успеха Вы защитились и убили нападавшего; Ваш ход заканчивается. 
    Если проверка провалена, вытащите две Карты Монстра 
    и получите количество ранений, эквивалентное сумме штрафоф за побег на каждой из них. 
    Потом сбросьте их.*/
}

const catacomb_cards = [
    /*0*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    /*1*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    /*2*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    /*3*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    /*4*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    /*5*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    /*6*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    /*7*/new Card(1, 'Пусто', false, false, ()=>{ ew.removeAllEW() }),
    
    /*8*/new Card(2, 'Выход', false, false, ()=>{ ew.escapeCatacombEW()}),
    /*9*/new Card(2, 'Выход', false, false, ()=>{ ew.escapeCatacombEW()}),
    /*10*/new Card(2, 'Выход', false, false, ()=>{ ew.escapeCatacombEW()}),
    /*11*/new Card(2, 'Выход', false, false, ()=>{ ew.escapeCatacombEW()}),
    /*12*/new Card(2, 'Выход', false, false, ()=>{ ew.escapeCatacombEW()}),
    /*13*/new Card(2, 'Выход', false, false, ()=>{ ew.escapeCatacombEW()}),
    
    /*14*/new Card(3, 'Скрытая Ловушка', false, false, ()=>{hiddenTrap()}),
    /*15*/new Card(3, 'Скрытая Ловушка', false, false, ()=>{hiddenTrap()}),
    /*16*/new Card(3, 'Скрытая Ловушка', false, false, ()=>{hiddenTrap()}),
    /*17*/new Card(3, 'Скрытая Ловушка', false, false, ()=>{hiddenTrap()}),
    /*18*/new Card(3, 'Скрытая Ловушка', false, false, ()=>{hiddenTrap()}),
    /*19*/new Card(3, 'Скрытая Ловушка', false, false, ()=>{hiddenTrap()}),
    
    /*20*/new Card(4, 'Дыра в Потолке', false, false, ()=>{holeInCeiling()}),
    /*21*/new Card(4, 'Дыра в Потолке', false, false, ()=>{holeInCeiling()}),
    
    /*22*/new Card(5, 'Дверь с Загадкой', false, false, ()=>{doorWithRiddle()}),
    /*23*/new Card(6, 'Заколдованные Корни', false, false, ()=>{enchantedRoots()}),
    /*24*/new Card(7, 'Град Стрел', false, false, ()=>{ hailOfArrows()}),
    /*25*/new Card(8, 'Гигантская Крыса', false, false, ()=>{ew.removeAllEW() /*На Вас напала гигантская крыса с количеством здоровья 3. Выполните проверку Защиты. Если проверка пройдена, Ваш противник получает 1 ранение, иначе 1 ранение получаете Вы. Продолжайте выполнять проверку Защиты до тех пор, пока Вы или гигантская крыса не погибнете.*/}),
    /*26*/new Card(9, 'Восставшие Мертвецы', false, false, ()=>{ew.removeAllEW() /*Вас начали предпринимать восстания из гробов мертвецов. Выполните проверку Силы. Если проверка не удалась, найдите количество ранений, эквивалентное количество оставшихся в Вас очках жизни, деленному на 2 (округлите результат деления, если необходимо, в большую сторону).*/}),
    
    /*27*/new Card(10, 'Теневой Убийца', false, false, ()=>{ew.removeAllEW() /*Сохраните эту карту. Пока она у Вас, в конце каждого своего хода (этого включительно) бросьте 1d6: 1-2 - Вы получаете 2 ранения; 3-4 - Вы получаете 1 ранение; 5-6 - Вы убиваете теневого убийцу и сбрасываете эту карту.*/}),
    /*28*/new Card(11, 'Монстр из Темноты', false, false, ()=>{ew.removeAllEW() /*Из темноты на Вас напал монстр, начался бой. Проведите проверку Удачи, не используя жетоны решимости. В случае успеха получите 1 ранение. В случае провала получите 6 ранений.*/}),
    /*29*/new Card(12, 'Капкан', false, false, ()=>{ew.removeAllEW() /*Выполните проверку Удачи. В случае успеха Вас защитили доспехи и Вы получаете 1 ранение. Если проверка провалена, получите 4 ранения от попадания в капкан и пропустите свой следующий ход. Чтобы не пропускать следующий ход, Вы можете сбросить один из своих Трофеев.*/}),
    /*30*/new Card(13, 'Скорпион', false, false, ()=>{ew.removeAllEW() /*Вас ужалил скорпион. Бросьте 1d6 и получите коичество ранений, эквивалентное результату.*/}),
    /*31*/new Card(14, 'Липкая Паутина', false, false, ()=>{ew.removeAllEW() /*Сохраните эту карту. Вы попали в липкую паўтину и пытаетесь освободиться, не потревожив паука. Пока карта у Вас, в начале каждого своего хода выполняйте проверку Удачи. Если проверка Успешна, сбросьте эта карту, продолжив свой ХОД в обычном порядке, иначе получите 1 ранение и закончите свой ход. Вы также можете вырваться из паўтины, потревожив паука и сбросив эту карту, не выполняя проверку Удачи. Тогда Вы получаете 4 ранения от паўчьего укуса.*/}),
    /*32*/new Card(15, 'Бритвокрыл', false, false, ()=>{ew.removeAllEW() /*На Вас внезапно напал бритвокрыл. Бросьте 1d6, добавьте к выпавшему числу 1 и получите количество ранений, эквивалентное результату.*/}),
    /*33*/new Card(16, 'Темный Эльф', false, false, ()=>{ew.removeAllEW() /*Вы можете сбросить любой из Ваших Трофеев в качестве взятки и бросить 1d6, умножив результат броска на 100. Если полученное число меньше стоимости сброшенного Трофея, Вы можете покинуть Катакомбы. Иначе темный эльф Вас атакует и Вы получите 4 ранения.*/}),
    /*34*/new Card(17, 'Удар из Тени', false, false, ()=>{ew.removeAllEW() /*Вас атаковал поджидавший в тени убийца. Выполните проверку Удачи. В случае успеха, Вы Убиваете врага и заканчиваете свой ход. В противном случае, отнимите от 10 количество Вашей Защиты и получите число ранений, эквивалентное результату.*/}),
    /*35*/new Card(18, 'Щупальца', false, false, ()=>{ew.removeAllEW() /*Вас атаковали гигантские щупальца. Выполните проверку Удачи. В случае успеха Вы смогли Увернуться и остаться невредимым; Ваш ход заканчивается. В противном случае щупальца хватают Вас. Чтобы выжить и освободиться, Вы должны сбросить 1 свой Трофей на выбор (если есть) и получить 4 ранения.*/}),
    /*36*/new Card(19, 'Нападение Разбойника', false, false, ()=>{ew.removeAllEW() /*Вы попали в засаду разбойника. Бросьте 1d6: 1-2 - От удара Вы потеряли сознание, получите 4 ранения, случайным образом выберете 2 своих трофея (если нет 2, то сколько осталось) и сбросьте их; 3-4 - Вас ранили, но Вы сумели отогнать грабителя; получите 3 ранения. 5-6 - Вы убили врага и остались целы.*/}),
    
    /*37*/new Card(20, 'Ужасный Паук', false, false, ()=>{ew.removeAllEW() /*На Вас напал ужасный паўқ. Бросьте 1d6: 1-3 - Вы получаете 2 ранения и продолжаете бой; 4-6 - Вы получаете 2 ранения и убиваете паўка. Продолжайте бросать 1d6, пока, в течении Вашего хода, Вы или паўқ не погибнете. Сбросьте эту карту если паук убит.*/}),
    /*38*/new Card(21, 'Вампир', false, false, ()=>{ew.removeAllEW() /*Выполните проверку Ловкости или Защиты (в зависимости от того, что меньше). В случае провала, получите 1 ранение и сохраните эту карту. Пока эта карта у Вас, в начале каждого своего хода получите 1 ранение и продолжайте ход в обычном порядке. Сбросьте эту карту, если Вы покинули Катакомбы.*/}),
    /*39*/new Card(22, 'Ядовитая Змея', false, false, ()=>{ew.removeAllEW() /*Вы потревожили ядовитую змею. Она попыталась Вас укусить. Чтобы определить количество ранений, Выберите одну из характеристик Вашего героя и выполните столько ее проверок, какова величина самой характеристики. Получите по 1 ранению за каждую проваленную проверку.*/}),
    /*40*/new Card(23, 'Атака Колдуна', false, false, ()=>{ew.removeAllEW() /*Колдун запустил в Вас магический огненный шар и сбежал. Выполните проверку Удачи. В случае успеха Вы смогли защититься; завершите свой ход. В случае неудачи добавьте 1 к числу, на которое была провалена проверка и полуите количество ранений, эквивалентное результату сложения.*/}),
    /*41*/new Card(24, 'Орда Крыс', false, false, ()=>{ew.removeAllEW() /*Вы натолкнулись на огромную стаю отвратительных крыс. Выполните проверку Защиты. Если Вы провалили проверку, то добавьте 1 к числу, на которое была провалена проверка и получите колочество ранений, эквивалентное результату.*/}),
    /*42*/new Card(25, 'Яд Паука', false, false, ()=>{ew.removeAllEW() /*Вас укусил ядовитый паўқ. Пока Вы находитесь в Катакомбах, в начале каждого своего хода бросьте 1d6: 1-3 - Вы получаете 2 ранение; 4-6 - Ничего не происходит, продолжайте свой ход в обычном порядке.*/}),
    /*43*/new Card(26, 'Нага', false, false, ()=>{ew.removeAllEW() /*Проход блокирован гигантским Нагом. Рассчитайте точку выхода из Катакомб и поместите Маркер Путешествия в эту область, развернув его на 180°. Сбросьте Нагу и все собранные Карты Катакомб (кроме Трофеев). В свой следующий ход тяните Карту Катакомб в обычном порядке.*/}),
    /*44*/new Card(27, 'Факел Гаснет', false, false, ()=>{ew.removeAllEW() /*Сохраните эту карту. Факел погас. В начале каждого своего последующего хода выполните проверку Удачи, чтобы снова зажечь его. Если проверка прошла успешно, то сбросьте эту карту и продолжайте ход в обычном порядке. Если Вы провалили проверку, то Ваш ход тут же заканчивается.*/}),
    /*45*/new Card(28, 'Алхимик', false, false, ()=>{ew.removeAllEW() /*Вы набрели на лабораторию Алхимика. С ним можно заключить одну из сделок: 1) Обменять 4 очка жизни на сокровище (получите 4 ранения и тяните Карту Сокровища). 2) Обменять одно из своих сокровищ на очки здоровья. (Разделите нацело стоимость выбранного сокровища на 400, округлив в меньшую сторону, и исцелите количество ранений, эквивалентное результату. Сокровище сбрасывается и замешивается в Колоду Сокровищ).*/}),
    /*46*/new Card(29, 'Гигантский Алмаз', false, false, ()=>{ew.removeAllEW() /*"трофей" +4000 золотых*/}),
    
    /*47*/new Card(30, 'Шкатылка с Золотом', false, false, ()=>{ew.removeAllEW() /* "трофей" Когда Вы покинули Подземелье Дракона, бросьте 1d6. Вы находите в шкатулке количество золота, эквивалентное результату броска, умноженному на 100.*/}),
    /*48*/new Card(31, 'Молот Мощи', false, false, ()=>{ew.removeAllEW() /* "трофей" Пока эта карта у Вас, в бою с големом, каждая Ваша успешная атака наносит 2 ранения вместо 1.*/}),
    /*49*/new Card(32, 'Перемешивание Карт', false, false, ()=>{ew.removeAllEW() /*Сбросьте эту карту. Затем перемешайте сброшенные и неиспользованные Карты Катакомб. Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/}),
]

export {catacomb_cards}

// TODO закодировать функции карт катакомб