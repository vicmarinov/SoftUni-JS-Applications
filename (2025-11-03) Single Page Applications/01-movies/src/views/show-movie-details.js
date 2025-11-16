import { getNavigation } from "./get-navigation.js";
import { getFooter } from "./get-footer.js";
import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";
import { moviesServices } from "../movies-services.js";

export async function showMovieDetails (movieId) {
    const container = document.getElementById('container');
    container.innerHTML = '';

    container.appendChild(getNavigation());

    const movieDetailsSectionElement = document.createElement('section');
    movieDetailsSectionElement.id = 'movie-example';
    movieDetailsSectionElement.className = 'view-section';
    movieDetailsSectionElement.innerHTML = `
        <div class="container">
            <div class="row bg-light text-dark">
                <h1></h1>
                <div class="wrapper">
                    <div class="col-md-8">
                        <img class="img-thumbnail" src="" alt="Movie" />
                    </div>
                    <div class="col-md-4 text-center">
                        <h3 class="my-3">Movie Description</h3>
                        <p></p>
                        <a class="btn btn-danger" href="javascript:void(0)" disabled style="display:none">Delete</a>
                        <a class="btn btn-warning" href="" disabled style="display:none">Edit</a>
                        <a class="btn btn-primary" href="javascript:void(0)" disabled style="display:none">Like</a>
                        <span class="enrolled-span"></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.appendChild(movieDetailsSectionElement);

    container.appendChild(getFooter());

    const movieData = await moviesServices.getMovie(movieId);
    movieDetailsSectionElement.querySelector('.container > .row > h1').textContent = `Movie title: ${movieData.title}`;
    movieDetailsSectionElement.querySelector('.wrapper img.img-thumbnail').src = movieData.img;
    movieDetailsSectionElement.querySelector('.wrapper > .text-center > p').textContent = movieData.description;

    if (userServices.getUserData('userId') && userServices.getUserData('userId') === movieData._ownerId) {
        const deleteBtn = movieDetailsSectionElement.querySelector('.container .wrapper .text-center > a.btn-danger');
        deleteBtn.style.display = 'inline-block';
        deleteBtn.removeAttribute('disabled');
        deleteBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            await moviesServices.deleteMovie(movieId);
            showView('/');
        });

        const editBtn = movieDetailsSectionElement.querySelector('.container .wrapper .text-center > a.btn-warning');
        editBtn.style.display = 'inline-block';
        editBtn.removeAttribute('disabled');
        editBtn.href = `/edit/${movieId}`;
        editBtn.addEventListener('click', (event) => {
            event.preventDefault();
            showView(new URL(event.currentTarget.href));
        });
    }

    const movieLikesCount = await moviesServices.getLikesCount(movieId);
    movieDetailsSectionElement.querySelector('.container .wrapper .text-center > span.enrolled-span').textContent = `Liked ${movieLikesCount}`;
    
    if (
        userServices.getUserData('userId') &&
        userServices.getUserData('userId') !== movieData._ownerId &&
        (
            movieLikesCount === 0 ||
            (await moviesServices.getLikesCountFromSpecificUser(movieId, userServices.getUserData('userId'))) === 0
        )
    ) {
        const likeBtn = movieDetailsSectionElement.querySelector('.container .wrapper .text-center > a.btn-primary');
        likeBtn.style.display = 'inline-block';
        likeBtn.removeAttribute('disabled');
        likeBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            await moviesServices.addLike(movieId);
            showView(`/details/${movieId}`);
        });
    }
}