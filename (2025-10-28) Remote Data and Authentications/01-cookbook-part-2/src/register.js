window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.userId && sessionStorage.accessToken) {
        window.location = './';
    }
    
    document.getElementsByTagName('form')[0]
        .addEventListener('submit', registerUser);
});

async function registerUser (event) {
    event.preventDefault();

    const registerFormData = new FormData(event.currentTarget);
    const {email, password, rePass} = Object
        .fromEntries(registerFormData.entries());

    if (!email || !password || !rePass) {
        alert('All of the fields are required!');
        return;
    }

    if (password !== rePass) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({email, password})
        });

        const responseData = await response.json();
    
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    
        sessionStorage.setItem('userId', responseData._id);
        sessionStorage.setItem('accessToken', responseData.accessToken);
    
        window.location = './';
    } catch (error) {
        alert(`ERROR: Unsuccessful registration!\n${error.message}!`);
        return;
    }

}