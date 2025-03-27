import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';
import  {ew}  from '../eventWidows.js';
import  {game}  from '../game.js';
import  {player}  from '../player.js';
import  {heroes}  from '../cards/heroes.js';
import  {monster_cards}  from './monster_cards.js';
import  {trap_cards}  from './trap_cards.js';
import  {deadman_cards}  from './deadman_cards.js';
import  {сrypt_cards}  from './сrypt_cards.js';
import  {treasure_cards}  from './treasure_cards.js';


class Card {
    constructor(id, name, type, cost, effect, btnName) {
        this.id = id;  
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.effect = effect;  
        this.btnName = btnName;  
        this.title = 'Події підземелля';  
        this.pack = 'dungeon';  
        this.btnName = 'Далі';
    };
};

function attack(){
    const card = game.getRundomElement(game.monster_cards, monster_cards)

    ew.removeAllEW();
    ew.drawCardEW(card)
    /*На Вас напали! Вам предстоит вступить в бой с монстром. Тяните Карту Монстра.*/
}

function trap(){
    const card = game.getRundomElement(game.trap_cards, trap_cards)

    ew.removeAllEW(); 
    ew.drawCardEW(card)
    /*Своим неосторожным движением Вы активировали ловушку. Тяните Карту Ловушки.*/
}

function deadAdventurer(){
    const card = game.getRundomElement(game.deadman_cards, deadman_cards)

    ew.removeAllEW(); 
    ew.drawCardEW(card)
    /*Вы увидели мертвого приключенца. Чтобы обыскать его тяните Карту Мертвеца.*/
}

function crypt(){
    const card = game.getRundomElement(game.сrypt_cards, сrypt_cards)

    ew.removeAllEW(); 
    ew.drawCardEW(card)
    /*Вы можете обыскать склеп в надежде найти что-нибудь ценное. Если Вы решили это сделать, тяните Карту Склепа.*/
}

function collapse(){
    ew.removeAllEW();
    game.rotateRoomTile(90)
    game.removeHighlightFields(game.nextCoordinates)
    game.removeAllIcon()
    game.nextCoordinates = game.newCoordinate()
    /*Случился обвал! Хотя часть пути и завалило обломками, другая часть пути освободилась. 
    Поверните тайл комнаты, где Вы находитесь, на 90° по часовой стрелке.*/
}

function burial(){
    ew.removeAllEW()

    const cards = [game.getRundomElement(game.deadman_cards, deadman_cards),
                   game.getRundomElement(game.deadman_cards, deadman_cards),
                   game.getRundomElement(game.deadman_cards, deadman_cards)]

                   game.distributionCards(cards)

    ew.drawEW('Карти мерців')
    ew.addPackCards(cards)
    addScrolCardsEffect('.event-deck-container', false)
    ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    /*Вы нашли захоронение. Вы можете вытянуть сразу 3 Карты Мертвеца.*/
}

function wallCollapse(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=>{
        if (game.nextCoordinates.length === 0) game.endGame()
        player.extraMove = true
        game.removePreviousTileField = true
        game.removeAllIcon()

    }

    const falseFn = ()=>{
        if (game.nextCoordinates.length === 0) game.endGame()
        game.changeHealth(-2)
        player.extraMove = true
        game.removePreviousTileField = true
        game.removeAllIcon()
        ew.drawEW('Ви отримали 2 поранення');
        ew.drawBtnInEW('btn_next', 'Далі', ()=>{ew.removeAllEW()});
    }

    ew.addDiceRollSection( `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true, 2, trueFn, falseFn, false, true)

    /*Комната рушится. 
    Выполните проверку Ловкости и, в случае неудачи, получите 2 ранения от летящих обломков. 
    Вы обязаны выполнить еще одно перемещение в соседнюю область. 
    Если она не исследована, разместите тайл комнаты в обычном порядке. 
    Вы можете игнорировать двери и решетки. Если покинуть комнату не удалось, Вы погибаете. 
    Уберите с поля тайл комнаты, которую Вы должны были покинуть, оставив на его месте неисследованную область.*/
}

function undergroundNecropolis(){
    ew.removeAllEW()

    const cards = [game.getRundomElement(game.сrypt_cards, сrypt_cards),
                    game.getRundomElement(game.сrypt_cards, сrypt_cards),
                    game.getRundomElement(game.сrypt_cards, сrypt_cards)]
    
                    game.distributionCards(cards)

    ew.drawEW('Події підземелля')
    ew.addPackCards(cards)
    addScrolCardsEffect('.event-deck-container', false)
    ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})

    /*Вы нашли подземный некрополь. Вы можете вытянуть 3 Карты Склепа.*/
}

function goblinExplorer(){
    
    if(player.treasureCardContainer.length < 2) {
        ew.removeAllEW()
        ew.drawEW('У вас недостатаня кількість трофеїв.')
        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
        return
    }

    ew.removeRawBtnInEW('btn_ew')
    ew.addBtnInEW('close', 'Не віддавати трофеї', ()=>{
        emptyFelds.forEach(card=>{player.treasureCardContainer.push(card)})
        game.drawTreasurePackCards()
        ew.removeAllEW()
    })
    ew.addEmptyFeldForCard(2)
    ew.addBtnInEW('next', 'Віддавати трофеї', ()=>{
        game.removeHighlightFields(game.nextCoordinates)
        game.nextCoordinates = game.getCoordinatesWithoutRoom()
        game.drawHeroMitl(player.position[0], player.position[1]);
        game.removeAllIcon()

        ew.removeAllEW()
    })

    ew.addPackCards(player.treasureCardContainer)
    
    const emptyFelds = []
    const btnNext = document.getElementById('next')
    btnNext.style.display = 'none'

    addScrolCardsEffect('.event-deck-container', (e)=> {
        
        if (emptyFelds.length >= 2) return

        const [card] = removeCardFromPack(e)

        emptyFelds.push(card)
        drawCardToFeld(2)
    });
    
    function removeCardFromPack(e) {
        const id = e.target.getAttribute('id')
        const card = player.treasureCardContainer.splice(id, 1)

        ew.updatePackCardsEW(player.treasureCardContainer)

        return card
    }

    function drawCardToFeld(count){
        if(emptyFelds.length === 2) btnNext.style.display = 'block'
        if(emptyFelds.length < 2) btnNext.style.display = 'none'
        
        for (let i = 0; i < count; i++) {
            const feld = document.getElementById(`card-feld-${i}`)
 
            if(emptyFelds[i]===undefined) return feld.innerHTML = ''

            if(emptyFelds.length === 0) return 

            feld.innerHTML = `<div id="${i}" class="card" style="background-image: url('img/${emptyFelds[i].pack}_cards/${emptyFelds[i].pack}_${emptyFelds[i].id}.jpg')"></div>`
            
            feld.addEventListener('click', ()=>{
                const [card] = emptyFelds.splice(i, 1)

                if(card) {
                    player.treasureCardContainer.push(card)

                    game.drawTreasurePackCards()
                    drawCardToFeld(2)  
                }
            })
        }
    }

    /*Вы встретили гоблина-исследователя. 
    В обмен на 2 Ваших Трофея он готов показать секретный проход. 
    Если хотите, можете сбросить 2 своих Трофея и немедленно переместиться в любую соседнюю область. 
    Если она не исследована, разместите тайл комнаты в обычном порядке.*/
}

function ambushRoom(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=>{
        game.removeAllIcon()
        game.drawMonsterToken(player.position[0], player.position[1])
    }

    const falseFn = ()=>{
        ew.removeAllEW()
        player.escapeBattle = false
        player.ambushRoom = true
        const cards = [game.getRundomElement(game.monster_cards, monster_cards),
                       game.getRundomElement(game.monster_cards, monster_cards)]

        game.gameFields[player.position[1]][player.position[0]]['m'] = cards

            game.distributionCards(cards)

        ew.drawEW('Події підземелля')
        ew.addPackCards(cards)
        addScrolCardsEffect('.event-deck-container', false)

        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    ew.addDiceRollSection( `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn, false, true)

    /*В комнату вошли монстры, а на выходы начали опускаться решетки. 
    Выполните проверку Ловкости. 
    В случае успеха Вам удалось убежать; разместите в текущей комнате жетон монстра и выполните еще одно перемещение, игнорируя двери и решетки. 
    В случае провала проверки (или если выполнить перемещение невозможно) вытяните две Карты Монстров и сразитесь поочередно с каждым из монстров. 
    Вы не можете спастись бегством.*/
}

