const mainElement = document.getElementById('main');

const BASE_URL = 'http://localhost:3030/jsonstore/advanced/articles';
const ENDPOINTS = {
    list: '/list',
    details: (articleId) => `/details/${articleId}`
};

window.addEventListener('DOMContentLoaded', () => {
    mainElement.innerHTML = '';

    loadArticles();
});

async function loadArticles () {
    const articlesList = await getArticlesList();

    for (const { _id, title } of articlesList) {
        mainElement.appendChild(
            createAccordion(title, _id)
        );
    }
}

async function getArticlesList () {
    const response = await fetch(BASE_URL + ENDPOINTS.list);
    const articlesList = await response.json();
    return articlesList;
}

async function getArticleDataById (id) {
    const response = await fetch(BASE_URL + ENDPOINTS.details(id));
    const articleData = response.json();
    return articleData;
}

async function onAccordionToggle (event) {
    const accordionBtn = event.currentTarget;
    const accordionElement = accordionBtn.parentElement.parentElement;
    const accordionExtraContainer = accordionElement.getElementsByClassName('extra')[0];
    const accordionContentElement = accordionExtraContainer.getElementsByTagName('p')[0];

    const articleId = accordionBtn.id;

    if (accordionContentElement.textContent === '') {
        const articleData = await getArticleDataById(articleId);
        accordionContentElement.textContent = articleData.content;
    }

    const isAccordionContentHidden = (accordionExtraContainer.style.display || 'none') === 'none';

    if (isAccordionContentHidden) {
        accordionExtraContainer.style.display = 'block';
        accordionBtn.textContent = 'Less';
    } else {
        accordionExtraContainer.style.display = 'none';
        accordionBtn.textContent = 'More';
    }
}

function createAccordion (articleTitle, articleId) {
    const accordionElement = document.createElement('div');
    accordionElement.className = 'accordion';
    
    const accordionHeadContainer = document.createElement('div');
    accordionHeadContainer.className = 'head';
    accordionElement.appendChild(accordionHeadContainer);

    const accordionHeading = document.createElement('span');
    accordionHeading.textContent = articleTitle;
    accordionHeadContainer.appendChild(accordionHeading);
    
    const accordionBtn = document.createElement('button');
    accordionBtn.className = 'button';
    accordionBtn.id = articleId;
    accordionBtn.textContent = 'More';
    accordionBtn.addEventListener('click', onAccordionToggle);
    accordionHeadContainer.appendChild(accordionBtn);

    const accordionExtraContainer = document.createElement('div');
    accordionExtraContainer.className = 'extra';
    accordionElement.appendChild(accordionExtraContainer);

    const accordionContent = document.createElement('p');
    accordionExtraContainer.appendChild(accordionContent);

    return accordionElement;
}