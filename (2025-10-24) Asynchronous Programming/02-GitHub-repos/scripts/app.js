const listElement = document.getElementById('repos');

function loadRepos () {
    listElement.innerHTML = '';
    
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(data => {
            for (const repoObj of data) {
                const listItemElement = document.createElement('li');
                
                const anchorElement = document.createElement('a');
                anchorElement.href = repoObj.html_url;
                anchorElement.textContent = repoObj.full_name;

                listItemElement.append(anchorElement);
                listElement.append(listItemElement);
            }
        })
        .catch(error => {
            if (error instanceof Promise) {
                error = error.then(err => {
                    handleError(err.message);
                });
            } else {
                handleError(error.message);
            }
        });
}

function handleError (message) {
    listElement.textContent = 'Error: ' + message;
}