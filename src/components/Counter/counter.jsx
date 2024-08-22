import "./counter.css"

/* The `Counter` function is a React component that returns JSX elements representing a section with
three columns displaying different statistics. Each column contains a `count-item` with a title and
a value. The values are placeholders for the number of dossiers per month, euros of management per
month, and the number of garages. */
function Counter() {
  return (
    <section className="counter">
    <div className="content">
        <div className="container">
            <div className="row center-numbers">
                <div className="col-lg-3 col-md-6 col-sm-12 border-left border-right">
                    <div className="count-item decoration-bottom">
                        <strong>5M</strong>
                        <span>Dossiers par mois</span>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 border-right">
                    <div className="count-item decoration-top">
                        <strong>4Milions</strong>
                        <span>D'euro de gestion par mois</span>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 border-right">
                    <div className="count-item decoration-bottom">
                        <strong>600</strong>
                        <span>Garages</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Counter