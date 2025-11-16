import { getNavigation } from "./get-navigation.js";
import { getFooter } from "./get-footer.js";
import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";
import { moviesServices } from "../movies-services.js";

export async function showEditMovie (movieId) {
    const movieData = await moviesServices.getMovie(movieId);

    if (movieData._ownerId !== userServices.getUserData('userId')) {
        showView('/');
        return;
    }

    const container = document.getElementById('container');
    container.innerHTML = '';

    container.appendChild(getNavigation());

    const editMovieSectionElement = document.createElement('section');
    editMovieSectionElement.id = 'edit-movie';
    editMovieSectionElement.className = 'view-section';
    editMovieSectionElement.innerHTML = `
        <form class="text-center border border-light p-5" action="#" method="">
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input id="title" type="text" class="form-control" placeholder="Movie Title" value="" name="title" />
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <input class="form-control" placeholder="Movie Description..." name="description" id="description" />
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input id="imageUrl" type="text" class="form-control" placeholder="Image Url" value="" name="img" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;

    editMovieSectionElement.querySelector('form input[name="title"]').value = movieData.title;
    editMovieSectionElement.querySelector('form input[name="description"]').value = movieData.description;
    editMovieSectionElement.querySelector('form input[name="img"]').value = movieData.img;
    editMovieSectionElement.querySelector('form').addEventListener('submit', onEditMovieFormSubmit);
    
    async function onEditMovieFormSubmit (event) {
        event.preventDefault();
    
        const editMovieForm = event.currentTarget;
        const {title, description, img} = Object.fromEntries(
            new FormData(editMovieForm).entries()
        );
    
        if (!title || !description || !img) {
            alert('All the fields are required!');
            return;
        }
    
        await moviesServices.editMovie(movieId, title, description, img);
        showView(`/details/${movieId}`);
    }

    container.appendChild(editMovieSectionElement);

    container.appendChild(getFooter());
}
