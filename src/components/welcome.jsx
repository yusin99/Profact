/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-scroll';
import './welcome.css';

function Welcome() {
  return (
    <div className="welcome-area" id="welcome">
        <div className="header-text">
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                        <h1>Message d'accueil <strong>fort</strong><br />pour attirer <strong>l'attention</strong></h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis excepturi illum doloribus.</p>
                        <Link to="features" className="main-button-slider" spy={true} smooth={true} offset={50} duration={500} activeClass="active">Découvrez plus</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Welcome;