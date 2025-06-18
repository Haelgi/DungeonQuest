import  {game}  from './game.js';


export function game_container() {
    
    game.startPosition();
    
    function gameLoop() {
        game.sunTokenPosition(game.day);
        game.makeMove();

        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
}
