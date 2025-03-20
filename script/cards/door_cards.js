import  {ew}  from '../eventWidows.js';
import  {game}  from '../game.js';
import  {player}  from '../player.js';
import  {heroes}  from '../cards/heroes.js';

class Card {
    constructor(id, name, effect) {
        this.id = id;  
        this.name = name;  
        this.effect = effect;
        this.title = 'Перевірка дверей';  
        this.pack = 'door';  
        this.btnName = 'Далі'
    };
};

function lockedDoor(){
    ew.removeAllEW();
    game.endMove();
    /*Дверь не открывается; оставайтесь в Вашей текущей комнате.*/
}

function greedyGoblin(){
    ew.removeRawBtnInEW('btn_ew');

    function discardTheCard(){
        const randomId = Math.floor(Math.random() * maxValue);
                    
        player.treasureCardContainer.splice(randomId, 1);
        
        ew.drawEW(`Гоблін поранив Вас (ви отримали ${damage} поранення), вкрав один із скарбів та втік`);
        setTimeout(() => {ew.removeAllEW()}, 2000);
    };

    if(player.treasureCardContainer.length > 0){
        ew.addBtnInEW('discard', 'Віддати Трофей', discardTheCard);

        ew.addBtnInEW('stay', 'НЕ віддавати Трофей', ()=>{
            ew.removeAllEW();
            game.endMove();
        });
    }

    if(player.treasureCardContainer.length === 0){
        ew.addBtnInEW('stay', 'Ти не маєш Трофеїв', ()=>{
            ew.removeAllEW();
            game.endMove();
        });
    }

    /*С противоположной стороны дверь заблокировал гоблин. 
    Он готов открыть дверь в обмен на Трофей. 
    Чтобы открыть дверь, сбросьте случайным образом один из своих Трофеев; 
    иначе закончите свой ход в текущей комнате.*/
}

function enchantedDoor(){

    const damage = 1

    ew.drawEW(`Ви отримали ${damage} поранення`)
    setTimeout(() => {
        ew.removeAllEW()
    }, 1200);

    game.changeHealth(-damage)

    /*Когда Вы протянули руку, чтобы открыть дверь, 
    она внезапно распахнулась, ударив Вас по голове с большой силой. 
    Получите 1 ранение и останьтесь в текущей комнате.*/
}

function jetOfFire(){

    const result = ()=>{ 
        const result = game.diceRollResultGlobal
        const index = player.choiceNumber.indexOf(result);
        if (index === -1) {
            game.changeHealth(-1)
            ew.drawEW(`Ви отримали 1 поранення`)
            setTimeout(() => {
                ew.removeLastEW()
                battle()
            }, 2000);
        } else {
            ew.drawEW(`Ви змогли ухилитись!`)
            setTimeout(() => {
                ew.removeAllEW();
                game.endMove();
            }, 2000);
        }

    }

    function battle() {
        ew.clear()
        ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
    }

    ew.removeRawBtnInEW('btn_ew');
    ew.addTxt('Виберіть ДВА числа від 1 до 6:');
    ew.addNumberSectionForChoice();
    ew.addBtnInEW('btnChoice', 'Вибрати', ()=>{
        ew.removeTxt();
        ew.removeNumberSectionForChoice();
        ew.removeRawBtnInEW('btnChoice');
        battle();
    });

    /*Когда Вы попытались открыть дверь, с отверстия в стене вылетела струя огня. 
    Загадайте два числа от 1 до 6. 
    Бросайте 116 до тех пор, пока не выпадет одно из загаданных чисел. 
    Получите количество ранений, эквивалентное количеству сделанных бросков кубика. 
    Оставайтесь в текущей комнате и завершите свой ход.*/
}

