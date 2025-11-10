const BASE_URL = 'http://localhost:3030/data/recipes';

window.addEventListener('DOMContentLoaded', async () => {
    if (sessionStorage.userId && sessionStorage.accessToken) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('logoutBtn').addEventListener('click', logoutUser);
    } else {
        document.getElementById('guest').style.display = 'inline-block';
    }


    const recipesPreviewObjectsArr = await getRecipesPreviewObjectsArr();
    loadRecipes(recipesPreviewObjectsArr);
});

async function getRecipesPreviewObjectsArr () {
    try {
        const response = await fetch(BASE_URL + '?select=_id%2Cname%2Cimg');
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return Object.values(data);
    } catch (error) {
        alert(`ERROR: Cannot load the recipes!\n${error.message}!`);
    }
}

async function getFullRecipeObjectById (id) {
    try {
        const response = await fetch(BASE_URL + `/${id}`);
        const fullRecipeObject = await response.json();

        if (!response.ok) {
            throw new Error(fullRecipeObject.message);
        }

        return fullRecipeObject;
    } catch (error) {
        alert(`ERROR: Cannot load the recipe!\n${error.message}!`);
    }
}

async function logoutUser () {
    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': sessionStorage.accessToken
            }
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('accessToken');

        window.location = './';
    } catch (error) {
        alert(`ERROR: ${error.message}!`)
    }
}

function loadRecipes (recipesPreviewObjectsArr) {
    const mainElement = document.getElementsByTagName('main')[0];
    mainElement.innerHTML = '';

    for (const recipeObject of recipesPreviewObjectsArr) {
        mainElement.appendChild(createRecipePreviewCard(recipeObject));
    }
}

async function showFullRecipeCard (event) {
    const recipeCard = event.currentTarget;
    const recipeId = recipeCard.dataset.id;

    const fullRecipeObject = await getFullRecipeObjectById(recipeId);

    recipeCard.replaceWith(createFullRecipeCard(fullRecipeObject));
}

function createRecipePreviewCard (recipeObject) {
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

function createFullRecipeCard (recipeObject) {
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