window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userId') && localStorage.getItem('accessToken') && localStorage.getItem('userEmail')) {
        window.location = './';
    }

    document.getElementsByTagName('form')[0].addEventListener('submit', registerUser);
});

async function registerUser (event) {
    event.preventDefault();

    const registerForm = event.currentTarget;
    const {email, password, rePass} = Object.fromEntries(new FormData(registerForm).entries());

    if (!email || !password || !rePass) {
        alert('All the fields are required!');
        return;
    }

    if (password !== rePass) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
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