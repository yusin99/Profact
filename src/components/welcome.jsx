/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-scroll';
import './welcome.css';

function Welcome({ h1, paragraph, buttonText }) {
  return (
    <div className="welcome-area" id="welcome">
      <div className="header-text">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
              <h1>{h1}</h1>
              {paragraph && (
                <p>{paragraph}</p>
              )}
              {buttonText && (
                <Link 
                  to="features" 
                  className="main-button-slider" 
                  spy={true} 
                  smooth={true} 
                  offset={50} 
                  duration={500} 
                  activeClass="active"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
