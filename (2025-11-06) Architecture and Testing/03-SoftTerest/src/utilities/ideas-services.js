import { requestsAPI } from "./requests-api.js";

const BASE_URL = 'http://localhost:3030/data';

const ENDPOINTS = {
    allIdeas: BASE_URL + '/ideas',
    allIdeasSorted: BASE_URL + '/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    concreteIdea: (id) => BASE_URL + `/ideas/${id}`
};

async function getAllIdeasArrSorted () {
    return await requestsAPI.get(ENDPOINTS.allIdeasSorted);
}

async function getConcreteIdeaData (ideaId) {
    return await requestsAPI.get(ENDPOINTS.concreteIdea(ideaId));
}

async function createIdea (title, description, img) {
    await requestsAPI.post(ENDPOINTS.allIdeas, { title, description, img });
}

async function deleteConcreteIdea (ideaId) {
    await requestsAPI.delete(ENDPOINTS.concreteIdea(ideaId));
}

export const ideasServices = {
    getAllIdeasArrSorted,
    getConcreteIdeaData,
    createIdea,
    deleteConcreteIdea
};