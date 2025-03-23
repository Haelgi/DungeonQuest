import { ew } from '../eventWidows.js';
import { player } from '../player.js';

class Card {
    constructor(id, name, cost, effect) {
        this.id = id;
        this.name = name;
        this.type = 'treasure';
        this.cost = cost;
        this.effect = effect;
        this.title = 'Скарбниця';
        this.pack = 'treasure';
        this.btnName = 'Далі';
    }
}

function ringOfLife() {
    player.treasureCardContainer.push(treasure_cards[0]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" 
    TODO Вы можете сбросить эту карту (высвободить силу кольца, уничтожив его) и получить исцеление. 
    Бросьте 1d6: 1-3 У Вас исцеляется 1 ранение; 4-6 - У Вас исцеляется 4 ранения. +250 золота*/
}

function smallMagicCrystal() {
    player.treasureCardContainer.push(treasure_cards[1]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Если этот кристалл разбить, произойдет опасный взрыв магической энергии.
    В сражении с монстром, Вы можете сброситьт эту карту, а Ваш противник получит 2 ранения. +200 золота*/
}

function sapphireNecklace() {
    player.treasureCardContainer.push(treasure_cards[2]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" +250 золота*/
}

function magicRing() {
    player.treasureCardContainer.push(treasure_cards[3]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Сбросив эту карту, Вы можете один раз перебросить кубик. 
    Если Вы бросали 2 кубика, то имеете право перебрасывать лишь один из них, приняв новый выпавший на нем результат. +290 золота*/
}

function largeMagicCrystal() {
    player.treasureCardContainer.push(treasure_cards[4]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Если этот кристалл разбить, произойдет опасный взрыв магической энергии. 
    В бою с монстром Вы можете сброситьт эту карту и Ваш противник получит 3 ранения. +320 золота*/
}

function magicKey() {
    player.treasureCardContainer.push(treasure_cards[5]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Если Вы, пытаясь открыть дверь, вытянули карту Дверь Заблокирована, 
    то можете сбросить ее и вытянуть следующую. +350 золота*/
}

function fireAmulet() {
    player.treasureCardContainer.push(treasure_cards[6]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Вы не получаете ранений, разыгрывая эффекты карт Струя Огня и Пылающая Комната. +400 золота*/
}

function snakeRing() {
    player.treasureCardContainer.push(treasure_cards[7]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Пока это кольцо у Вас, эффекты карт Гигантская Змея и Ядовитая Змея на Вас не действуют. +400 золота*/
}

function speedDagger() {
    player.treasureCardContainer.push(treasure_cards[8]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Имея эту карту, Вы можете получить 4 ранения в обмен на автоматический успех попытки побега в бою с монстром. 
    При этом Вы не получите ранений в качестве штрафа за побег.  +450 золота*/
}

function foresightPotion() {
    player.treasureCardContainer.push(treasure_cards[9]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Сбросьте эту карту после того, как Вы вытянули тайл комнаты. 
    Вытяните еще один тайл и выберите, какой из них Вы разместите на поле. Замешайте другой тайл в стопку тайлов. +450 золота*/
}

function speedPotion() {
    player.treasureCardContainer.push(treasure_cards[10]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Сбросив эту карту во время своего хода, 
    Вы можете совершить еще два дополнительных хода по завершении текущего. +450 золота*/
}

function twilightCloak() {
    player.treasureCardContainer.push(treasure_cards[11]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Накидка поможет сориентироваться в темноте. 
    Если Вы вошли в Темную Комнату, то можете выйти через любой из ее проходов на Ваш выбор, не бросая при этом кубик. +500 золота*/
}

function shadowAmulet() {
    player.treasureCardContainer.push(treasure_cards[12]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Имея эту карту, находясь в Катакомбах, каждый раз, когда Вы тянете очередную Карту Катакомб, у Вас исцеляется 1 ранение. +550 золота*/
}

function dragonEgg() {
    player.treasureCardContainer.push(treasure_cards[13]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO  +600 золота*/
}

function staffOfLife() {
    player.treasureCardContainer.push(treasure_cards[14]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO С этой картой, пока Ваш герой жив, во время своего хода 
    Вы можете сбросить любое количество своих Трофеев (кроме этого) и исцелить число ранений, 
    равное числу сброшенных Трофеев +650 золота*/
}

function staffOfDeath() {
    player.treasureCardContainer.push(treasure_cards[15]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Имея эту карту, каждый раз, когда Вы вытянули Карту Ловушек и разыграли ее эфеект, 
    у вас исцеляется 1 ранение. +650 золота*/
}

function phoenixBelt() {
    player.treasureCardContainer.push(treasure_cards[16]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Если количество Вашего здоровья меньше или равно 3, 
    Вы можете сбросить эту карту и мгновенно исцелить 3 ранения. 
    Карту нельзя использовать после смерти героя.  +700 золота*/
}

function magnetismTiara() {
    player.treasureCardContainer.push(treasure_cards[17]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Имея эту карту, Вы можете проходить через проходы с решётками не выполняя проверку Силы. +700 золота*/
}

function tranquilityHarp() {
    player.treasureCardContainer.push(treasure_cards[18]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Пока эта карта у Вас, в Сокровищнице 
    Вы должны вытаскивать по две карты дракона вместо одной. 
    Вы можете сбросить эту карту в начале любого своего хода. +700 золота*/
}

function lifeBelt() {
    player.treasureCardContainer.push(treasure_cards[19]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO После каждого боя с монстром, который закончился смертью монстра, 
    у Вас исцеляется 1 ранение. +900 золота*/
}

function lightSword() {
    player.treasureCardContainer.push(treasure_cards[20]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Пока эта карта у Вас, в бою с демоном, или скелетом, 
    каждая Ваша успешная атака наносит 2 ранения вместо 1. +900 золота*/
}

function crown() {
    player.treasureCardContainer.push(treasure_cards[21]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO  +1000 золота*/
}

function bagOfGems() {
    player.treasureCardContainer.push(treasure_cards[22]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO  +1000 золота*/
}

function genieLamp() {
    player.treasureCardContainer.push(treasure_cards[23]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Сбросив эту карту, Вы теряете все Трофеи и у Вас остается 1 очко жизни. 
    Потом вытяните 2 Карты Сокровищ и выполните перемещение на любую клетку поля (кроме стартовых) в обычном порядке. +1100 золота*/
}

function dragonStaff() {
    player.treasureCardContainer.push(treasure_cards[24]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Когда зашло солнце и двери подземелья закрылись, 
    Ваш герой может выполнить 4 дополнительных хода и, если он доберется до выхода, покинуть Подземелье Дракона. +1510 золота*/
}

function enchantedBook() {
    player.treasureCardContainer.push(treasure_cards[25]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO  Начиная свой ход в Сокровищнице, перед тем как тянуть Карту Дракона, 
    бросьте 216: 
    2-3 - Вы погибаете; 
    4-5 - Бросьте 1d6 и получите количество ранений, эквивалентное результату; 
    6-8 - Ваш ход заканчивается; 
    9-11 - Вытащите 4 карты сокровищ, возьмите себе 2 из них, а остальные 2 сбросьте; 
    12 - Вытащите 2 карты сокровищ, после чего покиньте Подземелье Дракона.*/
}

function treasureEater() {
    player.treasureCardContainer.push(treasure_cards[26]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO  При выходе из Подземелья Дракона, 
    бросьте 216: 
    2-5 - Сбросьте любой свой другой Трофей; 
    6-12 - Эта карта имеет стоимость, эквивалентную выпавшему на кубиках результату, умноженному на 100.*/
}

function decoratedBoots() {
    player.treasureCardContainer.push(treasure_cards[27]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" +90 золота*/
}

function crystalRing() {
    player.treasureCardContainer.push(treasure_cards[28]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" +110 золота*/
}

function pearlRing() {
    player.treasureCardContainer.push(treasure_cards[29]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" +130 золота*/
}

function attentivenessPotion() {
    player.treasureCardContainer.push(treasure_cards[30]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Сбросьте эту карту в конце своего хода, чтобы убрать из комнаты, в которой вы находитесь, жетон поиска. В следующий свой ход Вы сможете снова обыскать эту комнату. +150 золота*/
}

function silverRing() {
    player.treasureCardContainer.push(treasure_cards[31]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей" +160 золота*/
}

function sorcererRing() {
    player.treasureCardContainer.push(treasure_cards[32]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Бросив кубик, Вы можете сбросить эту карту (кольцо уничтожается) и добавить 1 к выпавшему на кубике результату. 
    Если Вы бросали 2 кубика, то можете добавить 1к результату лишь одного из них. +170 золота*/
}

function goldRing() {
    player.treasureCardContainer.push(treasure_cards[33]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO  +190 золота*/
}

function woodenRing() {
    player.treasureCardContainer.push(treasure_cards[34]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Вы подобрали это кольцо думая, что оно обладает магическими свойствами, но ошиблись. +1 золота*/
}

function lawBook() {
    player.treasureCardContainer.push(treasure_cards[35]);
    game.drawTreasurePackCards()
    ew.removeAllEW();
    /* "трофей"
    TODO Вы думали, что эта книга содержит в себе тайные знания, но оказалось, что это всего лишь свод законов одного из отдаленных королевств, не имеющий особой ценности. +15 золота*/
}

const treasure_cards = [
    /*0*/new Card(1, 'Кольцо Жизни', 250, ()=>{ringOfLife()}),
    /*1*/new Card(2, 'Малый Кристал Магии', 200, ()=>{smallMagicCrystal()}),
    /*2*/new Card(3, 'Ожерелье с Сапфирами', 250, ()=>{sapphireNecklace()}),
    /*3*/new Card(4, 'Магическое Кольцо', 290, ()=>{magicRing()}),
    /*4*/new Card(5, 'Большой Кристалл Магии', 320, ()=>{largeMagicCrystal()}),
    /*5*/new Card(6, 'Волшебный Ключ', 350, ()=>{magicKey()}),
    /*6*/new Card(7, 'Огненный Амулет', 400, ()=>{fireAmulet()}),
    /*7*/new Card(8, 'Змеиное Кольцо', 400, ()=>{snakeRing()}),
    /*8*/new Card(9, 'Кинжал Скорости', 450, ()=>{speedDagger()}),
    /*9*/new Card(10, 'Зелье Прозорливости', 450, ()=>{foresightPotion()}),
    /*10*/new Card(11, 'Зелье Скорости', 450, ()=>{speedPotion()}),
    /*11*/new Card(12, 'Сумеречная Накидка', 500, ()=>{twilightCloak()}),
    /*12*/new Card(13, 'Амулет Теней', 550, ()=>{shadowAmulet()}),
    /*13*/new Card(14, 'Яйцо Дракона', 600, ()=>{dragonEgg()}),
    /*14*/new Card(15, 'Посох Жизни', 650, ()=>{staffOfLife()}),
    /*15*/new Card(16, 'Посох Смерти', 650, ()=>{staffOfDeath()}),
    /*16*/new Card(17, 'Пояс Феникса', 700, ()=>{phoenixBelt()}),
    /*17*/new Card(18, 'Тиара Магнетизма', 700, ()=>{magnetismTiara()}),
    /*18*/new Card(19, 'Арфа Спокойствия', 700, ()=>{tranquilityHarp()}),
    /*19*/new Card(20, 'Пояс Жизни', 900, ()=>{lifeBelt()}),
    /*20*/new Card(21, 'Меч Света', 900, ()=>{lightSword()}),
    /*21*/new Card(22, 'Корона', 1000, ()=>{crown()}),
    /*22*/new Card(23, 'Сумка с Самоцветами', 1000, ()=>{bagOfGems()}),
    /*23*/new Card(24, 'Лампа с Джином', 1100, ()=>{genieLamp()}),
    /*24*/new Card(25, 'Посох Дракона', 1510, ()=>{dragonStaff()}),
    /*25*/new Card(26, 'Заколдованная Книга', false, ()=>{enchantedBook()}),
    /*26*/new Card(27, 'Пожиратель Сокровищ', false, ()=>{treasureEater()}),
    /*27*/new Card(28, 'Украшенные Ботинки', 90, ()=>{decoratedBoots()}),
    /*28*/new Card(29, 'Кольцо с Кристалом', 110, ()=>{crystalRing()}),
    /*29*/new Card(30, 'Жемчужное Кольцо', 130, ()=>{pearlRing()}),
    /*30*/new Card(31, 'Зелье Внимательности', 150, ()=>{attentivenessPotion()}),
    /*31*/new Card(32, 'Серебрянное Кольцо', 160, ()=>{silverRing()}),
    /*32*/new Card(33, 'Кольцо Колдуна', 170, ()=>{sorcererRing()}),
    /*33*/new Card(34, 'Золотое Кольцо', 190, ()=>{goldRing()}),
    /*34*/new Card(35, 'Деревянное Кольцо', 1, ()=>{woodenRing()}),
    /*35*/new Card(36, 'Свод Законов', 15, ()=>{lawBook()})
];

export { treasure_cards };