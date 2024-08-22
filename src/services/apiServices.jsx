/**
 * The function fetches a checkout session using a provided session ID from a backend API.
 * @returns The `fetchCheckoutSession` function is returning the JSON response from the API endpoint
 * for the checkout session with the specified `sessionId`.
 */
export const fetchCheckoutSession = async (sessionId) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_CORE + `checkout-session/${sessionId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
    const response = await fetch(import.meta.env.VITE_BACKEND_CORE + `upload`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP status ${response.status}: ${text}`);
    }
  
    return response.json();
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