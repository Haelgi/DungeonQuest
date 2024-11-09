class Card {
    constructor(id, name, effect) {
        this.id = id;  
        this.name = name;  
        this.effect = effect;
        this.title = 'Обшук мерця';  
        this.pack = 'deadman';          
    };
};


const deadman_cards = [
    new Card(1, 'Пусто', ()=>{return /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    new Card(1, 'Пусто', ()=>{return /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    new Card(1, 'Пусто', ()=>{return /*Вы не нашли у мертвеца ничего ценного; ничего не происходит.*/}),
    
    new Card(2, 'Веревка', ()=>{return /* "трофей" Вы нашли верёвку. Когда Вы попадаете в комонату подземелья с Бездонной Ямой, либо когда вытаскиваете Карту Катакомб Дыра в Потолке, или Карту Ловушек Провал Пола, Вы можете сбросить Верёвку, чтобы автоматически успешно выполнить проверку характеристик.*/}),
    new Card(2, 'Веревка', ()=>{return /* "трофей" Вы нашли верёвку. Когда Вы попадаете в комонату подземелья с Бездонной Ямой, либо когда вытаскиваете Карту Катакомб Дыра в Потолке, или Карту Ловушек Провал Пола, Вы можете сбросить Верёвку, чтобы автоматически успешно выполнить проверку характеристик.*/}),
    new Card(2, 'Веревка', ()=>{return /* "трофей" Вы нашли верёвку. Когда Вы попадаете в комонату подземелья с Бездонной Ямой, либо когда вытаскиваете Карту Катакомб Дыра в Потолке, или Карту Ловушек Провал Пола, Вы можете сбросить Верёвку, чтобы автоматически успешно выполнить проверку характеристик.*/}),
    
    new Card(3, 'Малое Зелье Лечения', ()=>{return /* "трофей" Во время своего хода, Вы можете сбросить эту карту, исцелив при этом 2 ранения Вашего героя. Вы не можете использовать эту карту после смерти своего героя. +150 золота*/}),
    new Card(3, 'Малое Зелье Лечения', ()=>{return /* "трофей" Во время своего хода, Вы можете сбросить эту карту, исцелив при этом 2 ранения Вашего героя. Вы не можете использовать эту карту после смерти своего героя. +150 золота*/}),
    
    new Card(4, 'Свиток Проворства', ()=>{return /* "трофей" Пытаясь выйти из Комнаты с Паўтиной, либо из Комнаты с Завалом, Вы можете сбросить эту карту вместо того, чтобы выполнять проверку характеристик. Тогда, не выполняя проверку характеристик, Вы можете выйти через любой из проходов комнаты на Ваш выбор.*/}),
    new Card(5, 'Свиток Света', ()=>{return /* "трофей" Вы нашли у мертвеца свиток света. Находясь в Катакомбах, Вы можете сбросить эту карту в начале своего хода и взять три Карты Катакомб вместо одной, после чего выбрать и разыграть одну из них, а остальные две сбросить.*/}),
    new Card(6, 'Проклятие Мертвеца', ()=>{return /* Потревожив останки, Вы стали жертвой проклятия. Вы чувствуете потерю жизненной силы. Получите 2 ранения и сбросьте 1 жетон решимости (если есть).*/}),
    new Card(7, 'Гроза Колдунов', ()=>{return /* "трофей" В бою с колдуном, каждая Ваша успешная атака наносит не 1, а 2 ранения. По желанию Вы можете проигнорировать любой эффект Карты Колдуна. +570 золота*/}),
    new Card(8, 'Медицинская Книга', ()=>{return /* "трофей" В этой книге собрано множество редких медицинских рецептов, ее наверняка можно хорошо продать. +200 золота*/}),
    new Card(9, 'Золотая Цепочка', ()=>{return /* "трофей" На шее у скелета Вы нашли золотую цепочку. +50 золота*/}),
    
    new Card(10, 'Ядовитая Кислота', ()=>{return /* "трофей" Сбросьте эту карту непосредственно перед началом, или во время боя с монстром, чтобы смазать ядом свое оружие. В этом бою Ваши атаки наносят не 1, а 2 ранения противнику. +180 золота*/}),
    new Card(11, 'Перемешивание Карт', ()=>{return /*Сбросьте эту карту. Затем перемешайте сброшенные и неиспользованные Карты Подземелья. Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/}),
]

export {deadman_cards}

// TODO закодировать функции карт мертвецов