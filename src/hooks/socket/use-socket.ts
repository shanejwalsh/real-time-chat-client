import { useContext } from 'react';
import { SocketContext } from './socket-provider';

export const useSocket = () => {
  const { socket } = useContext(SocketContext);

  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return socket;
};
