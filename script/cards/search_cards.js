import  {ew}  from '../eventWidows.js';
import  {player}  from '../player.js';
import  {game}  from '../game.js';
import  {сrypt_cards}  from './сrypt_cards.js';

class Card {
    constructor(id, name, type, cost, effect) {
        this.id = id;  
        this.name = name;
        this.type = type;
        this.cost = cost;   
        this.effect = effect;
        this.title = 'Пошук';  
        this.pack = 'search';  
        this.btnName = 'Далі';
    };
};

function secretPass(){

    game.removeHighlightFields(game.nextCoordinates)
    game.nextCoordinates = game.getCoordinatesWithoutRoom()
    game.drawHeroMitl(player.position[0], player.position[1]);
    game.removeAllIcon()
    ew.removeAllEW()

    /*Вы заметили в стене выступающий камень и нажали на него. 
    Показался секретный проход. 
    Вы можете немедленно перейти в любую соседнюю область. 
    Если она неисследована, разместите в ней Комнату Подземелья в обычном порядке. 
    Если необходимо вступить в бой с минстром, Вы не сможете спастись бегством.*/
}

function healingPotion(){
    player.treasureCardContainer.push(search_cards[8])
    
    ew.removeAllEW()
    game.drawTreasurePackCards()
    
    /* "трофей" Во время своего хода, Вы можете сбросить эту карту, 
    исцелив при этом 3 ранения Вашего героя. 
    Вы не можете использовать эту карту после смерти своего героя. 
    +250 золота*/
}

function descentToCatacombs(){
    game.drawCatacombToken(player.position[0], player.position[1])
    game.drawIcon(player.position[0], player.position[1], 'fa-solid fa-person-through-window', 'catacomb');
    game.clickCatacombIcon();
    ew.removeAllEW()
    /* Вы заметили в углу комнаты небольшую дверцу, за которой находится спуск вниз. 
    Разместите маркер входа в Катакомбы в этой комнате.*/
}

function masterKey(){
    player.treasureCardContainer.push(search_cards[20])
    
    ew.removeAllEW()
    game.drawTreasurePackCards()
    /* "трофей" Обыскивая комнату, Вы нашли магический ключ. 
    Сбросьте эту карту вместо того, чтобы тянуть Карту Двери; дверь открывается.*/
    // TODO при нажатии на иконку двери добавить проверку на наличие это карты в контейнере игрока
}

function passageToTheCrypt(){
    const card = game.getRundomElement(game.сrypt_cards, сrypt_cards)
    game.distributionCards([card])

    ew.removeAllEW(); 
    ew.drawCardEW(card)

    /* Обыскивая комнату, Вы нашли скрытый проход в склеп. 
    Тяните Карту Склепа.*/
}

function secretLever(){
    ew.removeRawBtnInEW('btn_ew')

    function rotateRoom(angle){
        game.rotateRoomTile(angle)
        game.removeHighlightFields(game.nextCoordinates)
        game.removeAllIcon()
        game.nextCoordinates = game.newCoordinate()
        ew.removeAllEW()
    }

    ew.addBtnInEW('btn_90L', 'Повернути на 90° Ліворуч', ()=>{rotateRoom(-90)})
    ew.addBtnInEW('btn_90R', 'Повернути на 90° Праворуч', ()=>{rotateRoom(90)})
    ew.addBtnInEW('btn_180', 'Повернути на 180°', ()=>{rotateRoom(180)})

    /* Вы нашли секретный рычаг, 
    с помощью которого можно изменять положение комнаты. 
    Если хотите, можете повернуть тайл комнаты, в котором Вы находитесь, 
    на 180°, 
    или на 90° в любом направлении.*/
}

