class Card {
    constructor(id, name, effect) {
        this.id = id;  
        this.name = name;  
        this.effect = effect;  
    };
};


const catacomb_cards = [
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    new Card(1, 'Пусто', function(){/*В этой части Катакомб пусто; ничего не происходит.*/}),
    
    new Card(2, 'Выход', function(){/*Вы отыскали в выход из Катакомб. Если хотите, можете их покинуть.*/}),
    new Card(2, 'Выход', function(){/*Вы отыскали в выход из Катакомб. Если хотите, можете их покинуть.*/}),
    new Card(2, 'Выход', function(){/*Вы отыскали в выход из Катакомб. Если хотите, можете их покинуть.*/}),
    new Card(2, 'Выход', function(){/*Вы отыскали в выход из Катакомб. Если хотите, можете их покинуть.*/}),
    new Card(2, 'Выход', function(){/*Вы отыскали в выход из Катакомб. Если хотите, можете их покинуть.*/}),
    new Card(2, 'Выход', function(){/*Вы отыскали в выход из Катакомб. Если хотите, можете их покинуть.*/}),
    
    new Card(3, 'Скрытая Ловушка', function(){/*По своей неосторожности Вы активировали ловушку. Тяните Карту Ловушки.*/}),
    new Card(3, 'Скрытая Ловушка', function(){/*По своей неосторожности Вы активировали ловушку. Тяните Карту Ловушки.*/}),
    new Card(3, 'Скрытая Ловушка', function(){/*По своей неосторожности Вы активировали ловушку. Тяните Карту Ловушки.*/}),
    new Card(3, 'Скрытая Ловушка', function(){/*По своей неосторожности Вы активировали ловушку. Тяните Карту Ловушки.*/}),
    new Card(3, 'Скрытая Ловушка', function(){/*По своей неосторожности Вы активировали ловушку. Тяните Карту Ловушки.*/}),
    new Card(3, 'Скрытая Ловушка', function(){/*По своей неосторожности Вы активировали ловушку. Тяните Карту Ловушки.*/}),
    
    new Card(4, 'Дыра в Потолке', function(){/*Выполните проверку Ловкости. Если проверка Успешна, то Вы можете покинуть Катакомбы. Если проверка провалена, можете повторить проверку в свой следующий ход вместо того, чтобы взять новую Карту Катакомб. Если у Вас есть Верёвка, то можете сбросить её и автоматически Успешно пройти проверку.*/}),
    new Card(4, 'Дыра в Потолке', function(){/*Выполните проверку Ловкости. Если проверка Успешна, то Вы можете покинуть Катакомбы. Если проверка провалена, можете повторить проверку в свой следующий ход вместо того, чтобы взять новую Карту Катакомб. Если у Вас есть Верёвка, то можете сбросить её и автоматически Успешно пройти проверку.*/}),
    
    new Card(5, 'Дверь с Загадкой', function(){/*Вы стоите перед закрытой дверью. Чтобы открыть замок, необходимо решить головоломку. Проведите проверку Удачи. В случае успеха Вы можете покинуть Катакомбы, иначе Ваш ход заканчивается. В свой следующий ход Вы можете провести проверку Удачи еще раз, вместо того, чтобы тянуть Карту Катакомб.*/}),
    new Card(6, 'Заколдованные Корни', function(){/*Вас опутали заколдованные корни. Чтобы вырваться, выполните 3 проверки Силы подряд. Получите по 2 ранению за каждую проваленную проверку. Если все 3 проверки были провалены, продолжайте выполнять проверку Силы и получать по 1 ранению за ее провал до первого Успеха. Потом сбросьте эту карту.*/}),
    new Card(7, 'Град Стрел', function(){/*Монстр атакует Вас из лука. Выполните проверку Удачи. В случае успеха Вы защитились и убили нападавшего; Ваш ход заканчивается. Если проверка провалена, вытащите две Карты Монстра и получите количество ранений, эквивалентное сумме штрафоф за побег на каждой из них. Потом сбросьте их.*/}),
    new Card(8, 'Гигантская Крыса', function(){/*На Вас напала гигантская крыса с количеством здоровья 3. Выполните проверку Защиты. Если проверка пройдена, Ваш противник получает 1 ранение, иначе 1 ранение получаете Вы. Продолжайте выполнять проверку Защиты до тех пор, пока Вы или гигантская крыса не погибнете.*/}),
    new Card(9, 'Восставшие Мертвецы', function(){/*Вас начали предпринимать восстания из гробов мертвецов. Выполните проверку Силы. Если проверка не удалась, найдите количество ранений, эквивалентное количество оставшихся в Вас очках жизни, деленному на 2 (округлите результат деления, если необходимо, в большую сторону).*/}),
    
    new Card(10, 'Теневой Убийца', function(){/*Сохраните эту карту. Пока она у Вас, в конце каждого своего хода (этого включительно) бросьте 1d6: 1-2 - Вы получаете 2 ранения; 3-4 - Вы получаете 1 ранение; 5-6 - Вы убиваете теневого убийцу и сбрасываете эту карту.*/}),
    new Card(11, 'Монстр из Темноты', function(){/*Из темноты на Вас напал монстр, начался бой. Проведите проверку Удачи, не используя жетоны решимости. В случае успеха получите 1 ранение. В случае провала получите 6 ранений.*/}),
    new Card(12, 'Капкан', function(){/*Выполните проверку Удачи. В случае успеха Вас защитили доспехи и Вы получаете 1 ранение. Если проверка провалена, получите 4 ранения от попадания в капкан и пропустите свой следующий ход. Чтобы не пропускать следующий ход, Вы можете сбросить один из своих Трофеев.*/}),
    new Card(13, 'Скорпион', function(){/*Вас ужалил скорпион. Бросьте 1d6 и получите коичество ранений, эквивалентное результату.*/}),
    new Card(14, 'Липкая Паутина', function(){/*Сохраните эту карту. Вы попали в липкую паўтину и пытаетесь освободиться, не потревожив паука. Пока карта у Вас, в начале каждого своего хода выполняйте проверку Удачи. Если проверка Успешна, сбросьте эта карту, продолжив свой ХОД в обычном порядке, иначе получите 1 ранение и закончите свой ход. Вы также можете вырваться из паўтины, потревожив паука и сбросив эту карту, не выполняя проверку Удачи. Тогда Вы получаете 4 ранения от паўчьего укуса.*/}),
    new Card(15, 'Бритвокрыл', function(){/*На Вас внезапно напал бритвокрыл. Бросьте 1d6, добавьте к выпавшему числу 1 и получите количество ранений, эквивалентное результату.*/}),
    new Card(16, 'Темный Эльф', function(){/*Вы можете сбросить любой из Ваших Трофеев в качестве взятки и бросить 1d6, умножив результат броска на 100. Если полученное число меньше стоимости сброшенного Трофея, Вы можете покинуть Катакомбы. Иначе темный эльф Вас атакует и Вы получите 4 ранения.*/}),
    new Card(17, 'Удар из Тени', function(){/*Вас атаковал поджидавший в тени убийца. Выполните проверку Удачи. В случае успеха, Вы Убиваете врага и заканчиваете свой ход. В противном случае, отнимите от 10 количество Вашей Защиты и получите число ранений, эквивалентное результату.*/}),
    new Card(18, 'Щупальца', function(){/*Вас атаковали гигантские щупальца. Выполните проверку Удачи. В случае успеха Вы смогли Увернуться и остаться невредимым; Ваш ход заканчивается. В противном случае щупальца хватают Вас. Чтобы выжить и освободиться, Вы должны сбросить 1 свой Трофей на выбор (если есть) и получить 4 ранения.*/}),
    new Card(19, 'Нападение Разбойника', function(){/*Вы попали в засаду разбойника. Бросьте 1d6: 1-2 - От удара Вы потеряли сознание, получите 4 ранения, случайным образом выберете 2 своих трофея (если нет 2, то сколько осталось) и сбросьте их; 3-4 - Вас ранили, но Вы сумели отогнать грабителя; получите 3 ранения. 5-6 - Вы убили врага и остались целы.*/}),
    
    new Card(20, 'Ужасный Паук', function(){/*На Вас напал ужасный паўқ. Бросьте 1d6: 1-3 - Вы получаете 2 ранения и продолжаете бой; 4-6 - Вы получаете 2 ранения и убиваете паўка. Продолжайте бросать 1d6, пока, в течении Вашего хода, Вы или паўқ не погибнете. Сбросьте эту карту если паук убит.*/}),
    new Card(21, 'Вампир', function(){/*Выполните проверку Ловкости или Защиты (в зависимости от того, что меньше). В случае провала, получите 1 ранение и сохраните эту карту. Пока эта карта у Вас, в начале каждого своего хода получите 1 ранение и продолжайте ход в обычном порядке. Сбросьте эту карту, если Вы покинули Катакомбы.*/}),
    new Card(22, 'Ядовитая Змея', function(){/*Вы потревожили ядовитую змею. Она попыталась Вас укусить. Чтобы определить количество ранений, Выберите одну из характеристик Вашего героя и выполните столько ее проверок, какова величина самой характеристики. Получите по 1 ранению за каждую проваленную проверку.*/}),
    new Card(23, 'Атака Колдуна', function(){/*Колдун запустил в Вас магический огненный шар и сбежал. Выполните проверку Удачи. В случае успеха Вы смогли защититься; завершите свой ход. В случае неудачи добавьте 1 к числу, на которое была провалена проверка и полуите количество ранений, эквивалентное результату сложения.*/}),
    new Card(24, 'Орда Крыс', function(){/*Вы натолкнулись на огромную стаю отвратительных крыс. Выполните проверку Защиты. Если Вы провалили проверку, то добавьте 1 к числу, на которое была провалена проверка и получите колочество ранений, эквивалентное результату.*/}),
    new Card(25, 'Яд Паука', function(){/*Вас укусил ядовитый паўқ. Пока Вы находитесь в Катакомбах, в начале каждого своего хода бросьте 1d6: 1-3 - Вы получаете 2 ранение; 4-6 - Ничего не происходит, продолжайте свой ход в обычном порядке.*/}),
    new Card(26, 'Нага', function(){/*Проход блокирован гигантским Нагом. Рассчитайте точку выхода из Катакомб и поместите Маркер Путешествия в эту область, развернув его на 180°. Сбросьте Нагу и все собранные Карты Катакомб (кроме Трофеев). В свой следующий ход тяните Карту Катакомб в обычном порядке.*/}),
    new Card(27, 'Факел Гаснет', function(){/*Сохраните эту карту. Факел погас. В начале каждого своего последующего хода выполните проверку Удачи, чтобы снова зажечь его. Если проверка прошла успешно, то сбросьте эту карту и продолжайте ход в обычном порядке. Если Вы провалили проверку, то Ваш ход тут же заканчивается.*/}),
    new Card(28, 'Алхимик', function(){/*Вы набрели на лабораторию Алхимика. С ним можно заключить одну из сделок: 1) Обменять 4 очка жизни на сокровище (получите 4 ранения и тяните Карту Сокровища). 2) Обменять одно из своих сокровищ на очки здоровья. (Разделите нацело стоимость выбранного сокровища на 400, округлив в меньшую сторону, и исцелите количество ранений, эквивалентное результату. Сокровище сбрасывается и замешивается в Колоду Сокровищ).*/}),
    new Card(29, 'Гигантский Алмаз', function(){/*"трофей" +4000 золотых*/}),
    
    new Card(30, 'Шкатылка с Золотом', function(){/* "трофей" Когда Вы покинули Подземелье Дракона, бросьте 1d6. Вы находите в шкатулке количество золота, эквивалентное результату броска, умноженному на 100.*/}),
    new Card(31, 'Молот Мощи', function(){/* "трофей" Пока эта карта у Вас, в бою с големом, каждая Ваша успешная атака наносит 2 ранения вместо 1.*/}),
    new Card(32, 'Перемешивание Карт', function(){/*Сбросьте эту карту. Затем перемешайте сброшенные и неиспользованные Карты Катакомб. Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/}),
]

export {catacomb_cards}

// TODO закодировать функции карт катакомб