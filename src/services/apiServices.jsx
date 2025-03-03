import { setToken, getToken } from '../utils/indexedDBUtils';

/**
 * Fetches a checkout session using a provided session ID from a backend API.
 * This function makes a GET request to the backend API to retrieve the checkout session details.
 * 
 * @param {string} sessionId - The ID of the checkout session to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response of the checkout session.
 * @throws {Error} - Throws an error if the HTTP request fails or returns a non-2xx status code.
 */
export const fetchCheckoutSession = async (sessionId) => {
  const token = await getAuthToken();
  const response = await fetch(import.meta.env.VITE_BACKEND_CORE + `${sessionId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP status ${response.status}: ${text}`);
  }

  return response.json();
};


/**
 * Fetches subscription plans from the backend API.
 * This function makes a GET request to retrieve the available subscriptions.
 *
 * @returns {Promise<Object[]>} - A promise that resolves to the list of subscription plans.
 * @throws {Error} - Throws an error if the HTTP request fails or returns a non-2xx status code.
 */
export const fetchSubscriptionPlans = async () => {
  const token = await getAuthToken();
  const response = await fetch(import.meta.env.VITE_API_SUBSCRIPTIONS, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP status ${response.status}: ${text}`);
  }

  return response.json();
};

/**
 * Uploads form data to a backend server using a POST request.
 * This function sends form data to the server and returns the server's response.
 * 
 * @param {FormData} formData - The form data to be uploaded.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 * @throws {Error} - Throws an error if the HTTP request fails or returns a non-2xx status code.
 */
export const uploadFormData = async (formData) => {
  const token = await getAuthToken();
  const response = await fetch(import.meta.env.VITE_API_REGISTER, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP status ${response.status}: ${text}`);
  }

  return response.json();
};

/**
 * Creates a new checkout session by sending a POST request to the backend server.
 * This function initiates a checkout process by providing the price ID and payment mode.
 * 
 * @param {string} priceId - The ID of the price object for the checkout session.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response containing the checkout session details.
 * @throws {Error} - Throws an error if the HTTP request fails or the session creation is unsuccessful.
 */
export const createCheckoutSession = async (priceId, name, email, fraisParametrage) => {
  const token = await getAuthToken();
  const response = await fetch(import.meta.env.VITE_API_CHECKOUT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      modePayement: "card",
      priceId: priceId,
      customerName: name,
      customerEmail: email,
      fraisParametrage: fraisParametrage,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create checkout session');
  }

  return await response.json();
};

/**
 * Sends JSON data to a specified API endpoint using a POST request.
 * This function sends the data as JSON and returns the server's response.
 * 
 * @param {Object} data - The data to be sent in the request body.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 * @throws {Error} - Throws an error if the HTTP request fails or returns a non-2xx status code.
 */
export const sendFormData = async (data) => {
  const res = await fetch(import.meta.env.VITE_API_WEB_FORM, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

/**
 * Authenticates the user by sending login credentials to the backend server.
 * This function sends a POST request with the login credentials and stores the received token.
 * 
 * @returns {Promise<string|null>} - A promise that resolves to the authentication token, or null if authentication fails.
 * @throws {Error} - Throws an error if the authentication request fails.
 */
export async function authenticate() {
  const url = import.meta.env.VITE_API_LOGIN_ENDPOINT;
  const credentials = {
    identifiant: import.meta.env.VITE_API_LOGIN_IDENTIFIANT,
    password: import.meta.env.VITE_API_LOGIN_PASSWORD
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate');
    }

    const data = await response.json();
    await setToken(data.token);
    return data.token;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

/**
 * Retrieves the authentication token, either from storage or by authenticating the user.
 * This function first tries to retrieve the token from indexedDB. If the token is not found,
 * it attempts to authenticate the user and retrieve a new token.
 * 
 * @returns {Promise<string>} - A promise that resolves to the authentication token.
 */
export async function getAuthToken() {
  let token = await authenticate();
  return token;
}
