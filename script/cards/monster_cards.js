import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';
import  {ew}  from '../eventWidows.js';
import  {game}  from '../game.js';
import  {player}  from '../player.js';
import  {heroes}  from '../cards/heroes.js';
import  {trap_cards}  from './trap_cards.js';
import  {deadman_cards}  from './deadman_cards.js';
import  {сrypt_cards}  from './сrypt_cards.js';
import  {search_cards}  from './search_cards.js';
import  {treasure_cards}  from './treasure_cards.js';

class Card {
    constructor(id, name, type, health, penalty, effect) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.health = health;
        this.penalty = penalty;
        this.effect = effect;
        this.title = 'Напад Монстра';
        this.pack = 'monster';
        this.btnName = 'Далі';
    }
}

function ironGolem() {
    ew.removeRawBtnInEW('btn_ew')

    function getCards(){
        const cards = game.getSomeCards(game.сrypt_cards, сrypt_cards, 3)
        ew.drawEW('Карти Склепу')
        ew.addPackCards(cards)
        addScrolCardsEffect('.event-deck-container', false)
        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[0])
        ew.clear()
        ew.drawBtnInEW('next', 'Витягнути 3 Карти Склепу', ()=>{
            ew.removeAllEW()
            getCards()
        })
        ew.drawBtnInEW('skip', 'НЕ витягувати', ()=>{ew.removeAllEW()})

    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[0], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[0], endBattleFn))

    /*Во время боя с этим огромным големом была повреждена стена подземелья, за которой находился некрополь. 
    Победив в бою с этим големом, Вы можете немедленно вытянуть 3 Карты Склепа.*/
}

function iceGolem() {
    ew.removeRawBtnInEW('btn_ew')

    function endBattleFn(){
        if (player.ambushRoom && player.surroundedMonsters) {
            player.ambushRoom = false
            player.surroundedMonsters = false
            ew.removeAllEW()
            return
        }

        player.skipMove = 1
        game.endMove()
        ew.removeAllEW()
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[1], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[1], endBattleFn))
    
    /*Это голем льда. 
    Когда голем погибает, все вокруг замерзает. 
    Если Вы победили его в бою, пропустите свой следующий ход. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

function magmaGolem() {
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        ew.drawEW(`Ви не отримали поранення`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.clear()
            ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[2], endBattleFn))
            ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[2], endBattleFn))
        }, 1200);
    }

    const falseFn = ()=> {
        ew.drawEW(`Ви отримали 2 поранення`)
        game.changeHealth(-2)
        setTimeout(() => {
            ew.removeLastEW()
            ew.clear()
            ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[2], endBattleFn))
            ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[2], endBattleFn))
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

    function endBattleFn(){
        ew.removeAllEW() 
    }

    ew.drawBtnInEW('btn_dx','Спритність', dexterity)
    ew.drawBtnInEW('btn_df','Захист',defense)
    ew.drawBtnInEW('btn_luk','Удачу',luck)

    /*Это голем огня. 
    Он может обжечь Вас пламенем. 
    Перед началом боя выполните проверку одной из характеристик: Удачи, Ловкости, или Защиты. 
    В случае провала проверки дают 2 ранения.*/
}

