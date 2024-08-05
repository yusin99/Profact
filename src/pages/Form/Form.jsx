import Loader from './../../components/loader';
import Header from './../../components/header';
import Footer from './../../components/footer';
import { useLocation } from 'react-router-dom';
import Welcome from './../../components/welcome';

function Form() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const offerId = params.get('offer');
  return (
    <div className="wrapper">
      <Loader />
      <Header />
      <Welcome />
      <div className="wrapper">
      <header>
        <h1>Form Page</h1>
      </header>
      <main>
        <p>Selected Offer ID: {offerId}</p>
        {/* Add your form here */}
      </main>
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
      {/* <Welcome />
      <SmallFeature />
      <Counter />
      <BigFeatureOne />
      <BigFeatureTwo />
      <WhyUsSection />
      <Tarification />
      <ContactForm /> */}
      <Footer />
    </div>
  );
}

export default Form;