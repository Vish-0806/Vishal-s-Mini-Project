// Store users in localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

function handleRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }

    if (users.find(user => user.email === email)) {
        alert('User already exists!');
        return false;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration successful! Please login.');
    window.location.href = 'user-login.html';
    return false;
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', email);
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials!');
    }
    return false;
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser && !window.location.href.includes('login.html') && !window.location.href.includes('register.html')) {
        window.location.href = 'user-login.html';
    }
}