function stoneGolem() {
    ew.removeRawBtnInEW('btn_ew')

    function endBattleFn(){
        if (player.ambushRoom && player.surroundedMonsters) {
            player.ambushRoom = false
            player.surroundedMonsters = false
            ew.removeAllEW()
            return
        }

        player.extraMove = true
        ew.removeAllEW()
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[3], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[3], endBattleFn))

    /*Этот голем хранит в себе дающую силы энергию природы. 
    Если Вы победили его в бою, то можете немедленно выполнить еще одно перемещение. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

function demonOfSuffering() {
    ew.removeRawBtnInEW('btn_ew')

    function getCards(){
        const card = this.getRundomElement(this.search_cards, search_cards)   
        ew.drawCardEW(card);
    }

    function endBattleFn(){
        if (player.ambushRoom && player.surroundedMonsters) {
            player.ambushRoom = false
            player.surroundedMonsters = false
            ew.removeAllEW()
            return
        }

        ew.drawCardEW(monster_cards[4])
        ew.clear()
        ew.drawBtnInEW('next', 'Обшукати кімнату', ()=>{
            ew.removeAllEW()
            getCards()
        })
        ew.drawBtnInEW('skip', 'НЕ обшукувати', ()=>{ew.removeAllEW()})

    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[4], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[4], endBattleFn))

    /*Победив этого демона в бою, 
    Вы можете немедленно выполнить поиск в комнате, в которой Вы находитесь, если это возможно. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

function demonOfPain() {
    ew.removeRawBtnInEW('btn_ew')

    const trueFn = ()=> {
        ew.drawEW(`Ви не отримали поранення`)
        setTimeout(() => {
            ew.removeLastEW()
            ew.clear()
            ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[5], endBattleFn))
            ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[5], endBattleFn))
        }, 1200);
    }

    const falseFn = ()=> {
        ew.drawEW(`Ви отримали 1 поранення`)
        game.changeHealth(-1)
        setTimeout(() => {
            ew.removeLastEW()
            ew.clear()
            ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[5], endBattleFn))
            ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[5], endBattleFn))
        }, 1200);
    }

    function dexterity(){
        ew.clear()
        ew.addDiceRollSection(`Ваша Спритність: ${heroes[player.hero].dexterity}`, heroes[player.hero].dexterity, true, true,2, trueFn, falseFn)
    }

    function endBattleFn(){
        ew.removeAllEW() 
    }

    ew.drawBtnInEW('btn_dx','Спритність', dexterity)

    /*Этот демон страмительно Вас атаковал. 
    Перед началом боя выполните проверку Ловкости. 
    В случае провала получите 1 ранение.*/
}

function demonOfFear() {
    ew.removeRawBtnInEW('btn_ew')
    heroes[player.hero].resolve = 0
    game.addCharacterTablet(player.hero)

    function endBattleFn(){
        ew.removeAllEW()
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[6], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[6], endBattleFn))

    /*Вы были напуганы жутким видом этого демона. 
    Перед началом боя сбросьте все свои жетоны решимости.*/
}

function demonOfRage() {
    ew.removeRawBtnInEW('btn_ew')

    function getCards(){
        const card = this.getRundomElement(this.treasure_cards, treasure_cards)   
        ew.drawCardEW(card);
    }

    function endBattleFn(){

        ew.drawCardEW(monster_cards[7])
        ew.clear()
        ew.drawBtnInEW('next', 'Витягнути Карту Скарбів', ()=>{
            ew.removeAllEW()
            getCards()
        })
        ew.drawBtnInEW('skip', 'НЕ витягувати', ()=>{ew.removeAllEW()})

    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[7], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[7], endBattleFn))
    /*Этот демон обладает сокровищем. 
    Если Вы победили в бою с этим демоном, возьмите Карту Сокровища.*/
}

function possessedBySpirits() {
    ew.removeRawBtnInEW('btn_ew')
    if (player.ambushRoom && player.surroundedMonsters) {
        player.ambushRoom = false
        player.surroundedMonsters = false
        ew.removeAllEW()
        return
    }
    
    const result = ()=>{ 
        const result = game.diceRollResultGlobal

        function endBattleFn(){ew.removeAllEW()}

        if (result<=2) {
            ew.drawEW(`Нічого не відбувається`)
            setTimeout(() => {
                ew.removeLastEW()
                ew.clear
                ew.addBattleSection(monster_cards[8], endBattleFn)
            }, 1200);
        }

        if (3<= result ) {
            game.rotateRoomTile(180)
            game.removeHighlightFields(game.nextCoordinates)
            game.removeAllIcon()
            game.nextCoordinates = game.newCoordinate()
            
            ew.drawEW(`Кімната розвернулася`)
            setTimeout(() => {
                ew.removeLastEW()
                ew.clear
                ew.addBattleSection(monster_cards[8], endBattleFn)
            }, 1200);
        }

    }

    ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)

    /*Перед началом боя бросьте 1d6: 
    1-2 - Ничего не происходит; 
    3-6 Поверните тайл комнаты, в которой Вы находитесь, на 180°. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

function servantOfTheUnderworld() {
    ew.removeRawBtnInEW('btn_ew')

    const result = ()=>{ 
        const result = game.diceRollResultGlobal

        if (result<=3) {
            ew.drawEW(`Ви пропускаєте свій наступний хід`)
            setTimeout(() => {
                ew.removeAllEW()
                player.skipMove = 1
            }, 1200);
        }

        if (4<= result ) {
            ew.drawEW(`Ви негайно входите до Катакомби`)
            setTimeout(() => {
                ew.removeAllEW()
                game.drawCatacombToken(player.position[0], player.position[1])
                game.getDirectionCatacomb()
            }, 1200);
        }

    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[9])
        ew.clear()
        ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[9], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[9], endBattleFn))

    /*Победив этого колдуна в бою, бросьте 1d6: 
    1-3 - Вы пропускаете свой следующий ход; 
    4-6 - Вы немедленно входите в Катакомбы. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

function servantOfChaos() {
    ew.removeRawBtnInEW('btn_ew')

    function getCards(){
        const card = this.getRundomElement(this.search_cards, search_cards)   
        ew.drawCardEW(card);
    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[10])
        ew.clear()
        ew.drawBtnInEW('next', 'Обшукати', ()=>{
            ew.removeAllEW()
            getCards()
        })
        ew.drawBtnInEW('skip', 'НЕ обшукувати', ()=>{ew.removeAllEW()})

    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[10], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[10], endBattleFn))
    /*Победив этого колдуна в бою, Вы можете обыскать его тело. 
    Тяните Карту Мертвеца.*/
}

