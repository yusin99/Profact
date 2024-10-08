/* eslint-disable react/no-unescaped-entities */
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Loader from "../../components/Loader/loader";
import Welcome from "../../components/Welcome/welcome";
import "./cgu.css"

// Importing the static data (assuming it's exported from a file like static-info.json)
import staticInfo from "../../static-info.json"; // Adjust the path as needed

function CGU() {
  const { cguText, cguWelcomeText } = staticInfo; // Destructure cguText from the static info

  return (
    <div className="wrapper">
      <Header />
      <Welcome h1={cguWelcomeText.h1} paragraph={cguWelcomeText.paragraph}/>
      <h2>Conditions Générales d'Utilisation</h2>
      <div className="cgu-content">
        {cguText.map((section, index) => (
          <div key={index} className="cgu-section">
            <h4>{section.title}</h4>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
}

export default CGU;
