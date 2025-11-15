window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('refresh').addEventListener('click', loadMessages);
    document.getElementById('submit').addEventListener('click', sendMessage);
});

const URL = 'http://localhost:3030/jsonstore/messenger';

async function loadMessages () {
    try {
        const response = await fetch(URL);
        const messagesData = await response.json();

        if (!response.ok) {
            throw new Error(messagesData.message);
        }

        document.getElementById('messages').textContent = Object.values(messagesData)
            .map(({author, content}) => `${author}: ${content}`)
            .join('\n');
    } catch (error) {
        alert(error);
    }
}

async function sendMessage () {
    const authorInput = document.querySelector('#controls > input[name="author"]');
    const contentInput = document.querySelector('#controls > input[name="content"]');

    const author = authorInput.value;
    const content = contentInput.value;

    if (!author || !content) {
        alert('Both "name" and "message" fields are required!');
        return;
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({author, content})
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadMessages();

        authorInput.value = '';
        contentInput.value = '';
    } catch (error) {
        alert(error);
    }
}