function surroundedByMonsters(){
    player.escapeBattle = false
    player.surroundedMonsters = true

    const trueFn = ()=>{
        const cards = [game.getRundomElement(game.monster_cards, monster_cards)]

        game.gameFields[player.position[1]][player.position[0]]['m'] = cards

        ew.drawCardEW(cards)
        ew.removeTitile()
        ew.addTitleToEW('Події підземелля')

        ew.removeRawBtnInEW('btn_ew')
        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    const falseFn = ()=>{
        ew.removeAllEW()
        const cards = [game.getRundomElement(game.monster_cards, monster_cards),
                       game.getRundomElement(game.monster_cards, monster_cards)]

        game.gameFields[player.position[1]][player.position[0]]['m'] = cards

        game.distributionCards(cards)

        ew.drawEW('Події підземелля')
        ew.addPackCards(cards)
        addScrolCardsEffect('.event-deck-container', false)

        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    function check( nameValue, value) {
        ew.removeRawBtnInEW('btn_strength')
        ew.removeRawBtnInEW('btn_defense')

        ew.addDiceRollSection( `${nameValue}: ${value}`, value, false, false, 2, trueFn, falseFn, false, true)
    }

    ew.removeRawBtnInEW('btn_ew')
    ew.drawBtnInEW('btn_strength', 'Перевірити Силу', ()=>{check('Ваша Сила',heroes[player.hero].strength)})
    ew.drawBtnInEW('btn_defense', 'Перевірити Захист', ()=>{check('Ваш Захист',heroes[player.hero].defense)})

    /*Вас окружили монстры. 
    Выполните проверку Силы, или Защиты. 
    В случае успеха вытяните одну Карту Монстра и проведите бой с монстром. 
    В случае провала проверки вытяните две Карты Монстров и сразитесь поочередно с каждым из монстров. 
    Вы не можете спастись бегством.*/
}

function secretDoor(){
    ew.removeRawBtnInEW('btn_ew')
    ew.drawBtnInEW('btn_next', 'Переміститись', ()=>{
        game.removeHighlightFields(game.nextCoordinates)
        game.nextCoordinates = game.getCoordinatesWithoutRoom()
        game.drawHeroMitl(player.position[0], player.position[1]);
        game.removeAllIcon()

        ew.removeAllEW()})

    ew.drawBtnInEW('btn_close', 'Лишитись', ()=>{ew.removeAllEW()})

    
    /*Исследуя комнату, Вы активировали механизм, после чего в стене показался секретный проход. 
    Вы можете немедленно переместиться в любую соседнюю область. 
    Если она не исследована, разместите тайл комнаты в обычном порядке. 
    Если необходимо вступить в бой с монстром, Вы не можете спастись бегством.*/
}

function descentToCatacombs(){
    game.drawCatacombToken(player.position[0], player.position[1])
    game.drawIcon(player.position[0], player.position[1], 'fa-solid fa-person-through-window', 'catacomb');
    game.clickCatacombIcon();
    ew.removeAllEW()

    /*Вы получите спуск на нижние уровни подземелья. 
    Положите маркер входа в Катакомбы в эту комнату.*/
}

function giantSnake(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=>{
        const damage = game.diceRollResultGlobal + 2
        game.changeHealth(-damage) 
        ew.drawEW(`Ви отримали ${damage} поранення`);
        ew.drawBtnInEW('btn_next', 'Далі', ()=>{ew.removeAllEW()});
    }
    
    ew.addDiceRollSection( false, 6, false, false,1, trueFn, false, false, false)

    /*Вы потревожили гигантскую змею. 
    Бросьте 1d6, добавьте к выпавшему числу 2 и получите количество ранений, эквивалентное результату.*/
}

function magicRoom(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=>{
        let angl = 0

        if(game.diceRollResultGlobal<=2) angl = 90
        if(3<=game.diceRollResultGlobal && game.diceRollResultGlobal<=4) angl = 270
        if(5<=game.diceRollResultGlobal) angl = 180
        
        game.rotateRoomTile(angl)
        game.removeHighlightFields(game.nextCoordinates)
        game.removeAllIcon()
        game.nextCoordinates = game.newCoordinate()
    }
    
    ew.addDiceRollSection( false, 6, false, false,1, trueFn, false, false, true)

    /*Когда Вы вошли в комнату, она начала изменяться. 
    Бросьте 1d6: 1-2 - Поверните тайл комнаты на 90° по часовой стрелке; 
    3-4 - Поверните тайл комнаты на 90° против часовой стрелки; 
    5-6 Поверните тайл комнаты на 180°.*/
}

function deadCrowd(){
    ew.removeRawBtnInEW('btn_ew')

    ew.drawBtnInEW('btn_luck', 'Перевірити Удачу', ()=>{
        ew.removeRawBtnInEW('btn_luck')
        ew.removeRawBtnInEW('btn_fight')

        const trueFn1 = ()=>{
            ew.removeAllEW()
        }
    
        const falseFn1 = ()=>{
            player.eventCardContainer.unshift(dungeon_cards[40])
            ew.removeAllEW()
            game.endMove()
        }

        ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn1, falseFn1, false, false)
    })
    
    ew.drawBtnInEW('btn_fight', 'Битись', ()=>{
        ew.removeRawBtnInEW('btn_luck')
        ew.removeRawBtnInEW('btn_fight')

        const trueFn2 = ()=>{
            game.changeHealth(-game.diceRollResultGlobal) 
            const card = game.getRundomElement(game.treasure_cards, treasure_cards)
            player.treasureCardContainer.push()
            game.drawTreasurePackCards()
            ew.drawEW('Ви отримали 2 поранення');
            ew.drawBtnInEW('btn_next', 'Отримати бонус за бій', ()=>{
                ew.removeAllEW()
                ew.drawCardEW(card)
                ew.removeRawBtnInEW('btn_ew')
                ew.drawBtnInEW('btn_next', 'Далі', ()=>{ew.removeAllEW()});
            });
        }

        ew.addDiceRollSection(false, 12, false, true, 2, trueFn2, false, false, false)
    })

    /*Вы прячетесь от толпы мертвецов. 
    Сохраните эту карту. 
    Пока она у Вас, выполняйте проверку Удачи в начале каждого своего хода, ожидая ухода врагов. 
    Если проверка успешна, сбросьте эту карту и продолжите свой ход в обычном порядке; 
    иначе Ваш ход заканчивается. 
    В начале своего хода вместо проверки Удачи Вы можете сразиться с мертвецами; 
    Тогда бросьте 2d6, получите количество ранений, эквивалентное результату, 
    сбросьте эту карту и вытяните Карту Сокровища как награду.*/
}

    
function manticore(){
    ew.removeRawBtnInEW('btn_ew')
    ew.removeTitile()
    ew.addTitleToEW(`Оцінка Здоров'я Мантикори`)

    const enterBattle = ()=>{
        document.querySelector('.dice-container').remove()
        ew.removeRawBtnInEW('roll')
        ew.removeTitile()
        ew.addTitleToEW(`Бій з Мантикорою`)

        ew.addTxt(`
            ${player.hero.toUpperCase()}<br>
            <i id="pl_hp" class="fa-solid fa-heart" style="color:red; font-size: 25px; margin: 10px auto;">${heroes[player.hero].health}</i><br>
            <i id="pl_str" class="fa-solid fa-hand-fist" style="color:#00BFFF; font-size: 25px; margin: 10px auto; ">${heroes[player.hero].strength}</i>
        `)

        ew.addTxt(`
            <i style="font-size: 30px;"> </i><br>
            <i style="font-size: 25px;">VS</i><br>
        `)

        ew.addTxt(`
            ${'мантикора'.toUpperCase()}<br>
            <i id="em_hp" class="fa-solid fa-heart" style="color:red; font-size: 25px; margin: 20px auto;">${game.diceRollResultGlobal}</i><br>
        `)

        const pl_hp = document.getElementById('pl_hp')
        const em_hp = document.getElementById('em_hp')

        function endBattle(txt){
            ew.drawEW(txt)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
        }

        function reroll(){

            const trueFn = ()=>{ 
                const new_em_hp = Number(em_hp.innerHTML) - player.attack
                em_hp.innerHTML = new_em_hp
                ew.drawEW(`Ви поранили Мантикору`)
                setTimeout(() => {
                    ew.removeLastEW()
                    ew.removeRawBtnInEW('roll')
                    document.querySelectorAll('.dice-section').forEach((item)=>{
                        item.remove()
                    })
                    reroll()
                    
                }, 1200);
                
                if (new_em_hp === 0) return endBattle(`Ви перемогли Мантикору`)
            }
            
            const falseFn = ()=>{
                game.changeHealth(-1)
                pl_hp.innerHTML = heroes[player.hero].health
                
                ew.drawEW(`Ви троимали поранення(`)
                setTimeout(() => {
                    ew.removeLastEW()
                    ew.removeRawBtnInEW('roll')
                    document.querySelectorAll('.dice-section').forEach((item)=>{
                        item.remove()
                    })
                    reroll()
                    
                }, 1200);

                if (heroes[player.hero].health === 0) {
                    endBattle(`Ви загинули(`)
                    game.endGame()
                    return
                }
            }
    
            ew.addDiceRollSection(false, heroes[player.hero].strength, false, true, 2, trueFn, falseFn, false, false)
        }

        reroll()
        
    }

    ew.addDiceRollSection(false, 6, false, true, 1, enterBattle, false, false, false)


    /*На Вас напала мантикора. 
    Бросьте 1d6; выпавший результат будет количеством здоровья мантикоры. 
    Выполните проверку Силы. 
    В случае Успеха, мантикора получает 1 ранение. 
    В случае провала 1 ранение получаете Вы. 
    Продолжайте выполнять проверку Силы до тех пор, пока Вы или Ваш противник не погибнете.*/
}

function goblinWithTreasure() {
    ew.removeRawBtnInEW('btn_ew')

    const trueFn1 = ()=>{
        ew.drawEW(`Ви спіймали Гобліна`)

        setTimeout(() => {
            ew.removeLastEW()
            ew.removeRawBtnInEW('roll')
            ew.removeTxt()
            
            document.querySelectorAll('.dice-section').forEach((item)=>{
                item.remove()
            })

            const trueFn2 = ()=>{
                const card = game.getRundomElement(game.treasure_cards, treasure_cards)
                player.treasureCardContainer.push(card)
                game.drawTreasurePackCards()

                ew.drawEW(`Ви змогли забрати у Гобліна скарб`)
                ew.drawCardsInEW(card)
                ew.drawBtnInEW('btn_next', 'Далі', ()=>{ew.removeAllEW()});
            }

            const falseFn2 = ()=>{
                ew.drawEW(`Ви не змогли забрати у Гобліна жодного скарбу. Він утік.`)
                setTimeout(() => {
                    ew.removeAllEW()
                }, 1200);
            }

            ew.addDiceRollSection(`Ваша Сила : ${heroes[player.hero].strength}`, heroes[player.hero].strength, false,true, 2, trueFn2, falseFn2)


        }, 1200);

    }

    const falseFn1 = ()=>{
        ew.drawEW(`Ви не змогли спіймати Гобліна`)
        setTimeout(() => {
            ew.removeAllEW()
        }, 1200);
    }

    ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn1, falseFn1)


    /*В темноте Вы увидели силуэт гоблина. 
    Судя по большому мешку за спиной, у него наверняка есть что-нибудь ценное. 
    Выполните проверки Ловкости и Силы (если первая проверка провалена, вторую выполнять не нужно). 
    Если обе проверки выполнены Успешно, Вы словили гоблина и отобрали у него сокровище; 
    тяните Карту Сокровища.*/
}

