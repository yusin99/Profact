import "./tarification.css";
import { Link } from 'react-router-dom';

function Tarification() {
  return (
    <section className="section colored pricing-bg" id="pricing-plans">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="center-heading">
              <h2 className="section-title">Tarification</h2>
            </div>
          </div>
          <div className="offset-lg-3 col-lg-6">
            <div className="center-text">
              <p>Choisissez le plan adapté à vos besoins</p>
            </div>
          </div>
        </div>
        <div className="row">
          {[
            { id: 1, title: "Pack 1", price: "14.50", period: "monthly" },
            { id: 2, title: "Pack 2", price: "21.50", period: "monthly", active: true },
            { id: 3, title: "Pack 3", price: "42.00", period: "monthly" },
          ].map((pack) => (
            <div key={pack.id} className={`col-lg-4 col-md-6 col-sm-12 ${pack.active ? "active" : ""}`} data-scroll-reveal={`enter bottom move 50px over 0.6s after ${0.2 + 0.2 * pack.id}s`}>
              <div className={`pricing-item ${pack.active ? "active" : ""}`}>
                <div className="pricing-header">
                  <h3 className="pricing-title">{pack.title}</h3>
                </div>
                <div className="pricing-body">
                  <div className="price-wrapper">
                    <span className="currency">$</span>
                    <span className="price">{pack.price}</span>
                    <span className="period">{pack.period}</span>
                  </div>
                  <ul className="list">
                    {Array(6).fill("Lorem, ipsum dolor.").map((item, index) => (
                      <li key={index} className="active">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-footer">
                  <Link to={`/form?offer=${pack.id}`} className="main-button">Achat</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tarification;
