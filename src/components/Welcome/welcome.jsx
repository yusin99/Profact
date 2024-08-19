/* eslint-disable react/prop-types */
import './welcome.css';
import ScrollButton from './../Button/button';

function Welcome({ h1, paragraph, buttonText }) {
  return (
    <div className="welcome-area" id="welcome">
      <div className="header-text">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
              <h1>{h1}</h1>
              {paragraph && <p>{paragraph}</p>}
              {buttonText && (
                <ScrollButton to="features" buttonText={buttonText} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
