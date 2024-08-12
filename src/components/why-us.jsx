import "./why-us.css"

function WhyUsSection() {
  return (
    <section className="mini" id="work-process">
        <div className="mini-content">
            <div className="container">
                <div className="row">
                    <div className="offset-lg-3 col-lg-6">
                        <div className="info">
                            <h1>Pourquoi notre solution?</h1>
                            {/* <p>Aenean nec tempor metus. Maecenas ligula dolor, commodo in imperdiet interdum, vehicula ut ex. Donec ante diam.</p> */}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 col-lg-4 col-sm-12 col-12 d-flex align-items-stretch">
                        <a href="#" className="mini-box">
                            <i><img src="/images/work-process-item-01.png" alt="" /></i>
                            <strong>Automatisation complète</strong>
                            <span>De la constitution du dossier en passant par la réception et la relance des paiements</span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-lg-4 col-sm-12 col-12 d-flex align-items-stretch">
                        <a href="#" className="mini-box">
                            <i><img src="/images/work-process-item-01.png" alt="" /></i>
                            <strong>Gestion des documents</strong>
                            <span>Transmission sécurisée et rapide</span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-lg-4 col-sm-12 col-12 d-flex align-items-stretch">
                        <a href="#" className="mini-box">
                            <i><img src="/images/work-process-item-01.png" alt="" /></i>
                            <strong>Précision accrue</strong>
                            <span>Moins d'erreurs humaines grâce à l'automatisation.
                            </span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-lg-4 col-sm-12 col-12 d-flex align-items-stretch">
                        <a href="#" className="mini-box">
                            <i><img src="/images/work-process-item-01.png" alt="" /></i>
                            <strong>Rapidité de traitement</strong>
                            <span>Dossiers traités et clos plus rapidement</span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-lg-4 col-sm-12 col-12 d-flex align-items-stretch">
                        <a href="#" className="mini-box">
                            <i><img src="/images/work-process-item-01.png" alt="" /></i>
                            <strong>Réduction des coûts</strong>
                            <span>Moins de temps passé par dossier signifie moins de dépenses en main-d'œuvre</span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-lg-4 col-sm-12 col-12 d-flex align-items-stretch">
                        <a href="#" className="mini-box">
                            <i><img src="/images/work-process-item-01.png" alt="" /></i>
                            <strong>Satisfaction client améliorée</strong>
                            <span> Des processus rapides et transparents augmentent la confiance client</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}


export default WhyUsSection