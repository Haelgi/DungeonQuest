class Card {
    constructor(id, name, cost, effect) {
        this.id = id;  
        this.name = name;
        this.type = 'treasure';
        this.cost = cost;  
        this.effect = effect;
        this.title = 'Скарбниця';  
        this.pack = 'treasure';  
    };
};

const treasure_cards = [
    new Card(1, 'Кольцо Жизни', 250, ()=>{return /* "трофей" Вы можете сбросить эту карту (высвободить силу кольца, уничтожив его) и получить исцеление. Бросьте 1d6: 1-3 У Вас исцеляется 1 ранение; 4-6 - У Вас исцеляется 4 ранения. +250 золота*/}),
    new Card(2, 'Малый Кристал Магии', 200, ()=>{return /* "трофей" Если этот кристалл разбить, произойдет опасный взрыв магической энергии. В сражении с монстром, Вы можете сброситьт эту карту, а Ваш противник получит 2 ранения. +200 золота*/}),
    new Card(3, 'Ожерелье с Сапфирами', 250, ()=>{return /* "трофей"  +250 золота*/}),
    new Card(4, 'Магическое Кольцо', 290, ()=>{return /* "трофей" Сбросив эту карту, Вы можете один раз перебросить кубик. Если Вы бросали 2 кубика, то имеете право перебрасывать лишь один из них, приняв новый выпавший на нем результат. +290 золота*/}),
    new Card(5, 'Большой Кристалл Магии', 320, ()=>{return /* "трофей" Если этот кристалл разбить, произойдет опасный взрыв магической энергии. В бою с монстром Вы можете сброситьт эту карту и Ваш противник получит 3 ранения. +320 золота*/}),
    new Card(6, 'Волшебный Ключ', 350, ()=>{return /* "трофей" Если Вы, пытаясь открыть дверь, вытянули карту Дверь Заблокирована, то можете сбросить ее и вытянуть следующую. +350 золота*/}),
    new Card(7, 'Огненный Амулет', 400, ()=>{return /* "трофей" Вы не получаете ранений, разыгрывая эффекты карт Струя Огня и Пылающая Комната. +400 золота*/}),
    new Card(8, 'Змеиное Кольцо', 400, ()=>{return /* "трофей" Пока это кольцо у Вас, эффекты карт Гигантская Змея и Ядовитая Змея на Вас не действуют. +400 золота*/}),
    new Card(9, 'Кинжал Скорости', 450, ()=>{return /* "трофей" Имея эту карту, Вы можете получить 4 ранения в обмен на автоматический успех попытки побега в бою с монстром. При этом Вы не получите ранений в качестве штрафа за побег.  +450 золота*/}),
    
    new Card(10, 'Зелье Прозорливости', 450, ()=>{return /* "трофей" Сбросьте эту карту после того, как Вы вытянули тайл комнаты. Вытяните еще один тайл и выберите, какой из них Вы разместите на поле. Замешайте другой тайл в стопку тайлов. +450 золота*/}),
    new Card(11, 'Зелье Скорости', 450, ()=>{return /* "трофей" Сбросив эту карту во время своего хода, Вы можете совершить еще два дополнительных хода по завершении текущего. +450 золота*/}),
    new Card(12, 'Сумеречная Накидка', 500, ()=>{return /* "трофей" Накидка поможет сориентироваться в темноте. Если Вы вошли в Темную Комнату, то можете выйти через любой из ее проходов на Ваш выбор, не бросая при этом кубик. +500 золота*/}),
    new Card(13, 'Амулет Теней', 550, ()=>{return /* "трофей" Имея эту карту, находясь в Катакомбах, каждый раз, когда Вы тянете очередную Карту Катакомб, у Вас исцеляется 1 ранение. +550 золота*/}),
    new Card(14, 'Яйцо Дракона', 600, ()=>{return /* "трофей"  +600 золота*/}),
    new Card(15, 'Посох Жизни', 650, ()=>{return /* "трофей" С этой картой, пока Ваш герой жив, во время своего хода Вы можете сбросить любое количество своих Трофеев (кроме этого) и исцелить число ранений, равное числу сброшенных Трофеев +650 золота*/}),
    new Card(16, 'Посох Смерти', 650, ()=>{return /* "трофей" Имея эту карту, каждый раз, когда Вы вытянули Карту Ловушек и разыграли ее эфеект, у вас исцеляется 1 ранение. +650 золота*/}),
    new Card(17, 'Пояс Феникса', 700, ()=>{return /* "трофей" Если количество Вашего здоровья меньше или равно 3, Вы можете сбросить эту карту и мгновенно исцелить 3 ранения. Карту нельзя использовать после смерти героя.  +700 золота*/}),
    new Card(18, 'Тиара Магнетизма', 700, ()=>{return /* "трофей" Имея эту карту, Вы можете проходить через проходы с решётками не выполняя проверку Силы. +700 золота*/}),
    new Card(19, 'Арфа Спокойствия', 700, ()=>{return /* "трофей" Пока эта карта у Вас, в Сокровищнице Вы должны вытаскивать по две карты дракона вместо одной. Вы можете сбросить эту карту в начале любого своего хода. +700 золота*/}),
    
    new Card(20, 'Пояс Жизни', 900, ()=>{return /* "трофей" После каждого боя с монстром, который закончился смертью монстра, у Вас исцеляется 1 ранение. +900 золота*/}),
    new Card(21, 'Меч Света', 900, ()=>{return /* "трофей" Пока эта карта у Вас, в бою с демоном, или скелетом, каждая Ваша успешная атака наносит 2 ранения вместо 1. +900 золота*/}),
    new Card(22, 'Корона', 1000, ()=>{return /* "трофей"  +1000 золота*/}),
    new Card(23, 'Сумка с Самоцветами', 1000, ()=>{return /* "трофей"  +1000 золота*/}),
    new Card(24, 'Лампа с Джином', 1100, ()=>{return /* "трофей" Сбросив эту карту, Вы теряете все Трофеи и у Вас остается 1 очко жизни. Потом вытяните 2 Карты Сокровищ и выполните перемещение на любую клетку поля (кроме стартовых) в обычном порядке. +1100 золота*/}),
    new Card(25, 'Посох Дракона', 1510, ()=>{return /* "трофей" Когда зашло солнце и двери подземелья закрылись, Ваш герой может выполнить 4 дополнительных хода и, если он доберется до выхода, покинуть Подземелье Дракона. +1510 золота*/}),
    new Card(26, 'Заколдованная Книга', false, ()=>{return /* "трофей"  Начиная свой ход в Сокровищнице, перед тем как тянуть Карту Дракона, бросьте 216: 2-3 - Вы погибаете; 4-5 - Бросьте 1d6 и получите количество ранений, эквивалентное результату; 6-8 - Ваш ход заканчивается; 9-11 - Вытащите 4 карты сокровищ, возьмите себе 2 из них, а остальные 2 сбросьте; 12 - Вытащите 2 карты сокровищ, после чего покиньте Подземелье Дракона.*/}),
    new Card(27, 'Пожиратель Сокровищ', false, ()=>{return /* "трофей"  При выходе из Подземелья Дракона, бросьте 216: 2-5 - Сбросьте любой свой другой Трофей; 6-12 - Эта карта имеет стоимость, эквивалентную выпавшему на кубиках результату, умноженному на 100.*/}),
    new Card(28, 'Украшенные Ботинки', 90, ()=>{return /* "трофей"  +90 золота*/}),
    new Card(29, 'Кольцо с Кристалом', 110, ()=>{return /* "трофей"  +110 золота*/}),
    
    new Card(30, 'Жемчужное Кольцо', 130, ()=>{return /* "трофей"  +130 золота*/}),
    new Card(31, 'Зелье Внимательности', 150, ()=>{return /* "трофей" Сбросьте эту карту в конце своего хода, чтобы убрать из комнаты, в которой вы находитесь, жетон поиска. В следующий свой ход Вы сможете снова обыскать эту комнату. +150 золота*/}),
    new Card(32, 'Серебрянное Кольцо', 160, ()=>{return /* "трофей"  +160 золота*/}),
    new Card(33, 'Кольцо Колдуна', 170, ()=>{return /* "трофей" Бросив кубик, Вы можете сбросить эту карту (кольцо уничтожается) и добавить 1 к выпавшему на кубике результату. Если Вы бросали 2 кубика, то можете добавить 1к результату лишь одного из них. +170 золота*/}),
    new Card(34, 'Золотое Кольцо', 190, ()=>{return /* "трофей"  +190 золота*/}),
    new Card(35, 'Деревянное Кольцо', 1, ()=>{return /* "трофей" Вы подобрали это кольцо думая, что оно обладает магическими свойствами, но ошиблись. +1 золота*/}),
    new Card(36, 'Свод Законов', 15, ()=>{return /* "трофей" Вы думали, что эта книга содержит в себе тайные знания, но оказалось, что это всего лишь свод законов одного из отдаленных королевств, не имеющий особой ценности. +15 золота*/}),
]

export {treasure_cards}

// TODO закодировать функции карт Дверей