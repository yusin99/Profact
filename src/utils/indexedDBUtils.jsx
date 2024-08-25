const DB_NAME = 'TokenStore';
const STORE_NAME = 'tokens';
const TOKEN_KEY = 'accessToken';

/**
 * Initializes the IndexedDB database.
 * This function opens a connection to the database and creates the necessary object store if it doesn't already exist.
 * 
 * @returns {Promise<IDBDatabase>} - A promise that resolves to the database instance.
 * @throws {Error} - Throws an error if there is an issue with opening the IndexedDB connection.
 */
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

/**
 * Stores the authentication token in IndexedDB.
 * This function saves the provided token in the database using a specific key.
 * 
 * @param {string} token - The authentication token to be stored.
 * @returns {Promise<void>} - A promise that resolves when the token is successfully stored.
 * @throws {Error} - Throws an error if there is an issue with storing the token.
 */
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

/**
 * Retrieves the authentication token from IndexedDB.
 * This function fetches the token associated with the specific key from the database.
 * 
 * @returns {Promise<string|null>} - A promise that resolves to the token value, or null if the token is not found.
 * @throws {Error} - Throws an error if there is an issue with retrieving the token.
 */
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
