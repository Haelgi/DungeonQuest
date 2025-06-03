class Player {
    
    constructor(userName, idx) {
        this.idx = idx; 
        this.name = userName; 
        this.hero; 
        this.authentication = false;
        this.positionPrevious = false;
        this.positionTreasury = false;
        this.position = false;
        this.finish = false;
        this.catacomb = false;
        this.catacombDirection = 0;
        
        this.abilitieCardContainer = [];
        this.treasureCardContainer = [];
        this.positionTreasuryCards = [];
        this.catacombCardContainer = [];
        this.eventCardContainer = [];
        this.endMoveEventCardContainer = [];
        this.doorEventTarget;
        
        this.attack = 1;
        this.extraMove = 0;
        this.skipMove = 0;
        this.extraDragonCard = 0;
        this.escapeBattle = true;
        this.curseOfTheSorcerer = false;
        this.oldResolve = 0;
        this.curseResolve = false;
        this.checkEventCards = false;
        this.checkEndMoveEventCardContainer = true;

        this.choiceNumber= [];
        this.ambushRoom = false;
        this.surroundedMonsters = false;
        this.fightWithMonsters = false;
        this.fightWithGolem = false;
        this.fightWithDemon = false;
        this.fightWithSorcerer = false;
        this.fightWithSkeleton = false;
        this.fightWithTroll = false;
        this.gold = 0
        this.willToWin = 2
        this.unbrokenSpirit = 0
        this.combatMagic = false
        this.mageFirstThrow = true
    }
}

export const player = new Player();
