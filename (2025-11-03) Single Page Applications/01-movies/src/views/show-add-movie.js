import { getNavigation } from "./get-navigation.js";
import { getFooter } from "./get-footer.js";
import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";
import { moviesServices } from "../movies-services.js";

export function showAddMovie () {
    if (!userServices.getUserData('userId')) {
        showView('/');
        return;
    }
    
    const container = document.getElementById('container');
    container.innerHTML = '';

    container.appendChild(getNavigation());

    const addMovieSectionElement = document.createElement('section');
    addMovieSectionElement.id = 'add-movie';
    addMovieSectionElement.className = 'view-section';
    addMovieSectionElement.innerHTML = `
        <form id="add-movie-form" class="text-center border border-light p-5" action="#" method="">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Title" name="title" value="" />
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <input class="form-control" placeholder="Description" name="description" id="description" />
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" name="img" value="" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;

    addMovieSectionElement.querySelector('form#add-movie-form')
        .addEventListener('submit', onAddMovieFormSubmit);

    container.appendChild(addMovieSectionElement);

    container.appendChild(getFooter());
}

async function onAddMovieFormSubmit (event) {
    event.preventDefault();

    const addMovieForm = event.currentTarget;
    const {title, description, img} = Object.fromEntries(
        new FormData(addMovieForm).entries()
    );
    
    if (!title || !description || !img) {
        alert('All the fields are required!');
        return;
    }

    await moviesServices.addMovie(title, description, img);

    showView('/');
}