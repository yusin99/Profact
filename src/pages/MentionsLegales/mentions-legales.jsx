import Footer from "../../components/Footer/footer"
import Header from "../../components/Header/header"
import Welcome from "../../components/Welcome/welcome"
import staticInfo from "../../static-info.json"; // Adjust the path as needed



function MentionsLegales() {
  const { mentionsLegalesWelcomeText } = staticInfo; // Destructure cguText from the static info

  return (
    <div className="wrapper">
    <Header />
    <Welcome h1={mentionsLegalesWelcomeText.h1} paragraph={mentionsLegalesWelcomeText.paragraph}/>
    <div>Mentions legales</div>
    <Footer />
    </div>
  )
}

export default MentionsLegales