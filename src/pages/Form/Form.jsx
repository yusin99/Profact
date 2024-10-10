import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import staticInfo from "../../static-info.json";
import Loader from '../../components/Loader/loader';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import Welcome from '../../components/Welcome/welcome';
import Card from '../../components/Card/card';
import MultiPartForm from './../../components/MultiPartForm/multipartform';

function Form() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const offerId = parseInt(params.get('offer'));  // Extract the offerId and convert it to an integer
  const { tarificationWelcomeText, pricingPlans } = staticInfo;

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
        h1={tarificationWelcomeText.h1} 
        paragraph={tarificationWelcomeText.paragraph} 
        buttonText={tarificationWelcomeText.buttonText}
        lien={tarificationWelcomeText.lien}
      />
      <section className="section colored pricing-bg" id="pricing-plans">
        <div className="container">
          <div className="row" style={{justifyContent: "center", alignItems: "center"}}>
            <h5>Offre séléctionnée: </h5>
            <Card  pack={selectedOffer} button={false}/>
          </div>
        </div>
      </section>
      <MultiPartForm 
        offerTitle={selectedOffer.title}
        offerPrice={selectedOffer.price}
        offerPeriod={selectedOffer.period}
        offerFeatures={selectedOffer.features}
      />
      <Footer />
    </div>
  );
}

export default Form;
