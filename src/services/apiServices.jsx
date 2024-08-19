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