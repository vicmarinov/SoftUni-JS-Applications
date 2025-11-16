import { requestsAPI } from "./requests-api.js";

const BASE_URL = 'http://localhost:3030/data';

const ENDPOINTS = {
    allMovies: BASE_URL + '/movies',
    concreteMovie: (movieId) => BASE_URL + '/movies' + `/${movieId}`,
    likesCount: (movieId) => BASE_URL + `/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`,
    likesCountFromSpecificUser: (movieId, userId) => BASE_URL + `/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    addLike: BASE_URL + '/likes'
};

async function getAllMoviesArr () {
    return await requestsAPI.get(ENDPOINTS.allMovies);
}

async function getMovie (movieId) {
    return await requestsAPI.get(ENDPOINTS.concreteMovie(movieId));
}

async function addMovie (title, description, imageURL) {
    const movieData = {title, description, img: imageURL};
    await requestsAPI.post(ENDPOINTS.allMovies, movieData);
}

async function editMovie (movieId, title, description, imageURL) {
    const movieData = {title, description, img: imageURL};
    await requestsAPI.put(ENDPOINTS.concreteMovie(movieId), movieData);
}

async function deleteMovie (movieId) {
    await requestsAPI.delete(ENDPOINTS.concreteMovie(movieId));
}

async function getLikesCount (movieId) {
    return await requestsAPI.get(ENDPOINTS.likesCount(movieId));
}

async function getLikesCountFromSpecificUser (movieId, userId) {
    return await requestsAPI.get(ENDPOINTS.likesCountFromSpecificUser(movieId, userId));
}

async function addLike (movieId) {
    await requestsAPI.post(ENDPOINTS.addLike, {movieId});
}

export const moviesServices = {
    getAllMoviesArr,
    getMovie,
    addMovie,
    editMovie,
    deleteMovie,
    getLikesCount,
    getLikesCountFromSpecificUser,
    addLike
};