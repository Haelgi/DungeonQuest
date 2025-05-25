import  {addScrolCardsEffect}  from '../function/addScrolCardsEffect.js';

import { ew } from '../eventWidows.js';
import { player } from '../player.js';
import { game } from '../game.js';
import { room_tiles } from './room_tiles.js';
import { search_cards } from './search_cards.js';
import { heroes } from './heroes.js';


class Card {
    constructor(id, name, clickFn) {
        this.id = id;  
        this.name = name;  
        this.clickFn = clickFn;
        this.pack = 'abilitie';
    };
};

const dwarf = [
    new Card(1, 'Сильный удар', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
        
    new Card(1, 'Сильный удар', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
    
    new Card( 2, 'Поиск Прохода', ()=>{
        if (!player.positionPrevious
            || player.catacomb) {
                ew.drawEW('Не можна викорасти карту зараз(')
                setTimeout(ew.removeAllEW, 1200);
                return
        }
        ew.removeAllEW()
        game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Поиск Прохода')
        game.drawAbilitiePackCards()
        game.removeHighlightFields(game.nextCoordinates)
        game.nextCoordinates = game.getCoordinatesWithoutRoom()
        game.drawHeroMitl(player.position[0], player.position[1]);
        game.removeAllIcon()
        
        /*  Сбросьте перед перемещением. Переместитесь в любую соседнюю область, игнорируя любые
            преграды, в том числе и стены. Если область неисследована, разместите в ней тайл Комнаты
            Подземелья в обычном порядке. Если Вы вступите в бой с монстром, то не сможете спастись бегством.*/
        }),
    
    new Card( 3, 'Знание Подземелий', ()=>{
        if (!player.positionPrevious
            || game.gameFields[player.position[1]][player.position[0]]['s'] === undefined
            || player.catacomb
            || game.gameFields[player.position[1]][player.position[0]]['m'] !== undefined) {
                ew.drawEW('Не можна викорасти карту зараз(')
                setTimeout(ew.removeAllEW, 1200);
                return
        }
        ew.removeAllEW()
        game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Знание Подземелий')
        game.drawAbilitiePackCards()
        game.gameFields[player.position[1]][player.position[0]]['s'] = 0
        const coord = game.getCoordinatesWithoutRoom()
        console.log(coord)
        game.drawIcon(player.position[0], player.position[1], 'fa-solid fa-magnifying-glass', 'search');
        game.clickSerchIcon();
        /*  Сбросьте эту карту в конце своего хода, чтобы убрать все жетоны поиска с Вашей комнаты 
                и всех прилегающих к ней комнат.*/
        }),
    
    new Card( 4, 'Знание Катакомб', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);        
        /*  Сбросьте перед тем, как тянуть Карту Катакомб. 
                Вытяните 4 Карты Катакомб, посмотрите их и положите в любом порядке наверх Колоды Катакомб. 
                Потом тяните Карту Катакомб.*/
        }),
]

