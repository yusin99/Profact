import { useEffect, useRef } from 'react';
import './loader.css';

/**
 * The Loader function in JavaScript React creates a preloader element that animates its opacity to 0
 * before hiding it after a delay.
 * @returns The Loader component is returning a JSX structure that includes a preloader element with a
 * ref attached to it. Inside the preloader element, there is a nested div with the class "jumper"
 * containing three child div elements.
 */
function Loader() {
  const preloaderRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;


    // Animate preloader opacity to 0
    if (preloader) {
      preloader.style.transition = 'opacity 2s';
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.visibility = 'hidden';
        preloader.style.display = 'none';
      }, 3000); // 600ms for opacity transition + 300ms for delay
    }
  }, []);

  return (
    <div id="preloader" ref={preloaderRef}>
      <div className="jumper">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>  
  );
}

export default Loader;
