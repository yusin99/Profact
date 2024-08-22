/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { updateFormDataWithCheckoutInfo } from '../../utils/dbUtils';
import "./success.css";
import { fetchCheckoutSession, uploadFormData } from "../../services/apiServices";

/* The `SuccessPage` component is a functional React component that represents the success page of a
purchase process. Here's a breakdown of what the component does: */
const SuccessPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

   /**
    * The function `handleSessionData` sets session data, updates form data with checkout info, and
    * uploads the updated form data, handling any errors that occur.
    */
    const handleSessionData = async (data) => {
      try {
        setSessionData(data);
        console.log("Stripe session data:", data);

        const updatedData = await updateFormDataWithCheckoutInfo(data);
        console.log('Updated formData:', updatedData);

        const response = await uploadFormData(updatedData);
        console.log('Server response:', response);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    /* This block of code is checking if a `sessionId` exists in the URL query parameters. If a `sessionId`
    is found, it calls the `fetchCheckoutSession` function with the `sessionId` as a parameter. The
    `fetchCheckoutSession` function is expected to return some data related to the checkout session. */
    if (sessionId) {
      fetchCheckoutSession(sessionId)
        .then(handleSessionData)
        .catch(error => {
          console.error('Error fetching session data:', error);
        });
    } else {
      console.error('No session ID found in the URL');
    }

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
