import { type Message } from '../../../data-access';
import dayjs from 'dayjs';

export type MessageProps = {
  message: Partial<Message>;
  isAuthor?: boolean;
};

function Message({ message, isAuthor }: MessageProps) {
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
        {Boolean(message.createdAt) && <p>at {dayjs(message.createdAt).format('DD-MM-YY - hh:mm')}</p>}
      </div>
      <p>{message.content}</p>
    </div>
  );
}

export default Message;
