import { Link } from 'react-scroll';
import './header.css';

function Header() {
  return (
    <header className="header-area header-sticky">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="main-nav">
                        <a href="#" className="logo">
                            <p>LOGO PROFACT</p>
                            {/* <img src="./src/assets/images/logo.png" alt="Softy Pinko"/> */}
                        </a>
                        <ul className="nav">
                            <li><Link to="welcome" spy={true} smooth={true} offset={50} duration={500} activeClass="active">Accueil</Link></li>
                            <li><Link to="features" spy={true} smooth={true} offset={50} duration={500} activeClass="active">Fonctions</Link></li>
                            <li><Link to="work-process" spy={true} smooth={true} offset={50} duration={500} activeClass="active">Notre solution</Link></li>
                            <li><Link to="pricing-plans" spy={true} smooth={true} offset={50} duration={500} activeClass="active">Tarification</Link></li>
                            <li><Link to="contact" spy={true} smooth={true} offset={50} duration={500} activeClass="active">Contact Us</Link></li>
                        </ul>
                        <a className='menu-trigger'>
                            <span>Menu</span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </header>
  );
}

export default Header;
