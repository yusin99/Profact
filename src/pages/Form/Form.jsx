import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Welcome from '../../components/Welcome/welcome';
import Card from '../../components/Card/card';
import MultiPartForm from '../../components/MultiPartForm/multipartform';
import staticInfo from '../../static-info.json'; // Keep staticInfo for the welcome text
import { fetchSubscriptionPlans } from '../../services/apiServices';

function Form() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const offerId = parseInt(params.get('offer')); // Extract the offerId and convert it to an integer

  const { tarificationWelcomeText } = staticInfo; // Keep welcome text from staticInfo

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const getPricingPlans = async () => {
      try {
        const fetchedPlans = await fetchSubscriptionPlans();
        setPricingPlans(fetchedPlans);
      } catch (err) {
        setError('Failed to fetch pricing plans.');
        console.error('Error fetching pricing plans:', err);
      }
    };

    getPricingPlans();
  }, []); // Run once when the component mounts


  if (error) {
    return (
      <div className="wrapper">
        <Header />
        <div>{error}</div>
        <Footer />
      </div>
    );
  }

  // Find the matching offer based on the offerId
  const selectedOffer = pricingPlans.find(plan => plan.id === offerId);

  if (!selectedOffer) {
    return (
      <div className="wrapper">
        <Header />
        <div>Offer not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <Welcome 
        h1={tarificationWelcomeText.h1} // Use staticInfo for welcome text
        paragraph={tarificationWelcomeText.paragraph} 
        buttonText={tarificationWelcomeText.buttonText}
        lien={tarificationWelcomeText.lien}
      />
      <section className="section colored pricing-bg" id="pricing-plans">
        <div className="container">
          <div className="row" style={{ justifyContent: "center", alignItems: "center" }}>
            <h5>Offre sélectionnée: </h5>
            <Card pack={selectedOffer} button={false} />
          </div>
        </div>
      </section>
      <MultiPartForm 
        offerTitle={selectedOffer.libelle} // Use `libelle` as the offer title
        offerPrice={selectedOffer.montantHt} // Use `montantHt` for the price
        offerPeriod="monthly" // Example static period, modify as needed
        offerId={selectedOffer.id}
        offerFeatures={selectedOffer.features || []} // Assuming `features` exist, otherwise default to empty array
      />
      <Footer />
    </div>
  );
}

export default Form;
