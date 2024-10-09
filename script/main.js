import  {loadTemplate}  from './loadTemplate.js';
import  {authentication}  from './authentication.js';
import  {lobby}  from './lobby.js';
import  {game_container}  from './game_container.js';

// loadTemplate('body', `authentication`).then(()=>{authentication()});

// document.addEventListener('authenticated', () => {
//     loadTemplate('body', `lobby`).then(()=>{lobby()});
// });

// document.addEventListener('confirm', () => {
//     loadTemplate('body', `game_container`).then(()=>{game_container()});
// });

loadTemplate('body', `game_container`).then(()=>{game_container()});

//TODO добавить подсказки к ходу игры
// показать где старт



