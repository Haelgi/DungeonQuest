import  {loadTemplate}  from './loadTemplate.js';
import  {authentication}  from './authentication.js';


loadTemplate('body', `authentication`).then(()=>{authentication()});
console.log(2)





