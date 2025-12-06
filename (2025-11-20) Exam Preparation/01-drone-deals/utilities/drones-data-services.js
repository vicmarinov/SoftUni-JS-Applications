import { requestsAPI } from './requests-api.js';

const BASE_URL = 'http://localhost:3030/data/drones';

const endpoints = {
    allDrones: BASE_URL,
    allDronesSorted: BASE_URL + '?sortBy=_createdOn%20desc',
    concreteDrone: (droneId) => BASE_URL + `/${droneId}`
};

async function getAllDrones () {
    return await requestsAPI.get(endpoints.allDronesSorted);
}

async function getConcreteDrone (droneId) {
    return await requestsAPI.get(endpoints.concreteDrone(droneId));
}

async function createDrone (model, imageUrl, price, weight, phone, condition, description) {
    const droneData = {
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    };

    await requestsAPI.post(endpoints.allDrones, droneData);
}

async function updateDrone (droneId, model, imageUrl, price, weight, phone, condition, description) {
    const droneData = {
        model,
        imageUrl,
        price,
        weight,
        phone,
        condition,
        description
    };

    await requestsAPI.put(endpoints.concreteDrone(droneId), droneData);
}

async function deleteDrone (droneId) {
    await requestsAPI.delete(endpoints.concreteDrone(droneId));
}

export const dronesDataServices = {
    getAllDrones,
    getConcreteDrone,
    createDrone,
    updateDrone,
    deleteDrone
};