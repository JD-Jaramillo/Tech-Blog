const email = document.querySelector('#email-signup').value.trim();
const password = document.querySelector('#password-signup').value.trim();

const login = (event) => {
    event.preventDefault();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'applications/json' }
        });
    }

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log(response.json());
    }
}

document.querySelector('.login-form').addEventListener('submit', login); 
