import Footer from "../../components/Footer/footer"
import Header from "../../components/Header/header"
import Loader from "../../components/Loader/loader"
import Welcome from "../../components/Welcome/welcome"


function MentionsLegales() {
  return (
    <div className="wrapper">
    <Loader />
    <Header />
    <Welcome />
    <div>Mentions legales</div>
    <Footer />
    </div>
  )
}

export default MentionsLegales