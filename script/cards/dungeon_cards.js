import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';
import  {ew}  from '../eventWidows.js';
import  {game}  from '../game.js';
import  {player}  from '../player.js';
import  {heroes}  from '../cards/heroes.js';
import  {monster_cards}  from './monster_cards.js';
import  {trap_cards}  from './trap_cards.js';
import  {deadman_cards}  from './deadman_cards.js';
import  {сrypt_cards}  from './сrypt_cards.js';


class Card {
    constructor(id, name, effect, btnName) {
        this.id = id;  
        this.name = name;  
        this.effect = effect;  
        this.btnName = btnName;  
        this.title = 'Події підземелля';  
        this.pack = 'dungeon';  
    };

};

function distributionCards(arr){
    arr.forEach(card => {
        if (card.type === 'treasure') player.treasureCardContainer.push(card)
        if (card.type === 'event') player.eventCardContainer.push(card)
    });
}

function attack(){
    const card = game.getRundomElement(game.monster_cards, monster_cards)
    distributionCards([card])

    ew.removeAllEW();
    game.drawCardEW(card)
    /*На Вас напали! Вам предстоит вступить в бой с монстром. Тяните Карту Монстра.*/
}

function trap(){
    const card = game.getRundomElement(game.trap_cards, trap_cards)
    distributionCards([card])

    ew.removeAllEW(); 
    game.drawCardEW(card)
    /*Своим неосторожным движением Вы активировали ловушку. Тяните Карту Ловушки.*/
}

function deadAdventurer(){
    const card = game.getRundomElement(game.deadman_cards, deadman_cards)
    distributionCards([card])

    ew.removeAllEW(); 
    game.drawCardEW(card)
    /*Вы увидели мертвого приключенца. Чтобы обыскать его тяните Карту Мертвеца.*/
}

function crypt(){
    const card = game.getRundomElement(game.сrypt_cards, сrypt_cards)
    distributionCards([card])

    ew.removeAllEW(); 
    game.drawCardEW(card)
    /*Вы можете обыскать склеп в надежде найти что-нибудь ценное. Если Вы решили это сделать, тяните Карту Склепа.*/
}

function collapse(){
    ew.removeAllEW();
    game.rotateRoomTile(90) 
    /*Случился обвал! Хотя часть пути и завалило обломками, другая часть пути освободилась. 
    Поверните тайл комнаты, где Вы находитесь, на 90° по часовой стрелке.*/
}

function burial(){
    ew.removeAllEW()

    const cards = [game.getRundomElement(game.deadman_cards, deadman_cards),
                   game.getRundomElement(game.deadman_cards, deadman_cards),
                   game.getRundomElement(game.deadman_cards, deadman_cards)]

    distributionCards(cards)

    game.drawCardEW(cards)
    ew.removeTitile()
    ew.addTitleToEW('Події підземелля')

    ew.removeRawBtnInEW('btn_ew')
    ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    /*Вы нашли захоронение. Вы можете вытянуть сразу 3 Карты Мертвеца.*/
}

function wallCollapse(){
    ew.removeRawBtnInEW('btn_ew')

    const falseFn = ()=>{
        if (game.nextCoordinates.length === 0) game.endGame()
        heroes[player.hero].health -= 2
        player.extraMove = true
        game.removePreviousTileField = true
    }

    game.addDiceRollSection( `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true, 2, false, falseFn)

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
    
    distributionCards(cards)

    game.drawCardEW(cards)
    ew.removeTitile()
    ew.addTitleToEW('Події підземелля')

    ew.removeRawBtnInEW('btn_ew')
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

    const container = document.querySelector('.event-section')
    container.style.flexDirection = 'column'
    ew.removeRawBtnInEW('btn_ew')
    ew.addBtnInEW('close', 'Не віддавати трофеї', ()=>{ew.removeAllEW()})
    ew.addEmptyFeldForCard(2)
    ew.addBtnInEW('next', 'Віддавати трофеї', ()=>{
        game.removeHighlightFields(game.nextCoordinates)
        game.nextCoordinates = game.getCoordinatesWithoutRoom()
        game.drawHeroMitl(player.position[0], player.position[1]);
        game.removeAllIcon()

        ew.removeAllEW()
    })
    ew.addPackCards(player.treasureCardContainer, 'event-deck-container')
    
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

                    ew.updatePackCardsEW(player.treasureCardContainer)
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
        player.escapeBattle = false
        const cards = [game.getRundomElement(game.monster_cards, monster_cards),
            game.getRundomElement(game.monster_cards, monster_cards)]
            game.gameFields[player.position[1]][player.position[0]]['m'] = cards

        distributionCards(cards)

        game.drawCardEW(cards)
        ew.removeTitile()
        ew.addTitleToEW('Події підземелля')

        ew.removeRawBtnInEW('btn_ew')
        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    game.addDiceRollSection( `Ваша cпритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)

    /*В комнату вошли монстры, а на выходы начали опускаться решетки. 
    Выполните проверку Ловкости. 
    В случае успеха Вам удалось убежать; разместите в текущей комнате жетон монстра и выполните еще одно перемещение, игнорируя двери и решетки. 
    В случае провала проверки (или если выполнить перемещение невозможно) вытяните две Карты Монстров и сразитесь поочередно с каждым из монстров. 
    Вы не можете спастись бегством.*/
}

