import  {loadTemplate}  from './loadTemplate.js';
import  {authentication, game, player}  from './authentication.js';

loadTemplate('body', `authentication`).then(()=>{authentication()});

setTimeout(() => {
    console.log(game, player)
}, 5000);






