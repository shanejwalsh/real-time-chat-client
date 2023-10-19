const url = 'http://192.168.1.155:3000';
const path = '/messages';

const messagesUrl = `${url}${path}`;

export type Message = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

export type NewMessageReq = Pick<Message, 'content' | 'author'>;

export async function getMessages(): Promise<Array<Message>> {
  return await (await fetch(messagesUrl)).json();
}

export async function createMessage(message: NewMessageReq): Promise<Message> {
  const response = await fetch(messagesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  return await response.json();
}

export async function deleteMessages(): Promise<void> {
  await fetch(`${messagesUrl}`, {
    method: 'DELETE',
  });
}
