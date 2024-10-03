class Hero {
    constructor(name, heroName, resolve, strength, dexterity, defense, luck, health, special, abilities) {
        this.name = name; 
        this.heroName = heroName; 
        this.resolve = resolve; 
        this.strength = strength; 
        this.dexterity = dexterity; 
        this.defense = defense; 
        this.luck = luck; 
        this.health = health; 
        this.special = special; 
        this.abilities = abilities; 
    };
};

const dwarf = new Hero('dwarf', 'Гном-Воїн Тарвін', 0, 9, 4, 5, 4, 20, function special() {
    // TODO если вытащили карту "секретный проход", то вы получаете 1 жетон решимости
    // TODO если вытащили карту "гоблин-исследователь", то можно переместиться в любую соседнюю область, сбросив 1 трофей, вместо 2.
    console.log(`special`)
}, [{name:'Сильный удар', source:'img/abilitie_cards/abilitie_dwarf_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
    }},
    
    {name:'Сильный удар', source:'img/abilitie_cards/abilitie_dwarf_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
    }},

    {name:'Поиск Прохода', source:'img/abilitie_cards/abilitie_dwarf_02_1.jpg', effect: function(){
    /* TODO Сбросьте перед перемещением. Переместитесь в любую соседнюю область, игнорируя любые
        преграды, в том числе и стены. Если область неисследована, разместите в ней тайл Комнаты
        Подземелья в обычном порядке. Если Вы вступите в бой с монстром, то не сможете спастись бегством.*/
    }},

    {name:'Знание Подземелий', source:'img/abilitie_cards/abilitie_dwarf_03_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту в конце своего хода, чтобы убрать все жетоны поиска с Вашей комнаты 
            и всех прилегающих к ней комнат.*/
    }},

    {name:'Знание Катакомб', source:'img/abilitie_cards/abilitie_dwarf_04_1.jpg', effect: function(){
    /* TODO Сбросьте перед тем, как тянуть Карту Катакомб. 
            Вытяните 4 Карты Катакомб, посмотрите их и положите в любом порядке наверх Колоды Катакомб. 
            Потом тяните Карту Катакомб.*/
    }},
   
]);

const enchantress = new Hero('enchantress','Чародійка Арвен', 0, 5, 7, 5, 7, 13, function special() {
    // TODO если разиграли карту "малое зелье лечения", то вы исцеляетесь не 2, а 3 ранения
    // TODO если побеждаете в бою с магом, то получаете 1 жетон решимости
    console.log(`special`)
}, [{name:'Магические Заряды', source:'img/abilitie_cards/abilitie_enchantress_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},
    
    {name:'Магические Заряды', source:'img/abilitie_cards/abilitie_enchantress_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},

    {name:'Исцеляющая Волна', source:'img/abilitie_cards/abilitie_enchantress_02_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту в время своего хода. 
            У Вас исцеляется 4 ранения.*/
    }},

    {name:'Предвидение', source:'img/abilitie_cards/abilitie_enchantress_03_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту в начале Вашего хода. 
            Вытяните 4 Карты Поиска. 
            Посмотрите их и положите в любом порядке наверх колоды Карт Поиска.*/
    }},

    {name:'Транформация', source:'img/abilitie_cards/abilitie_enchantress_04_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту после того, как Вы вытащили тайл Комнаты Подземелья. 
            Вытяните еще один тайл Комнаты Подземелья и выберите, какой из них Вы поместите на поле. 
            Замешайте другой тайл обратно в стопку тайлов Комнат Подземелья.*/
    }},
   
]);

