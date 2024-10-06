class Tile{
    constructor() {
        this.number = number;
        
        this.up = up;
        this.left = left;
        this.right = right;
        this.down = down;

        this.dungeon = dungeon;
        this.search = search;
        this.trap = trap;
        this.catacomb = catacomb;
        
        
        this.special = special;

    }
}

const room_tiles = [
    new Tile(number=1, left=false, up= false, right=false, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=2, left=false, up='door', right=false, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=3, left=false, up=true, right=false, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=4, left=true, up=false, right=false, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=5, left=true, up='door', right=true, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=6, left=false, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=7, left=false, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=8, left=false, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=9, left=false, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=10, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    
    new Tile(number=11, left=false, up= true, right=false, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='collapse'),//обвал
    new Tile(number=12, left=false, up= true, right=false, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='collapse'),//обвал
    new Tile(number=13, left=true, up= true, right=true, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='collapse'),//обвал
    new Tile(number=14, left=true, up= true, right=true, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='collapse'),//обвал
    new Tile(number=15, left=true, up= true, right=true, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='abyss right'),//Пропасть
    new Tile(number=16, left='door', up= true, right='door', down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=17, left='door', up= true, right='door', down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=18, left=true, up= 'door', right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=19, left=true, up= true, right='door', down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=20, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=true, catacomb=false, special=false),
    
    new Tile(number=21, left=true, up= false, right=true, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=22, left=true, up= false, right=true, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=23, left=true, up= 'door', right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=24, left=true, up= 'door', right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=25, left=false, up= 'door', right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=26, left=false, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=27, left=false, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=28, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=29, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=30, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    
    new Tile(number=31, left=false, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=32, left=false, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=33, left=false, up= false, right=false, down=true, dungeon=false, search=true, trap=false, catacomb=false, special='rotate'),// повернуть на 180
    new Tile(number=34, left=false, up= false, right=false, down=true, dungeon=false, search=true, trap=false, catacomb=false, special='rotate'),// повернуть на 180
    new Tile(number=35, left=false, up= false, right=false, down=true, dungeon=false, search=true, trap=false, catacomb=false, special='rotate'),// повернуть на 180
    new Tile(number=36, left=false, up= true, right=true, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=37, left=true, up= true, right=false, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=37, left=true, up= true, right=true, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=39, left=true, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=40, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    
    new Tile(number=41, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=42, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='pit'),//бездонная яма
    new Tile(number=43, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='pit'),//бездонная яма
    new Tile(number=44, left=true, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=45, left=true, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false),
    new Tile(number=46, left=true, up= true, right=true, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='abyss right'),//Пропасть
    new Tile(number=47, left=true, up= true, right=true, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='abyss left'),//Пропасть
    new Tile(number=48, left=true, up= true, right=true, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='abyss left'),//Пропасть
    new Tile(number=49, left=true, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=50, left=true, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    
    new Tile(number=51, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=true, catacomb=false, special=false),
    new Tile(number=52, left=false, up= true, right=true, down=true, dungeon=false, search=false, trap=true, catacomb=false, special=false),
    new Tile(number=53, left=true, up= true, right=false, down=true, dungeon=false, search=false, trap=true, catacomb=false, special=false),
    new Tile(number=54, left=false, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=55, left=false, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=56, left=false, up= 'door', right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=57, left='door', up= 'door', right='door', down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=58, left='door', up= 'door', right='door', down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=59, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='web'),// паутина
    new Tile(number=60, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='web'),// паутина
    
    new Tile(number=61, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=62, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=63, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=64, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=65, left=false, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=66, left=false, up= false, right=false, down=true, dungeon=false, search=true, trap=false, catacomb=false, special='rotate'),// повернуть на 180
    new Tile(number=67, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=68, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=69, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=70, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    
    new Tile(number=71, left=false, up= false, right=[4,5,6], down=[1,2,3], dungeon=false, search=false, trap=false, catacomb=false, special='dark'), // темная комната
    new Tile(number=72, left=false, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=73, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=74, left=false, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=75, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=76, left=true, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=true, special=false), 
    new Tile(number=77, left=false, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=78, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=79, left=false, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=80, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    
    new Tile(number=81, left=true, up= true, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=82, left=true, up= false, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=83, left=false, up= false, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=84, left=false, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=85, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=86, left=false, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=87, left=true, up= false, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=88, left=false, up= false, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=89, left=false, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=90, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    
    new Tile(number=91, left=true, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=92, left=true, up= false, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=93, left=false, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=94, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=95, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='web'),// паутина
    new Tile(number=96, left=true, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=97, left=true, up= false, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=98, left=true, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=99, left=true, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=100, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    
    new Tile(number=101, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=102, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special=false), 
    new Tile(number=103, left=true, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=104, left=true, up= false, right=false, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false), 
    new Tile(number=105, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='bridge'), //мост
    new Tile(number=106, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='bridge'), //мост
    new Tile(number=107, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='bridge'), //мост
    new Tile(number=108, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='bridge'), //мост
    new Tile(number=109, left=true, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=110, left=true, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    
    new Tile(number=111, left=true, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=112, left=true, up= false, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=113, left=[3,4], up= false, right=[5,6], down=[1,2], dungeon=false, search=false, trap=false, catacomb=false, special='dark'), // темная комната
    new Tile(number=114, left=[3,4], up= false, right=[5,6], down=[1,2], dungeon=false, search=false, trap=false, catacomb=false, special='dark'), // темная комната
    new Tile(number=115, left=[3,4], up= false, right=[5,6], down=[1,2], dungeon=false, search=false, trap=false, catacomb=false, special='dark'), // темная комната
    new Tile(number=116, left=[4,5,6], up= false, right=false, down=[1,2,3], dungeon=false, search=false, trap=false, catacomb=false, special='dark'), // темная комната
    new Tile(number=117, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=true, catacomb=false, special=false),
    new Tile(number=118, left=true, up= true, right=false, down=true, dungeon=false, search=false, trap=true, catacomb=false, special=false),
    new Tile(number=119, left=false, up= true, right=true, down=true, dungeon=false, search=false, trap=true, catacomb=false, special=false),
    new Tile(number=120, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='web'),// паутина
    
    new Tile(number=121, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='web'),// паутина
    new Tile(number=122, left=false, up= true, right=false, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='pit'),//бездонная яма
    new Tile(number=123, left='door', up= 'door', right='door', down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=124, left='door', up= 'door', right='door', down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=125, left=false, up= 'door', right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=126, left=true, up= true, right=true, down=true, dungeon=true, search=false, trap=false, catacomb=false, special='abyss left'),//Пропасть
    new Tile(number=127, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=128, left=true, up= true, right=true, down=true, dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=129, left=true, up= true, right=true, down='grille', dungeon=true, search=true, trap=false, catacomb=false, special=false),
    new Tile(number=130, left=true, up= true, right=true, down=true, dungeon=false, search=false, trap=false, catacomb=false, special='web')// паутина
]


export {room_tiles}