function thornsFromTheFloor(){
    ew.removeRawBtnInEW('btn_ew');

    let damage = 0;

    const trueFn = ()=>{
        ew.drawEW(`Ви змогли ухилитись!`)
        setTimeout(() => {
            ew.removeAllEW();
            game.endMove();
        }, 2000);
    }

    const falseFn = ()=>{
        game.changeHealth(-damage)
        ew.drawEW(`Ви отримали ${damage} поранення!`)
            setTimeout(() => {
                ew.removeAllEW();
                game.endMove();
            }, 2000);  
    }

    function check( nameValue, value) {
        damage = value;
        ew.removeRawBtnInEW('btn_strength')
        ew.removeRawBtnInEW('btn_dexterity')
        ew.removeRawBtnInEW('btn_defense')
        ew.removeRawBtnInEW('btn_luck')

        ew.addDiceRollSection( `${nameValue}: ${value}`, value, false, true, 2, trueFn, falseFn, false, true)
    }

    ew.removeRawBtnInEW('btn_ew')
    ew.drawBtnInEW('btn_strength', 'Перевірити Силу', ()=>{check('Ваша Сила',heroes[player.hero].strength)})
    ew.drawBtnInEW('btn_dexterity', 'Перевірити Спритність', ()=>{check('Ваша Спритність',heroes[player.hero].dexterity)})
    ew.drawBtnInEW('btn_defense', 'Перевірити Захист', ()=>{check('Ваш Захист',heroes[player.hero].defense)})
    ew.drawBtnInEW('btn_luck', 'Перевірити Удачу', ()=>{check('Ваш Удача',heroes[player.hero].luck)})

    /*Когда Вы попытались открыть дверь, с отверстий в полу выдвинулись шипы. 
    Выберите любую характеристику своего персонажа и выполните ее проверку. 
    Если проверка провалена, получите количество ранений, эквивалентное величине выбранной характеристики. 
    Не зависимо от успеха проверки, оставайтесь в текущей комнате и завершите свой ход.*/
}

function deadlyArrows(){
    ew.removeRawBtnInEW('btn_ew');

    const trueFn = ()=>{
        const damage = game.diceRollResultGlobal
        game.changeHealth(-damage) 
        ew.drawEW(`Ви отримали ${damage} поранення`);
        ew.drawBtnInEW('btn_next', 'Далі', ()=>{ew.removeAllEW()});
    }
    
    ew.addDiceRollSection( false, 6, false, false,1, trueFn, false, false, false)

    /*Когда Вы открывали дверь, с отверстий в стене полетели стрелы. 
    Бросьте 1d6 и получите количество ранений, эквивалентное результату; 
    оставайтесь в текущей комнате и завершите свой ход.*/
}

function cardShuffling(){
    game.refreshDoorCards()
    ew.removeAllEW()
    const card = game.getRundomElement(game.door_cards, door_cards)
    
    ew.drawCardEW(card);

    /*Сбросьте эту карту. 
    Затем перемешайте сброшенные и неиспользованные Карты Дверей. 
    Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/
}

const door_cards = [
    /*0*/new Card(1, 'Дверь Открылась', ()=>{ew.removeAllEW()}),
    /*1*/new Card(1, 'Дверь Открылась', ()=>{ew.removeAllEW()}),
    /*2*/new Card(1, 'Дверь Открылась', ()=>{ew.removeAllEW()}),
    /*3*/new Card(1, 'Дверь Открылась', ()=>{ew.removeAllEW()}),
    /*4*/new Card(1, 'Дверь Открылась', ()=>{ew.removeAllEW()}),
    /*5*/new Card(1, 'Дверь Открылась', ()=>{ew.removeAllEW()}),
    
    /*6*/new Card(2, 'Дверь Заблокирована', ()=>{lockedDoor()}),
    /*7*/new Card(2, 'Дверь Заблокирована', ()=>{lockedDoor()}),
    /*8*/new Card(2, 'Дверь Заблокирована', ()=>{lockedDoor()}),
    
    /*9*/new Card(3, 'Алчный Гоблин', ()=>{greedyGoblin()}),
    /*10*/new Card(3, 'Алчный Гоблин', ()=>{greedyGoblin()}),
    
    /*11*/new Card(4, 'Заколдованная дверь', ()=>{enchantedDoor()}),
    /*12*/new Card(5, 'Струя Огня', ()=>{jetOfFire()}),
    /*13*/new Card(6, 'Шипы из Пола', ()=>{thornsFromTheFloor()}),
    /*14*/new Card(7, 'Смертоностные Стрелы', ()=>{deadlyArrows()}),
    /*15*/new Card(8, 'Перемешивание Карт', ()=>{cardShuffling()}),
]

export {door_cards}
