import  {heroes}  from './cards/heroes.js';
import  {game}  from './game.js';
import  {player}  from './player.js';
import  {ew}  from './eventWidows.js';
import  {treasure_cards}  from './cards/treasure_cards.js';
import  {deadman_cards}  from './cards/deadman_cards.js';
import  {search_cards}  from './cards/search_cards.js';
import  {сrypt_cards}  from './cards/сrypt_cards.js';
import { monster_cards } from './cards/monster_cards.js';


export function game_container() {
    game.startPosition();
    
    function gameLoop() {
        game.sunTokenPosition(game.day);
        game.makeMove();

        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
}
