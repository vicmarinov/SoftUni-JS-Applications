const postsSelector = document.getElementById('posts');

const BASE_URL = 'http://localhost:3030/jsonstore/blog';
const ENDPOINTS = {
    posts: '/posts',
    comments: '/comments'
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnLoadPosts')
        .addEventListener('click', loadPosts);

    document.getElementById('btnViewPost')
        .addEventListener('click', viewPost);
});

async function loadPosts () {
    const response = await fetch(BASE_URL + ENDPOINTS.posts);
    const postsObj = await response.json();

    for (const post of Object.values(postsObj)) {
        const optionElement = document.createElement('option');
        optionElement.textContent = post.title;
        optionElement.value = post.id;

        postsSelector.appendChild(optionElement);
    }
}

async function viewPost () {
    const postId = postsSelector.value;

    const response1 = await fetch(BASE_URL + ENDPOINTS.posts);
    const postsObj = await response1.json();

    const post = postsObj[postId];

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;

    const commentsSection = document.getElementById('post-comments');
    commentsSection.innerHTML = '';

    const response2 = await fetch(BASE_URL + ENDPOINTS.comments);
    const commentsObj = await response2.json();

    const commentsToSelectedPost = Object.values(commentsObj)
        .filter(comment => comment.postId === postId);
    
    for (const comment of commentsToSelectedPost) {
        const commentElement = document.createElement('li');
        commentElement.textContent = comment.text;
        commentElement.id = comment.id;

        commentsSection.appendChild(commentElement);
    }
}