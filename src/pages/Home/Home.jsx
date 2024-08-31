import Loader from '../../components/Loader/loader';
import Header from '../../components/Header/header';
import Welcome from '../../components/Welcome/welcome';
import SmallFeature from '../../components/SmallFeatures/small-feature';
import Tarification from '../../components/Tarification/tarification';
import WhyUsSection from '../../components/WhyUs/why-us';
import ContactForm from '../../components/ContactForm/contact-form';
import Footer from '../../components/Footer/footer';
import staticInfo from "../../static-info.json";
import { useEffect } from 'react';
import BigFeatureLeft from '../../components/FeaturesComponents/big-feature-left';
import BigFeatureRight from '../../components/FeaturesComponents/big-feature-right';
import Demonstration from '../../components/Demonstration/demonstration';

function Home() {
  const { features, pricingPlans, otherInfo, homeWelcomeText } = staticInfo;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="wrapper">
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
      <Demonstration />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default Home;