function cultAdept() {
    ew.removeRawBtnInEW('btn_ew')

    const maxValue = player.treasureCardContainer.length-1

    if (maxValue>0) {
        const randomId = Math.floor(Math.random() * maxValue)

        player.treasureCardContainer.splice(randomId, 1)
    
        ew.drawEW(`Ви втратили один з своїх тофеїв`)
        setTimeout(() => {ew.removeLastEW()}, 2000);
    }

    function endBattleFn(){
        ew.removeAllEW()
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[11], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[11], endBattleFn))

    /*Этот колдун таким образом наложил проклятие на один из ваших Трофеев, что он стал для Вас неподъёмным. 
    Перед началом боя с этим колдуном случайным образом сбросьте один из своих Трофеев.*/
}

function skeletonWarrior() {
    ew.removeRawBtnInEW('btn_ew')
    
    function getCards(){
        const card = this.getRundomElement(this.deadman_cards, deadman_cards)   
        ew.drawCardEW(card);
    }

    const result = ()=>{ 
        const result = game.diceRollResultGlobal

        if (result<=4) {
            ew.removeAllEW()
            ew.drawCardEW(monster_cards[12])
            ew.clear()
            ew.drawBtnInEW('next', 'Обшукати', ()=>{
                ew.removeAllEW()
                getCards()
            })
            ew.drawBtnInEW('skip', 'НЕ обшукувати', ()=>{ew.removeAllEW()})

        }

        if (5<= result ) {
            ew.drawEW(`Скелет зцілюється від усіх поранень`)
            setTimeout(() => {
                ew.removeAllEW()
                ew.drawCardEW(monster_cards[12])
                ew.clear()
                ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[12], endBattleFn))
                ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[12], endBattleFn))
            }, 1200);
        }

    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[12])
        ew.clear()
        ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[12], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[12], endBattleFn))

    /*Победив этого скелета в бою, бросьте 1d6: 
    1-4 - Скелет побежден и его можно обыскать; тяните Карту Мертвеца; 
    5-6 - Скелет исцеляется от всех ранений и Вам необходимо снова провести с ним бой, после чего снова разыграть этот эффект, бросив 1d6.*/
}

function decrepitSkeleton() {
    ew.removeRawBtnInEW('btn_ew')
    
    function getCards(){
        const card = this.getRundomElement(this.deadman_cards, deadman_cards)   
        ew.drawCardEW(card);
    }

    const result = ()=>{ 
        const result = game.diceRollResultGlobal

        if (result<=2) {
            ew.removeAllEW()
            ew.drawCardEW(monster_cards[13])
            ew.clear()
            ew.drawBtnInEW('next', 'Обшукати', ()=>{
                ew.removeAllEW()
                getCards()
            })
            ew.drawBtnInEW('skip', 'НЕ обшукувати', ()=>{ew.removeAllEW()})

        }

        if (3<= result ) {
            ew.drawEW(`Скелет зцілюється від усіх поранень`)
            setTimeout(() => {
                ew.removeAllEW()
                ew.drawCardEW(monster_cards[13])
                ew.clear()
                ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[12], endBattleFn))
                ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[12], endBattleFn))
            }, 1200);
        }

    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[13])
        ew.clear()
        ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[13], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[13], endBattleFn))

    /*Победив этого скелета в бою, бросьте 1d6: 
    1-2 - Скелет побежден и его можно обыскать; тяните Карту Мертвеца; 
    3-6 - Скелет исцеляется от всех ранений и Вам необходимо снова провести с ним бой, после чего снова разыграть этот эффект, бросив 1d6.*/
}

