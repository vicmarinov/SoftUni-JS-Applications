window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userId')) window.location = '/';
    
    document.getElementById('register-form')
        .addEventListener('submit', onRegisterFormSubmit);

    document.getElementById('login-form')
        .addEventListener('submit', onLoginFormSubmit);
});

async function onRegisterFormSubmit (event) {
    event.preventDefault();

    const registerForm = event.currentTarget;
    const { email, password, rePass } = Object.fromEntries(
        new FormData(registerForm).entries()
    );

    if (!email || !password || !rePass) {
        alert('Please fill all the 3 fields to register');
        return;
    }

    if (password !== rePass) {
        alert('The passwords do not match');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ email, password })
        });
    
        const userData = await response.json();

        if (!response.ok) throw new Error(userData.message);

        localStorage.setItem('userId', userData._id);
        localStorage.setItem('accessToken', userData.accessToken);
        window.location = '/';
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }
}

async function onLoginFormSubmit (event) {
    event.preventDefault();

    const loginForm = event.currentTarget;
    const { email, password } = Object.fromEntries(
        new FormData(loginForm).entries()
    );

    if (!email || !password) {
        alert('Please fill both the email and the password field to log in');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ email, password })
        });
    
        const userData = await response.json();

        if (!response.ok) throw new Error(userData.message);

        localStorage.setItem('userId', userData._id);
        localStorage.setItem('accessToken', userData.accessToken);
        window.location = '/';
    } catch (error) {
        alert('Oops... An error has occurred!');
        console.error(error.message);
    }
}