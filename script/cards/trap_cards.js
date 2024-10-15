class Card {
    constructor(id, name, effect) {
        this.id = id;  
        this.name = name;  
        this.effect = effect;  
    };
};


const trap_cards = [
    new Card(1, 'Песчаная ловушка', function(){return/*Комнату начало стремительно засыпать песком. Вы пытаетесь пробраться к одному из выходов. Выполните 4 проверки Удачи, не получая жетоны решимости за проваленные проверки. Отнимете количество успешных проверок от 6 и получите количество ранений, эквивалентное результату, а также пропустите 1 ход.*/}),
    new Card(2, 'Прожигающий Луч', function(){return/*С кристалла в центре комнаты вылетел прожигающий луч. Выполните 2 проверки Ловкости, 2 проверки Удачи, 1 проверку Силы и 1 проверку Защиты. Получите по 1 ранению за каждую проваленную проверку; за провалы вышеупомянутых проверок Вы не получаете жетоны решимости.*/}),
    new Card(3, 'Летящее Лезвие', function(){return/*На Вас обрушилось острое лезвие.  Выполните проверку Защиты.  В случае успеха сбросьте эту карту, иначе выполните проверку Удачи.  Если проверка Удачи прошла успешно, получите 4 ранения;  В противном случае бросьте 1d6, буквы к выпавшему результату 4 и получите количество ранений, эквивалентное результату.*/}),
    new Card(4, 'Шипы', function(){return/*Из пола выдвинулись острые шипы. Бросьте 1d6 и получите количество ранений, эквивалентное результату.*/}),
    new Card(5, 'Провал Пола', function(){return/*Пол под Вами начал проваливаться. Выполните проверку Ловкости. В случае провала получите 1 ранение и войдите в Катакомбы. Если Вы уже в Катакомбах, получите 2 ранения, а также вытяните и разыграйте еще одну Карту Катакомб.*/}),
    new Card(6, 'Яма с Кольями', function(){return/*Вы упали в яму с кольями. Бросьте 116, отнимите от выпавшего числа 3 и получите количество ранений, эквивалентное результату. Потом снова бросьте 1d6, отнимите от выпавшего числа 3 и пропустите количество ходов, эквивалентное результату.*/}),
    new Card(7, 'Атака Нежити', function(){return/*Вас окружило огромное количество мертвецов. Получите количество ранений, эквивалентное количеству проходов у комнаты, в которой Вы находитесь (учитывая проходы с дверями и решётками), умноженному на 2. Если Вы в Катакомбах, получите по 1 ранению за каждую имеющуюся у Вас Карту Катакомб, что будет учитываться при расчете точки выхода из Катакомб.*/}),
    new Card(8, 'Ядовитые Змеи', function(){return/*С отверстий в потолке на Вас посыпались змеи. Получите 6 ранений от их укусов. Вы можете проявить осторожность и уменьшить количество получаемых ранений, пропустив соответствующее количество своих ходов с расчетом 1 ход на 2 ранения (пропуская 1 ход Вы получите 4 ранения, 2 хода 2 ранения и т.д.)*/}),
    new Card(9, 'Железная Клетка', function(){return/*Сверху на Вас упала клетка. Получите 2 ранения и сохраните эту карту. Пока она у Вас, в начале каждого своего хода выполняйте проверку Силы, чтобы выбраться. Если проверка выполнена успешно, сбросьте эку карту и продолжите свой ход в обычном порядке; иначе Ваш ход заканчивается.*/}),
    new Card(10, 'Яма с Мертвецами', function(){return/*Выполните проверку Ловкости или Удачи. В случае провала сохраните эту карту; Вы получаете 2 ранения и попадаете в яму. Чтобы выбраться, выполняйте проверку Ловкости в начале каждого своего хода. В случае успеха сбросьте эту карту и продолжайте свой ход в обычном порядке, иначе получите 1 ранение и закончите ход.*/}),
    new Card(11, 'Взрыв', function(){return/*Сработала ловушка, рядом с Вами произошел взрыв. Получите 4 ранения и пропустите свой следующий ход.*/}),
    new Card(12, 'Вращающееся Лезвие', function(){return/*Выполните проверку Защиты; в случае успеха, сбросьте эту карту, иначе выполните проверку Ловкости. Если обе проверки провалены, получите 9 ранений. Если проверка Ловкости была Успешной, сбросьте любое число своих Трофеев, отнимите это число от 9 и получите количество ранений эквивалентное результату.*/}),
    new Card(13, 'Смертоносные Пилы', function(){return/*Вдоль стены начали движение смертоносные пилы. Выполните проверку Защиты. Если проверка провалена, добавьте 1 к числу, на которое была провалена проверка и получите количество ранений, эквивалентное результату.*/}),
    new Card(14, 'Падающий Топор', function(){return/*Вы не заметили, как на Вас обрушился огромный топор. Выполните проверку Защиты; если проверка провалена, получите 7 ранений.*/}),
    new Card(15, 'Пылающая Комната', function(){return/*В комнате вспыхнуло пламя. Сбросьте 2 жетона решимости (если нет 2, то все оставшиеся) и выполните по одной проверке Силы, Ловкости, Защиты и Удачи, не получая жетонов решимости в случае провалов. Отнимите от 6 количество Успешных проверок и получите количество ранений, эквивалентное результату.*/}),
    new Card(16, 'Перемешивание Карт', function(){return/*Сбросьте эту карту. Затем перемешайте сброшенные и неиспользованные Карты Ловушек. Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/}),
]

export {trap_cards}

// TODO закодировать функции карт ловушек