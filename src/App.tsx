import { useEffect, useState } from 'react';

import './App.css';

import dayjs from 'dayjs';

import { type Message } from './data-access';

import { useSocket, useLocalStorage } from './hooks';
import LoginScreen from './components/login-screen';

function App() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [typer, setTyper] = useState<string>();
  const [message, setMessage] = useState<string>('');

  const socket = useSocket();

  useEffect(() => {
    socket.on('messages_updated', (messages: Array<Message>) => {
      setMessages(messages);
    });
    socket.on('send_typing', (data) => setTyper(data?.username));
  }, [socket]);

  const [username, setUsername] = useLocalStorage('username');

  if (!username) {
    return <LoginScreen setUsername={setUsername} />;
  }

  return (
    <>
      <div>
        <p>Hi, {username}!</p>
        <button
          onClick={() => {
            setUsername(null);
          }}
        >
          Log out
        </button>
      </div>
      <h1>Real Time Messages!</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {messages.map((message) => {
          const isAuthor = message.author === username;

          return (
            <div
              key={message.id}
              className="card"
              style={{
                background: isAuthor ? 'rgb(62, 123, 247)' : 'slategray',
                borderRadius: '1rem',
                boxShadow: '0 0 1rem rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isAuthor ? 'flex-end' : 'flex-start',
              }}
            >
              <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                  }}
                >
                  {message.author}
                </p>
                <p>at {dayjs(message.createdAt).format('DD-MM-YY - hh:mm')}</p>
              </div>
              <p>{message.content}</p>
            </div>
          );
        })}
        {typer && <p>{typer} is typing...</p>}

        <form
          style={{
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const content = e.currentTarget.content.value;
            const author = username;

            socket.emit('send_message', { content, author });
            socket.emit('stop_typing');
            setMessage('');
          }}
        >
          <input
            required
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
              if (e.currentTarget.value.length > 0) {
                socket.emit('typing', { username });
              } else {
                socket.emit('stop_typing');
              }
            }}
            name="content"
            placeholder="What's your message?"
            style={{
              padding: '8px',
              fontSize: '1.5rem',
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
