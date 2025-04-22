
const cursor = document.getElementById('cursor');
        
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  });
document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
document.body.appendChild(heart);
            
setTimeout(() => heart.remove(), 1800);
});

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify({}));
}

function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.form-container').forEach(form => {
        form.classList.remove('active');
    });
    
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`${tabName}-form`).classList.add('active');
}

function validateLogin() {
    let isValid = true;
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    if (!username) {
        document.getElementById('login-username-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-username-error').style.display = 'none';
    }
    
    if (!password) {
        document.getElementById('login-password-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('login-password-error').style.display = 'none';
    }
    
    return isValid;
}

function validateRegister() {
    let isValid = true;
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    
    if (username.length < 3) {
        document.getElementById('register-username-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-username-error').style.display = 'none';
    }
    
    if (password.length < 6) {
        document.getElementById('register-password-error').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('register-password-error').style.display = 'none';
    }
    
    return isValid;
}

function login() {
    if (!validateLogin()) return;
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users[username];
    
    if (user && user.password === password) {

        const userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            userId: userId
        }));
        
        window.location.href = 'chatroom.html';
    } else {
        alert('Invalid username or password');
    }
}

function register() {
    if (!validateRegister()) return;
    
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const email = document.getElementById('register-email').value.trim();
    
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users[username]) {
        alert('Username already exists');
        return;
    }
    
    users[username] = {
        password: password,
        email: email,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
    switchTab('login');

    document.getElementById('login-username').value = username;
    document.getElementById('login-password').value = password;
}
