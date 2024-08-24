import { setToken, getToken } from '../utils/indexedDBUtils';

/**
 * The function fetches a checkout session using a provided session ID from a backend API.
 * @returns The `fetchCheckoutSession` function is returning the JSON response from the API endpoint
 * for the checkout session with the specified `sessionId`.
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
 * The function `uploadFormData` sends a POST request with form data to a backend server and returns
 * the JSON response.
 * @returns The `uploadFormData` function is returning the JSON response from the fetch request.
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

  export const createCheckoutSession = async (priceId) => {
    const token = await getAuthToken();
    const response = await fetch(import.meta.env.VITE_API_CHECKOUT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        modePayement: "card",
        priceId: priceId
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }
  
    return await response.json();
  };
    
/**
 * The function `sendFormData` sends a POST request with JSON data to a specified API endpoint and
 * returns the response as JSON.
 * @returns The `sendFormData` function is returning the result of calling `res.json()`, which will
 * parse the response body as JSON.
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

  export async function authenticate() {
    const url = 'https://api-cession-creance.microdeveloppement.fr/api/log/externe';
    const credentials = {
      identifiant: "web-register-profact",
      password: "@Profact-2024*!"
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
      console.log(data)
      await setToken(data.token);
      return data.token;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  export async function getAuthToken() {
    let token = await getToken();
    if (!token) {
      token = await authenticate();
    }
    return token;
  }
  
  export function setupTokenRefresh() {
    // Refresh token every 14 minutes (to be safe)
    setInterval(async () => {
      await authenticate();
    }, 14 * 60 * 1000);
  }
  