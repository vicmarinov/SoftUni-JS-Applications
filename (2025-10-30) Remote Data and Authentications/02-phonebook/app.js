window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', createContact);
});

const URL = 'http://localhost:3030/jsonstore/phonebook';

async function loadContacts () {
    try {
        const response = await fetch(URL);
        const contactsDataObj = await response.json();

        if (!response.ok) throw new Error(contactsDataObj.message);
    
        const contactsListElement = document.getElementById('phonebook');
        contactsListElement.innerHTML = '';
    
        Object.values(contactsDataObj).forEach(contactObj => {
            const listItem = document.createElement('li');
            listItem.textContent = `${contactObj.person}: ${contactObj.phone}`;
    
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.dataset.id = contactObj._id;
            deleteBtn.addEventListener('click', deleteContact);
    
            listItem.appendChild(deleteBtn);
            contactsListElement.appendChild(listItem);
        });
    } catch (error) {
        alert(error);
    }
}

async function createContact () {
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    const person = personInput.value;
    const phone = phoneInput.value;

    if (!person || !phone) {
        alert('Both "person" and "phone" fields are required!');
        return;
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({person, phone})
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadContacts();

        personInput.value = '';
        phoneInput.value = '';
    } catch (error) {
        alert(error);
    }
}

async function deleteContact (event) {
    const contactId = event.currentTarget.dataset.id;

    try {
        const response = await fetch(URL + `/${contactId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadContacts();
    } catch (error) {
        alert(error);
    }
}