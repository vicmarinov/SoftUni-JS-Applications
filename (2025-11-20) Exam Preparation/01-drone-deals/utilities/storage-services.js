function saveData (dataName, data) {
    const dataAsStr = JSON.stringify(data);
    localStorage.setItem(dataName, dataAsStr);
}

function getData (dataName) {
    const dataAsStr = localStorage.getItem(dataName);
    return JSON.parse(dataAsStr);
}

function deleteData (dataNamesArr) {
    for (const dataName of dataNamesArr) {
        localStorage.removeItem(dataName);
    }
}

export const storageServices = {
    saveData,
    getData,
    deleteData
};