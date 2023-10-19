import './App.css';

import { useLocalStorage } from './hooks';
import LoginScreen from './components/login-screen';
import ChatList from './components/chat/chat-list';
import { deleteMessages } from './data-access';

function App() {
  const [username, setUsername] = useLocalStorage('username');

  if (!username) {
    return (
      <>
        <LoginScreen setUsername={setUsername} />
      </>
    );
  }

  return (
    <>
      {username === 'admin' && <button onClick={() => deleteMessages()}>Delete All!</button>}
      <ChatList username={username} setUsername={setUsername} />
    </>
  );
}

export default App;
