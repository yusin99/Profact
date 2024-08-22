import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

/**
 * The `Header` function in JavaScript React creates a responsive header component with sticky
 * behavior, menu toggle functionality, and navigation links.
 * @returns The `Header` component is returning a header section with a logo, navigation menu, and menu
 * trigger button. The header has a dynamic class `header-sticky` added based on the `isSticky` state.
 * The navigation menu items are conditionally displayed based on the `isMenuActive` state. The menu
 * trigger button toggles the visibility of the navigation menu when clicked.
 */
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

  useEffect(() => {
    // This effect runs when the location changes
    if (window.innerWidth < 991) {
      setIsMenuActive(false);
      if (navRef.current) {
        navRef.current.style.display = 'none';
      }
    }
    // Scroll to top of page on route change
    window.scrollTo(0, 0);
  }, [location]);

/**
 * The `toggleMenu` function toggles the visibility of a navigation menu based on the current state.
 */
  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    if (navRef.current) {
      navRef.current.style.display = isMenuActive ? 'none' : 'block';
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
                  <Link to="/" className={currentPath === '/' ? 'active' : ''}>Accueil</Link>
                </li>
                <li>
                  <Link to="/mentions-legales" className={currentPath === '/mentions-legales' ? 'active' : ''}>Mentions légales</Link>
                </li>
                <li>
                  <Link to="/cgu" className={currentPath === '/cgu' ? 'active' : ''}>CGU</Link>
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