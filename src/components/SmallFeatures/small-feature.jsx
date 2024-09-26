import "./small-feature.css"

/* This code defines a React functional component called `SmallFeature`. Inside the component, it
returns JSX code that represents a section with multiple small feature items. Each feature item
consists of an icon, a title, and a description. */
function SmallFeature() {
  return (
    <section className="section home-feature">
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex align-items-stretch" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                        <div className="features-small-item">
                            <div className="icon">
                                <i><img src="/images/edition-picto-2.png" alt=""/></i>
                            </div>
                            <h5 className="features-title">Édition simplifiée</h5>
                            <p> des factures, déclarations de sinistres et des cessions de créance. 
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex align-items-stretch" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                        <div className="features-small-item">
                            <div className="icon">
                                <i><img src="/images/envoie-picto-2.png" alt=""/></i>
                            </div>
                            <h5 className="features-title">Envoi automatique</h5>
                            <p> par recommandé </p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex align-items-stretch" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                        <div className="features-small-item">
                            <div className="icon">
                                <i><img src="/images/relance-picto-2.png" alt=""/></i>
                            </div>
                            <h5 className="features-title">Relance mail automatique</h5>
                            <p>de tous vos dossiers impayés ( biensur avec le renvoi complet de tous les documents avec l’accusé de réception )</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6 col-12 d-flex align-items-stretch" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                        <div className="features-small-item">
                            <div className="icon">
                                <i><img src="/images/pc-2.png" alt=""/></i>
                            </div>
                            <h5 className="features-title">Une solution adaptée aux différents outils </h5>
                            <p>( tablette / pc / portable ) </p>
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