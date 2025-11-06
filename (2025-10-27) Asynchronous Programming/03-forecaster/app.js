const SPECIAL_CHARS = {
    'Sunny':        '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast':     '&#x2601;',
    'Rain':         '&#x2614;',
    'Degrees':      '&#176;'
};

const BASE_URL = 'http://localhost:3030/jsonstore/forecaster';

const ENDPOINTS = {
    locations: '/locations',
    today: (locationCode) => `/today/${locationCode}`,
    upcoming: (locationCode) => `/upcoming/${locationCode}`
};

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit')
        .addEventListener('click', showForecasts);
});

async function showForecasts () {
    const forecastSection = document.getElementById('forecast');
    forecastSection.style.display = 'block';

    forecastSection
        .querySelectorAll('#current > .forecasts, #upcoming > .forecast-info')
        .forEach(element => element.remove());

    try {
        const locationData = await getLocationDataByLocationName(
            document.getElementById('location').value
        );
    
        const currentForecastData = await getCurrentForecastData(locationData.code);
        document.getElementById('current').appendChild(
            createCurrentForecast(currentForecastData)
        );
    
        const upcomingForecastData = await getUpcomingForecastData(locationData.code);
        document.getElementById('upcoming').appendChild(
            createUpcomingForecast(upcomingForecastData)
        );
    } catch (error) {
        forecastSection.textContent = 'Error';
    }

}

async function getLocationDataByLocationName (locationName) {
    const response = await fetch(BASE_URL + ENDPOINTS.locations);
    const locationsDataArr = await response.json();

    return locationsDataArr
        .find(locationData => locationData.name === locationName);
}

async function getCurrentForecastData (locationCode) {
    const response = await fetch(BASE_URL + ENDPOINTS.today(locationCode));
    const data = await response.json();
    return data;
}

async function getUpcomingForecastData (locationCode) {
    const response = await fetch(BASE_URL + ENDPOINTS.upcoming(locationCode));
    const data = await response.json();
    return data;
}

function createCurrentForecast (forecastData) {
    const forecastElement = document.createElement('div');
    forecastElement.className = 'forecasts';

    const conditionSymbol = document.createElement('span');
    conditionSymbol.className = 'condition symbol';
    conditionSymbol.innerHTML = SPECIAL_CHARS[forecastData.forecast.condition];
    forecastElement.appendChild(conditionSymbol);

    const conditionContainer = document.createElement('span');
    conditionContainer.className = 'condition';
    forecastElement.appendChild(conditionContainer);

    const locationName = document.createElement('span');
    locationName.className = 'forecast-data';
    locationName.textContent = forecastData.name;
    conditionContainer.appendChild(locationName);

    const temperatureMinAndMax = document.createElement('span');
    temperatureMinAndMax.className = 'forecast-data';
    temperatureMinAndMax.innerHTML = `${Number(forecastData.forecast.low)}${SPECIAL_CHARS['Degrees']}` +
                                     '/' +
                                     `${Number(forecastData.forecast.high)}${SPECIAL_CHARS['Degrees']}`;
    conditionContainer.appendChild(temperatureMinAndMax);

    const conditionName = document.createElement('span');
    conditionName.className = 'forecast-data';
    conditionName.textContent = forecastData.forecast.condition;
    conditionContainer.appendChild(conditionName);

    return forecastElement;
}

function createUpcomingForecast (forecastData) {
    const forecastElement = document.createElement('div');
    forecastElement.className = 'forecast-info';

    for (const dayForecastData of forecastData.forecast) {
        const conditionContainer = document.createElement('span');
        conditionContainer.className = 'upcoming';
        forecastElement.appendChild(conditionContainer);

        const conditionSymbol = document.createElement('span');
        conditionSymbol.className = 'symbol';
        conditionSymbol.innerHTML = SPECIAL_CHARS[dayForecastData.condition];
        conditionContainer.appendChild(conditionSymbol);

        const temperatureMinAndMax = document.createElement('span');
        temperatureMinAndMax.className = 'forecast-data';
        temperatureMinAndMax.innerHTML = `${Number(dayForecastData.low)}${SPECIAL_CHARS['Degrees']}` +
                                        '/' +
                                        `${Number(dayForecastData.high)}${SPECIAL_CHARS['Degrees']}`;
        conditionContainer.appendChild(temperatureMinAndMax);

        const conditionName = document.createElement('span');
        conditionName.className = 'forecast-data';
        conditionName.textContent = dayForecastData.condition;
        conditionContainer.appendChild(conditionName);
    }

    return forecastElement;
}