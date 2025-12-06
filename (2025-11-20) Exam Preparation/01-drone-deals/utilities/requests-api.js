import { userServices } from './user-services.js';
import { showNotification } from '../views/show-notification.js';

async function makeRequest (endpointURL, method, requestBodyDataObj) {
    try {
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }

        const accessToken = userServices.getUserData.accessToken();

        if (accessToken) {
            requestOptions.headers['X-Authorization'] = accessToken;
        }

        if (requestBodyDataObj) {
            requestOptions.body = JSON.stringify(requestBodyDataObj);
        }

        const response = await fetch(endpointURL, requestOptions);

        if (response.status === 204) return;

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        return responseData;
    } catch (error) {
        showNotification(`Oops... An error has occurred! Error message: ${error.message}`);
        console.error(error.message);
    }
}

export const requestsAPI = {
    get: async function (endpointURL) {
        return await makeRequest(endpointURL, 'GET');
    },
    post: async function (endpointURL, requestBodyData) {
        return await makeRequest(endpointURL, 'POST', requestBodyData);
    },
    put: async function (endpointURL, requestBodyData) {
        return await makeRequest(endpointURL, 'PUT', requestBodyData);
    },
    delete: async function (endpointURL) {
        return await makeRequest(endpointURL, 'DELETE');
    }
}