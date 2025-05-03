import { player } from '../player.js';
import  {heroes}  from '../cards/heroes.js';
import  {ew}  from '../eventWidows.js';

const handlersMap = new Map(); // Храним обработчики для каждого контейнера

export function addScrolCardsEffect(container, fn) {
    let startX = 0;
    let endX = 0;

    const parentContainer = document.querySelector(container);
    if (!parentContainer) return;

    function handleStart(e) {
        e.preventDefault();

        

        startX = e.touches ? e.touches[0].clientX : e.clientX;
    }

    function handleEnd(e) {
        if (!startX) return;

        endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        let activeCard

        if (startX === endX) {
            if (!e.target.classList.contains('active')) {
                removeActiveClasses();
                e.target.classList.add('active');
                return
            }
            const sours = e.target.getAttribute('sours');
            const cardId = parseInt(e.target.getAttribute('id'));
            const cardPack = e.target.getAttribute('pack');

            if (sours === 'player') activeCard = player[cardPack][cardId] 
            if (sours === 'heroes') activeCard = heroes[player.hero][cardPack][cardId] 

            if (activeCard.clickFn) {
                ew.drawEW('Вікорістаті цю карту?')
                ew.drawCardsInEW(activeCard)
                ew.addBtnInEW('btn_next','Так', activeCard.clickFn)
                ew.addBtnInEW('btn_clouse','Ні', ew.removeAllEW)
            }
        };

        if (startX - endX > 50) {
            let elem = parentContainer.querySelector('.active')?.nextElementSibling;
            if (!elem) return;
            removeActiveClasses();
            elem.classList.add('active');
        }

        if (endX - startX > 50) {
            let elem = parentContainer.querySelector('.active')?.previousElementSibling;
            if (!elem) return;
            removeActiveClasses();
            elem.classList.add('active');
        }
    }

    function removeActiveClasses() {
        const activeCard = parentContainer.querySelector('.active');
        if (activeCard) activeCard.classList.remove('active');
    }

    // Удаляем старые обработчики
    if (handlersMap.has(parentContainer)) {
        const { start, end } = handlersMap.get(parentContainer);
        parentContainer.removeEventListener('mousedown', start);
        parentContainer.removeEventListener('mouseup', end);
        parentContainer.removeEventListener('touchstart', start);
        parentContainer.removeEventListener('touchend', end);
    }

    // Добавляем новые обработчики
    parentContainer.addEventListener('mousedown', handleStart);
    parentContainer.addEventListener('mouseup', handleEnd);
    parentContainer.addEventListener('touchstart', handleStart, { passive: false });
    parentContainer.addEventListener('touchend', handleEnd);

    handlersMap.set(parentContainer, { start: handleStart, end: handleEnd });
}
