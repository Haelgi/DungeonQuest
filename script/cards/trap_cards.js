import  {ew}  from '../eventWidows.js';
import  {player}  from '../player.js';
import  {heroes}  from '../cards/heroes.js';
import  {game}  from '../game.js';
import  {room_tiles}  from './room_tiles.js';
import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';

class Card {
    constructor(id, name, effect) {
        this.id = id;  
        this.name = name;  
        this.effect = effect;
        this.title = 'Пастка';  
        this.pack = 'trap';  
        this.btnName = 'Далі';
    };
};

function sandTrap(){

    ew.removeRawBtnInEW('btn_ew')
    let count = 4;
    let success = 0;

    function endBattle(){
        const damage = 6 - success
        game.changeHealth(-damage)
        ew.drawEW(`Ви отримали ${damage} поранень!`)
        game.removeAllIcon()
        player.extraMove = true
        player.skipMove = 1

        setTimeout(() => {
            ew.removeAllEW()
        }, 2000);
    }

    function reroll(){
        ew.addTxt(`Вдалих кидків: ${success}`)

        const trueFn = ()=>{ 
            success++
            count--

            ew.drawEW(`Вдало!`)
            setTimeout(() => {
                ew.removeLastEW()
                ew.removeTxt()
                ew.removeRawBtnInEW('roll')
                document.querySelectorAll('.dice-section').forEach((item)=>{
                    item.remove()
                })
                reroll()
                
            }, 1500);
            
            if (count === 0) return endBattle()
        }
        
        const falseFn = ()=>{
            count--
        
            ew.drawEW(`Невдача(`)
            setTimeout(() => {
                ew.removeLastEW()
                ew.removeTxt()
                ew.removeRawBtnInEW('roll')
                document.querySelectorAll('.dice-section').forEach((item)=>{
                    item.remove()
                })
                reroll()
                
            }, 1500);

            if (count === 0) return endBattle()
        }

        ew.addDiceRollSection(false, heroes[player.hero].luck, false, false, 2, trueFn, falseFn, false, false)
    }

    reroll()

    /*Комнату начало стремительно засыпать песком. 
    Вы пытаетесь пробраться к одному из выходов. 
    Выполните 4 проверки Удачи, не получая жетоны решимости за проваленные проверки. 
    Отнимете количество успешных проверок от 6 и получите количество ранений, 
    эквивалентное результату, а также пропустите 1 ход.*/
}

function burningRay() {
    ew.removeRawBtnInEW('btn_ew');
    let count = 0;

    const trueFn = () => {
        ew.drawEW(`Вдало!`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            nextCheck();
        }, 1200);
    };

    const falseFn = () => {
        game.changeHealth(-1);
        ew.drawEW(`Ви отримали 1 поранення`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            nextCheck();
        }, 1200);
    };

    function checkParameters(txt, param) {
        ew.addDiceRollSection(`Ваша ${txt}: ${param}`, param, false, true, 2, trueFn, falseFn, false, false);
    }

    function nextCheck() {
        if (count === 0) {
            checkParameters('Cпритність', heroes[player.hero].dexterity);
            count++;
        } else if (count === 1) {
            checkParameters('Cпритність', heroes[player.hero].dexterity);
            count++;
        } else if (count === 2) {
            checkParameters('Удача', heroes[player.hero].luck);
            count++;
        } else if (count === 3) {
            checkParameters('Сила', heroes[player.hero].strength);
            count++;
        } else if (count === 4) {
            checkParameters('Захист', heroes[player.hero].defense);
            count++;
        } else if (count === 5) {
            ew.removeAllEW();
        }
    }

    nextCheck();

    /*С кристалла в центре комнаты вылетел прожигающий луч. 
    Выполните 2 проверки Ловкости, 
    2 проверки Удачи, 
    1 проверку Силы и 
    1 проверку Защиты. 
    Получите по 1 ранению за каждую проваленную проверку; 
    за провалы вышеупомянутых проверок 
    Вы не получаете жетоны решимости.*/
}

