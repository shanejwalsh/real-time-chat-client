import { useSocketSubscribe } from '../../../hooks';
import { useState } from 'react';

import { EVENTS } from '../../../events';
import AddMessageForm from '../add-message-form';
import Message from '../message';
import LogOut from '../log-out';

export type ChatListProps = {
  username: string;
  setUsername: (username: string | null) => void;
};

function ChatList({ username, setUsername }: ChatListProps) {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [typingUser, setTypingUser] = useState<string>();

  useSocketSubscribe([
    {
      name: EVENTS.MESSAGES.MESSAGES_UPDATED,
      handler: (messages: Array<Message>) => {
        setMessages(messages);
      },
    },
    {
      name: EVENTS.MESSAGES.SEND_TYPING,
      handler: (typingUser: string) => {
        setTypingUser(typingUser);
      },
    },
  ]);

  return (
    <>
      <LogOut username={username} setUsername={setUsername} />
      <h1>Real Time Messages!</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} isAuthor={message.author === username} />
        ))}
        {Boolean(typingUser) && (
          <Message
            message={{
              content: `${typingUser} is typing...`,
            }}
          />
        )}

        <AddMessageForm username={username} />
      </div>
    </>
  );
}

export default ChatList;
