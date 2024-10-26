// import  {game, player}  from './authentication.js';
import  {heroes}  from './cards/heroes.js';
import  {game}  from './game.js';
import  {player}  from './player.js';



///////////////////////////// TODO удалить потом //////////////////////////////////////


player.idx = 0; 
player.name = 'Олег'; 
player.hero = 'enchantress'; 
player.authentication = true;

heroes[player.hero].resolve = 10

game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 
//////////////////////////////////////////////////////////////////////////////////////


export function game_container() {
    game.drawFieldTileTests(114, '90', 1,  0);
    // game.drawFieldTileTests(46, '0', 1,  1);
    // game.drawFieldTileTests(2, 180, 1,  1);
    // game.drawFieldTileTests(5, 0, 0, 1);
    // game.drawFieldTileTests(15, 0, 1, 1);
    game.startPosition();
    // start game //////////////////////////////////////////////////////

    function gameLoop() {
        game.sunTokenPosition(game.day);
        game.addCharacterTablet(player.hero);
        
        
        game.makeMove();
        
        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
}
