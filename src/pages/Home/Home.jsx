import Loader from './../../components/loader';
import Header from './../../components/header';
import Welcome from './../../components/welcome';
import SmallFeature from './../../components/small-feature';
import Counter from './../../components/counter';
import BigFeatureOne from './../../components/big-feature-1';
import BigFeatureTwo from './../../components/big-feature-2';
import Tarification from './../../components/tarification';
import WhyUsSection from './../../components/why-us';
import ContactForm from './../../components/contact-form';
import Footer from './../../components/footer';


function Home() {
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
    </div>
  );
}

export default Home;