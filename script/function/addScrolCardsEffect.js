const handlersMap = new Map(); // Храним обработчики для каждого контейнера

export function addScrolCardsEffect(container, fn) {
    let startX = 0;
    let endX = 0;

    const parentContainer = document.querySelector(container);
    if (!parentContainer) return;

    function handleMouseDown(e) {
        e.preventDefault();
        startX = e.clientX;
    }

    function handleMouseUp(e) {
        if (!startX) return;

        endX = e.clientX;

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

    // **Удаляем старые обработчики, если они есть**
    if (handlersMap.has(parentContainer)) {
        const { down, up } = handlersMap.get(parentContainer);
        parentContainer.removeEventListener('mousedown', down);
        parentContainer.removeEventListener('mouseup', up);
    }

    // **Добавляем новые обработчики и сохраняем их в Map**
    parentContainer.addEventListener('mousedown', handleMouseDown);
    parentContainer.addEventListener('mouseup', handleMouseUp);

    handlersMap.set(parentContainer, { down: handleMouseDown, up: handleMouseUp });
}
