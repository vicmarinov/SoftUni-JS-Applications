function solve () {
    const infoBox = document.querySelector('#info > span.info');
    const arriveBtn = document.getElementById('arrive');
    const departBtn = document.getElementById('depart');

    let currentBusStopName = '';

    const busStopIds = {
        current: '',
        next: 'depot'
    };

    async function depart () {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${busStopIds.next}`;

        try {
            const response = await fetch(url);
            const busStopData = await response.json();
    
            [busStopIds.current, busStopIds.next] = [busStopIds.next, busStopData.next];
            currentBusStopName = busStopData.name;

            infoBox.textContent = `Next stop ${currentBusStopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (error) {
            infoBox.textContent = `Error`;
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive () {
        infoBox.textContent = `Arriving at ${currentBusStopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

const result = solve();