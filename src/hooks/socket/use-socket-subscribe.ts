import { useEffect } from 'react';
import { useSocket } from '.';
import { SocketEvent } from '../../events';

type Event = {
  name: SocketEvent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (...args: any[]) => any;
};

export const useSocketSubscribe = (events: Event | Array<Event>) => {
  const socket = useSocket();

  useEffect(() => {
    const isList = Array.isArray(events);
    if (isList) {
      for (const event of events) {
        if (event) {
          const { name, handler } = event;

          socket.on(name, handler);
        }
      }
    } else {
      const { name, handler } = events;
      socket.on(name, handler);
    }

    return () => {
      if (isList) {
        for (const event of events) {
          if (event) {
            const { name, handler } = event;

            socket.off(name, handler);
          }
        }
      } else {
        const { name, handler } = events;
        socket.off(name, handler);
      }
    };
  }, [events, socket]);
};
