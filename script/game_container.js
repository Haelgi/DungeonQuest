// import  {game, player}  from './authentication.js';
import  {heroes}  from './cards/heroes.js';
import  {game}  from './game.js';
import  {player}  from './player.js';
import  {ew}  from './eventWidows.js';



///////////////////////////// TODO удалить потом //////////////////////////////////////

player.idx = 0; 
player.name = 'Олег'; 
player.hero = 'enchantress'; 
player.authentication = true;
player.treasureCardContainer = [];

heroes[player.hero].resolve = 5

game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 

//////////////////////////////////////////////////////////////////////////////////////


export function game_container() {
    game.drawFieldTileTests(2, 90, 1,  0);
    // game.drawFieldTileTests(58, 0, 1,  1);
    // game.drawFieldTileTests(11, '90', 2,  0);
    // game.drawFieldTileTests(11, '180', 1,  1);
    // game.drawFieldTileTests(113, '0', 1,  0);
    // game.drawFieldTileTests(113, '0', 2,  0);
    // game.drawFieldTileTests(113, '180', 1,  1);
    // game.drawFieldTileTests(1, '0', 1,  1);
    // game.drawFieldTileTests(1, '0', 2,  0);
    // game.drawFieldTileTests(20, '180', 1,  1);

    game.startPosition();
    

    function gameLoop() {
        game.sunTokenPosition(game.day);

        game.makeMove();

        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
}
