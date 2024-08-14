import { Link } from 'react-router-dom';
import './footer.css';

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