export class Game {
    
    static gameIdx = 0;
   
    constructor() {
        this.gameIdx = Game.gameIdx++;
        this.playerList = [];
        this.authentication = false;

        this.day = 0; 
        this.startFields=[[0,0], [11,0], [0,11], [11,11]]; 
        this.playingField=[]; 
    }
}
