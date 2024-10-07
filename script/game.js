export class Game {
    
    static gameIdx = 0;
   
    constructor() {
        this.gameIdx = Game.gameIdx++;
        this.playerList = [];
        this.authentication = false;

        this.day = 0; 
        this.startFields=[[0,0], [14,0], [0,11], [14,11]]; 
        this.openFields=[]; 
        this.room_tiles=Array.from({ length: 130 }, (_, index) => index + 1); 
    }
}

