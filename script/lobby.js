import  {game, player}  from './authentication.js';
import  {heroes}  from './heroes.js';


export function lobby() {
    console.log(2, game, player)
    const cards = document.querySelectorAll('.card')
    const table = document.querySelector('.player-list')
    createPlayerListTable()
    console.log(3, game, player)

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
            const heroIdx = card.getAttribute('id');
            player.hero = heroes[heroIdx];

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
        currentPlayerTr.querySelector(`.hero`).textContent=`${player.hero.heroName}`
        currentPlayerTr.querySelector(`.ready`).innerHTML = `<button>Підтвердити</button>`
        currentPlayerTr.querySelector(`button`).addEventListener('click', ()=> showGameContainer())
    }

    function showGameContainer(){
        const event = new Event('confirm');
        document.dispatchEvent(event);
    }
}
