import  {loadTemplate}  from './function/loadTemplate.js';
import  {authentication}  from './authentication.js';
import  {lobby}  from './lobby.js';
import  {game_container}  from './game_container.js';
import  {game}  from './game.js';

if(game.getLocalData('savedGame')) {
    console.log('[Log] Saved game found, loading...')
    loadTemplate('body', `game_container`).then(()=>{game_container()});
} else {
    console.log('[Log] No saved game found, starting new game...')
    loadTemplate('body', `authentication`).then(()=>{authentication()});
}


document.addEventListener('authenticated', () => {
    loadTemplate('body', `lobby`).then(()=>{lobby()});
});

document.addEventListener('confirm', () => {
    loadTemplate('body', `game_container`).then(()=>{game_container()});
});

document.addEventListener('returnToAuthentication', () => {
    loadTemplate('body', `authentication`).then(()=>{authentication()});
});

document.addEventListener('returnToLobby', () => {
    loadTemplate('body', `lobby`).then(()=>{lobby()});
});


