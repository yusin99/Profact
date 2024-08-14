import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    const handleResize = () => {
      if (window.innerWidth > 991 && isMenuActive) {
        setIsMenuActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuActive]);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    if (navRef.current) {
      navRef.current.style.display = isMenuActive ? 'none' : 'block';
    }
  };

  const handleLinkClick = (e) => {
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const width = window.innerWidth;
      if (width < 991) {
        setIsMenuActive(false);
        if (navRef.current) {
          navRef.current.style.display = 'none';
        }
      }
      window.scrollTo({
        top: target.offsetTop - 130,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`header-area ${isSticky ? 'header-sticky' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="/" className="logo">
                <img src="./logo-profact.png" alt="Logo Profact"/>
              </a>
              <ul className="nav" ref={navRef} style={{display: isMenuActive ? 'block' : ''}}>
                <li>
                  <Link to="/" className={currentPath === '/' ? 'active' : ''} onClick={handleLinkClick}>Accueil</Link>
                </li>
                <li>
                  <Link to="/mentions-legales" className={currentPath === '/mentions-legales' ? 'active' : ''} onClick={handleLinkClick}>Mentions légales</Link>
                </li>
                <li>
                  <Link to="/cgu" className={currentPath === '/cgu' ? 'active' : ''} onClick={handleLinkClick}>CGU</Link>
                </li>
              </ul>
              <a className={`menu-trigger ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
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