function healingSpring(){
    ew.removeRawBtnInEW('btn_ew')

    const result = ()=>{ 
        const result = game.diceRollResultGlobal
        let healing
        if (2 >=result) healing = 1
        if (3 >= result >= 4) healing = 2
        if (result >= 5) healing = 3
        game.changeHealth(healing) 
        ew.drawEW(`Ви зцілили ${healing} здоров'я`)
        setTimeout(() => {
            ew.removeAllEW()
        }, 1200);
        if(player.curseOfTheSorcerer){
            player.curseOfTheSorcerer = false
            player.eventCardContainer.forEach((card, id)=>{
                if(card.name === 'Проклятие Колдуна') player.eventCardContainer.splice(id, 1);
            })
        }
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)

    /*Вы нашли целебный источник. 
    Бросьте 1d6: 1-2 - У Вас исцеляется 1 ранение. 
    3-4 - У Вас исцеляется 2 ранения. 
    5-6 - У Вас исцеляется 3 ранения.*/
}

function armyOfGhosts(){
    ew.removeRawBtnInEW('btn_ew')

    const result = ()=>{ 
        const result = game.diceRollResultGlobal
        let damage

        if (result<=2) {
            ew.drawEW(`Ви подолали свій страх і залишилися цілими`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
        }

        if (3<= result && result <=4) {
            damage = 3
            
            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);

        }

        if (5<=result) {
            damage = 3
            if (heroes[player.hero].resolve !== 0 ) changeResolve(-1)
            

            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
                player.skipMove += 1
            }, 1200);
        }

        game.changeHealth(-damage)
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)

    /*Вокруг Вас начинают появляться призраки павших воинов. 
    Вы чувствуете потерю сил, страх и отчаяние. 
    Бросьте 1d6: 
    1-2 - Вы преодолели свой страх и остались целы. 
    3-4 - Вы получаете 3 ранения. 
    5-6 - Вы получаете З ранения, сбрасываете 1 жетон решимости (если есть) и пропускаете следующий ход.*/
}

