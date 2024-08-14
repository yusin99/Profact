import { Link, useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="/" className="logo">
                <img src="./logo-profact.png" alt="Logo Profact"/>
              </a>
              <ul className="nav">
                <li>
                  <Link to="/" className={currentPath === '/' ? 'active' : ''}>Accueil</Link>
                </li>
                <li>
                  <Link to="/mentions-legales" className={currentPath === '/mentions-legales' ? 'active' : ''}>Mentions légales</Link>
                </li>
                <li>
                  <Link to="/cgu" className={currentPath === '/cgu' ? 'active' : ''}>CGU</Link>
                </li>
                {/* <li>
                  <Link to="/work-process" className={currentPath === '/work-process' ? 'active' : ''}>Notre solution</Link>
                </li>
                <li>
                  <Link to="/pricing-plans" className={currentPath === '/pricing-plans' ? 'active' : ''}>Tarification</Link>
                </li>
                <li>
                  <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>Contact Us</Link>
                </li> */}
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
