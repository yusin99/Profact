/* eslint-disable react/prop-types */
import "./features.css";

function BigFeatureRight({ title, text, image }) {
  return (
    <section className="section padding-bottom-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 align-self-center mobile-bottom-fix">
            <div className="left-heading">
              <h2 className="section-title">{title}</h2>
            </div>
            <div className="left-text">
              <p>{text}</p>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-5 col-md-12 col-sm-12 align-self-center mobile-bottom-fix-big" data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
            <img src={image} className="rounded img-fluid d-block mx-auto" alt="App" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BigFeatureRight;
