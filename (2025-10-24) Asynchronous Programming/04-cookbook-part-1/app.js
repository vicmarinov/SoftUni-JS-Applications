const mainElement = document.getElementsByTagName('main')[0];
const BASE_URL = 'http://localhost:3030/jsonstore/cookbook';

window.addEventListener('load', async () => {
    const recipesPreviewObjectsArr = await getRecipesPreviewObjectsArr();
    loadRecipes(recipesPreviewObjectsArr);
});

async function getRecipesPreviewObjectsArr() {
    const response = await fetch(BASE_URL + '/recipes');
    const data = await response.json();
    return Object.values(data);
}

async function getFullRecipeObjectById(id) {
    const response = await fetch(BASE_URL + `/details/${id}`);
    const fullRecipeObject = await response.json();
    return fullRecipeObject;
}

function loadRecipes(recipesPreviewObjectsArr) {
    mainElement.innerHTML = '';

    for (const recipeObject of recipesPreviewObjectsArr) {
        mainElement.appendChild(createRecipePreviewCard(recipeObject));
    }
}

async function showFullRecipeCard(event) {
    const recipeCard = event.currentTarget;
    const recipeId = recipeCard.dataset.id;

    const fullRecipeObject = await getFullRecipeObjectById(recipeId);

    recipeCard.replaceWith(createFullRecipeCard(fullRecipeObject));
}

function createRecipePreviewCard(recipeObject) {
    const recipeCard = document.createElement('article');
    recipeCard.className = 'preview';
    recipeCard.dataset.id = recipeObject._id;
    recipeCard.addEventListener('click', showFullRecipeCard);

    const titleContainer = document.createElement('div');
    titleContainer.className = 'title';
    recipeCard.appendChild(titleContainer);

    const title = document.createElement('h2');
    title.textContent = recipeObject.name;
    titleContainer.appendChild(title);

    const imageContainer = document.createElement('div');
    imageContainer.className = 'small';
    recipeCard.appendChild(imageContainer);

    const image = document.createElement('img');
    image.src = recipeObject.img;
    imageContainer.appendChild(image);

    return recipeCard;
}

function createFullRecipeCard(recipeObject) {
    const recipeCard = document.createElement('article');
    recipeCard.dataset.id = recipeObject._id;

    const title = document.createElement('h2');
    title.textContent = recipeObject.name;
    recipeCard.appendChild(title);

    const bandContainer = document.createElement('div');
    bandContainer.className = 'band';
    recipeCard.appendChild(bandContainer);

    const imageContainer = document.createElement('div');
    imageContainer.className = 'thumb';
    bandContainer.appendChild(imageContainer);

    const image = document.createElement('img');
    image.src = recipeObject.img;
    imageContainer.appendChild(image);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.className = 'ingredients';
    bandContainer.appendChild(ingredientsContainer);

    const ingredientsHeading = document.createElement('h3');
    ingredientsHeading.textContent = 'Ingredients:';
    ingredientsContainer.appendChild(ingredientsHeading);

    const ingredientsList = document.createElement('ul');
    ingredientsContainer.appendChild(ingredientsList);

    for (const ingredientText of recipeObject.ingredients) {
        const listItem = document.createElement('li');
        listItem.textContent = ingredientText;
        ingredientsList.appendChild(listItem);
    }

    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'description';
    recipeCard.appendChild(descriptionContainer);

    const descriptionHeading = document.createElement('h3');
    descriptionHeading.textContent = 'Preparation:';
    descriptionContainer.appendChild(descriptionHeading);

    for (const descriptionText of recipeObject.steps) {
        const paragraph = document.createElement('p');
        paragraph.textContent = descriptionText;
        descriptionContainer.appendChild(paragraph);
    }

    return recipeCard;
}