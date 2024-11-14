export function addScrolCardsEffect(container, fn){
    let startX = 0;
    let endX = 0;

    const parentContainer = document.querySelector(container);


    function handleMouseDown(e){
        e.preventDefault()
        startX = e.clientX
    }
    
    function handleMouseUp(e){
        if (!startX) return

        endX = e.clientX

        if (startX === endX) fn(e)

        if (startX - endX > 50) {
            let elem = parentContainer.querySelector('.active')?.nextElementSibling
            if (!elem) return 
            removeActiveClasses();
            elem.classList.add('active')
        }
        
        if (endX - startX > 50) { 
            let elem = parentContainer.querySelector('.active')?.previousElementSibling
            if (!elem) return 
            removeActiveClasses();
            elem.classList.add('active')
        }
        return
    };

    function removeActiveClasses() {
        const cards = parentContainer.querySelectorAll('*');
        cards.forEach(card => {
            card.classList.remove('active');
        })
    }

    parentContainer.removeEventListener('mousedown', handleMouseDown);
    parentContainer.removeEventListener('mouseup', handleMouseUp);

    parentContainer.addEventListener('mousedown', handleMouseDown);
    parentContainer.addEventListener('mouseup', handleMouseUp);
}