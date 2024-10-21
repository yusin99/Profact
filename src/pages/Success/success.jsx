/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { updateFormDataWithCheckoutInfo } from '../../utils/dbUtils';
import { fetchCheckoutSession, uploadFormData } from '../../services/apiServices';
import { objectToFormData } from '../../utils/formUtils';
import './success.css';
import { Hourglass } from 'react-loader-spinner';


/**
 * The `SuccessPage` component represents the success page of a purchase process.
 */
const SuccessPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loader visibility
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get('session_id');

    const handleSessionData = async (data) => {
      try {
        setSessionData(data);

        // Update form data with checkout info
        const updatedData = await updateFormDataWithCheckoutInfo(data);
        const formData = objectToFormData(updatedData);

        // Upload the form data
        const response = await uploadFormData(formData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Hide loader after handling the session data
      }
    };

    if (sessionId) {
      fetchCheckoutSession(sessionId)
        .then(handleSessionData)
        .catch(error => {
          console.error('Error fetching session data:', error);
          setLoading(false); // Hide loader if there's an error
        });
    } else {
      console.error('No session ID found in the URL');
      setLoading(false); // Hide loader if session ID is not found
    }

    sessionStorage.removeItem('checkoutInProgress');
  }, [location.search]);

  return (
    <div className="bodySuccess">
      {loading && <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#306cce', '#72a1ed']}
                  />} 
      {!loading && (
        <div className="cardSuccess">
          <div className="cardSuccessBody">
            <i className="checkmark">✓</i>
          </div>
          <h1 className="h1Success">Success</h1>
          <p>We received your purchase request;<br /> We'll be in touch shortly!</p>
          <Link to="/" className="buttonToHome">Accueil</Link>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;