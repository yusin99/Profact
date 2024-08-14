import Loader from './../../components/loader';
import Header from './../../components/header';
import Welcome from './../../components/welcome';
import SmallFeature from './../../components/small-feature';
import BigFeatureLeft from '../../components/big-feature-left';
import BigFeatureRight from '../../components/big-feature-right';
import Tarification from './../../components/tarification';
import WhyUsSection from './../../components/why-us';
import ContactForm from './../../components/contact-form';
import Footer from './../../components/footer';
import staticInfo from "../../static-info.json";
import { useEffect } from 'react';

function Home() {
  const { features, pricingPlans, otherInfo, homeWelcomeText } = staticInfo;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="wrapper">
      <Loader />
      <Header />
      <Welcome h1={homeWelcomeText.h1} paragraph={homeWelcomeText.paragraph} buttonText={homeWelcomeText.buttonText}/>
      <SmallFeature />
      <BigFeatureLeft title={features.bigFeatureOne.title} text={features.bigFeatureOne.text} image={features.bigFeatureOne.image} />
      <BigFeatureRight title={features.bigFeatureTwo.title} text={features.bigFeatureTwo.text} image={features.bigFeatureTwo.image} />
      <BigFeatureLeft title={features.bigFeatureThree.title} text={features.bigFeatureThree.text} image={features.bigFeatureThree.image} />
      <BigFeatureRight title={features.bigFeatureFour.title} text={features.bigFeatureFour.text} image={features.bigFeatureFour.image} />
      <BigFeatureLeft title={features.bigFeatureFive.title} text={features.bigFeatureFive.text} image={features.bigFeatureFive.image} />
      <BigFeatureRight title={features.bigFeatureSix.title} text={features.bigFeatureSix.text} image={features.bigFeatureSix.image} />
      <WhyUsSection />
      <Tarification staticInfo={{ pricingPlans, otherInfo }} />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
