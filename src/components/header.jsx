import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="header-area header-sticky">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="main-nav">
                        <a href="/" className="logo">
                            <p>LOGO PROFACT</p>
                            {/* <img src="./src/assets/images/logo.png" alt="Softy Pinko"/> */}
                        </a>
                        <ul className="nav">
                            <li><Link to="/" className="active">Accueil</Link></li>
                            <li><Link to="/features" className="active">Fonctions</Link></li>
                            <li><Link to="/work-process" className="active">Notre solution</Link></li>
                            <li><Link to="/pricing-plans" className="active">Tarification</Link></li>
                            <li><Link to="/contact" className="active">Contact Us</Link></li>
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
