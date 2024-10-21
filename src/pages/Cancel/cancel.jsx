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
        <h1 className="h1Cancel">Paiement annulé</h1> 
        <p>Votre paiement a été annulé<br/></p>
        </div>
    </div>
    );
  };
  
  export default CancelPage;