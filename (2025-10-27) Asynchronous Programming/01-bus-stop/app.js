function getInfo () {
    const busStopNameField = document.getElementById('stopName');
    const busesListElement = document.getElementById('buses');

    busesListElement.innerHTML = '';

    const busStopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busStopId}`;
    
    fetch(url)
        .then(response => response.json())
        .then(busStopData => {
            busStopNameField.textContent = busStopData.name;

            for (const [busId, timeInMinutes] of Object.entries(busStopData.buses)) {
                const listItem = document.createElement('li');
                listItem.textContent = `Bus ${busId} arrives in ${timeInMinutes} minutes`;
                busesListElement.appendChild(listItem);
            }
        })
        .catch(error => {
            busStopNameField.textContent = 'Error';
        });
}

// Alternative solution
// --------------------

// async function getInfo () {
//     const busStopNameField = document.getElementById('stopName');
//     const busesListElement = document.getElementById('buses');

//     busesListElement.innerHTML = '';

//     const busStopId = document.getElementById('stopId').value;
//     const url = `http://localhost:3030/jsonstore/bus/businfo/${busStopId}`;

//     try {
//         const response = await fetch(url);
//         const busStopData = await response.json();
    
//         busStopNameField.textContent = busStopData.name;
    
//         for (const [busId, timeInMinutes] of Object.entries(busStopData.buses)) {
//             const listItem = document.createElement('li');
//             listItem.textContent = `Bus ${busId} arrives in ${timeInMinutes} minutes`;
//             busesListElement.appendChild(listItem);
//         }
//     } catch (error) {
//         busStopNameField.textContent = 'Error';
//     }
// }