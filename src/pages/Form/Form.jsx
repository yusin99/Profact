import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './../../components/loader';
import Header from './../../components/header';
import Footer from './../../components/footer';
import Welcome from './../../components/welcome';
import MultiPartForm from '../../components/multipartform';
import staticInfo from "../../static-info.json";
import Card from './../../components/Card/card';

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
        <Loader />
        <Header />
        <div>Offer not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Loader />
      <Header />
      <Welcome 
        h1={tarificationWelcomeText.h1} 
        paragraph={tarificationWelcomeText.paragraph} 
        buttonText={tarificationWelcomeText.buttonText}
      />
      <section className="section colored pricing-bg" id="pricing-plans">
        <div className="container">
          <div className="row" style={{justifyContent: "center", alignItems: "center"}}>
            <h5>Selected offer: </h5>
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