function flyingBlade(){
    ew.removeRawBtnInEW('btn_ew');

    function result(){ 
        const result = game.diceRollResultGlobal
        const damage = result + 4
        game.changeHealth(-damage);

        ew.drawEW(`Ви отримете ${damage} поранення`)
        setTimeout(() => {ew.removeAllEW()}, 2000);
    }

    const trueFn2 = () => {
        game.changeHealth(-4);
        ew.drawEW(`Ви отримали 4 поранення`)
        setTimeout(() => {
            ew.removeAllEW();
        }, 1200);
    };

    const falseFn2 = () => {
        ew.drawEW(`Невдача(`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
        }, 1200);
    };

    const trueFn1 = () => {
        ew.drawEW(`Вдало!`)
        setTimeout(() => {
            ew.removeAllEW();
        }, 1200);
    };

    const falseFn1 = () => {
        ew.drawEW(`Невдача(`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn2, falseFn2)
        }, 1200);
    };

    ew.addDiceRollSection(`Ваш Захист: ${heroes[player.hero].defense}`, heroes[player.hero].defense, false, true,2, trueFn1, falseFn1)

    /*На Вас обрушилось острое лезвие.  
    Выполните проверку Защиты.  
    В случае успеха сбросьте эту карту, иначе выполните проверку Удачи.  
    Если проверка Удачи прошла успешно, получите 4 ранения;  
    В противном случае бросьте 1d6, 
    буквы к выпавшему результату 4 и получите количество ранений, 
    эквивалентное результату.*/
}

function spikes(){
    ew.removeRawBtnInEW('btn_ew');

    function result(){ 
        const damage = game.diceRollResultGlobal
        game.changeHealth(-damage);

        ew.drawEW(`Ви отримете ${damage} поранення`)
        setTimeout(() => {ew.removeAllEW()}, 2000);
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
    /*Из пола выдвинулись острые шипы. 
    Бросьте 1d6 и получите количество ранений, эквивалентное результату.*/
}

function floorFailure(){
    ew.removeRawBtnInEW('btn_ew');
    
    const trueFn = ()=> {
        ew.drawEW(`Вам вдалося не провалитись`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        let damage = 1
        if (player.catacomb) damage = 2
        if (!player.catacomb) {
            game.drawCatacombToken(player.position[0], player.position[1])
            game.getDirectionCatacomb()
        }
        game.changeHealth(-damage);
        ew.drawEW(`Ви отримете ${damage} поранення`)
        setTimeout(() => {
            ew.removeAllEW()
            const card = game.getRundomElement(game.trap_cards, trap_cards)   
            ew.drawCardEW(card);
        }, 2000);
    }
    
    ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)


    /*Пол под Вами начал проваливаться. 
    Выполните проверку Ловкости. 
    В случае провала получите 1 ранение и войдите в Катакомбы. 
    Если Вы уже в Катакомбах, получите 2 ранения, 
    а также вытяните и разыграйте еще одну Карту Катакомб.*/
}

function pitWithStakes(){
    ew.removeRawBtnInEW('btn_ew');
    
    function result2(){
        const result = game.diceRollResultGlobal
        let move = result - 3
        if (move < 0) move = 0

        ew.drawEW(`Ви пропустите ${move} ходів`)
        setTimeout(() => { 
            ew.removeAllEW() 
            player.skipMove = move
        }, 2000);
    }

    function result1(){ 
        const result = game.diceRollResultGlobal
        let damage = result - 3
        if (damage < 0) damage = 0
        game.changeHealth(-damage);

        ew.drawEW(`Ви отримете ${damage} поранення`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection()

            ew.addDiceRollSection(false, 6, false, true, 1, result2, false, false, false)

        }, 2000);
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result1, false, false, false)

    /*Вы упали в яму с кольями. 
    Бросьте 116, отнимите от выпавшего числа 3 и получите количество ранений, эквивалентное результату. 
    Потом снова бросьте 1d6, отнимите от выпавшего числа 3 и пропустите количество ходов, эквивалентное результату.*/
}

function undeadAttack(){
    ew.removeRawBtnInEW('btn_ew');
    let damage = 0;

    if (!player.catacomb) {
        const roomID = game.gameFields[player.position[1]][player.position[0]]['id'];
        const room = room_tiles[roomID];

        if (room.up) damage++
        if (room.right) damage++ 
        if (room.down) damage++
        if (room.left) damage++   

        damage *= 2

        game.changeHealth(-damage)
        ew.drawEW(`Ви отримаєте ${damage} поранення`)
        setTimeout(() => {ew.removeAllEW()}, 2000);
    }

    if (player.catacomb) {
        let damage = player.catacombCardContainer.length
        game.changeHealth(-damage)
        ew.drawEW(`Ви отримаєте ${damage} поранення`)
        setTimeout(() => {ew.removeAllEW()}, 2000);
    }
    
    /*Вас окружило огромное количество мертвецов. 
    Получите количество ранений, эквивалентное количеству проходов у комнаты, в которой Вы находитесь 
    (учитывая проходы с дверями и решётками), умноженному на 2. 
    Если Вы в Катакомбах, получите по 1 ранению за каждую имеющуюся у Вас Карту Катакомб, 
    что будет учитываться при расчете точки выхода из Катакомб.*/
}

