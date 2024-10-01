import { } from './authentication.js'

export function lobby() {
    
    console.log(3, players)
    const cards = document.querySelectorAll('.card')
    const table = document.querySelector('.player-list')

    console.log(4, players)
    createPlayerListTable()

    console.log(5, players)

    function createPlayerListTable(){
        players.forEach((player, idx)=>{
            table.innerHTML+=`
                <tr class="player_${idx}">
                    <th class="id">${idx+1}</th>
                    <th class="name">${player.name}</th>
                    <th class="hero"></th>
                    <th class="ready">Вибирає</th>
                </tr>
            `
        })  
    }

    cards.forEach(card => {
        
        card.addEventListener('click', () => {
            removeActiveClasses();
            card.classList.add('active');
            
            players[0].hero = card.getAttribute('id');
            players[0].heroName = card.querySelector('p').textContent;

            changePlayerListTable(0, players[0].heroName)
            //TODO отправить на сервер выбор игрока, вернуть выбор другим игрокам, заблокировать выбранные варианты

        })
    })

    function removeActiveClasses() {
        cards.forEach(card => {
            card.classList.remove('active');
        })
    }


    function changePlayerListTable(idx, heroName){
        console.log(idx, heroName)
        const currentPlayerTr = document.querySelector(`.player_${idx}`)
        console.log(currentPlayerTr)
        currentPlayerTr.querySelector(`.hero`).textContent=`${heroName}`
        currentPlayerTr.querySelector(`.ready`).innerHTML = `<button>Підтвердити</button>`
        currentPlayerTr.querySelector(`button`).addEventListener('click', ()=> showGameContainer())
    }

    function showGameContainer(){
        document.querySelector('.start-game-container').classList.add('hidden');
        document.querySelector('.game-container').classList.remove('hidden');
    }
}
