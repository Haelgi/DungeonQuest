export class Player {
    
    constructor(userName, idx) {
        this.idx = idx; 
        this.name = userName; 
        this.hero; 
        this.authentication = false;
        this.position;
        this.catacomb = false;
        this.roomIdx;
        this.roomRotate;
    }
}
