/* eslint-disable react/prop-types */
import { Link } from 'react-scroll';
import '../Welcome/welcome.css';

function ScrollButton({ to, buttonText }) {
  return (
    <Link 
      to={to} 
      className="main-button-slider" 
      spy={true} 
      smooth={true} 
      offset={50} 
      duration={500} 
      activeClass="active"
    >
      {buttonText}
    </Link>
  );
}

export default ScrollButton;
