import  {game}  from './game.js';


export function game_container() { 
    game.startPosition();
    game.sunTokenPosition(game.day);
    game.makeMove();  
}
