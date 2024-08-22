/* eslint-disable react/prop-types */
import { Link } from 'react-scroll';
import '../Welcome/welcome.css';

/**
 * The ScrollButton component in JavaScript React is used to create a button that scrolls to a
 * specified location on the page with smooth scrolling effects.
 * @returns The ScrollButton component is being returned, which renders a Link component with specified
 * props such as 'to', 'className', 'spy', 'smooth', 'offset', 'duration', and 'activeClass', along
 * with the buttonText as its child.
 */
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