function warriorOfAbyss(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        ew.drawEW(`Ви не отримали додаткові поранення`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        ew.drawEW(`Ви отримали 2 додаткові рани від крововтечі`)
        game.changeHealth(-2)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    function dexterity(){
        ew.clear()
        ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)
    }

    function defense(){
        ew.clear()
        ew.addDiceRollSection(`Ваш Захист: ${heroes[player.hero].defense}`, heroes[player.hero].defense, false, true,2, trueFn, falseFn)
    }

    function luck(){
        ew.clear()
        ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn, falseFn)
    }

    const result = ()=>{ 
        const damage = game.diceRollResultGlobal
            
        ew.drawEW(`Ви отримали ${damage} поранення`)
        setTimeout(() => {
            document.querySelector('.dice-container').remove()
            ew.removeLastEW()
            ew.removeRawBtnInEW('roll')
            ew.removeTxt()
            

            ew.drawBtnInEW('btn_dx','Спритність', dexterity)
            ew.drawBtnInEW('btn_df','Захист',defense)
            ew.drawBtnInEW('btn_luk','Удачу',luck)
        }, 1200);

        game.changeHealth(-damage)
        
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)


    /*На Вас напал воин бездны. 
    В бою Вы были ранены. 
    Бросьте 1d6 и нанесите количество ранений, соответствующее результату броска. 
    Выполните проверку одной из характеристик по выбору: Ловкости, Защиты или Удачи. 
    В случае неудачи получите 2 дополнительных раны от кровопотери.*/
}

