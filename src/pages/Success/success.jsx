/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { updateFormDataWithCheckoutInfo } from '../../utils/dbUtils';
import "./success.css";
import { fetchCheckoutSession, uploadFormData } from "../../services/apiServices";

const SuccessPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

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
