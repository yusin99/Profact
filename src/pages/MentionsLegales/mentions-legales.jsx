/* eslint-disable react/no-unescaped-entities */
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/header";
import Welcome from "../../components/Welcome/welcome";
import "./mentions.css"; // Import the CSS for mentions légales

// Importing the static data (assuming it's exported from a file like static-info.json)
import staticInfo from "../../static-info.json"; // Adjust the path as needed

function MentionsLegales() {
  const { mentionsLegalesWelcomeText, mentionsLegalesContent } = staticInfo; // Destructure from the static info

  return (
    <div className="wrapper">
      <Welcome h1={mentionsLegalesWelcomeText.h1} paragraph={mentionsLegalesWelcomeText.paragraph}/>
      
      <h2>Mentions Légales</h2>
      <div className="mentions-legales-content">
        {mentionsLegalesContent.map((section, index) => (
          <div key={index} className="mentions-legales-section">
            <h4>{section.title}</h4>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default MentionsLegales;
