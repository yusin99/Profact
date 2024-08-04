import "./small-feature.css"

function SmallFeature() {
  return (
    <section className="section home-feature">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                        <div className="features-small-item">
                            <div className="icon">
                                <i><img src="./src/assets/images/featured-item-01.png" alt=""/></i>
                            </div>
                            <h5 className="features-title">Fonction de la solution</h5>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, ducimus?</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                        <div className="features-small-item">
                            <div className="icon">
                                <i><img src="./src/assets/images/featured-item-01.png" alt=""/></i>
                            </div>
                            <h5 className="features-title">Fonction de la solution</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, doloribus!</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                        <div className="features-small-item">
                            <div className="icon">
                                <i><img src="./src/assets/images/featured-item-01.png" alt=""/></i>
                            </div>
                            <h5 className="features-title">Fonction de la solution</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, omnis.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default SmallFeature