const enchantress = [
    new Card(1, 'Магические Заряды', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
        
    new Card(1, 'Магические Заряды', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
    
    new Card( 2, 'Исцеляющая Волна', ()=>{
        ew.removeAllEW()
        game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Исцеляющая Волна')
        game.drawAbilitiePackCards()
        game.changeHealth(4)
        ew.drawEW('Ви зцілили 4 здоровʼя')
        setTimeout(ew.removeAllEW, 1200);

        /*  Сбросьте эту карту в время своего хода. 
            У Вас исцеляется 4 ранения.*/
        }),
    
    new Card( 3, 'Предвидение', ()=>{
        game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Предвидение')
        game.drawAbilitiePackCards()

        const length = 4
        let emptyFelds = []
        const cardsForChoice = [game.getRundomElement(game.search_cards, search_cards),
                                game.getRundomElement(game.search_cards, search_cards),
                                game.getRundomElement(game.search_cards, search_cards),
                                game.getRundomElement(game.search_cards, search_cards)]
        
        ew.clear()
        ew.addEmptyFeldForCard(length)
        ew.addPackCards(cardsForChoice)

        addScrolCardsEffect('.event-deck-container', (e)=> {
            const [card] = removeCardFromPack(e)

            emptyFelds.push(card)
            drawCardToFeld(length)
        });

        ew.addBtnInEW('btn_next', 'Вибрати', ()=>{
            ew.removeAllEW()
            game.foresightSearchCard.push(...emptyFelds)
            emptyFelds = []
            game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Предвидение')
            game.drawAbilitiePackCards()
        })

        const btnNext = document.getElementById('btn_next')
        btnNext.style.display = 'none'

        addScrolCardsEffect('.event-deck-container', (e)=> {
            const [card] = removeCardFromPack(e)

            emptyFelds.push(card)
            drawCardToFeld(length)
        });
        function removeCardFromPack(e) {
            const id = e.target.getAttribute('id')
            const card = cardsForChoice.splice(id, 1)

            ew.updatePackCardsEW(cardsForChoice)

            return card
        }  

        function drawCardToFeld(count){
                
            if(emptyFelds.length >= 1) btnNext.style.display = 'block'
            if(emptyFelds.length < 1) btnNext.style.display = 'none'
            
            for (let i = 0; i < count; i++) {

                const feld = document.getElementById(`card-feld-${i}`)
                if (!feld) continue;

                if(emptyFelds[i] === undefined) {
                    feld.innerHTML = ''
                    continue; 
                }

                feld.innerHTML = `<div id="${i}" class="card" style="background-image: url('img/${emptyFelds[i].pack}_cards/${emptyFelds[i].pack}_${emptyFelds[i].id}.jpg')"></div>`

                feld.onclick = () => {
                    const [card] = emptyFelds.splice(i, 1)
                    if(card) {
                        cardsForChoice.push(card)
                        ew.updatePackCardsEW(cardsForChoice)
                        drawCardToFeld(count)  
                    }
                }
            }
        }        

        /*  Сбросьте эту карту в начале Вашего хода. 
            Вытяните 4 Карты Поиска. 
            Посмотрите их и положите в любом порядке наверх колоды Карт Поиска.*/
        }),
    
    new Card( 4, 'Транформация', ()=>{
        if (!player.positionPrevious
            || game.gameFields[player.position[1]][player.position[0]]['s'] !== undefined
            || player.catacomb
            || game.gameFields[player.position[1]][player.position[0]]['m'] !== undefined) {
                ew.drawEW('Не можна викорасти карту зараз(')
                setTimeout(ew.removeAllEW, 1200);
                return
        }

        
        const [x, y] = player.position;
        const roomIdInt = game.gameFields[y][x]['id'] + 1
        const rooomIdNew = game.getRundomElement(game.room_tiles, room_tiles).number -1
        if (game.gameFields[y][x]['id'] === undefined) return
        ew.removeAllEW();
        game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Транформация')
        game.drawAbilitiePackCards()
        
        let correctRoomId
        let showBtn = true

        ew.drawEW(`Виберіть тайл кімнати`)

        const roomIdIntElem = ew.drawTileInEW(roomIdInt)
        const rooomIdNewElem = ew.drawTileInEW(rooomIdNew)
        const tilesArr = document.querySelectorAll(`.choice-tile`)

        function selectTile(e) {
            tilesArr.forEach(elem => {
                elem.classList.remove('active')
            })

            e.target.classList.add('active')
            correctRoomId = e.target.getAttribute('id')

            if (showBtn) {
                showBtn = false
                ew.addBtnInEW('btn_next', `Вибрати`, () => {
                    game.removeAllIcon()
                    game.removeTileField(x, y)
                    game.drawTileField(x, y, correctRoomId)
                    game.nextCoordinates = game.newCoordinate()
                    ew.removeAllEW();
                })
            }
        }

        tilesArr.forEach(element => {
            element.addEventListener('click', selectTile)
            element.addEventListener('touchstart', selectTile)
        });     

        /*  Сбросьте эту карту после того, как Вы вытащили тайл Комнаты Подземелья. 
            Вытяните еще один тайл Комнаты Подземелья и выберите, какой из них Вы поместите на поле. 
            Замешайте другой тайл обратно в стопку тайлов Комнат Подземелья.*/
        }),
]

const hunter = [
    new Card(1, 'Меткий выстрел', ()=>{
        ew.drawEW('Не можна викорасти карту зараз(')
        setTimeout(ew.removeAllEW, 1200);
        /* сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
        
    new Card(1, 'Меткий выстрел', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
    
    new Card( 2, 'Второе дыхание', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  Сбросьте после того, как Вы провалили проверку характеристики. 
            Теперь проваленная проверка считается успешно пройденной.*/
        }),
    
    new Card( 3, 'Воля к победе', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);        
        /*  Если Вас не устроил результат броска кубика (или кубиков), 
            Вы можете сбросить эту карту и перебросить кубик (или кубики) еще 1, или 2 раза, 
            приняв 1 из выпавших результатов.*/
        }),
    
    new Card( 4, 'Обнаружение Ловушек', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  Сбросьте эту карту после того как Вы вытянули Карту Ловушки. 
            Сбросьте Карту Ловушки не разыгрывая ее эффекта.*/
        }),
]

