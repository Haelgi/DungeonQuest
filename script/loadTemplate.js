/**
 * replacing the contents of a container
 *
 * @export
 * @param {str} container teg or other selector
 * @param {str} templatesName name template in folder './templates/...'
 */
export function loadTemplate(container, templatesName){
    const contain = document.querySelector(container);
    fetch(`templates/${templatesName}.html`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        contain.innerHTML = data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}