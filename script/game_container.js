// import  {game, player}  from './authentication.js';
import  {heroes}  from './cards/heroes.js';
import  {game}  from './game.js';
import  {player}  from './player.js';
import  {ew}  from './eventWidows.js';
import  {treasure_cards}  from './cards/treasure_cards.js';



///////////////////////////// TODO удалить потом //////////////////////////////////////

player.idx = 0; 
player.name = 'Олег'; 
player.hero = 'enchantress'; 
player.authentication = true;
// player.treasureCardContainer = [treasure_cards[1],treasure_cards[2],treasure_cards[3],treasure_cards[4]];
// player.positionTreasuryCards = [treasure_cards[1],treasure_cards[4]];
// player.catacombCardContainer = [treasure_cards[1],treasure_cards[4]];

// heroes[player.hero].resolve = 5

game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 

//////////////////////////////////////////////////////////////////////////////////////


export function game_container() {
    // game.drawFieldTileTests(1, 90, 1,  0);
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
