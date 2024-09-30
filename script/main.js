import  {loadTemplate}  from './loadTemplate.js';

const body = document.querySelector('body');

loadTemplate(body, `authentication`)


// fetch('templates/lobby.html').then(response => response.text()).then(data => {body.innerHTML = data;});