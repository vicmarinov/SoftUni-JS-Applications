window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userId') && localStorage.getItem('accessToken') && localStorage.getItem('userEmail')) {
        window.location = './';
    }

    document.getElementsByTagName('form')[0].addEventListener('submit', loginUser);
});

async function loginUser (event) {
    event.preventDefault();

    const loginForm = event.currentTarget;
    const {email, password} = Object.fromEntries(new FormData(loginForm).entries());

    if (!email || !password) {
        alert('All the fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({email, password})
        });

        const userAuthenticationData = await response.json();

        if (!response.ok) throw new Error(userAuthenticationData.message);
        
        localStorage.setItem('userId', userAuthenticationData._id);
        localStorage.setItem('userEmail', userAuthenticationData.email);
        localStorage.setItem('accessToken', userAuthenticationData.accessToken);

        window.location = './';
    } catch (error) {
        alert(error);
    }
}