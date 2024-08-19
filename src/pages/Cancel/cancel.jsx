import { useEffect } from "react";
import "./cancel.css"
const CancelPage = () => {
  useEffect(() => {
    sessionStorage.removeItem('checkoutInProgress');
  }, []);
    return (
      <div className="bodyCancel">
      <div className="cardCancel">
        <div className="cardCancelBody">
          <i className="cross">X</i>
        </div>
          <h1 className="h1Cancel">Payment cancelled</h1> 
          <p>Your payment was cancelled<br/></p>
        </div>
    </div>
    );
  };
  
  export default CancelPage;