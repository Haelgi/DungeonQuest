export function addScrolCardsEffect(container){
    let startX = 0;
    let endX = 0;
    let clickDown = 'mousedown'
    let clickMove = 'mousemove'
    let clickUp = 'mouseup'

    const parentContainer = document.querySelector(container);
    const cards = parentContainer.querySelectorAll('*');

    parentContainer.addEventListener('mousedown', (e)=>{
        e.preventDefault()
        startX = e.clientX
    })
    
    parentContainer.addEventListener('mousemove', (e)=>{
        if (!startX) return
        endX = e.clientX
    })
    
    parentContainer.addEventListener('mouseup', (e)=>{
        if (startX - endX > 10) {
            let elem = parentContainer.querySelector('.active')?.nextElementSibling
            if (!elem) return 
            removeActiveClasses();
            elem.classList.add('active')
        }
        
        if (endX - startX > 10) { 
            let elem = parentContainer.querySelector('.active')?.previousElementSibling
            if (!elem) return 
            removeActiveClasses();
            elem.classList.add('active')
        }
    });

    function removeActiveClasses() {
        cards.forEach(card => {
            card.classList.remove('active');
        })
    }
}