function poisonousSnakes(){
    ew.removeRawBtnInEW('btn_ew');

    ew.addBtnInEW('btn_0', 'Не пропускати хід', ()=>{
        game.changeHealth(-6)
        ew.drawEW(`Ви отримаєте 6 поранень`)
        setTimeout(() => {ew.removeAllEW()}, 2000);
    })
    
    ew.addBtnInEW('btn_1', 'Пропустити 1 хід', ()=>{
        game.changeHealth(-4)
        ew.drawEW(`Ви отримаєте 4 поранень`)
        setTimeout(() => {ew.removeAllEW(); player.skipMove = 1}, 2000);
    })
    
    ew.addBtnInEW('btn_2', 'Пропустити 2 ходи', ()=>{
        game.changeHealth(-4)
        ew.drawEW(`Ви отримаєте 2 поранень`)
        setTimeout(() => {ew.removeAllEW(); player.skipMove = 2}, 2000);
    })
    
    ew.addBtnInEW('btn_3', 'Пропустити 3 ходи', ()=>{
        game.changeHealth(-4)
        ew.drawEW(`Ви отримаєте 0 поранень`)
        setTimeout(() => {ew.removeAllEW(); player.skipMove = 3}, 2000);
    })

    /*С отверстий в потолке на Вас посыпались змеи. 
    Получите 6 ранений от их укусов. 
    Вы можете проявить осторожность и уменьшить количество получаемых ранений, 
    пропустив соответствующее количество своих ходов с расчетом 1 ход на 2 ранения 
    (пропуская 1 ход Вы получите 4 ранения, 2 хода 2 ранения и т.д.)*/
}

function ironCage(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=>{
        ew.drawEW(`Ви змогли вибратися з клітки`)
        setTimeout(() => {ew.removeAllEW()}, 2000);
    }

    const falseFn = ()=>{
        player.eventCardContainer.push(trap_cards[8])
        console.log(player.eventCardContainer)
        ew.removeAllEW()
        game.endMove()
    }

    ew.addDiceRollSection(`Ваша Сила : ${heroes[player.hero].strength}`, heroes[player.hero].strength, false, true, 2, trueFn, falseFn)

    if (!player.eventCardContainer.some(item => item['name'] === trap_cards[8]['name'])){
        game.changeHealth(-2)
        ew.drawEW(`Ви отримаєте 2 поранення`)
        setTimeout(() => {ew.removeLastEW()}, 2000);
    }

    /*Сверху на Вас упала клетка. 
    Получите 2 ранения и сохраните эту карту. 
    Пока она у Вас, в начале каждого своего хода выполняйте проверку Силы, чтобы выбраться. 
    Если проверка выполнена успешно, сбросьте эку карту и продолжите свой ход в обычном порядке; 
    иначе Ваш ход заканчивается.*/
}

function pitOfTheDead(){
    ew.removeRawBtnInEW('btn_ew')

    if (!player.eventCardContainer.some(item => item['name'] === trap_cards[9]['name'])){
        const trueFn = ()=> {
            ew.drawEW(`Ви не потрапили в яму`)
            setTimeout(() => {ew.removeAllEW()}, 1200);
        }

        const falseFn = ()=> {
            player.eventCardContainer.push(trap_cards[8])
            game.changeHealth(-2)
            ew.drawEW(`Ви отримали 2 поранення, та потрапили в яму`)
            setTimeout(() => {
                ew.removeAllEW();
                game.endMove()
            }, 1200);
        }

        function dexterity(){
            ew.clear()
            ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)
        }

        function luck(){
            ew.clear()
            ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn, falseFn)
        }

        ew.drawBtnInEW('btn_dx','Спритність', dexterity)
        ew.drawBtnInEW('btn_luk','Удачу',luck)
    }

    if (player.eventCardContainer.some(item => item['name'] === trap_cards[9]['name'])) {
        const trueFn = ()=> {
            ew.drawEW(`Ви змогли вибратися з ями`)
            setTimeout(() => {ew.removeAllEW()}, 1200);
        }

        const falseFn = ()=> {
            player.eventCardContainer.push(trap_cards[8])
            ew.drawEW(`Ви НЕ змогли вибратися з ями`)
            setTimeout(() => {
                ew.removeAllEW();
                game.endMove()
            }, 1200);
        }

        ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)
    }

    /*Выполните проверку Ловкости или Удачи. 
    В случае провала сохраните эту карту; 
    Вы получаете 2 ранения и попадаете в яму. 
    Чтобы выбраться, выполняйте проверку Ловкости в начале каждого своего хода. 
    В случае успеха сбросьте эту карту и продолжайте свой ход в обычном порядке, 
    иначе получите 1 ранение и закончите ход.*/
}

