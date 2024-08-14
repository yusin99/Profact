import Footer from "../../components/Footer/footer"
import Header from "../../components/Header/header"
import Loader from "../../components/Loader/loader"
import Welcome from "../../components/Welcome/welcome"


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