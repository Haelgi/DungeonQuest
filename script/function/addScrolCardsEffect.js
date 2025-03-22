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

        if (startX === endX && fn) fn(e);

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
