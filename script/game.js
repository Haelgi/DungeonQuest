export class Game {
    
    static gameIdx = 0;
   
    constructor() {
        this.gameIdx = Game.gameIdx++;
        this.playerList = [];
        this.authentication = false; 
    }
}