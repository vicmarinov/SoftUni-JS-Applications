import { requestsAPI } from "./requests-api.js";
import { storageServices } from "./storage-services.js";

const BASE_URL = 'http://localhost:3030/users';

const ENDPOINTS = {
    register: BASE_URL + '/register',
    login: BASE_URL + '/login',
    logout: BASE_URL + '/logout'
};

async function registerUser (email, password) {
    const userData = await requestsAPI.post(ENDPOINTS.register, { email, password });
    saveUserData(userData);
}

async function loginUser (email, password) {
    const userData = await requestsAPI.post(ENDPOINTS.login, { email, password });
    saveUserData(userData);
}

async function logoutUser () {
    await requestsAPI.get(ENDPOINTS.logout);
    deleteUserData();
}

function saveUserData (userDataObj) {
    storageServices.saveData({
        userId: userDataObj._id,
        userEmail: userDataObj.email,
        accessToken: userDataObj.accessToken
    });
}

function deleteUserData () {
    storageServices.deleteData([
        'userId',
        'userEmail',
        'accessToken'
    ]);
}

export const userServices = {
    registerUser,
    loginUser,
    logoutUser,
    getUserData: {
        id: () => storageServices.getData('userId'),
        email: () => storageServices.getData('userEmail'),
        accessToken: () => storageServices.getData('accessToken')
    }
};