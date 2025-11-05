const REPOS_URL = 'https://api.github.com/users/testnakov/repos';

function loadRepos() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('readystatechange', function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            document.getElementById('res').textContent = httpRequest.responseText;
        }
    });

    httpRequest.open('GET', REPOS_URL);
    httpRequest.send();
}