function skeletonKiller() {
    ew.removeRawBtnInEW('btn_ew')
    
    function getCards(){
        const card = this.getRundomElement(this.deadman_cards, deadman_cards)   
        ew.drawCardEW(card);
    }

    const result = ()=>{ 
        const result = game.diceRollResultGlobal

        if (result<=4) {
            ew.removeAllEW()
            ew.drawCardEW(monster_cards[14])
            ew.clear()
            ew.drawBtnInEW('next', 'Обшукати', ()=>{
                ew.removeAllEW()
                getCards()
            })
            ew.drawBtnInEW('skip', 'НЕ обшукувати', ()=>{ew.removeAllEW()})

        }

        if (5<= result ) {
            ew.drawEW(`Скелет зцілюється від усіх поранень`)
            setTimeout(() => {
                ew.removeAllEW()
                ew.drawCardEW(monster_cards[14])
                ew.clear()
                ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[14], endBattleFn))
                ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[14], endBattleFn))
            }, 1200);
        }

    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[12])
        ew.clear()
        ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[14], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[14], endBattleFn))

    /*Победив этот скелет в бою, бросьте 1d6: 
    1-4 - Скелет побежден и его можно обыскать; тянуть Карту Мертвеца; 
    5-6 - Скелет исцеляется от всех ранений и Вам необходимо снова провести с ним бойца, после чего снова разыграть этот эффект, бросив 1d6.*/
}

function skeletonArcher() {
    ew.removeRawBtnInEW('btn_ew')
    
    function getCards(){
        const card = this.getRundomElement(this.deadman_cards, deadman_cards)   
        ew.drawCardEW(card);
    }

    const result = ()=>{ 
        const result = game.diceRollResultGlobal

        if (result<=4) {
            ew.removeAllEW()
            ew.drawCardEW(monster_cards[15])
            ew.clear()
            ew.drawBtnInEW('next', 'Обшукати', ()=>{
                ew.removeAllEW()
                getCards()
            })
            ew.drawBtnInEW('skip', 'НЕ обшукувати', ()=>{ew.removeAllEW()})

        }

        if (5<= result ) {
            ew.drawEW(`Скелет зцілюється від усіх поранень`)
            setTimeout(() => {
                ew.removeAllEW()
                ew.drawCardEW(monster_cards[15])
                ew.clear()
                ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[15], endBattleFn))
                ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[15], endBattleFn))
            }, 1200);
        }

    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[15])
        ew.clear()
        ew.addDiceRollSection(false, 6, false, true, 1, result, false, false, false)
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[15], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[15], endBattleFn))
    /*Победив этого скелета в бою, бросьте 1d6: 
    1-4 - Скелет побежден и его можно обыскать; тяните Карту Мертвеца; 
    5-6 - Скелет исцеляется от всех ранений и Вам необходимо снова провести с ним бой, после чего снова разыграть этот эффект, бросив 1d6.*/
}

function trollDestroyer() {
    ew.removeRawBtnInEW('btn_ew')

    function getCards(){
        const cards = game.getSomeCards(game.сrypt_cards, сrypt_cards, 3)
        ew.drawEW('Карти Склепу')
        ew.addPackCards(cards)
        addScrolCardsEffect('.event-deck-container', false)
        ew.drawBtnInEW('next', 'Далі', ()=>{ew.removeAllEW()})
    }

    function endBattleFn(){
        ew.drawCardEW(monster_cards[16])
        ew.clear()
        ew.drawBtnInEW('next', 'Витягнути 3 Карти Склепу', ()=>{
            ew.removeAllEW()
            getCards()
        })
        ew.drawBtnInEW('skip', 'НЕ витягувати', ()=>{ew.removeAllEW()})

    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[16], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[16], endBattleFn))

    /*Во время боя с этим троллем была повреждена стена подземелья, за которой находился некрополь. 
    Победив в бою с этим троллем, Вы можете немедленно вытянуть 3 Карты Склепа.*/
}

