window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.userId && sessionStorage.accessToken) {
        window.location = './';
    }

    document.getElementsByTagName('form')[0]
        .addEventListener('submit', loginUser);
});

async function loginUser (event) {
    event.preventDefault();

    const loginFormData = new FormData(event.currentTarget);
    const {email, password} = Object
        .fromEntries(loginFormData.entries());

    if (!email || !password) {
        alert('All of the fields are required!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3030/users/login', {
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
        alert(`ERROR: Cannot login!\n${error.message}!`);
    }
}