function explosion(){
    
    game.changeHealth(-4)
    ew.drawEW(`Ви отримали 4 поранення`)
    setTimeout(() => {
        ew.removeAllEW();
        player.skipMove = 1;
        game.endMove();
    }, 1200);

    /*Сработала ловушка, рядом с Вами произошел взрыв. 
    Получите 4 ранения и пропустите свой следующий ход.*/
}

function spinningBlade() {
    ew.removeRawBtnInEW('btn_ew');

    function giveAwayTreasures(){
        ew.clear();
        const countCards = player.treasureCardContainer.length;
        const emptyFelds = [];
        let damage = 0;
    
        ew.addBtnInEW('close', 'Не віддавати трофеї', () => {
            game.changeHealth(-9);
            ew.drawEW(`Ви отримали 9 поранення`);
            setTimeout(() => {
                ew.removeAllEW();
            }, 1200);
        });
    
        ew.addEmptyFeldForCard(countCards);
        ew.addPackCards(player.treasureCardContainer);
        ew.addBtnInEW('next', 'Віддавати трофеї', () => {
            game.changeHealth(-damage);
            ew.drawEW(`Ви отримали ${damage} поранення`);
            setTimeout(() => {
                ew.removeAllEW();
            }, 1200);
        });
    
        const btnNext = document.getElementById('next');
        btnNext.style.display = 'none';
    
        addScrolCardsEffect('.event-deck-container', (e) => {
            if (emptyFelds.length >= countCards) return;
    
            const [card] = removeCardFromPack(e);
            emptyFelds.push(card);
            drawCardToFeld(countCards);
        });
    
        function removeCardFromPack(e) {
            const id = e.target.getAttribute('id');
            const card = player.treasureCardContainer.splice(id, 1);
            ew.updatePackCardsEW(player.treasureCardContainer);
            return card;
        }
    
        function drawCardToFeld(count) {
            if (emptyFelds.length === 1) btnNext.style.display = 'block';
            if (emptyFelds.length < 1) btnNext.style.display = 'none';
    
            for (let i = 0; i < count; i++) {
                const feld = document.getElementById(`card-feld-${i}`);
    
                if (emptyFelds[i] === undefined) {
                    feld.innerHTML = '';
                    continue;
                }

                damage = 9 - emptyFelds.length;
    
                feld.innerHTML = `<div id="${i}" class="card" style="background-image: url('img/${emptyFelds[i].pack}_cards/${emptyFelds[i].pack}_${emptyFelds[i].id}.jpg')"></div>`;
    
                feld.addEventListener('click', () => {
                    const [card] = emptyFelds.splice(i, 1);
    
                    if (card) {
                        player.treasureCardContainer.push(card);
                        ew.updatePackCardsEW(player.treasureCardContainer);
                        drawCardToFeld(count);
                    }
                });
            }
        }
    }
    

    const trueFn = ()=> {
        ew.drawEW(`Вам вдалося ухилитись від леза`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        ew.clear()
        
        const trueFn2 = ()=> {
            giveAwayTreasures();
        }
    
        const falseFn2 = ()=> {
            game.changeHealth(-9)
            ew.drawEW(`Ви отримали 9 поранення`)
            setTimeout(() => {
                ew.removeAllEW();
            }, 1200);
        }

        ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn2, falseFn2)
    }

    ew.addDiceRollSection(`Ваш Захист: ${heroes[player.hero].defense}`, heroes[player.hero].defense, false, true,2, trueFn, falseFn)


    /*Выполните проверку Защиты; 
    в случае успеха, сбросьте эту карту, 
    иначе выполните проверку Ловкости. 
    Если обе проверки провалены, получите 9 ранений. 
    Если проверка Ловкости была Успешной, 
    сбросьте любое число своих Трофеев, 
    отнимите это число от 9 и получите количество ранений эквивалентное результату.*/
}

function deadlySaws(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        ew.drawEW(`Ви змогли ухилитись від пил`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        const damage = game.diceRollResultGlobal + 1
        game.changeHealth(-damage);
            ew.drawEW(`Ви отримали ${damage} поранення`);
            setTimeout(() => {
                ew.removeAllEW();
            }, 1200);
    }

    ew.addDiceRollSection(`Ваш Захист: ${heroes[player.hero].defense}`, heroes[player.hero].defense, false, true,2, trueFn, falseFn)

    /*Вдоль стены начали движение смертоносные пилы. 
    Выполните проверку Защиты. 
    Если проверка провалена, добавьте 1 к числу, на которое была провалена проверка 
    и получите количество ранений, эквивалентное результату.*/
}

