class Player {
    
    constructor(userName, idx) {
        this.idx = idx; 
        this.name = userName; 
        this.hero; 
        this.authentication = false;
        this.positionPrevious = false;
        this.positionTreasury=false;
        this.positionTreasuryCards=[];
        this.position = false;
        this.finish = false;
        this.catacomb = false;
        this.catacombDirection = 0;

        this.card_abilitie = Array.from({ length: 5 }, (_, index) => index + 1);
        this.effectCardContainer = [];
        this.treasureCardContainer = [];
        this.catacombCardContainer = [];
        this.eventCardContainer = [];
        this.endMoveEventCardContainer = [];
        
        this.attack = 1;
        this.extraMove = false;
        this.skipMove = 0;
        this.escapeBattle = true;
        this.curseOfTheSorcerer = false;
        this.oldResolve = 0;
        this.curseResolve = false;
        this.checkEventCards = true;
        this.checkEndMoveEventCardContainer = true;
        this.holeInCeiling = false;

        this.choiceNumber= [];
        this.ambushRoom = false;
        this.surroundedMonsters = false;
        this.gold = 0
    }
}

export const player = new Player();
