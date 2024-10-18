export class Player {
    
    constructor(userName, idx) {
        this.idx = idx; 
        this.name = userName; 
        this.hero; 
        this.authentication = false;
        this.position;
        this.keys={
            eventOne:false,
            eventTwo:false,
            move:false,
            dungeon:false,
            search:true,
        };
        this.finish = false;
        this.catacomb = false;
        this.card_abilitie = Array.from({ length: 5 }, (_, index) => index + 1);
        this.effectCardContainer = [];
    }
}
