import './App.css';

import { useLocalStorage } from './hooks';
import LoginScreen from './components/login-screen';
import ChatList from './components/chat/chat-list';

function App() {
  const [username, setUsername] = useLocalStorage('username');

  if (!username) {
    return <LoginScreen setUsername={setUsername} />;
  }

  return <ChatList username={username} setUsername={setUsername} />;
}

export default App;
