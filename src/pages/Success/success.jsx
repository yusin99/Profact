/* eslint-disable react/no-unescaped-entities */
import "./success.css"

const SuccessPage = () => {
  return (
    <div className="bodySuccess">
      <div className="cardSuccess">
        <div className="cardSuccessBody">
          <i className="checkmark">✓</i>
        </div>
          <h1 className="h1Success">Success</h1> 
          <p>We received your purchase request;<br/> We'll be in touch shortly!</p>
        </div>
    </div>
  );
};

export default SuccessPage;