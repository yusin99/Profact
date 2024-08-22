/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './tarification.css';
import Card from '../Card/card';

/* 
The `Tarification` function is a React functional component that takes a prop named `staticInfo`.
Inside the component, the `staticInfo` prop is destructured correctly in the function parameter to
directly access the `staticInfo` object. 
*/

function Tarification({ staticInfo }) { // Use destructuring correctly to get staticInfo prop
  const [data, setData] = useState({ pricingPlans: [], otherInfo: {} });
  useEffect(() => {
    setData(staticInfo);
  }, [staticInfo]);

  return (
    <section className="section colored pricing-bg" id="pricing-plans">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="center-heading">
              <h2 className="section-title">{data.otherInfo.sectionTitle}</h2>
            </div>
          </div>
          <div className="offset-lg-3 col-lg-6">
            <div className="center-text">
              <p>{data.otherInfo.sectionSubtitle}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {data.pricingPlans.map((pack) => (
            <Card key={pack.id} pack={pack} button={true}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tarification;


