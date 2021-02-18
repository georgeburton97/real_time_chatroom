// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});


// Update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    // updates name via chatroom class
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset form
    newNameForm.reset();
    // show then hide update message
    updateMessage.innerText = `Your name has been updated to ${newName}`;
    setTimeout(() => updateMessage.innerText = '',2000)
});

// Update chat room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat))
    }
});

// Check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';

// Class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username)

// Get chats and render
chatroom.getChats(data => chatUI.render(data));