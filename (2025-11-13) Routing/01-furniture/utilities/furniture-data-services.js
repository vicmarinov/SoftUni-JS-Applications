import { requestsAPI } from './requests-api.js';

const BASE_URL = 'http://localhost:3030/data/catalog';

const endpoints = {
    allFurniture: BASE_URL,
    concreteFurniture: (furnitureId) => BASE_URL + `/${furnitureId}`,
    userOwnedFurniture: (userId) => BASE_URL + `?where=_ownerId%3D%22${userId}%22`
};

async function getAllFurniture () {
    return await requestsAPI.get(endpoints.allFurniture);
}

async function getConcreteFurniture (furnitureId) {
    return await requestsAPI.get(endpoints.concreteFurniture(furnitureId));
}

async function getUserOwnedFurniture (userId) {
    return await requestsAPI.get(endpoints.userOwnedFurniture(userId));
}

async function createFurniture (make, model, year, description, price, imageURL, material) {
    const furnitureData = {
        make,
        model,
        year,
        description,
        price,
        img: imageURL,
        material
    };

    await requestsAPI.post(endpoints.allFurniture, furnitureData);
}

async function updateFurniture (furnitureId, make, model, year, description, price, imageURL, material) {
    const furnitureData = {
        make,
        model,
        year,
        description,
        price,
        img: imageURL,
        material
    };

    await requestsAPI.put(endpoints.concreteFurniture(furnitureId), furnitureData);
}

async function deleteFurniture (furnitureId) {
    await requestsAPI.delete(endpoints.concreteFurniture(furnitureId));
}

export const furnitureDataServices = {
    getAllFurniture,
    getConcreteFurniture,
    getUserOwnedFurniture,
    createFurniture,
    updateFurniture,
    deleteFurniture
};