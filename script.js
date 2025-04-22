Talk.ready.then(function () {
    const session = new Talk.Session({
      appId: 'tXKQMk5O', // add your TalkJS app ID here
      userId: 'sample_user_alice',
    });
    const conversation = session.getOrCreateConversation(
      'sample_large_group_chat'
    );
  
    const chatbox = session.createChatbox();
    chatbox.select(conversation, { asGuest: true });
    chatbox.mount(document.getElementById('talkjs-container'));
  });
  