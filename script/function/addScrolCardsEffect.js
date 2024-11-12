export function addScrolCardsEffect(container){
    let startX = 0;
    let endX = 0;
    let clickDown = 'mousedown'
    let clickMove = 'mousemove'
    let clickUp = 'mouseup'

    const parentContainer = document.querySelector(container);
    const cards = parentContainer.querySelectorAll('*');

    if ('ontouchstart' in window) {
        clickDown = 'touchstart'
        clickMove = 'touchmove'
        clickUp = 'touchend'
    }

    parentContainer.addEventListener(clickDown, (e)=>{
        if (!e.target.closest('.card-deck-container')) return
        startX = e.clientX
        if ('ontouchstart' in window) startX = e.touches[0].clientX;
    })
    
    parentContainer.addEventListener(clickMove, (e)=>{
        if (!startX) return
        endX = e.clientX
        if ('ontouchstart' in window) endX = e.touches[0].clientX;
    })
    
    parentContainer.addEventListener(clickUp, (e)=>{
        if (startX - endX > 10) {
            let elem = e.target.nextElementSibling
            if (elem===null) return 
            removeActiveClasses();
            elem.classList.add('active')
        }
        
        if (endX - startX > 10) { 
            let elem = e.target.previousElementSibling
            if (elem===null) return 
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