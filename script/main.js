import  {loadTemplate}  from './loadTemplate.js';
import  {lobby}  from './lobby.js';
import  {authentication, game, player}  from './authentication.js';

loadTemplate('body', `authentication`).then(()=>{authentication()});

document.addEventListener('authenticated', () => {
    console.log(1)
    loadTemplate('body', `lobby`).then(()=>{lobby()});
});





