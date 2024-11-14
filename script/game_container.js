// import  {game, player}  from './authentication.js';
import  {heroes}  from './cards/heroes.js';
import  {game}  from './game.js';
import  {player}  from './player.js';
import  {ew}  from './eventWidows.js';



///////////////////////////// TODO удалить потом //////////////////////////////////////

import  {treasure_cards}  from './cards/treasure_cards.js';
player.idx = 0; 
player.name = 'Олег'; 
player.hero = 'enchantress'; 
player.authentication = true;
// player.catacomb = true;
player.treasureCardContainer = [treasure_cards[0],treasure_cards[1],treasure_cards[2]];
player.catacombCardContainer = [1,2,3];
// player.positionPrevious = [[1,2]];

heroes[player.hero].resolve = 10

game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 
// game.startFields = [[2,2]]; 


//////////////////////////////////////////////////////////////////////////////////////


export function game_container() {
    game.drawFieldTileTests(6, '90', 1,  0);
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
        game.addCharacterTablet(player.hero);

        game.makeMove();

        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
}
