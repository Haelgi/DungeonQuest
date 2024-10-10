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
        this.card_abilitie = Array.from({ length: 5 }, (_, index) => index + 1);
    }
}
