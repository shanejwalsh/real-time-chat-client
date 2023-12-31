import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue?: string) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    if (!value) {
      return localStorage.removeItem(key);
    }

    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