function fallingAxe(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        ew.drawEW(`Ви змогли ухилитись від сокири`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        const damage = 7
        game.changeHealth(-damage);
        ew.drawEW(`Ви отримали ${damage} поранення`);
        setTimeout(() => {
            ew.removeAllEW();
        }, 1200);
    }

    ew.addDiceRollSection(`Ваш Захист: ${heroes[player.hero].defense}`, heroes[player.hero].defense, false, true,2, trueFn, falseFn)

    /*Вы не заметили, как на Вас обрушился огромный топор. 
    Выполните проверку Защиты; если проверка провалена, получите 7 ранений.*/
}

function burningRoom(){
    ew.removeRawBtnInEW('btn_ew');
    let count = 0;
    let damage = 6;

    if (heroes[player.hero].resolve < 2) heroes[player.hero].resolve = 0;
    if (heroes[player.hero].resolve >= 2) heroes[player.hero].resolve -= 2;
    game.addCharacterTablet(player.hero);

    const trueFn = () => {
        damage--;
        ew.drawEW(`Вдало!`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            nextCheck();
        }, 1200);
    };

    const falseFn = () => {
        ew.drawEW(`НЕ вдало!`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.removeDiceRollSection();
            nextCheck();
        }, 1200);
    };

    function checkParameters(txt, param) {
        ew.addDiceRollSection(`Ваша ${txt}: ${param}`, param, false, false, 2, trueFn, falseFn, false, false);
    }

    function nextCheck() {
        if (count === 0) {
            checkParameters('Сила', heroes[player.hero].strength);
            count++;
        } else if (count === 1) {
            checkParameters('Cпритність', heroes[player.hero].dexterity);
            count++;
        } else if (count === 2) {
            checkParameters('Захист', heroes[player.hero].defense);
            count++;
        } else if (count === 3) {
            checkParameters('Удача', heroes[player.hero].luck);
            count++;
        } else if (count === 4) {
            game.changeHealth(-damage);
            ew.drawEW(`Ви отримали ${damage} поранення`);
            setTimeout(() => {
                ew.removeAllEW();
            }, 1200);        }
    }

    nextCheck();

    /*В комнате вспыхнуло пламя. 
    Сбросьте 2 жетона решимости (если нет 2, то все оставшиеся) 
    и выполните по одной проверке Силы, Ловкости, Защиты и Удачи, 
    не получая жетонов решимости в случае провалов. 
    Отнимите от 6 количество Успешных проверок 
    и получите количество ранений, эквивалентное результату.*/
}

function cardShuffling(){
    game.refreshTrapCards()
    ew.removeAllEW()
    const card = game.getRundomElement(game.trap_cards, trap_cards)

    ew.drawCardEW(card);
}

const trap_cards = [
    /*0*/new Card(1, 'Песчаная ловушка', ()=>{sandTrap()}),
    /*1*/new Card(2, 'Прожигающий Луч', ()=>{burningRay()}),
    /*2*/new Card(3, 'Летящее Лезвие', ()=>{flyingBlade()}),
    /*3*/new Card(4, 'Шипы', ()=>{spikes()}),
    /*4*/new Card(5, 'Провал Пола', ()=>{floorFailure() }),
    /*5*/new Card(6, 'Яма с Кольями', ()=>{pitWithStakes() }),
    /*6*/new Card(7, 'Атака Нежити', ()=>{undeadAttack() }),
    /*7*/new Card(8, 'Ядовитые Змеи', ()=>{poisonousSnakes()}),
    /*8*/new Card(9, 'Железная Клетка', ()=>{ironCage()}),
    /*9*/new Card(10, 'Яма с Мертвецами', ()=>{pitOfTheDead()}),
    /*10*/new Card(11, 'Взрыв', ()=>{explosion()}),
    /*11*/new Card(12, 'Вращающееся Лезвие', ()=>{spinningBlade()}),
    /*12*/new Card(13, 'Смертоносные Пилы', ()=>{deadlySaws()}),
    /*13*/new Card(14, 'Падающий Топор', ()=>{fallingAxe()}),
    /*14*/new Card(15, 'Пылающая Комната', ()=>{burningRoom()}),
    /*15*/new Card(16, 'Перемешивание Карт', ()=>{cardShuffling()}),
]

export {trap_cards}
