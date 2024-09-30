export class Player {
    
    constructor(userName) {
        this.name = userName; 
        this.hero = ''; 
        this.heroName = '';
        this.authentication = false; 
    }

    checkAuthentification(){
        return this.authentication
    }
}
