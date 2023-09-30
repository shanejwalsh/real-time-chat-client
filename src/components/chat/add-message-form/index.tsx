import { useState } from 'react';
import { useSocket } from '../../../hooks';

type AddMessageFormProps = {
  username: string;
};

function AddMessageForm({ username }: AddMessageFormProps) {
  const [message, setMessage] = useState<string>('');

  const socket = useSocket();

  return (
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
            socket.emit('typing', username);
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
  );
}

export default AddMessageForm;
