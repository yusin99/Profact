import { Link } from 'react-router-dom';
import './footer.css';

/**
 * The `Footer` function in JavaScript React renders a footer section with links to legal pages and a
 * copyright notice.
 * @returns The `Footer` function is returning JSX code for a footer section of a website. It includes
 * links to "Mentions legales" and "CGU", as well as a copyright notice for "Copyright © 2024 Profact".
 */
function Footer() {
  return (
    <footer>
    <div className="container">
        <div className="row">
            <div className="footer-links col-lg-12 col-md-12 col-sm-12 d-flex flex-column">
                <Link to="/mentions-legales">Mentions legales</Link>
                <Link to="/cgu">CGU</Link>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <p className="copyright">Copyright &copy; 2024 Profact</p>
            </div>
        </div>
    </div>
</footer>
  );
}

export default Footer;