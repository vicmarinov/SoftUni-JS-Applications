import { getNavigation } from "./get-navigation.js";
import { getFooter } from "./get-footer.js";
import { showView } from "../show-view.js";
import { userServices } from "../user-services.js";
import { moviesServices } from "../movies-services.js";

export async function showHomepage () {
    const container = document.getElementById('container');
    container.innerHTML = '';

    container.appendChild(getNavigation());

    const homepageSectionElement = document.createElement('section');
    homepageSectionElement.id = 'home-page';
    homepageSectionElement.className = 'view-section';
    homepageSectionElement.innerHTML = `
        <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40">
            <img src="/images/cropped-movie-banner-e1408372575210.jpg" class="img-fluid" alt="Responsive image" />
            <h1 class="display-4">Movies</h1>
            <p class="lead">
                Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
            </p>
        </div>

        <h1 class="text-center">Movies</h1>

        ${
            userServices.getUserData('userId') ? `
                <section id="add-movie-button" class="user">
                    <a href="/add" class="btn btn-warning">Add Movie</a>
                </section>
            ` : ''
        }

        <section id="movie">
            <div class="mt-3">
                <div class="row d-flex d-wrap">
                    <ul id="movies-list" class="card-deck d-flex justify-content-center">
                    </ul>
                </div>
            </div>
        </section>
    `;
    
    container.appendChild(homepageSectionElement);
    
    container.appendChild(getFooter());

    const addMovieBtn = homepageSectionElement.querySelector('#add-movie-button');
    if (addMovieBtn) addMovieBtn.addEventListener('click', (event) => {
        event.preventDefault();
        showView('/add');
    });

    const moviesListElement = homepageSectionElement.querySelector('#movies-list');
    moviesListElement.addEventListener('click', onMovieClick);

    (await moviesServices.getAllMoviesArr()).forEach(movieData => {
        moviesListElement.appendChild(getMovieCard(movieData));
    });
}

function onMovieClick (event) {
    event.preventDefault();

    if (
        event.target.tagName !== 'A' &&
        event.target.tagName !== 'BUTTON'
    ) return;

    let detailsLinkClicked = event.target;

    if (event.target.tagName === 'BUTTON') {
        detailsLinkClicked = detailsLinkClicked
            .parentElement
            .parentElement
            .querySelector('a');
    }

    showView(new URL(detailsLinkClicked.href));
}

function getMovieCard (movieDataObj) {
    const movieCardElement = document.createElement('li');
    movieCardElement.className = 'card mb-4';
    movieCardElement.innerHTML = `
        <img class="card-img-top" src="" alt="Card image cap" width="400" />
        <div class="card-body">
            <h4 class="card-title"></h4>
            <a href="">
            </a>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-info">Details</button>
        </div>
    `;

    movieCardElement.querySelector('img.card-img-top').src = movieDataObj.img;
    movieCardElement.querySelector('div.card-body > h4.card-title').textContent = movieDataObj.title;
    movieCardElement.querySelector('div.card-body > a').href = `/details/${movieDataObj._id}`;

    return movieCardElement;
}