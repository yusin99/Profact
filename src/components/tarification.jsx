import "./tarification.css"

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
            <div className="col-lg-4 col-md-6 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                <div className="pricing-item">
                    <div className="pricing-header">
                        <h3 className="pricing-title">Pack 1</h3>
                    </div>
                    <div className="pricing-body">
                        <div className="price-wrapper">
                            <span className="currency">$</span>
                            <span className="price">14.50</span>
                            <span className="period">monthly</span>
                        </div>
                        <ul className="list">
                        <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                        </ul>
                    </div>
                    <div className="pricing-footer">
                        <a href="#" className="main-button">Achat</a>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                <div className="pricing-item active">
                    <div className="pricing-header">
                        <h3 className="pricing-title">Pack 2</h3>
                    </div>
                    <div className="pricing-body">
                        <div className="price-wrapper">
                            <span className="currency">$</span>
                            <span className="price">21.50</span>
                            <span className="period">monthly</span>
                        </div>
                        <ul className="list">
                        <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                        </ul>
                    </div>
                    <div className="pricing-footer">
                        <a href="#" className="main-button">Achat</a>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                <div className="pricing-item">
                    <div className="pricing-header">
                        <h3 className="pricing-title">Pack 3</h3>
                    </div>
                    <div className="pricing-body">
                        <div className="price-wrapper">
                            <span className="currency">$</span>
                            <span className="price">42.00</span>
                            <span className="period">monthly</span>
                        </div>
                        <ul className="list">
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                            <li className="active">Lorem, ipsum dolor.</li>
                        </ul>
                    </div>
                    <div className="pricing-footer">
                        <a href="#" className="main-button">Achat</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Tarification