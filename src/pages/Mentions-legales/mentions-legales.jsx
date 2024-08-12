import Footer from "../../components/footer"
import Header from "../../components/header"
import Loader from "../../components/loader"
import Welcome from "../../components/welcome"

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