import './App.css';
import Header from './components/header';
// import Banner from './components/banner';
// import Shelf from './components/shelf';
import Footer from './components/footer';
import Loader from './components/loader';
import SmallFeature from './components/small-feature';
import Welcome from './components/welcome';
import BigFeatureOne from './components/big-feature-1';
import BigFeatureTwo from './components/big-feature-2';
import WhyUsSection from './components/why-us';
import Tarification from './components/tarification';
import ContactForm from './components/contact-form';
import Counter from './components/counter';

function App() {
  return (
    <div className="wrapper">
      <Loader />
      <Header />
      <Welcome />
      <SmallFeature />
      <Counter />
      <BigFeatureOne />
      <BigFeatureTwo />
      <WhyUsSection />
      <Tarification />
      <ContactForm />
      <Footer />
      {/* <Banner />
      <Shelf /> */}
    </div>
  );
}

export default App;