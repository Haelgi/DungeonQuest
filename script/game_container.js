// import  {game, player}  from './authentication.js';

///////////////////////////// TODO удалить потом //////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////

export function game_container() {
    //TODO найти контейнер с тайлайном
    //TODO написать фунцию движения тайла солца по дням
    //TODO привязать дни к обьекту игры
    //TODO написать условие для движения тайла солца по дням

    //TODO найти контейнер с картачками игрока
    //TODO отрисовать нужного героя
    //TODO прицепить уровни жизней карточки героя к обьекту игрока
    //TODO отрисовать стартовые наборы карт на руку
    //TODO навесить анимацию перелистывания на колоды карт
    
    //TODO выбор стартовой позиции
    //TODO помещение туда нового тайла 
    //TODO разворот тайла в нужное положение
    //TODO создать класс для тайлов
    //TODO добавить свойства для тайлов
    //TODO записать позицию игрока
    //TODO ставить на позицию митл надземный илим подземный в зависимости от зашел игрок в катакомбы или нет
    //TODO вписать ход игры
    
    console.log(game)
}
