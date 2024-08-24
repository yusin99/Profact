// utils/indexedDBUtils.js

const DB_NAME = 'TokenStore';
const STORE_NAME = 'tokens';
const TOKEN_KEY = 'accessToken';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => reject("IndexedDB error: " + event.target.error);

    request.onsuccess = (event) => resolve(event.target.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'key' });
    };
  });
};

export const setToken = async (token) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ key: TOKEN_KEY, value: token });

    request.onerror = (event) => reject("Error storing token: " + event.target.error);
    request.onsuccess = () => resolve();
  });
};

export const getToken = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(TOKEN_KEY);

    request.onerror = (event) => reject("Error retrieving token: " + event.target.error);
    request.onsuccess = (event) => resolve(event.target.result ? event.target.result.value : null);
  });
};