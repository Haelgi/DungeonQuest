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
player.treasureCardContainer = [1,2,3];

heroes[player.hero].resolve = 10

game.gameIdx = 0;
game.playerList = [player];
game.authentication = true; 
//////////////////////////////////////////////////////////////////////////////////////


export function game_container() {
    game.drawFieldTileTests(71, '90', 1,  0);
    // game.drawFieldTileTests(46, '0', 1,  1);
    // game.drawFieldTileTests(2, 180, 1,  1);
    // game.drawFieldTileTests(5, 0, 0, 1);
    // game.drawFieldTileTests(15, 0, 1, 1);

    game.startPosition();
    // ew.drawEventWidow('Тестовое окно!', 100)
    // ew.drawTxtInEW('Тестовый текст!')
    // ew.drawDiceInEW(2)
    // ew.drawBtnInEW('roll1', 'Кинути Кубики!', ()=>{console.log(1) })
    // ew.drawBtnInEW('roll2', 'Кинути Кубики!', ()=>{console.log(2) })
    




    // start game //////////////////////////////////////////////////////

    function gameLoop() {
        game.sunTokenPosition(game.day);
        game.addCharacterTablet(player.hero);
        
        
        game.makeMove();
        
        requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
}
