export function scrolCards(container){
    const parentContainer = document.querySelector(container);
    const cards = parentContainer.querySelectorAll('*');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            removeActiveClasses();
            card.classList.add('active');
        })
    })

    function removeActiveClasses() {
        cards.forEach(card => {
            card.classList.remove('active');
        })
    }
}