/* eslint-disable react/prop-types */
// Card.js
import { Link } from 'react-router-dom';
import "./card.css";

/**
 * The `Card` function in JavaScript React renders a pricing card component with dynamic content and an
 * optional purchase button.
 */
const Card = ({ pack, button }) => {
  return (
    <div 
      className={`col-lg-4 col-md-6 col-sm-12 ${pack.active ? "active" : ""}`} 
      data-scroll-reveal={`enter bottom move 50px over 0.6s after ${0.2 + 0.2 * pack.id}s`}
    >
      <div className={`pricing-item ${pack.active ? "active" : ""}`}>
        <div className="pricing-header">
          <h3 className="pricing-title">{pack.libelle}</h3>
        </div>
        <div className="pricing-body">
          <div className="price-wrapper">
            <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
              <span className="price">{pack.montantHt}</span>
              <span className="currency">€</span>
            </div>
            <span className="period">Tarif mensuel (€ HT)</span>
            {pack.fraisParametrage && <div className="periodOneTime">( Frais de paramétrage {pack.fraisParametrage}€ HT)</div>}
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
