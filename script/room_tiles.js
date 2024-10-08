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
    new Tile(1, false, false, false, 'grille', true, true, false, false, false),
    new Tile(2, false, 'door', false, 'grille', true, true, false, false, false),
    new Tile(3, false, true, false, 'grille', true, true, false, false, false),
    new Tile(4, true, false, false, 'grille', true, true, false, false, false),
    new Tile(5, true, 'door', true, 'grille', true, true, false, false, false),
    new Tile(6, false, true, true, true, true, true, false, true, false),
    new Tile(7, false, true, true, true, true, true, false, true, false),
    new Tile(8, false, false, true, true, true, true, false, true, false),
    new Tile(9, false, false, true, true, true, true, false, true, false),
    new Tile(10, true, true, true, true, true, true, false, true, false),
    
    new Tile(11, false, true, false, true, true, false, false, false, 'collapse'),//обвал
    new Tile(12, false, true, false, true, true, false, false, false, 'collapse'),//обвал
    new Tile(13, true, true, true, true, true, false, false, false, 'collapse'),//обвал
    new Tile(14, true, true, true, true, true, false, false, false, 'collapse'),//обвал
    new Tile(15, true, true, true, true, true, false, false, false, 'abyss right'),//Пропасть
    new Tile(16, 'door', true, 'door', true, true, true, false, false, false),
    new Tile(17, 'door', true, 'door', true, true, true, false, false, false),
    new Tile(18, true, 'door', true, true, true, true, false, false, false),
    new Tile(19, true, true, 'door', true, true, true, false, false, false),
    new Tile(20, true, true, true, true, false, false, true, false, false),
    
    new Tile(21, true, false, true, 'grille', true, true, false, false, false),
    new Tile(22, true, false, true, 'grille', true, true, false, false, false),
    new Tile(23, true, 'door', false, true, true, true, false, false, false),
    new Tile(24, true, 'door', false, true, true, true, false, false, false),
    new Tile(25, false, 'door', true, true, true, true, false, false, false),
    new Tile(26, false, true, false, true, true, true, false, false, false),
    new Tile(27, false, true, false, true, true, true, false, false, false),
    new Tile(28, false, false, false, true, true, true, false, false, false),
    new Tile(29, false, false, false, true, true, true, false, false, false),
    new Tile(30, false, false, false, true, true, true, false, false, false),
    
    new Tile(31, false, true, false, true, true, true, false, false, false),
    new Tile(32, false, true, false, true, true, true, false, false, false),
    new Tile(33, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    new Tile(34, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    new Tile(35, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    new Tile(36, false, true, true, 'grille', true, true, false, false, false),
    new Tile(37, true, true, false, 'grille', true, true, false, false, false),
    new Tile(37, true, true, true, 'grille', true, true, false, false, false),
    new Tile(39, true, false, false, true, true, true, false, true, false),
    new Tile(40, false, false, false, true, true, true, false, true, false),
    
    new Tile(41, true, true, true, true, true, true, false, true, false),
    new Tile(42, false, true, false, true, false, false, false, false, 'pit'),//бездонная яма
    new Tile(43, false, true, false, true, false, false, false, false, 'pit'),//бездонная яма
    new Tile(44, true, true, false, true, true, true, false, true, false),
    new Tile(45, true, true, false, true, true, true, false, true, false),
    new Tile(46, true, true, true, true, true, false, false, false, 'abyss right'),//Пропасть
    new Tile(47, true, true, true, true, true, false, false, false, 'abyss left'),//Пропасть
    new Tile(48, true, true, true, true, true, false, false, false, 'abyss left'),//Пропасть
    new Tile(49, true, true, false, true, true, true, false, false, false),
    new Tile(50, true, true, false, true, true, true, false, false, false),
    
    new Tile(51, true, true, true, true, false, false, true, false, false),
    new Tile(52, false, true, true, true, false, false, true, false, false),
    new Tile(53, true, true, false, true, false, false, true, false, false),
    new Tile(54, false, true, true, true, true, true, false, false, false),
    new Tile(55, false, true, true, true, true, true, false, false, false),
    new Tile(56, false, 'door', true, true, true, true, false, false, false),
    new Tile(57, 'door', 'door', 'door', true, true, true, false, false, false),
    new Tile(58, 'door', 'door', 'door', true, true, true, false, false, false),
    new Tile(59, true, true, true, true, false, false, false, false, 'web'),// паутина
    new Tile(60, true, true, true, true, false, false, false, false, 'web'),// паутина
    
    new Tile(61, false, false, false, true, true, true, false, false, false),
    new Tile(62, false, false, false, true, true, true, false, false, false),
    new Tile(63, false, false, false, true, true, true, false, false, false),
    new Tile(64, false, false, false, true, true, true, false, false, false),
    new Tile(65, false, false, false, true, true, true, false, false, false),
    new Tile(66, false, false, false, true, false, true, false, false, 'rotate'),// повернуть на 180
    new Tile(67, true, true, true, true, true, true, false, false, false),
    new Tile(68, true, true, true, true, true, true, false, false, false),
    new Tile(69, true, true, true, true, true, true, false, false, false),
    new Tile(70, true, true, true, true, true, true, false, false, false),
    
    new Tile(71, false, false, [4,5,6], [1,2,3], false, false, false, false, 'dark'), // темная комната
    new Tile(72, false, true, true, true, false, false, false, false, false), 
    new Tile(73, false, true, false, true, false, false, false, false, false), 
    new Tile(74, false, false, true, true, true, true, false, false, false), 
    new Tile(75, true, true, true, true, true, true, false, false, false), 
    new Tile(76, true, true, false, true, true, true, false, true, false), 
    new Tile(77, false, true, true, true, false, false, false, false, false), 
    new Tile(78, false, true, false, true, false, false, false, false, false), 
    new Tile(79, false, false, true, true, true, true, false, false, false), 
    new Tile(80, true, true, true, true, true, true, false, false, false), 
    
    new Tile(81, true, true, false, true, true, true, false, false, false), 
    new Tile(82, true, false, true, true, false, false, false, false, false), 
    new Tile(83, false, false, true, true, false, false, false, false, false), 
    new Tile(84, false, false, true, true, true, true, false, false, false), 
    new Tile(85, true, true, true, true, true, true, false, false, false), 
    new Tile(86, false, true, true, true, true, true, false, false, false), 
    new Tile(87, true, false, true, true, false, false, false, false, false), 
    new Tile(88, false, false, true, true, false, false, false, false, false), 
    new Tile(89, false, false, true, true, true, true, false, false, false), 
    new Tile(90, true, true, true, true, true, true, false, false, false), 
    
    new Tile(91, true, true, false, true, false, false, false, false, false), 
    new Tile(92, true, false, false, true, false, false, false, false, false), 
    new Tile(93, false, false, true, true, true, true, false, false, false), 
    new Tile(94, true, true, true, true, true, true, false, false, false), 
    new Tile(95, true, true, true, true, false, false, false, false, 'web'),// паутина
    new Tile(96, true, true, false, true, false, false, false, false, false), 
    new Tile(97, true, false, false, true, false, false, false, false, false), 
    new Tile(98, true, false, false, true, true, true, false, false, false), 
    new Tile(99, true, false, false, true, true, true, false, false, false), 
    new Tile(100, true, true, true, true, true, true, false, false, false), 
    
    new Tile(101, true, true, true, true, false, false, false, false, false), 
    new Tile(102, true, true, true, true, false, false, false, false, false), 
    new Tile(103, true, false, false, true, true, true, false, false, false), 
    new Tile(104, true, false, false, true, true, true, false, false, false), 
    new Tile(105, false, true, false, true, false, false, false, false, 'bridge'), //мост
    new Tile(106, false, true, false, true, false, false, false, false, 'bridge'), //мост
    new Tile(107, false, true, false, true, false, false, false, false, 'bridge'), //мост
    new Tile(108, false, true, false, true, false, false, false, false, 'bridge'), //мост
    new Tile(109, true, false, true, true, true, true, false, false, false),
    new Tile(110, true, false, true, true, true, true, false, false, false),
    
    new Tile(111, true, false, true, true, true, true, false, false, false),
    new Tile(112, true, false, true, true, true, true, false, false, false),
    new Tile(113, [3,4], false, [5,6], [1,2], false, false, false, false, 'dark'), // темная комната
    new Tile(114, [3,4], false, [5,6], [1,2], false, false, false, false, 'dark'), // темная комната
    new Tile(115, [3,4], false, [5,6], [1,2], false, false, false, false, 'dark'), // темная комната
    new Tile(116, [4,5,6], false, false, [1,2,3], false, false, false, false, 'dark'), // темная комната
    new Tile(117, true, true, true, true, false, false, true, false, false),
    new Tile(118, true, true, false, true, false, false, true, false, false),
    new Tile(119, false, true, true, true, false, false, true, false, false),
    new Tile(120, true, true, true, true, false, false, false, false, 'web'),// паутина
    
    new Tile(121, true, true, true, true, false, false, false, false, 'web'),// паутина
    new Tile(122, false, true, false, true, false, false, false, false, 'pit'),//бездонная яма
    new Tile(123, 'door', 'door', 'door', true, true, true, false, false, false),
    new Tile(124, 'door', 'door', 'door', true, true, true, false, false, false),
    new Tile(125, false, 'door', true, true, true, true, false, false, false),
    new Tile(126, true, true, true, true, true, false, false, false, 'abyss left'),//Пропасть
    new Tile(127, true, true, true, true, true, true, false, false, false),
    new Tile(128, true, true, true, true, true, true, false, false, false),
    new Tile(129, true, true, true, 'grille', true, true, false, false, false),
    new Tile(130, true, true, true, true, false, false, false, false, 'web')// паутина
]


export {room_tiles}

