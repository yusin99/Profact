/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { openDB } from 'idb';
import "./success.css";

const SuccessPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

    const updateFormDataWithCheckoutInfo = async (sessionData) => {
      // Open the IndexedDB and retrieve the formData
      const db = await openDB('formDataDB', 1);
      let storedData = await db.get('formDataStore', 'formData');

      if (storedData) {
        // Update the formData with checkout information
        storedData.checkout = {
          customer: sessionData.customer,
        };

        // Save the updated formData back to IndexedDB
        await db.put('formDataStore', storedData, 'formData');
        console.log("Updated formData saved to IndexedDB:", storedData);
      }
    };

    if (sessionId) {
      fetch(`/api/checkout-session/${sessionId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP status ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        setSessionData(data);
        console.log("Stripe session data:", data);

        // Update formData with customer data from sessionData
        updateFormDataWithCheckoutInfo(data);
      })
      .catch(error => {
        console.error('Error fetching session data:', error);
      });
    } else {
      console.error('No session ID found in the URL');
    }

    // Clear checkoutInProgress flag
    sessionStorage.removeItem('checkoutInProgress');
  }, [location.search]);

  return (
    <div className="bodySuccess">
      <div className="cardSuccess">
        <div className="cardSuccessBody">
          <i className="checkmark">✓</i>
        </div>
        <h1 className="h1Success">Success</h1>
        <p>We received your purchase request;<br /> We'll be in touch shortly!</p>
        <Link to="/" className="buttonToHome">Accueil</Link>
      </div>
    </div>
  );
};

export default SuccessPage;
