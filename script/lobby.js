import { players, Player } from './player.js'

//TODO вырезать
const player_0 = new Player('Олег')
players.push(player_0);


const cards = document.querySelectorAll('.card')
const table = document.querySelector('.player-list')
console.log(3, players)

function createPlayerListTable(){
    players.forEach((player, idx)=>{
        table.innerHTML=`
            <tr class="player_${idx}">
                <th class="id">${idx+1}</th>
                <th class="name">${player.name}</th>
                <th class="hero"></th>
                <th class="ready">Вибирає</th>
            </tr>
        `
    })  
}

createPlayerListTable()
cards.forEach(card => {
    
    card.addEventListener('click', () => {
        removeActiveClasses();
        card.classList.add('active');
        console.log(4, players)
        players[0].hero = card.getAttribute('id');
        players[0].heroName = card.querySelector('p').textContent;

        changePlayerListTable(0, players[0].heroName)
        //TODO повесить на подтвердить событие изменить статус на готов во время нажатия

    })
})

function removeActiveClasses() {
    cards.forEach(card => {
        card.classList.remove('active');
    })
}


function changePlayerListTable(idx, heroName){
    const currentPlayerTr = document.querySelector(`.player_${idx}`)
    currentPlayerTr.querySelector(`.hero`).textContent=`${heroName}`
    currentPlayerTr.querySelector(`.ready`).innerHTML = `<button>Підтвердити</button>`
    currentPlayerTr.querySelector(`button`).addEventListener('click', ()=> showGameContainer())
}

function showGameContainer(){
    document.querySelector('.start-game-container').classList.add('hidden');
    document.querySelector('.game-container').classList.remove('hidden');
}

