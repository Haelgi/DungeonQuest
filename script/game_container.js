// import  {game, player}  from './authentication.js';

// TODO удалить потом
class Player {
    
    constructor() {
        this.idx = 0; 
        this.name = 'Олег'; 
        this.hero = 'dwarf'; 
        this.heroName = 'Гном-Воїн Тарвін';
        this.authentication = true; 
    }

    checkAuthentification(){
        return this.authentication
    }
};

const player = new Player();

class Game {
    static gameIdx = 0;
   
    constructor() {
        this.gameIdx = 0;
        this.playerList = [player];
        this.authentication = true; 
    }
}

const game = new Game();

export function game_container() {
    
    console.log(game)
}
