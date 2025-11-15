window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form').addEventListener('submit', addStudent);
    loadStudents();
});

const URL = 'http://localhost:3030/jsonstore/collections/students';

async function loadStudents () {
    try {
        const response = await fetch(URL);
        const studentsDataObj = await response.json();

        if (!response.ok) throw new Error(studentsDataObj.message);

        const tableBody = document.querySelector('#results > tbody');
        tableBody.innerHTML = '';

        Object.values(studentsDataObj).forEach(studentData => {
            const {firstName, lastName, facultyNumber, grade} = studentData;

            const tableRow = document.createElement('tr');

            const firstNameCell = document.createElement('td');
            firstNameCell.textContent = firstName;
            tableRow.appendChild(firstNameCell);

            const lastNameCell = document.createElement('td');
            lastNameCell.textContent = lastName;
            tableRow.appendChild(lastNameCell);

            const facultyNumberCell = document.createElement('td');
            facultyNumberCell.textContent = facultyNumber;
            tableRow.appendChild(facultyNumberCell);

            const gradeCell = document.createElement('td');
            gradeCell.textContent = grade;
            tableRow.appendChild(gradeCell);
            
            tableBody.appendChild(tableRow);
        });
    } catch (error) {
        alert(error);
    }
}

async function addStudent (event) {
    event.preventDefault();

    const addForm = event.currentTarget;

    let {
        firstName,
        lastName,
        facultyNumber,
        grade
    } = Object.fromEntries(new FormData(addForm).entries());

    if (!firstName || !lastName || !facultyNumber || !grade) {
        alert('All the fields are required!');
        return;
    }

    if (!/^[0-9]+$/.test(facultyNumber)) {
        alert('The faculty number must consist only of digits!');
        return;
    }

    if (Number.isNaN(Number(grade))) {
        alert('The grade must be a valid number!');
        return;
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({firstName, lastName, facultyNumber, grade})
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(responseData.message);
        }

        loadStudents();
        addForm.reset();
    } catch (error) {
        alert('The adding a new student was unsuccessful!\n' + error);
    }
}