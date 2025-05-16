class Tile{
    constructor(number, left, up, right, down, dungeon, search, trap, catacomb, special) {
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
    /*0*/new Tile(1, false, false, false, 'grille', true, true, false, false, false),
    /*1*/new Tile(2, false, 'door', false, 'grille', true, true, false, false, false),
    /*2*/new Tile(3, false, true, false, 'grille', true, true, false, false, false),
    /*3*/new Tile(4, true, false, false, 'grille', true, true, false, false, false),
    /*4*/new Tile(5, true, 'door', true, 'grille', true, true, false, false, false),
    /*5*/new Tile(6, false, true, true, true, true, true, false, true, false),
    /*6*/new Tile(7, false, true, true, true, true, true, false, true, false),
    /*7*/new Tile(8, false, false, true, true, true, true, false, true, false),
    /*8*/new Tile(9, false, false, true, true, true, true, false, true, false),
    /*9*/new Tile(10, true, true, true, true, true, true, false, true, false),
    
    /*10*/new Tile(11, false, true, false, true, true, false, false, false, 'collapse'),//обвал
    /*11*/new Tile(12, false, true, false, true, true, false, false, false, 'collapse'),//обвал
    /*12*/new Tile(13, true, true, true, true, true, false, false, false, 'collapse'),//обвал
    /*13*/new Tile(14, true, true, true, true, true, false, false, false, 'collapse'),//обвал
    /*14*/new Tile(15, 'abyss', 'abyss', true, true, true, false, false, false, 'abyss'),//Пропасть
    /*15*/new Tile(16, 'door', true, 'door', true, true, true, false, false, false),
    /*16*/new Tile(17, 'door', true, 'door', true, true, true, false, false, false),
    /*17*/new Tile(18, true, 'door', true, true, true, true, false, false, false),
    /*18*/new Tile(19, true, true, 'door', true, true, true, false, false, false),
    /*19*/new Tile(20, true, true, true, true, false, false, true, false, false),
    
    /*20*/new Tile(21, true, false, true, 'grille', true, true, false, false, false),
    /*21*/new Tile(22, true, false, true, 'grille', true, true, false, false, false),
    /*22*/new Tile(23, true, 'door', false, true, true, true, false, false, false),
    /*23*/new Tile(24, true, 'door', false, true, true, true, false, false, false),
    /*24*/new Tile(25, false, 'door', true, true, true, true, false, false, false),
    /*25*/new Tile(26, false, true, false, true, true, true, false, false, false),
    /*26*/new Tile(27, false, true, false, true, true, true, false, false, false),
    /*27*/new Tile(28, false, false, false, true, true, true, false, false, false),
    /*28*/new Tile(29, false, false, false, true, true, true, false, false, false),
    /*29*/new Tile(30, false, false, false, true, true, true, false, false, false),
    
    /*30*/new Tile(31, false, true, false, true, true, true, false, false, false),
    /*31*/new Tile(32, false, true, false, true, true, true, false, false, false),
    /*32*/new Tile(33, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    /*33*/new Tile(34, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    /*34*/new Tile(35, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    /*35*/new Tile(36, false, true, true, 'grille', true, true, false, false, false),
    /*36*/new Tile(37, true, true, false, 'grille', true, true, false, false, false),
    /*37*/new Tile(37, true, true, true, 'grille', true, true, false, false, false),
    /*38*/new Tile(39, true, false, false, true, true, true, false, true, false),
    /*39*/new Tile(40, false, false, false, true, true, true, false, true, false),
    
    /*40*/new Tile(41, true, true, true, true, true, true, false, true, false),
    /*41*/new Tile(42, false, true, false, true, false, false, false, false, 'pit'),//бездонная яма
    /*42*/new Tile(43, false, true, false, true, false, false, false, false, 'pit'),//бездонная яма
    /*43*/new Tile(44, true, true, false, true, true, true, false, true, false),
    /*44*/new Tile(45, true, true, false, true, true, true, false, true, false),
    /*45*/new Tile(46, 'abyss', 'abyss', true, true, true, false, false, false, 'abyss'),//Пропасть
    /*46*/new Tile(47, true, 'abyss', 'abyss', true, true, false, false, false, 'abyss'),//Пропасть
    /*47*/new Tile(48, true, 'abyss', 'abyss', true, true, false, false, false, 'abyss'),//Пропасть
    /*48*/new Tile(49, true, true, false, true, true, true, false, false, false),
    /*49*/new Tile(50, true, true, false, true, true, true, false, false, false),
    
    /*50*/new Tile(51, true, true, true, true, false, false, true, false, false),
    /*51*/new Tile(52, false, true, true, true, false, false, true, false, false),
    /*52*/new Tile(53, true, true, false, true, false, false, true, false, false),
    /*53*/new Tile(54, false, true, true, true, true, true, false, false, false),
    /*54*/new Tile(55, false, true, true, true, true, true, false, false, false),
    /*55*/new Tile(56, false, 'door', true, true, true, true, false, false, false),
    /*56*/new Tile(57, 'door', 'door', 'door', true, true, true, false, false, false),
    /*57*/new Tile(58, 'door', 'door', 'door', true, true, true, false, false, false),
    /*58*/new Tile(59, true, true, true, true, false, false, false, false, 'web'),// паутина
    /*59*/new Tile(60, true, true, true, true, false, false, false, false, 'web'),// паутина
    
    /*60*/new Tile(61, false, false, false, true, true, true, false, false, false),
    /*61*/new Tile(62, false, false, false, true, true, true, false, false, false),
    /*62*/new Tile(63, false, false, false, true, true, true, false, false, false),
    /*63*/new Tile(64, false, false, false, true, true, true, false, false, false),
    /*64*/new Tile(65, false, false, false, true, true, true, false, false, false),
    /*65*/new Tile(66, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    /*66*/new Tile(67, true, true, true, true, true, true, false, false, false),
    /*67*/new Tile(68, true, true, true, true, true, true, false, false, false),
    /*68*/new Tile(69, true, true, true, true, true, true, false, false, false),
    /*69*/new Tile(70, true, true, true, true, true, true, false, false, false),
    
    /*70*/new Tile(71, false, false, [4,5,6], [1,2,3], false, false, false, false, 'dark'), // темная комната
    /*71*/new Tile(72, false, true, true, true, false, false, false, false, 'corridor'), 
    /*72*/new Tile(73, false, true, false, true, false, false, false, false, 'corridor'), 
    /*73*/new Tile(74, false, false, true, true, true, true, false, false, false), 
    /*74*/new Tile(75, true, true, true, true, true, true, false, false, false), 
    /*75*/new Tile(76, true, true, false, true, true, true, false, true, false), 
    /*76*/new Tile(77, false, true, true, true, false, false, false, false, 'corridor'), 
    /*77*/new Tile(78, false, true, false, true, false, false, false, false, 'corridor'), 
    /*78*/new Tile(79, false, false, true, true, true, true, false, false, false), 
    /*79*/new Tile(80, true, true, true, true, true, true, false, false, false), 
    
    /*0*/new Tile(81, true, true, false, true, true, true, false, false, false), 
    /*0*/new Tile(82, true, false, true, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(83, false, false, true, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(84, false, false, true, true, true, true, false, false, false), 
    /*0*/new Tile(85, true, true, true, true, true, true, false, false, false), 
    /*0*/new Tile(86, false, true, true, true, true, true, false, false, false), 
    /*0*/new Tile(87, true, false, true, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(88, false, false, true, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(89, false, false, true, true, true, true, false, false, false), 
    /*0*/new Tile(90, true, true, true, true, true, true, false, false, false), 
    
    /*0*/new Tile(91, true, true, false, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(92, true, false, false, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(93, false, false, true, true, true, true, false, false, false), 
    /*0*/new Tile(94, true, true, true, true, true, true, false, false, false), 
    /*0*/new Tile(95, true, true, true, true, false, false, false, false, 'web'),// паутина
    /*0*/new Tile(96, true, true, false, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(97, true, false, false, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(98, true, false, false, true, true, true, false, false, false), 
    /*0*/new Tile(99, true, false, false, true, true, true, false, false, false), 
    /*0*/new Tile(100, true, true, true, true, true, true, false, false, false), 
    
    /*0*/new Tile(101, true, true, true, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(102, true, true, true, true, false, false, false, false, 'corridor'), 
    /*0*/new Tile(103, true, false, false, true, true, true, false, false, false), 
    /*0*/new Tile(104, true, false, false, true, true, true, false, false, false), 
    /*0*/new Tile(105, false, true, false, true, false, false, false, false, 'bridge'), //мост
    /*0*/new Tile(106, false, true, false, true, false, false, false, false, 'bridge'), //мост
    /*0*/new Tile(107, false, true, false, true, false, false, false, false, 'bridge'), //мост
    /*0*/new Tile(108, false, true, false, true, false, false, false, false, 'bridge'), //мост
    /*0*/new Tile(109, true, false, true, true, true, true, false, false, false),
    /*0*/new Tile(110, true, false, true, true, true, true, false, false, false),
    
    /*0*/new Tile(111, true, false, true, true, true, true, false, false, false),
    /*0*/new Tile(112, true, false, true, true, true, true, false, false, false),
    /*0*/new Tile(113, [3,4], false, [5,6], [1,2], false, false, false, false, 'dark'), // темная комната
    /*0*/new Tile(114, [3,4], false, [5,6], [1,2], false, false, false, false, 'dark'), // темная комната
    /*0*/new Tile(115, [3,4], false, [5,6], [1,2], false, false, false, false, 'dark'), // темная комната
    /*0*/new Tile(116, [4,5,6], false, false, [1,2,3], false, false, false, false, 'dark'), // темная комната
    /*0*/new Tile(117, true, true, true, true, false, false, true, false, false),
    /*0*/new Tile(118, true, true, false, true, false, false, true, false, false),
    /*0*/new Tile(119, false, true, true, true, false, false, true, false, false),
    /*0*/new Tile(120, true, true, true, true, false, false, false, false, 'web'),// паутина
    
    /*0*/new Tile(121, true, true, true, true, false, false, false, false, 'web'),// паутина
    /*0*/new Tile(122, false, true, false, true, false, false, false, false, 'pit'),//бездонная яма
    /*0*/new Tile(123, 'door', 'door', 'door', true, true, true, false, false, false),
    /*0*/new Tile(124, 'door', 'door', 'door', true, true, true, false, false, false),
    /*0*/new Tile(125, false, 'door', true, true, true, true, false, false, false),
    /*0*/new Tile(126, true, 'abyss', 'abyss', true, true, false, false, false, 'abyss'),//Пропасть
    /*0*/new Tile(127, true, true, true, true, true, true, false, false, false),
    /*0*/new Tile(128, true, true, true, true, true, true, false, false, false),
    /*0*/new Tile(129, true, true, true, 'grille', true, true, false, false, false),
    /*0*/new Tile(130, true, true, true, true, false, false, false, false, 'web')// паутина
]


export {room_tiles}
