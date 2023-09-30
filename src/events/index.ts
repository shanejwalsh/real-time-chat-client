export const EVENTS = {
  MESSAGES: {
    MESSAGES_UPDATED: 'messages_updated',
    SEND_TYPING: 'send_typing',
  },
  users: {
    usersUpdated: 'users_updated',
  },
} as const;

type EventValues<T> = T[keyof T];

export type SocketEvent = {
  [Key in keyof typeof EVENTS]: EventValues<(typeof EVENTS)[Key]>;
}[keyof typeof EVENTS];
