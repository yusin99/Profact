import Footer from "../../components/footer"
import Header from "../../components/header"
import Loader from "../../components/loader"
import Welcome from "../../components/welcome"

function CGU() {
  return (
    <div className="wrapper">
    <Loader />
    <Header />
    <Welcome />
    <div>CGU</div>
    <Footer />
    </div>
  )
}

export default CGU