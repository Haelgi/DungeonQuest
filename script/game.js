export class Game {
    
    static gameIdx = 0;
   
    constructor() {
        this.gameIdx = Game.gameIdx++;
        this.playerList = [];
        this.authentication = false;

        this.day = 0; 
        this.gameFields=Array(12).fill().map(() => Array(15).fill().map(() => ({}))); 
        this.startFields=[[0,0], [14,0], [0,11], [14,11]]; 
        this.room_tiles=Array.from({ length: 130 }, (_, index) => index + 1); 
        this.dungeon_cards=Array.from({ length: 60 }, (_, index) => index + 1); 
        this.catacomb_cards=Array.from({ length: 50 }, (_, index) => index + 1); 
        this.deadman_cards=Array.from({ length: 16 }, (_, index) => index + 1); 
        this.trap_cards=Array.from({ length: 16 }, (_, index) => index + 1); 
        this.сrypt_cards=Array.from({ length: 16 }, (_, index) => index + 1); 
        this.door_cards=Array.from({ length: 16 }, (_, index) => index + 1); 
        this.search_cards=Array.from({ length: 32 }, (_, index) => index + 1); 
        this.treasure_cards=Array.from({ length: 36 }, (_, index) => index + 1); 
        this.monster_cards=Array.from({ length: 20 }, (_, index) => index + 1); 
        this.dragon_cards=Array.from({ length: 8 }, (_, index) => index + 1); 
    }
}

// let a = [[{},{},{}],[{},{},{}],[{},{},{}]]

// a[1][0]['key'] = 'value';
// delete a[1][0].key;

// console.log(a[1][0]['key'])
// console.log(a[1][1]['key'])
// console.log(a[1][1]['key'])