function surroundedByMonsters(){
    player.escapeBattle = false

    const trueFn = ()=>{
        const cards = [game.getRundomElement(game.monster_cards, monster_cards)]

        game.gameFields[player.position[1]][player.position[0]]['m'] = cards

        distributionCards(cards)

        game.drawCardEW(cards)
        ew.removeTitile()
        ew.addTitleToEW('Події підземелля')

        ew.removeRawBtnInEW('btn_ew')
        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    const falseFn = ()=>{
        const cards = [game.getRundomElement(game.monster_cards, monster_cards),
            game.getRundomElement(game.monster_cards, monster_cards)]

        game.gameFields[player.position[1]][player.position[0]]['m'] = cards

        distributionCards(cards)

        game.drawCardEW(cards)
        ew.removeTitile()
        ew.addTitleToEW('Події підземелля')

        ew.removeRawBtnInEW('btn_ew')
        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    function check( nameValue, value) {
        ew.removeRawBtnInEW('btn_strength')
        ew.removeRawBtnInEW('btn_defense')

        game.addDiceRollSection( `${nameValue}: ${value}`, value, false, false, 2, trueFn, falseFn)
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
        heroes[player.hero].health -= game.diceRollResultGlobal + 2
    }
    
    game.addDiceRollSection( false, 6, false, false,1, trueFn, false)

    /*Вы потревожили гигантскую змею. 
    Бросьте 1d6, добавьте к выпавшему числу 2 и получите количество ранений, эквивалентное результату.*/
}

function magicRoom(){
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=>{
        let angl = 0

        if(game.diceRollResultGlobal<=2) angl = 90
        if(3<=game.diceRollResultGlobal<=4) angl = 270
        if(5<=game.diceRollResultGlobal) angl = 180
        
        game.rotateRoomTile(angl)
        game.removeHighlightFields(game.nextCoordinates)
        game.removeAllIcon()
        game.nextCoordinates = game.newCoordinate()

    }
    
    game.addDiceRollSection( false, 6, false, false,1, trueFn, false)

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

        game.addDiceRollSection(`Ваша Удача: ${heroes[player.hero].luck}`, heroes[player.hero].luck, false, true, 2, trueFn1, falseFn1)
    })
    
    ew.drawBtnInEW('btn_fight', 'Битись', ()=>{
        ew.removeRawBtnInEW('btn_luck')
        ew.removeRawBtnInEW('btn_fight')
        const trueFn2 = ()=>{
            heroes[player.hero].health -= game.diceRollResultGlobal
            ew.removeAllEW()
        }
        game.addDiceRollSection(false, 12, false, true, 2, trueFn2)
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
    



const dungeon_cards = [
    /*1*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    /*2*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    /*3*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    /*4*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    /*5*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    /*6*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    /*7*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    /*8*/new Card(1, 'Нападение', ()=>{attack()}, 'Далі'),
    
    /*9*/new Card(2, 'Скрытая Ловушка', ()=>{trap()}, 'Далі'),
    /*10*/new Card(2, 'Скрытая Ловушка', ()=>{trap()}, 'Далі'),
    /*11*/new Card(2, 'Скрытая Ловушка', ()=>{trap()}, 'Далі'),
    /*12*/new Card(2, 'Скрытая Ловушка', ()=>{trap()}, 'Далі'),
    /*13*/new Card(2, 'Скрытая Ловушка', ()=>{trap()}, 'Далі'),
    /*14*/new Card(2, 'Скрытая Ловушка', ()=>{trap()}, 'Далі'),
    /*15*/new Card(2, 'Скрытая Ловушка', ()=>{trap()}, 'Далі'),
    
    /*16*/new Card(3, 'Мертвый Приключенец', ()=>{deadAdventurer()}, 'Далі'),
    /*17*/new Card(3, 'Мертвый Приключенец', ()=>{deadAdventurer()}, 'Далі'),
    /*18*/new Card(3, 'Мертвый Приключенец', ()=>{deadAdventurer()}, 'Далі'),
    
    /*19*/new Card(4, 'Склеп', ()=>{crypt()}, 'Далі'),
    /*20*/new Card(4, 'Склеп', ()=>{crypt()}, 'Далі'),
    /*21*/new Card(4, 'Склеп', ()=>{crypt()}, 'Далі'),
    
    /*22*/new Card(5, 'Обвал', ()=>{collapse()}, 'Далі'),
    /*23*/new Card(5, 'Обвал', ()=>{collapse()}, 'Далі'),
    /*24*/new Card(5, 'Обвал', ()=>{collapse()}, 'Далі'),
    
    /*25*/new Card(6, 'Пусто', ()=>{ew.removeAllEW()}, 'Далі'),
    /*26*/new Card(6, 'Пусто', ()=>{ew.removeAllEW()}, 'Далі'),
    
    /*27*/new Card(7, 'Захоронение', ()=>{burial()}, 'Далі'),
    /*28*/new Card(7, 'Захоронение', ()=>{burial()}, 'Далі'),
    
    /*29*/new Card(8, 'Обрушение Стен', ()=>{wallCollapse()}, 'Далі'),
    /*30*/new Card(8, 'Обрушение Стен', ()=>{wallCollapse()}, 'Далі'),
    
    /*31*/new Card(9, 'Подземный Некрополь', ()=>{undergroundNecropolis()}, 'Далі'),
    /*32*/new Card(9, 'Подземный Некрополь', ()=>{undergroundNecropolis()}, 'Далі'),
    
    /*33*/new Card(10, 'Гоблин-Исследователь', ()=>{goblinExplorer()}, 'Далі'),
    /*34*/new Card(10, 'Гоблин-Исследователь', ()=>{goblinExplorer()}, 'Далі'),
    
    /*35*/new Card(11, 'Комната с Засадой', ()=>{ambushRoom()}, 'Далі'),
    /*36*/new Card(12, 'Окружение Монстрами', ()=>{surroundedByMonsters()}, 'Далі'),
    /*37*/new Card(13, 'Секретная Дверь', ()=>{secretDoor()}, 'Далі'),
    /*38*/new Card(14, 'Спуск в Катакомбы', ()=>{descentToCatacombs()}, 'Далі'),
    /*39*/new Card(15, 'Гиганская Змея', ()=>{giantSnake()}, 'Далі'),
    /*40*/new Card(16, 'Волшебная комната', ()=>{magicRoom()}, 'Далі'),
    /*41*/new Card(17, 'Толпа Мертвецов', ()=>{deadCrowd()}, 'Далі'),
    /*42*/new Card(18, 'Мантикора', ()=>{return/*На Вас напала мантикора. Бросьте 1d6; выпавший результат будет количеством здоровья мантикоры. Выполните проверку Силы. В случае Успеха, мантикора получает 1 ранение. В случае провала 1 ранение получаете Вы. Продолжайте выполнять проверку Силы до тех пор, пока Вы или Ваш противник не погибнете.*/}, 'Далі'),
    /*43*/new Card(19, 'Гоблин с Сокровищем', ()=>{return/*В темноте Вы увидели силуэт гоблина. Судя по большому мешку за спиной, у него наверняка есть что-нибудь ценное. Выполните проверки Ловкости и Силы (если первая проверка провалена, вторую выполнять не нужно). Если обе проверки выполнены Успешно, Вы словили гоблина и отобрали у него сокровище; тяните Карту Сокровища.*/}, 'Далі'),
    
    /*44*/new Card(20, 'Целебный Источник', ()=>{return/*Вы нашли целебный источник. Бросьте 1d6: 1-2 - У Вас исцеляется 1 ранение. 3-4 - У Вас исцеляется 2 ранения. 5-6 - У Вас исцеляется 3 ранения.*/}, 'Далі'),
    /*45*/new Card(21, 'Армия Призраков', ()=>{return/*Вокруг Вас начинают появляться призраки павших воинов. Вы чувствуете потерю сил, страх и отчаяние. Бросьте 1d6: 1-2 - Вы преодолели свой страх и остались целы. 3-4 - Вы получаете 3 ранения. 5-6 - Вы получаете З ранения, сбрасываете 1 жетон решимости (если есть) и пропускаете следующий ход.*/}, 'Далі'),
    /*46*/new Card(22, 'Воин Бездны', ()=>{return/*На Вас напал воин бездны. В бою Вы были ранены. Бросьте 1d6 и нанесите количество ранений, соответствующее результату броска. Выполните проверку одной из характеристик по выбору: Ловкости, Защиты или Удачи. В случае неудачи получите 2 дополнительных раны от кровопотери.*/}, 'Далі'),
    /*47*/new Card(23, 'Кровожадный Ящер', ()=>{return/*Из темноты Вас атаковал кровожадный ящер. Выполните проверку Удачи. В случае успеха проверки получите 2 ранения. В противном случае получите 6 ранений.*/}, 'Далі'),
    /*48*/new Card(24, 'Летучие Мыши', ()=>{return/*На Вас налетела стая гигантских летучих мышей, желающих испить свеж ей крови. Бросьте 1d6: 1-2 - Вы остались целы и не получаете ранений; 3-6 - Получите 1 ранение.*/}, 'Далі'),
    /*49*/new Card(25, 'Злобный Гоблин', ()=>{return/*Вас атаковал злобный гоблин. Бросьте 1d6: 1-2 - Вы убили гоблина и остались невредимы. 3-4 - Вы убили гоблина и получили 3 ранения. 5-6 - Гоблин ранил Вас и сбежал: получите 3 ранения и выполните проверку Ловкости; в случае провала, сбросьте случайным образом 1 из своих Трофеев (если есть).*/}, 'Далі'),
    /*50*/new Card(26, 'Нападение Орка', ()=>{return/*Выполните проверку Ловкости или Удачи. В случае Успеха получите 2 ранения и выполните еще одно перемещение (если возможно, 'Далі'), игнорируя двери и решетки, иначе получите 5 ранений.*/}, 'Далі'),
    /*51*/new Card(27, 'Страж Сокровищ', ()=>{return/*На Вас напал страж сокровищ. Получите 2 ранения сразу, а также по 1 ранению за каждый свой Трофей. Вы можете сбросить любое количество своих Трофеев, чтобы не получать за них ранения.*/}, 'Далі'),
    /*52*/new Card(28, 'Каменный шар', ()=>{return/*На Вас катится огромный шар. Вы обязаны выполнить еще одно перемещение в соседнюю область, получив 1 ранение. Перемещаться можно только в исследованную область через проходы, которые не преграждают двери и решётки. Если этого сделать не удалось, получите 4 ранения и останьтесь в текущей комнате.*/}, 'Далі'),
    /*53*/new Card(29, 'Проклятие Колдуна', ()=>{return/*Колдун навел на Вас проклятие. Вы чувствуете боль и слабость. Получите 1 ранение сразу, а также по 1 ранению за каждый имеющийся у Вас жетон решимости. Сохраните эту карту. Пока она у Вас, получайте по 1 ранению каждый раз, когда получаете жетон решимости. Чтобы снять проклятие и сбросить эту карту, необходимо сбросить 3 жетона решимости, либо разыграть эффект карты Целебный Источник.*/}, 'Далі'),
    
    /*54*/new Card(30, 'Темный портал', ()=>{return/*Вы увидели выходящего из портала монстра. Выполните проверку одной из характеристик: Ловкости, Защиты, или Удачи. В случае успеха Вам удалось пробиться к порталу и разрушить его. В случае провала монстр Вам помешал; бросьте 116, умножьте выпавшее число на 2 и получите количество ранений, эквивалентное результату. Если результат броска Вас не устроил, Вы можете выполнить повторный бросок, получив при этом 1 ранение.*/}, 'Далі'),
    /*55*/new Card(31, 'Ожившие Доспехи', ()=>{return/*Вас атаковали ожившие доспехи. Бросьте 1d6: 1-2- Получите 1 ранение; 3-4 – Получите 2 ранения; 5-6 - Получите 3 ранения.*/}, 'Далі'),
    /*56*/new Card(32, 'Свирепый Головорез', ()=>{return/*Ваш путь преградил головорез с количеством здоровья 5. Вы можете сбросить случайным образом 2 своих Трофея (если есть) в качестве взятки и закончить свой ход без боя, сбросив эту карту, иначе головорез Вас атакует. Бросьте 1d6. Если выпало 1-3, головорез получает 1 ранение, иначе 1 ранение получаете Вы. Бросайте 116 до тех пор, пока Вы или Ваш противник не погибнете.*/}, 'Далі'),
    /*57*/new Card(33, 'Рухнувшая Балка', ()=>{return/*Небольшая часть кладки потолка вместе с балкоОЙ рухнула прямо на Вас. Выполните проверку Ловкости. Если проверка провалена, получите 1 ранение и пропустите 1 ход.*/}, 'Далі'),
    /*58*/new Card(34, 'Золотые Монеты', ()=>{return/* "трофей" Комната пуста, однако на полу Вы заметили небольшой кошелёк. Внутри него Вы нашли золотые монеты.*/}, 'Далі'),
    /*59*/new Card(35, 'Драгоценный Камень', ()=>{return/* "трофей" Комната пуста, однако Вы заметили как под ногами что-то свернуло. Вы наклонились и подняли красивый камень, за который торговцы дадут не один десяток золотых.*/}, 'Далі'),
    /*60*/new Card(36, 'Перемешивание Карт', ()=>{return/*Сбросьте эту карту. Затем перемешайте сброшенные и неиспользованные Карты Подземелья. Вытяните еще одну карту из этой колоды и продолжайте свой ход в обычном порядке.*/}, 'Далі'),
]

export {dungeon_cards}

// TODO закодировать функции карт подземелий