const hunter = new Hero('hunter','Мисливець Фарн', 0, 6, 6, 4, 5, 16, function special() {
    // TODO если тянете карту "ловушки", то получаете 1 жетон решимости
    // TODO если входит в катакомбы, то сразу тянешь карту катакомб
    // TODO если вытащили карту катакомбы "капкан", то она сбрасывается и тянется следующая
    console.log(`special`)
}, [{name:'Меткий выстрел', source:'img/abilitie_cards/abilitie_hunter_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},
    
    {name:'Меткий выстрел', source:'img/abilitie_cards/abilitie_hunter_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},

    {name:'Второе дыхание', source:'img/abilitie_cards/abilitie_hunter_02_1.jpg', effect: function(){
    /* TODO Сбросьте после того, как Вы провалили проверку характеристики. 
            Теперь проваленная проверка считается успешно пройденной.*/
    }},

    {name:'Воля к победе', source:'img/abilitie_cards/abilitie_hunter_03_1.jpg', effect: function(){
    /* TODO Если Вас не устроил результат броска кубика (или кубиков), 
            Вы можете сбросить эту карту и перебросить кубик (или кубики) еще 1, или 2 раза, 
            приняв 1 из выпавших результатов.*/
    }},

    {name:'Обнаружение Ловушек', source:'img/abilitie_cards/abilitie_hunter_04_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту после того как Вы вытянули Карту Ловушки. 
            Сбросьте Карту Ловушки не разыгрывая ее эффекта.*/
    }},
   
]);

const knight = new Hero('knight','Рицар Хьюгарт', 0, 7, 5, 9, 4, 17, function special() {
    // TODO если тянете карту "монстра", то получаете 1 жетон решимости
    // TODO если побеждаете "монстра" без ранений, то получаете 1 жетон решимости
    // TODO после получения ранения от "ярости дракона", исцеляется 1 ранение
    console.log(`special`)
}, [{name:'Сокрушающий удар', source:'img/abilitie_cards/abilitie_knight_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},
    
    {name:'Сокрушающий удар', source:'img/abilitie_cards/abilitie_knight_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},

    {name:'Борец с Драконом', source:'img/abilitie_cards/abilitie_knight_02_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту, когда Вы получаете ранения от Ярости Дракона. 
            Теперь Вы получите на 7 ранений меньше. 
            Если Вы должны были получить 5-7 ранений, то Вы не получаете ни одного ранения. 
            Если Вы должны были получить 2-4 ранения, то Вы не получаете ни одного ранения и сохраняете все свои Трофеи.*/
    }},

    {name:'Несломленный Дух', source:'img/abilitie_cards/abilitie_knight_03_1.jpg', effect: function(){
    /* TODO Вы можете сбросить эту карту перед проверкой характеристик, во время битвы или перед разыгрыванием карточного эффекта. 
            В этом и следующем Вашем ходу количество ранений Вашего героя всегда будет минимум на 1 меньше количества его здоровья. 
            Дополнительные ранения будут игнорироваться.*/
    }},

    {name:'Крепкие Доспехи', source:'img/abilitie_cards/abilitie_knight_04_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту после того как Вы вытянули Карту Подземелья, или Карту Катакомб. 
            Вы можете не разыгрывать эффект вытянутой карты.*/
    }},
   
]);

const mage = new Hero('mage','Маг Геріон', 0, 3, 5, 4, 9, 14, function special() {
    // TODO перед началом боя бросьте 1д4, если выпало 4-6 противник получает 1 ранение молнией
    // TODO если разиграли карту "свиток проворства", "свиток света", "свиток невидимости", "свиток прохода", то получаете 1 жетон решимости
    console.log(`special`)
}, [{name:'Огненный Шар', source:'img/abilitie_cards/abilitie_mage_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},
    
    {name:'Огненный Шар', source:'img/abilitie_cards/abilitie_mage_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},

    {name:'Вращение', source:'img/abilitie_cards/abilitie_mage_02_1.jpg', effect: function(){
    /* TODO Сбросив эту карту, Вы можете повернуть тайл комнаты, в которой Вы находитесь, на 180°, или на 90° в любом направлении.*/
    }},

    {name:'Лечение', source:'img/abilitie_cards/abilitie_mage_03_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту в время своего хода. У Вас исцеляется 4 ранения.*/
    }},

    {name:'Боевая Магия', source:'img/abilitie_cards/abilitie_mage_04_1.jpg', effect: function(){
    /* TODO Сбросив эту карту в бою, Вы будете наносить ранения противнику при выпадении значений 1-4 на кубике.*/
    }},
   
]);

const robber = new Hero('robber','Розбійниця Изабелла', 0, 4, 9, 4, 6, 15, function special() {
    // TODO каждый раз когда входите в "сокровищницу", получаете 1 жетон решимости и тянете 1 карту "сокровища" ПЕРЕД тем как вытянуть карту "дракона"
    // TODO если попытались открыть дверь и это не удалось, то в следующем вашем ходу можете пройти через дверь, не вытягивая карту "дверей"
    console.log(`special`)
}, [{name:'Метание Ножей', source:'img/abilitie_cards/abilitie_robber_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},
    
    {name:'Метание Ножей', source:'img/abilitie_cards/abilitie_robber_01_2.jpg', effect: function(){
    /* TODO сбросить эту карту во время боя. 
            Ваш противник получает 2 ранения*/
    }},

    {name:'Побег', source:'img/abilitie_cards/abilitie_robber_02_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту, чтобы убежать во время боя с монстром не выполняя проверки Ловкости. 
            При этом Вы не получаете штраф за побег.*/
    }},

    {name:'Легкая Поступь', source:'img/abilitie_cards/abilitie_robber_03_1.jpg', effect: function(){
    /* TODO Сбросьте эту карту после того как Вы вытянули Карту Ловушки. 
            Сбросьте Карту Ловушки не разыгрывая ее эффекта.*/
    }},

    {name:'Шестое Чувство', source:'img/abilitie_cards/abilitie_robber_04_1.jpg', effect: function(){
    /* TODO Способность может применяться к любой колоде карт, кроме колоды Карт Дракона. 
            Сбросьте эту карту после того, как Вы вытянули карту из какой-либо колоды. 
            Вытяните еще одну карту из той же колоды и выберите, эффект какой из этих двух карт Вы разыграете, 
            а другую карту сбросьте.*/
    }},
   
]);

const heroes = {
    dwarf:dwarf, 
    enchantress: enchantress, 
    hunter:hunter, 
    knight:knight, 
    mage:mage, 
    robber:robber}

export  {heroes}