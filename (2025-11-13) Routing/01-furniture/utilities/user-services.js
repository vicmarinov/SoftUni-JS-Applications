import { requestsAPI } from './requests-api.js';
import { storageServices } from './storage-services.js';

const BASE_URL = 'http://localhost:3030/users';

const endpoints = {
    register: BASE_URL + '/register',
    login: BASE_URL + '/login',
    logout: BASE_URL + '/logout'
};

async function registerUser (email, password) {
    const userData = await requestsAPI.post(endpoints.register, { email, password });
    saveUserData(userData);
}

async function loginUser (email, password) {
    const userData = await requestsAPI.post(endpoints.login, { email, password });
    saveUserData(userData);
}

async function logoutUser () {
    await requestsAPI.get(endpoints.logout);
    deleteUserData();
}

function saveUserData (userDataObj) {
    storageServices.saveData(
        'userData',
        {
            id: userDataObj._id,
            accessToken: userDataObj.accessToken
        }
    );
}

function deleteUserData () {
    storageServices.deleteData(['userData']);
}

export const userServices = {
    registerUser,
    loginUser,
    logoutUser,
    getUserData: {
        id: () => storageServices.getData('userData')?.id,
        accessToken: () => storageServices.getData('userData')?.accessToken
    }
};