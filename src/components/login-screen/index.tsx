import { useSocket } from '../../hooks';

export type LoginScreenProps = {
  setUsername: (username: string) => void;
};

export default function LoginScreen({ setUsername }: LoginScreenProps) {
  const socket = useSocket();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <form
        style={{
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.currentTarget.username.value;
          setUsername(username);
          socket.emit('join_room', { username });
        }}
      >
        <input
          required
          name="username"
          placeholder="What's your name?"
          style={{
            padding: '1rem',
            fontSize: '1.5rem',
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
