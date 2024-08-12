/* eslint-disable react/prop-types */
// Card.js
import { Link } from 'react-router-dom';

const Card = ({ pack, button }) => {
  return (
    <div 
      className={`col-lg-4 col-md-6 col-sm-12 ${pack.active ? "active" : ""}`} 
      data-scroll-reveal={`enter bottom move 50px over 0.6s after ${0.2 + 0.2 * pack.id}s`}
    >
      <div className={`pricing-item ${pack.active ? "active" : ""}`}>
        <div className="pricing-header">
          <h3 className="pricing-title">{pack.title}</h3>
        </div>
        <div className="pricing-body">
          <div className="price-wrapper">
            <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <span className="price">{pack.price}</span>
              <span className="currency">€</span>
            </div>
            <span className="period">{pack.period}</span>
          </div>
          {/* <ul className="list">
            {pack.features.map((item, index) => (
              <li key={index} className="active">{item}</li>
            ))}
          </ul> */}
        </div>
        {button && (
          <div className="pricing-footer">
            <Link to={`/form?offer=${pack.id}`} className="main-button">Achat</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