function bloodthirstyLizard(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        game.changeHealth(-2)
        ew.drawEW(`Ви отримали 2 поранення`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        game.changeHealth(-6)
        ew.drawEW(`Ви отримали 6 поранень`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn, falseFn)

    /*Из темноты Вас атаковал кровожадный ящер. 
    Выполните проверку Удачи. 
    В случае успеха проверки получите 2 ранения. 
    В противном случае получите 6 ранений.*/
}

function bats(){
    ew.removeRawBtnInEW('btn_ew')

    const result = ()=>{ 
        const result = game.diceRollResultGlobal
        let damage

        if (result<=2) {
            ew.drawEW(`Ви залишилися цілими і не отримуєте поранень`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
        }

        if (3<= result) {
            damage = 1
            
            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
        }


        game.changeHealth(-damage)
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)

    /*На Вас налетела стая гигантских летучих мышей, желающих испить свеж ей крови. 
    Бросьте 1d6: 
    1-2 - Вы остались целы и не получаете ранений; 
    3-6 - Получите 1 ранение.*/
}

function evilGoblin(){
    ew.removeRawBtnInEW('btn_ew')

    const result = ()=>{ 
        const result = game.diceRollResultGlobal
        let damage

        if (result<=2) {
            ew.drawEW(`Ви вбили гобліна і залишилися неушкодженими`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
        }

        if (3<= result && result <=4) {
            damage = 3
            
            ew.drawEW(`Ви вбили гобліна але отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);

        }

        if (5<=result) {
            damage = 3

            const maxValue = player.treasureCardContainer.length-1
            const randomId = Math.floor(Math.random() * maxValue)
            
            player.treasureCardContainer.splice(randomId, 1)
            game.drawTreasurePackCards()
            
            ew.drawEW(`Гоблін поранив Вас (ви отримали ${damage} поранення), вкрав один із скарбів та втік`)
            setTimeout(() => {ew.removeAllEW()}, 2000);
        }

        game.changeHealth(-damage)
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)

    /*Вас атаковал злобный гоблин. 
    Бросьте 1d6: 
    1-2 - Вы убили гоблина и остались невредимы. 
    3-4 - Вы убили гоблина и получили 3 ранения. 
    5-6 - Гоблин ранил Вас и сбежал: получите 3 ранения и выполните проверку Ловкости; 
    в случае провала, сбросьте случайным образом 1 из своих Трофеев (если есть).*/

    //TODO добавить проверти на наличие карт в сокровищах
}

function orcAttack(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        ew.drawEW(`Ви отримали 2 поранення`)
        game.changeHealth(-2)
        if (game.nextCoordinates.length === 0) {
            ew.removeAllEW()
            game.changeHealth(-5)
            ew.drawEW(`Вам нікуди бігти, отримайте 5 поранень`)
            setTimeout(() => {ew.removeAllEW()}, 1200);
            return  
        }
        player.extraMove = true
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        ew.drawEW(`Ви отримали 2 поранення`)
        game.changeHealth(-2)
        setTimeout(() => {ew.removeAllEW()}, 1200);
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

    /*Выполните проверку Ловкости или Удачи. 
    В случае Успеха получите 2 ранения и выполните еще одно перемещение 
    (если возможно, 'Далі'), игнорируя двери и решетки, иначе получите 5 ранений.*/
}

function treasureGuard(){
    ew.removeRawBtnInEW('btn_ew')

    game.changeHealth(-2)
    ew.drawEW(`Ви отримали 2 поранення`)
    setTimeout(() => {
        ew.removeLastEW()
        if(player.treasureCardContainer.length === 0) {
            ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
            return
        }

        const countCards = player.treasureCardContainer.length
        const emptyFelds = []
        let damage = countCards

        ew.addBtnInEW('close', 'Не віддавати трофеї', ()=>{
            emptyFelds.forEach(card=>{player.treasureCardContainer.push(card)})
            game.drawTreasurePackCards()
            ew.removeAllEW()
        })
        ew.addEmptyFeldForCard(countCards)
        ew.addBtnInEW('next', 'Віддавати трофеї', ()=>{
            damage -= emptyFelds.length

            game.changeHealth(-damage)
            game.drawTreasurePackCards()
            
            ew.drawEW(`Ви отримали ${damage} додаткових пораненнь`)
            setTimeout(() => {ew.removeAllEW()}, 2000);
        })

        ew.addPackCards(player.treasureCardContainer)
        const btnNext = document.getElementById('next')
        btnNext.style.display = 'none'

        addScrolCardsEffect('.event-deck-container', (e)=> {
            
            if (emptyFelds.length >= countCards) return

            const [card] = removeCardFromPack(e)

            emptyFelds.push(card)
            drawCardToFeld(countCards)
        });

        function removeCardFromPack(e) {
            const id = e.target.getAttribute('id')
            const card = player.treasureCardContainer.splice(id, 1)

            ew.updatePackCardsEW(player.treasureCardContainer)

            return card
        }

        function drawCardToFeld(count){
            if(emptyFelds.length === count) btnNext.style.display = 'block'
            if(emptyFelds.length < count) btnNext.style.display = 'none'
            
            for (let i = 0; i < count; i++) {
                const feld = document.getElementById(`card-feld-${i}`)
    
                if(emptyFelds[i]===undefined) return feld.innerHTML = ''

                if(emptyFelds.length === 0) return 

                feld.innerHTML = `<div id="${i}" class="card" style="background-image: url('img/${emptyFelds[i].pack}_cards/${emptyFelds[i].pack}_${emptyFelds[i].id}.jpg')"></div>`
                
                feld.addEventListener('click', ()=>{
                    const [card] = emptyFelds.splice(i, 1)

                    if(card) {
                        player.treasureCardContainer.push(card)
                        game.drawTreasurePackCards()
                        drawCardToFeld(count)  
                    }
                })
            }
        }
    }, 1200);


    /*На Вас напал страж сокровищ. 
    Получите 2 ранения сразу, а также по 1 ранению за каждый свой Трофей. 
     Вы можете сбросить любое количество своих Трофеев, чтобы не получать за них ранения.*/
}

function stoneBall(){
    ew.removeAllEW()
    const coord = game.newCoordinate(true)

    if (coord.length > 0){
        game.changeHealth(-1)
        ew.drawEW(`Ви отримали 1 поранення`)
        player.extraMove = true
        game.removeHighlightFields(game.nextCoordinates)
        game.removeAllIcon()
        game.nextCoordinates = coord
        setTimeout(() => {
            ew.removeAllEW()
        }, 2000);
    }

    if (coord.length === 0){
        game.changeHealth(-4)
        ew.drawEW(`Ви отримали 4 поранення`)
        setTimeout(() => {
            ew.removeAllEW()
        }, 2000);
    }

    /*На Вас катится огромный шар. 
    Вы обязаны выполнить еще одно перемещение в соседнюю область, получив 1 ранение. 
    Перемещаться можно только в исследованную область через проходы, которые не преграждают двери и решётки. 
    Если этого сделать не удалось, получите 4 ранения и останьтесь в текущей комнате.*/
}

function curseOfTheSorcerer(){
    ew.removeRawBtnInEW('btn_ew')

    const resolve = heroes[player.hero].resolve
    player.oldResolve = resolve
    player.curseResolve = true
    ew.drawBtnInEW('next', 'Далі', ()=>{
        const card = dungeon_cards[52]
        player.eventCardContainer.push(card)
        if (player.curseOfTheSorcerer) ew.removeAllEW()
        if (!player.curseOfTheSorcerer) {
            player.curseOfTheSorcerer = true
            const damage = 1 + resolve
            game.changeHealth(-damage)
            
            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 2000);
        }
    })

    if (resolve >= 3){
        ew.drawBtnInEW('btn_next', 'Зняти прокляття<br>за 3 рішучості', ()=>{ew.removeAllEW()})
    }
    
    /*Колдун навел на Вас проклятие. 
    Вы чувствуете боль и слабость. 
    Получите 1 ранение сразу, а также по 1 ранению за каждый имеющийся у Вас жетон решимости. 
    Сохраните эту карту. 
    Пока она у Вас, получайте по 1 ранению каждый раз, когда получаете жетон решимости. 
    Чтобы снять проклятие и сбросить эту карту, необходимо сбросить 3 жетона решимости, 
    либо разыграть эффект карты Целебный Источник.*/
}

function darkPortal(){
    ew.removeRawBtnInEW('btn_ew')

    function result(){ 
        const result = game.diceRollResultGlobal
        const damage = result * 2

        ew.drawEW(`Ви отримете ${damage} поранення`)
        ew.drawBtnInEW('btn_reRoll','Перекинути (+1 поранення)', ()=>{
            ew.removeLastEW()
            
            game.changeHealth(-1)
            diceDamage()
        })

        ew.drawBtnInEW('btn_next','Далі', ()=>{
            ew.removeLastEW()

            game.changeHealth(-damage)

            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {ew.removeAllEW()}, 1200);
        })
    }

    function diceDamage(){
        ew.clear()
        ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)

    }

    const trueFn = ()=> {
        ew.drawEW(`Вам вдалося пробитися до порталу<br>та зруйнувати його`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        ew.drawEW(`Вам не вдалося пробитися до порталу`)
        setTimeout(() => {
            ew.removeLastEW(); 
            diceDamage()
        }, 1200);
    }

    function dexterity(){
        ew.clear()
        ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)
    }

    function defense(){
        ew.clear()
        ew.addDiceRollSection(`Ваш Захист: ${heroes[player.hero].defense}`, heroes[player.hero].defense, false, true,2, trueFn, falseFn)
    }

    function luck(){
        ew.clear()
        ew.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn, falseFn)
    }

    ew.addTxt('Пройти перевірку на:')
    ew.drawBtnInEW('btn_dx','Спритність', dexterity)
    ew.drawBtnInEW('btn_df','Захист',defense)
    ew.drawBtnInEW('btn_luk','Удачу',luck)

    /*Вы увидели выходящего из портала монстра. 
    Выполните проверку одной из характеристик: Ловкости, Защиты, или Удачи. 
    В случае успеха Вам удалось пробиться к порталу и разрушить его. 
    В случае провала монстр Вам помешал; 
    бросьте 116, умножьте выпавшее число на 2 и получите количество ранений, эквивалентное результату. 
    Если результат броска Вас не устроил, Вы можете выполнить повторный бросок, получив при этом 1 ранение.*/
}

function livingArmor(){
    ew.removeRawBtnInEW('btn_ew')

    const result = ()=>{ 
        const result = game.diceRollResultGlobal
        let damage

        if (result<=2) {
            damage = 1
            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
        }

        if (3<= result && result <=4) {
            damage = 2
            
            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);

        }

        if (5<=result) {
            damage = 3

            ew.drawEW(`Ви отримали ${damage} поранення`)
            setTimeout(() => {
                ew.removeAllEW()
            }, 1200);
        }

        game.changeHealth(-damage)
    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)

    /*Вас атаковали ожившие доспехи. 
    Бросьте 1d6: 
    1-2- Получите 1 ранение; 
    3-4 – Получите 2 ранения; 
    5-6 - Получите 3 ранения.*/
}

function fierceCutthroat(){
    ew.removeRawBtnInEW('btn_ew')
    ew.clear()

    function bribe(){
        const countCards = player.treasureCardContainer.length

        if(countCards<2) {
            ew.drawEW(`У вас не достатньо трофеїв`)
            setTimeout(() => {
                ew.removeLastEW()
                return battle()
            }, 2000);
        }

        if(countCards >=2 ) {
            const card1 = Math.floor(Math.random() * (player.treasureCardContainer.length-1))
            player.treasureCardContainer.splice(card1, 1)
            
            const card2 = Math.floor(Math.random() * (player.treasureCardContainer.length-1))
            player.treasureCardContainer.splice(card2, 1)

            ew.drawEW(`Ви втратили 2 трофеї`)
            game.drawTreasurePackCards()
            setTimeout(() => {
                ew.removeAllEW()
            }, 2000);
        }
    }

    function endBattle(txt){
        ew.drawEW(txt)
        setTimeout(() => {
            ew.removeAllEW()
        }, 1200);
    }

    function battle(){
        ew.clear()
        
        ew.addTxt(`
            ${player.hero.toUpperCase()}<br>
            <i id="pl_hp" class="fa-solid fa-heart" style="color:red; font-size: 25px; margin: 10px auto;">${heroes[player.hero].health}</i><br>
        `)

        ew.addTxt(`
            <i style="font-size: 30px;"> </i><br>
            <i style="font-size: 25px;">VS</i><br>
        `)

        ew.addTxt(`
            ${'Головоріз'.toUpperCase()}<br>
            <i id="em_hp" class="fa-solid fa-heart" style="color:red; font-size: 25px; margin: 20px auto;">5</i><br>
        `)

        const pl_hp = document.getElementById('pl_hp')
        const em_hp = document.getElementById('em_hp')

        function reroll(){

            const trueFn = ()=>{ 
                const new_em_hp = Number(em_hp.innerHTML) - player.attack
                
                if(game.diceRollResultGlobal<=3){
                    em_hp.innerHTML = new_em_hp
                    ew.drawEW(`Ви поранили Головоріза`)
                    setTimeout(() => {
                        ew.removeLastEW()
                        document.querySelectorAll('button')?.forEach((item)=>{item.remove()})
                        document.querySelectorAll('.dice-section')?.forEach((item)=>{item.remove()})
                        reroll()
                    }, 1200);
                }

                if(game.diceRollResultGlobal>3){
                    game.changeHealth(-1)
                    pl_hp.innerHTML = heroes[player.hero].health
                    ew.drawEW(`Ви отримали поранення`)
                    setTimeout(() => {
                        ew.removeLastEW()
                        document.querySelectorAll('button')?.forEach((item)=>{item.remove()})
                        document.querySelectorAll('.dice-section')?.forEach((item)=>{item.remove()})
                        reroll()
                    }, 1200);
                }

                if (new_em_hp <= 0) return endBattle(`Ви перемогли Головоріза`)

                if (heroes[player.hero].health === 0) {
                    endBattle(`Ви загинули(`)
                    setTimeout(() => {
                        ew.removeAllEW()
                        game.endGame()
                    }, 2000);
                }
            }
    
            ew.addDiceRollSection(false, 6, false, true, 1, trueFn, false, false, false)
        }

        reroll()
    }

    ew.drawBtnInEW('btn_br','Дати хабар', bribe)
    ew.drawBtnInEW('btn_df','Битись', battle)

    /*Ваш путь преградил головорез с количеством здоровья 5. 
    Вы можете сбросить случайным образом 2 своих Трофея 
    (если есть) в качестве взятки и закончить свой ход без боя, сбросив эту карту, 
    иначе головорез Вас атакует. 
    Бросьте 1d6. 
    Если выпало 1-3, головорез получает 1 ранение, 
    иначе 1 ранение получаете Вы. 
    Бросайте 116 до тех пор, пока Вы или Ваш противник не погибнете.*/
}

function collapsedBeam(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        ew.drawEW(`Вам вдалося ухилитися`)
        setTimeout(() => {ew.removeAllEW()}, 1200);
    }

    const falseFn = ()=> {
        game.changeHealth(-1)
        ew.drawEW(`Ви отримали 1 поранення. Та пропустите хід`)
        setTimeout(() => {
            ew.removeAllEW(); 
            game.endMove()
        }, 1200);
    }

    ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)

    /*Небольшая часть кладки потолка вместе с балкоОЙ рухнула прямо на Вас. 
    Выполните проверку Ловкости. 
    Если проверка провалена, получите 1 ранение и пропустите 1 ход.*/
}

function goldCoins(){
    player.treasureCardContainer.push(dungeon_cards[57])
    game.drawTreasurePackCards()
    ew.removeAllEW()

    /* "трофей" Комната пуста, однако на полу Вы заметили небольшой кошелёк. 
    Внутри него Вы нашли золотые монеты.*/
}

function preciousStone(){
    player.treasureCardContainer.push(dungeon_cards[58])
    game.drawTreasurePackCards()
    ew.removeAllEW()

    /* "трофей" Комната пуста, однако Вы заметили как под ногами что-то свернуло. 
    Вы наклонились и подняли красивый камень, за который торговцы дадут не один десяток золотых.*/
}

function cardShuffling(){
    game.refreshDungeonCards()
    ew.removeAllEW()
    const card = game.getRundomElement(game.dungeon_cards, dungeon_cards)

    ew.drawCardEW(card);

    /*Сбросьте эту карту. 
    Затем перемешайте сброшенные и неиспользованные Карты Подземелья. 
    Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/
}

const dungeon_cards = [
    /*0*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    /*1*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    /*2*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    /*3*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    /*4*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    /*5*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    /*6*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    /*7*/new Card(1, 'Нападение', false, false, ()=>{attack()}, 'Далі'),
    
    /*8*/new Card(2, 'Скрытая Ловушка', false, false, ()=>{trap()}, 'Далі'),
    /*9*/new Card(2, 'Скрытая Ловушка', false, false, ()=>{trap()}, 'Далі'),
    /*10*/new Card(2, 'Скрытая Ловушка', false, false, ()=>{trap()}, 'Далі'),
    /*11*/new Card(2, 'Скрытая Ловушка', false, false, ()=>{trap()}, 'Далі'),
    /*12*/new Card(2, 'Скрытая Ловушка', false, false, ()=>{trap()}, 'Далі'),
    /*13*/new Card(2, 'Скрытая Ловушка', false, false, ()=>{trap()}, 'Далі'),
    /*14*/new Card(2, 'Скрытая Ловушка', false, false, ()=>{trap()}, 'Далі'),
    
    /*15*/new Card(3, 'Мертвый Приключенец', false, false, ()=>{deadAdventurer()}, 'Далі'),
    /*16*/new Card(3, 'Мертвый Приключенец', false, false, ()=>{deadAdventurer()}, 'Далі'),
    /*17*/new Card(3, 'Мертвый Приключенец', false, false, ()=>{deadAdventurer()}, 'Далі'),
    
    /*18*/new Card(4, 'Склеп', false, false, ()=>{crypt()}, 'Далі'),
    /*19*/new Card(4, 'Склеп', false, false, ()=>{crypt()}, 'Далі'),
    /*20*/new Card(4, 'Склеп', false, false, ()=>{crypt()}, 'Далі'),
    
    /*21*/new Card(5, 'Обвал', false, false, ()=>{collapse()}, 'Далі'),
    /*22*/new Card(5, 'Обвал', false, false, ()=>{collapse()}, 'Далі'),
    /*23*/new Card(5, 'Обвал', false, false, ()=>{collapse()}, 'Далі'),
    
    /*24*/new Card(6, 'Пусто', false, false, ()=>{ew.removeAllEW()}, 'Далі'),
    /*25*/new Card(6, 'Пусто', false, false, ()=>{ew.removeAllEW()}, 'Далі'),
    
    /*26*/new Card(7, 'Захоронение', false, false, ()=>{burial()}, 'Далі'),
    /*27*/new Card(7, 'Захоронение', false, false, ()=>{burial()}, 'Далі'),
    
    /*28*/new Card(8, 'Обрушение Стен', false, false, ()=>{wallCollapse()}, 'Далі'),
    /*29*/new Card(8, 'Обрушение Стен', false, false, ()=>{wallCollapse()}, 'Далі'),
    
    /*30*/new Card(9, 'Подземный Некрополь', false, false, ()=>{undergroundNecropolis()}, 'Далі'),
    /*31*/new Card(9, 'Подземный Некрополь', false, false, ()=>{undergroundNecropolis()}, 'Далі'),
    
    /*32*/new Card(10, 'Гоблин-Исследователь', false, false, ()=>{goblinExplorer()}, 'Далі'),
    /*33*/new Card(10, 'Гоблин-Исследователь', false, false, ()=>{goblinExplorer()}, 'Далі'),
    
    /*34*/new Card(11, 'Комната с Засадой', false, false, ()=>{ambushRoom()}, 'Далі'),
    /*35*/new Card(12, 'Окружение Монстрами', false, false, ()=>{surroundedByMonsters()}, 'Далі'),
    /*36*/new Card(13, 'Секретная Дверь', false, false, ()=>{secretDoor()}, 'Далі'),
    /*37*/new Card(14, 'Спуск в Катакомбы', false, false, ()=>{descentToCatacombs()}, 'Далі'),
    /*38*/new Card(15, 'Гиганская Змея', false, false, ()=>{giantSnake()}, 'Далі'),
    /*39*/new Card(16, 'Волшебная комната', false, false, ()=>{magicRoom()}, 'Далі'),
    /*40*/new Card(17, 'Толпа Мертвецов', false, false, ()=>{deadCrowd()}, 'Далі'),
    /*41*/new Card(18, 'Мантикора', false, false, ()=>{manticore()}, 'Далі'),
    /*42*/new Card(19, 'Гоблин с Сокровищем', false, false, ()=>{goblinWithTreasure()}, 'Далі'),
    
    /*43*/new Card(20, 'Целебный Источник', false, false, ()=>{healingSpring()}, 'Далі'),
    /*44*/new Card(21, 'Армия Призраков', false, false, ()=>{armyOfGhosts()}, 'Далі'),
    /*45*/new Card(22, 'Воин Бездны', false, false, ()=>{warriorOfAbyss()}, 'Далі'),
    /*46*/new Card(23, 'Кровожадный Ящер', false, false, ()=>{bloodthirstyLizard()}, 'Далі'),
    /*47*/new Card(24, 'Летучие Мыши', false, false, ()=>{bats()}, 'Далі'),
    /*48*/new Card(25, 'Злобный Гоблин', false, false, ()=>{evilGoblin()}, 'Далі'),
    /*49*/new Card(26, 'Нападение Орка', false, false, ()=>{orcAttack()}, 'Далі'),
    /*50*/new Card(27, 'Страж Сокровищ', false, false, ()=>{treasureGuard()}, 'Далі'),
    /*51*/new Card(28, 'Каменный шар', false, false, ()=>{stoneBall()}, 'Далі'),
    /*52*/new Card(29, 'Проклятие Колдуна', false, false, ()=>{curseOfTheSorcerer()}, 'Далі'),
    
    /*53*/new Card(30, 'Темный портал', false, false, ()=>{darkPortal()}, 'Далі'),
    /*54*/new Card(31, 'Ожившие Доспехи', false, false, ()=>{livingArmor()}, 'Далі'),
    /*55*/new Card(32, 'Свирепый Головорез', false, false, ()=>{fierceCutthroat()}, 'Далі'),
    /*56*/new Card(33, 'Рухнувшая Балка', false, false, ()=>{collapsedBeam()}, 'Далі'),
    /*57*/new Card(34, 'Золотые Монеты', 'treasure', 40, ()=>{goldCoins()}, 'Далі'),
    /*58*/new Card(35, 'Драгоценный Камень', 'treasure', 60, ()=>{preciousStone()}, 'Далі'),
    /*50*/new Card(36, 'Перемешивание Карт', false, false, ()=>{cardShuffling()}, 'Далі'),
]

export {dungeon_cards}
