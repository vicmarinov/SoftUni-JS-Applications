window.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.userId && !sessionStorage.accessToken) {
        window.location = './';
    }

    document.getElementsByTagName('form')[0]
        .addEventListener('submit', createRecipe);
});

async function createRecipe (event) {
    event.preventDefault();

    const createRecipeFormData = new FormData(event.currentTarget);
    const {name, img, ingredients, steps} = Object
        .fromEntries(createRecipeFormData.entries());
    
    if (!name || !img || !ingredients || !steps) {
        alert('All of the fields are required!');
        return;
    }

    const ingredientsArr = ingredients.split('\n');
    const stepsArr = steps.split('\n');

    try {
        const response = await fetch('http://localhost:3030/data/recipes',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': sessionStorage.accessToken
            },
            body: JSON.stringify({
                name,
                img,
                ingredients: ingredientsArr,
                steps: stepsArr
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        window.location = './';
    } catch (error) {
        alert(`ERROR: Couldn\'t create the recipe!\n${error.message}!`);
    }
}