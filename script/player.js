export class Player {
    
    constructor(userName, idx) {
        this.idx = idx; 
        this.name = userName; 
        this.hero; 
        this.authentication = false;
        this.positionPrevious;
        this.position;
        this.finish = false;
        this.catacomb = false;
        this.card_abilitie = Array.from({ length: 5 }, (_, index) => index + 1);
        this.effectCardContainer = [];
        this.treasureCardContainer = [];
        this.attack = 1;
    }
}