function madTroll() {
    ew.removeRawBtnInEW('btn_ew')

    function endBattleFn(){
        if (player.ambushRoom && player.surroundedMonsters) {
            player.ambushRoom = false
            player.surroundedMonsters = false
            ew.removeAllEW()
            return
        }

        player.extraMove = true
        game.removeAllIcon()
        ew.removeAllEW()
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[17], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[17], endBattleFn))

    /*Тролль крушит все вокруг. 
    Победив его в бою, Вы можете немедленно выполнить перемещение в любую соседнюю область, игнорируя решетки, двери и стены. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

function trollBrute() {
    ew.removeRawBtnInEW('btn_ew')

    function endBattleFn(){
        if (player.ambushRoom && player.surroundedMonsters) {
            player.ambushRoom = false
            player.surroundedMonsters = false
            ew.removeAllEW()
            return
        }

        player.skipMove = 1
        game.endMove()
        ew.removeAllEW()
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[18], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[18], endBattleFn))
    
    /*После боя с этим огромным троллем Вы были сильно истощены. 
    Победив его в бою, пропустите свой следующий ход. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

function trollCannibal() {
    ew.removeRawBtnInEW('btn_ew')

    function endBattleFn(){
        if (player.ambushRoom && player.surroundedMonsters) {
            player.ambushRoom = false
            player.surroundedMonsters = false
            ew.removeAllEW()
            return
        }

        player.extraMove = true
        ew.removeAllEW()
    }

    ew.drawBtnInEW('btn_df','Битись', ()=>ew.addBattleSection(monster_cards[17], endBattleFn))
    ew.drawBtnInEW('btn_esc','Втекти', ()=>ew.escapeBattle(monster_cards[17], endBattleFn))

    /*Убийство этого кровожадного тролля-людоеда воодушевит Вас. 
    Победив его в бою, Вы можете немедленно выполнить еще одно перемещение. 
    Если эта карта была вытянута вследствие разыгрывания эффекта карт 
    Комната с Засадой, 
    Окружение Монстрами, ее эффект не применяется.*/
}

const monster_cards = [
    /*0*/new Card(1, 'Железный Голем', 'голем', 6, 4, ()=>{ironGolem()}),
    /*1*/new Card(2, 'Ледяной Голем', 'голем', 5, 3, ()=>{iceGolem()}),
    /*2*/new Card(3, 'Магматический Голем', 'голем', 4, 2, ()=>{magmaGolem()}),
    /*3*/new Card(4, 'Каменный Голем', 'голем', 5, 2, ()=>{stoneGolem()}),
    /*4*/new Card(5, 'Демон Страданий', 'демон', 5, 2, ()=>{demonOfSuffering()}),
    /*5*/new Card(6, 'Демон Боли', 'демон', 6, 3, ()=>{demonOfPain()}),
    /*6*/new Card(7, 'Демон Страха', 'демон', 6, 4, ()=>{demonOfFear()}),
    /*7*/new Card(8, 'Демон Ярости', 'демон', 8, 6, ()=>{demonOfRage()}),
    /*8*/new Card(9, 'Одержимый Духами', 'колдун', 3, 2, ()=>{possessedBySpirits()}),
    /*9*/new Card(10, 'Слуга Преисподней', 'колдун', 2, 3, ()=>{servantOfTheUnderworld()}),
    /*10*/new Card(11, 'Служитель Хаоса', 'колдун', 3, 3, ()=>{servantOfChaos()}),
    /*11*/new Card(12, 'Адепт Культа', 'колдун', 3, 4, ()=>{cultAdept()}),
    /*12*/new Card(13, 'Скелет-Воин', 'скелет', 3, 0, ()=>{skeletonWarrior()}),
    /*13*/new Card(14, 'Дряхлый Скелет', 'скелет', 2, 1, ()=>{decrepitSkeleton()}),
    /*14*/new Card(15, 'Скелет-Убийца', 'скелет', 3, 1, ()=>{skeletonKiller()}),
    /*15*/new Card(16, 'Скелет-Лучник', 'скелет', 3, 2, ()=>{skeletonArcher()}),
    /*16*/new Card(17, 'Тролль-Разрушитель', 'тролль', 5, 0, ()=>{trollDestroyer()}),
    /*17*/new Card(18, 'Обезумевший Тролль', 'тролль', 4, 2, ()=>{madTroll()}),
    /*18*/new Card(19, 'Тролль-Громила', 'тролль', 4, 3, ()=>{trollBrute()}),
    /*19*/new Card(20, 'Тролль-Людоед', 'тролль', 3, 4, ()=>{trollCannibal()})
];

export { monster_cards };