const search_cards = [
    /*0*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    /*1*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    /*2*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    /*3*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    /*4*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    /*5*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    /*6*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    /*7*/new Card(1, 'Секретный проход', false, false, ()=>{secretPass()}),
    
    /*8*/new Card(2, 'Зелье Лечения', 'treasure', false, ()=>{healingPotion()}),
    /*9*/new Card(2, 'Зелье Лечения', 'treasure', false, ()=>{healingPotion()}),
    /*10*/new Card(2, 'Зелье Лечения', 'treasure', false, ()=>{healingPotion()}),
    /*11*/new Card(2, 'Зелье Лечения', 'treasure', false, ()=>{healingPotion()}),
    /*12*/new Card(2, 'Зелье Лечения', 'treasure', false, ()=>{healingPotion()}),
        
    /*13*/new Card(3, 'Спуск в Катакомбы', false, false, ()=>{descentToCatacombs()}),
    /*14*/new Card(3, 'Спуск в Катакомбы', false, false, ()=>{descentToCatacombs()}),
    /*15*/new Card(3, 'Спуск в Катакомбы', false, false, ()=>{descentToCatacombs()}),
    /*16*/new Card(3, 'Спуск в Катакомбы', false, false, ()=>{descentToCatacombs()}),
    
    /*17*/new Card(4, 'Пусто', false, false, ()=>{ew.removeAllEW() /* Вы внимательно осмотрели комнату. Комната пуста; ничего не происходит.*/}),
    /*18*/new Card(4, 'Пусто', false, false, ()=>{ew.removeAllEW() /* Вы внимательно осмотрели комнату. Комната пуста; ничего не происходит.*/}),
    /*19*/new Card(4, 'Пусто', false, false, ()=>{ew.removeAllEW() /* Вы внимательно осмотрели комнату. Комната пуста; ничего не происходит.*/}),
    
    /*20*/new Card(5, 'Отмычка', 'treasure', false, ()=>{masterKey()}),
    /*21*/new Card(5, 'Отмычка', 'treasure', false, ()=>{masterKey()}),
    
    /*22*/new Card(6, 'Проход в Склеп', false, false, ()=>{passageToTheCrypt()}),
    /*23*/new Card(7, 'Секретный Рычаг', false, false, ()=>{secretLever()}),
    /*24*/new Card(8, 'Малое Зелье Лечения', 'treasure', 150, ()=>{ew.removeAllEW() /* "трофей" Во время своего хода, Вы можете сбросить эту карту, исцелив при этом 2 ранения Вашего героя. Вы не можете использовать эту карту после смерти своего героя. +150 золота*/}),
    /*25*/new Card(9, 'Свиток Прохода', false, false, ()=>{ew.removeAllEW() /* "трофей"  Вы нашли магический свиток. Вы можете сбросить эту карту вместо того, чтобы совершить поиск в комнате. Тогда Вы получите возможность выполнить перемещение в любою соседнюю исследованную область, игнорируя решётки, двери или стены.*/}),
    /*26*/new Card(10, 'Удар Сзади', false, false, ()=>{ew.removeAllEW() /* Пока Вы осматривали комнату, сзади подкрался мелкий гоблин и ударил Вас по голове большой палкой. Получите 1 ранение и пропустите следующий ход.*/}),
    /*27*/new Card(11, 'Золотая Серьга', 'treasure', 150, ()=>{ew.removeAllEW() /* "трофей" У входа в комнату Вы нашли золотую серьгу, которую можно будет неплохо продать. +150 золота*/}),
    /*28*/new Card(12, 'Мелкие Золотые Слитка', 'treasure', 70, ()=>{ew.removeAllEW() /* "трофей" На каменной плите у комнатной стены Вы нашли небольшую сумку с множетсвом мелких золотых слитков. +70 золота*/}),
    /*29*/new Card(13, 'Золотой Слиток', 'treasure', 60, ()=>{ew.removeAllEW() /* "трофей" В старой паутине Вы нашли большой золотой слиток. +60 золота*/}),
    /*30*/new Card(14, 'Золотые Монеты', 'treasure', 15, ()=>{ew.removeAllEW() /* "трофей" На полу комнаты вы увидели полтора десятка разбросанных золотых монет и решили их собрать. +15 золота*/}),
    /*31*/new Card(15, 'Перемешивание карт', false, false, ()=>{ew.removeAllEW() /* Сбросьте эту карту. Затем перемешайте сброшенные и неиспользованные Карты Поиска. Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/}),
]

export {search_cards}

// TODO закодировать функции карт Поиска