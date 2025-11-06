const usernameInputElement = document.getElementById('username');
const repoInputElement = document.getElementById('repo');
const listElement = document.getElementById('commits');

async function loadCommits () {
    listElement.innerHTML = '';

    const username = usernameInputElement.value;
    const repo = repoInputElement.value;

    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw response;

        const dataArr = await response.json();
    
        for (const data of dataArr) {
            addItemToList(`${data.commit.author.name}: ${data.commit.message}`);
        }
    } catch (error) {
        addItemToList(`Error: ${error.status}`);
    }   
}

function addItemToList (text) {
    const listItemElement = document.createElement('li');
    listItemElement.textContent = text;
    
    listElement.append(listItemElement);
}