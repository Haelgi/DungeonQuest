class Player {
    
    constructor(userName, idx) {
        this.idx = idx; 
        this.name = userName; 
        this.hero; 
        this.authentication = false;
        this.positionPrevious = false;
        this.positionTreasury=false;
        this.position = false;
        this.finish = false;
        this.catacomb = false;
        this.catacombDirection = 0;
        this.card_abilitie = Array.from({ length: 5 }, (_, index) => index + 1);
        this.effectCardContainer = [];
        this.treasureCardContainer = [];
        this.catacombCardContainer = [];
        this.eventCardContainer = [];
        this.attack = 1;
        this.extraMove = false
        this.skipMove = 0
        this.escapeBattle = true
        this.curseOfTheSorcerer = false
        this.oldResolve = 0;
        this.curseResolve = false;
        this.checkEventCards = true
    }
}

export const player = new Player();
