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


const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

document.getElementById('username-display').textContent = currentUser.username;
document.getElementById('user-avatar').textContent = currentUser.username.charAt(0).toUpperCase();

if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages'));
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${msg.userId === currentUser.userId ? 'user-message' : ''}`;
        
        const messageHeader = document.createElement('div');
        messageHeader.className = 'message-header';
        messageHeader.innerHTML = `
            <span class="message-username">${msg.username}</span>
            <span class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</span>
        `;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';



        messageContent.innerHTML = msg.content;
        
        messageElement.appendChild(messageHeader);
        messageElement.appendChild(messageContent);
        messageList.appendChild(messageElement);
    });
    
    messageList.scrollTop = messageList.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const content = input.value.trim();
    
    if (content) {
        const messages = JSON.parse(localStorage.getItem('messages'));
        messages.push({
            userId: currentUser.userId,
            username: currentUser.username,
            content: content,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('messages', JSON.stringify(messages));
        input.value = '';
        loadMessages();
    }
}


function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

document.getElementById('message-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

loadMessages();
