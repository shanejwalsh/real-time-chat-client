import { createContext, useEffect, useRef } from 'react';

import { type Socket, io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'http://192.168.1.155:3000';

export const SocketContext = createContext<{ socket: Socket | null }>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { current: socket } = useRef(io(SOCKET_ENDPOINT));

  useEffect(() => {
    socket.connect();
    console.log('SocketIO: Connecting...');

    socket.on('connect', () => {
      console.log('SocketIO: Connected and authenticated');
    });

    socket.on('error', (msg: string) => {
      console.error('SocketIO: Error', msg);
    });

    // Remove all the listeners and
    // close the socket when it unmounts
    return () => {
      console.log('SocketIO: Disconnecting...');
      if (socket && socket) {
        socket.close();
        socket.removeAllListeners();
      }
    };
  }, [socket]);

  return <SocketContext.Provider value={{ socket: socket }}>{children}</SocketContext.Provider>;
};
