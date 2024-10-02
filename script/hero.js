class Hero {
    constructor(resolve, strength, dexterity, defense, luck, health, special) {
        this.resolve = resolve; 
        this.strength = strength; 
        this.dexterity = dexterity; 
        this.defense = defense; 
        this.luck = luck; 
        this.health = health; 
        this.special = special; 
    };
};

const dwarf = new Hero(0, 9, 4, 5, 4, 20, function special() {
    // TODO если вытащили карту "секретный проход", то вы получаете 1 жетон решимости
    // TODO если вытащили карту "гоблин-исследователь", то можно переместиться в любую соседнюю область, сбросив 1 трофей, вместо 2.
    console.log(`special`)
});

const enchantress = new Hero(0, 5, 7, 5, 7, 13, function special() {
    // TODO если разиграли карту "малое зелье лечения", то вы исцеляетесь не 2, а 3 ранения
    // TODO если побеждаете в бою с магом, то получаете 1 жетон решимости
    console.log(`special`)
});

const hunter = new Hero(0, 6, 6, 4, 5, 16, function special() {
    // TODO если тянете карту "ловушки", то получаете 1 жетон решимости
    // TODO если входит в катакомбы, то сразу тянешь карту катакомб
    // TODO если вытащили карту катакомбы "капкан", то она сбрасывается и тянется следующая
    console.log(`special`)
});

const knight = new Hero(0, 7, 5, 9, 4, 17, function special() {
    // TODO если тянете карту "монстра", то получаете 1 жетон решимости
    // TODO если побеждаете "монстра" без ранений, то получаете 1 жетон решимости
    // TODO после получения ранения от "ярости дракона", исцеляется 1 ранение
    console.log(`special`)
});

const mage = new Hero(0, 3, 5, 4, 9, 14, function special() {
    // TODO перед началом боя бросьте 1д4, если выпало 4-6 противник получает 1 ранение молнией
    // TODO если разиграли карту "свиток проворства", "свиток света", "свиток невидимости", "свиток прохода", то получаете 1 жетон решимости
    console.log(`special`)
});

const robber = new Hero(0, 4, 9, 4, 6, 15, function special() {
    // TODO каждый раз когда входите в "сокровищницу", получаете 1 жетон решимости и тянете 1 карту "сокровища" ПЕРЕД тем как вытянуть карту "дракона"
    // TODO если попытались открыть дверь и это не удалось, то в следующем вашем ходу можете пройти через дверь, не вытягивая карту "дверей"
    console.log(`special`)
});

export {dwarf, enchantress, hunter, knight, mage, robber}