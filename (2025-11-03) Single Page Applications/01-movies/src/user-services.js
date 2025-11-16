import { requestsAPI } from "./requests-api.js";

const BASE_URL = 'http://localhost:3030/users';

const ENDPOINTS = {
    register: BASE_URL + '/register',
    login: BASE_URL + '/login',
    logout: BASE_URL + '/logout'
};

async function registerUser (email, password) {
    const userData = await requestsAPI.post(ENDPOINTS.register, {email, password});

    saveUserData({
        userId: userData._id,
        userEmail: userData.email,
        accessToken: userData.accessToken
    });
}

async function loginUser (email, password) {
    const userData = await requestsAPI.post(ENDPOINTS.login, {email, password});

    saveUserData({
        userId: userData._id,
        userEmail: userData.email,
        accessToken: userData.accessToken
    });
}

async function logoutUser () {
    await requestsAPI.get(ENDPOINTS.logout);
    deleteUserData();
}

function saveUserData (dataObj) {
    for (const [key, value] of Object.entries(dataObj)) {
        localStorage.setItem(key, value);
    }
}

function getUserData (dataName) {
    return localStorage.getItem(dataName);
}

function deleteUserData () {
    localStorage.clear();
}

export const userServices = {
    registerUser,
    loginUser,
    logoutUser,
    getUserData
};