const knight = [
    new Card(1, 'Сокрушающий удар', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
        
    new Card(1, 'Сокрушающий удар', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
    
    new Card( 2, 'Борец с Драконом', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  Сбросьте эту карту, когда Вы получаете ранения от Ярости Дракона. 
            Теперь Вы получите на 7 ранений меньше. 
            Если Вы должны были получить 5-7 ранений, то Вы не получаете ни одного ранения. 
            Если Вы должны были получить 2-4 ранения, то Вы не получаете ни одного ранения и сохраняете все свои Трофеи.*/
        }),
    
    new Card( 3, 'Несломленный Дух', ()=>{
        ew.removeAllEW()
        game.removeCurrentCardNameFromPack(player.abilitieCardContainer, 'Транформация')
        game.drawAbilitiePackCards()
        player.unbrokenSpirit = 2
        /*  Вы можете сбросить эту карту перед проверкой характеристик, во время битвы или перед разыгрыванием карточного эффекта. 
            В этом и следующем Вашем ходу количество ранений Вашего героя всегда будет минимум на 1 меньше количества его здоровья. 
            Дополнительные ранения будут игнорироваться.*/
        }),
    
    new Card( 4, 'Крепкие Доспехи', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /* TODO Сбросьте эту карту после того как Вы вытянули Карту Подземелья, или Карту Катакомб. 
            Вы можете не разыгрывать эффект вытянутой карты.*/
        }),
]

const mage = [
    new Card(1, 'Огненный Шар', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
        
    new Card(1, 'Огненный Шар', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
    
    new Card( 2, 'Вращение', ()=>{return
        /* TODO Сбросив эту карту, Вы можете повернуть тайл комнаты, 
                в которой Вы находитесь, на 180°, или на 90° в любом направлении.*/
        }),
    
    new Card( 3, 'Лечение', ()=>{return
        /* TODO Сбросьте эту карту в время своего хода. У Вас исцеляется 4 ранения.*/
        }),
    
    new Card( 4, 'Боевая Магия', ()=>{return
        /* TODO Сбросив эту карту в бою, 
                Вы будете наносить ранения противнику при выпадении значений 1-4 на кубике.*/
        }),
]

const robber = [
    new Card(1, 'Метание Ножей', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
        
    new Card(1, 'Метание Ножей', ()=>{
            ew.drawEW('Не можна викорасти карту зараз(')
            setTimeout(ew.removeAllEW, 1200);  
        /*  сбросить эту карту во время боя. Ваш противник получает 2 ранения*/
        }),
    
    new Card( 2, 'Побег', ()=>{return
        /* TODO Сбросьте эту карту, чтобы убежать во время боя с монстром не выполняя проверки Ловкости. 
            При этом Вы не получаете штраф за побег.*/
        }),
    
    new Card( 3, 'Легкая Поступь', ()=>{return
        /* TODO Сбросьте эту карту после того как Вы вытянули Карту Ловушки. 
            Сбросьте Карту Ловушки не разыгрывая ее эффекта.*/
        }),
    
    new Card( 4, 'Шестое Чувство', ()=>{return
        /* TODO Способность может применяться к любой колоде карт, кроме колоды Карт Дракона. 
            Сбросьте эту карту после того, как Вы вытянули карту из какой-либо колоды. 
            Вытяните еще одну карту из той же колоды и выберите, эффект какой из этих двух карт Вы разыграете, 
            а другую карту сбросьте.*/
        }),
]

const hero_card_abilitie = {
    dwarf:dwarf, 
    enchantress: enchantress, 
    hunter:hunter, 
    knight:knight, 
    mage:mage, 
    robber:robber}

export  {hero_card_abilitie}