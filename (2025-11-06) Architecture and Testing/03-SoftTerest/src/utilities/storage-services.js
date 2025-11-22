function saveData (dataObj) {
    for (const [key, value] of Object.entries(dataObj)) {
        localStorage.setItem(key, value);
    }
}

function getData (dataName) {
    return localStorage.getItem(dataName);
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