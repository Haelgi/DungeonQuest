import  {game, player}  from './authentication.js';

export function lobby() {
    console.log(2)
    const cards = document.querySelectorAll('.card')
    const table = document.querySelector('.player-list')
    console.log(3)
    createPlayerListTable()

    function createPlayerListTable(){
        game.playerList.forEach((player)=>{
            table.innerHTML+=`
                <tr class="player_${player.idx}">
                    <th class="id">${player.idx+1}</th>
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
            
            player.hero = card.getAttribute('id');
            player.heroName = card.querySelector('p').textContent;

            changePlayerListTable(player)
            //TODO отправить на сервер выбор игрока, вернуть выбор другим игрокам, заблокировать выбранные варианты

        })
    })

    function removeActiveClasses() {
        cards.forEach(card => {
            card.classList.remove('active');
        })
    }


    function changePlayerListTable(player){
        const currentPlayerTr = document.querySelector(`.player_${player.idx}`)
        currentPlayerTr.querySelector(`.hero`).textContent=`${player.heroName}`
        currentPlayerTr.querySelector(`.ready`).innerHTML = `<button>Підтвердити</button>`
        currentPlayerTr.querySelector(`button`).addEventListener('click', ()=> showGameContainer())
    }

    // function showGameContainer(){
    //     document.querySelector('.start-game-container').classList.add('hidden');
    //     document.querySelector('.game-container').classList.remove('hidden');
    // }
}
