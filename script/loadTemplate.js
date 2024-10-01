/**
 * Replacing the contents of a container with a template
 *
 * @export
 * @param {string} container - The selector of the container to replace content in
 * @param {string} templatesName - Name of the template file in folder './templates/...'
 * @returns {Promise} - A promise that resolves when the template is loaded and inserted
 */
export function loadTemplate(container, templatesName) {
    const contain = document.querySelector(container);

    return new Promise((resolve, reject) => {
        fetch(`templates/${templatesName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                contain.innerHTML = data;
                resolve(); 
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                reject(error); 
            });
    });
}
