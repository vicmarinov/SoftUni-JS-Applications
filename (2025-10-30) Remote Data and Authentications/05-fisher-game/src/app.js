window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userId') && localStorage.getItem('accessToken') && localStorage.getItem('userEmail')) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('body > header > nav > p.email > span').textContent = localStorage.getItem('userEmail');
        
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('addForm').disabled = true;
        Array.from(document.getElementById('addForm').querySelectorAll('input, button'))
            .forEach(element => element.disabled = true);
    }
    
    document.getElementById('logout').addEventListener('click', logoutUser);
    document.querySelector('#home-view > aside > button.load').addEventListener('click', loadCatches);
    document.getElementById('addForm').addEventListener('submit', addCatch);

    document.getElementById('catches').innerHTML = '';
    loadCatches();
});

const CATCHES_URL = 'http://localhost:3030/data/catches';

async function logoutUser (event) {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': localStorage.getItem('accessToken')
            }
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('accessToken');
    
        window.location = './';
    } catch (error) {
        alert(error);
    }
}

async function loadCatches () {
    const catchesFieldElement = document.getElementById('catches');

    try {
        const response = await fetch(CATCHES_URL);
        const catchesArr = await response.json();

        catchesFieldElement.innerHTML = '';

        if (!response.ok) throw new Error(catchesArr.message);

        catchesArr.forEach(catchData => {
            catchesFieldElement.appendChild(createCatchElement(catchData));
        });
    } catch (error) {
        alert(error);
    }
}

async function addCatch (event) {
    event.preventDefault();

    if (!localStorage.getItem('userId') || !localStorage.getItem('accessToken') || !localStorage.getItem('userEmail')) {
        alert('Only logged in users can add catches!');
        return;
    }

    const addCatchFormElement = event.currentTarget;

    let {
        angler,
        weight,
        species, 
        location,
        bait,
        captureTime
    } = Object.fromEntries(new FormData(addCatchFormElement).entries());

    if (!angler || !weight || !species || !location || !bait || !captureTime) {
        alert('All the fields are required!');
        return;
    }

    weight = Number(weight);
    captureTime = Number(captureTime);

    if (Number.isNaN(weight) || Number.isNaN(captureTime) || weight <= 0 || captureTime <= 0 || Math.trunc(captureTime) !== captureTime) {
        alert('The weight and the capture time must be valid numbers!');
        return;
    }

    try {
        const response = await fetch(CATCHES_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            })
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadCatches();
        addCatchFormElement.reset();
    } catch (error) {
        alert(error);
    }
}

async function updateCatch (event) {
    const catchElement = event.currentTarget.parentElement;
    const catchId = catchElement.dataset.catchId;
    const ownerId =  catchElement.dataset.ownerId;

    if (ownerId !== localStorage.getItem('userId')) {
        alert('This user cannot update this catch!');
        return;
    }

    const catchData = {
        angler: catchElement.querySelector('input.angler').value,
        weight: catchElement.querySelector('input.weight').value,
        species: catchElement.querySelector('input.species').value,
        location: catchElement.querySelector('input.location').value,
        bait: catchElement.querySelector('input.bait').value,
        captureTime: catchElement.querySelector('input.captureTime').value
    }

    if (
        !catchData.angler || !catchData.weight || !catchData.species ||
        !catchData.location || !catchData.bait || !catchData.captureTime
    ) {
        alert('All the fields are required!');
        return;
    }

    catchData.weight = Number(catchData.weight);
    catchData.captureTime = Number(catchData.captureTime);
    
    if (Number.isNaN(catchData.weight) || Number.isNaN(catchData.captureTime) || catchData.weight <= 0 || catchData.captureTime <= 0 || Math.trunc(catchData.captureTime) !== catchData.captureTime) {
        alert('The weight and the capture time must be valid numbers!');
        return;
    }

    try {
        const response = await fetch(CATCHES_URL + `/${catchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify(catchData)
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadCatches();
    } catch (error) {
        alert(error);
    }
}

async function deleteCatch (event) {
    const catchElement = event.currentTarget.parentElement;
    const catchId = catchElement.dataset.catchId;
    const ownerId =  catchElement.dataset.ownerId;

    if (ownerId !== localStorage.getItem('userId')) {
        alert('This user cannot delete this catch!');
        return;
    }

    try {
        const response = await fetch(CATCHES_URL + `/${catchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Authorization': localStorage.getItem('accessToken')
            },
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadCatches();
    } catch (error) {
        alert(error);
    }
}

function createCatchElement (catchData) {
    const catchElement = document.createElement('div');
    catchElement.className = 'catch';

    catchElement.innerHTML = `
        <label>Angler</label>
        <input type="text" class="angler">
        <label>Weight</label>
        <input type="number" class="weight">
        <label>Species</label>
        <input type="text" class="species">
        <label>Location</label>
        <input type="text" class="location">
        <label>Bait</label>
        <input type="text" class="bait">
        <label>Capture Time</label>
        <input type="number" class="captureTime">
        <button class="update">Update</button>
        <button class="delete">Delete</button>
    `;

    catchElement.querySelector('input.angler').value = catchData.angler;
    catchElement.querySelector('input.weight').value = catchData.weight;
    catchElement.querySelector('input.species').value = catchData.species;
    catchElement.querySelector('input.location').value = catchData.location;
    catchElement.querySelector('input.bait').value = catchData.bait;
    catchElement.querySelector('input.captureTime').value = catchData.captureTime;

    catchElement.dataset.catchId = catchData._id;
    catchElement.dataset.ownerId = catchData._ownerId;

    if (catchData._ownerId !== localStorage.getItem('userId')) {
        Array.from(catchElement.getElementsByTagName('input'))
            .forEach(inputElement => inputElement.disabled = true);
        
        catchElement.querySelector('button.update').disabled = true;
        catchElement.querySelector('button.delete').disabled = true;
    } else {
        catchElement.querySelector('button.update').addEventListener('click', updateCatch);
        catchElement.querySelector('button.delete').addEventListener('click', deleteCatch);
    }

    return catchElement;
}