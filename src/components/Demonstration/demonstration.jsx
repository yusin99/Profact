import ReactPlayer from 'react-player';
import "./demonstration.css";

function Demonstration() {
  return (
    <section className="demonstrationWrapper">
      <div className="demonstrationHeader">
        <h1>Demonstration</h1>
      </div>
      <div className="demonstrationBody">
        <div className="videoWrapper customPlayer">
          <ReactPlayer 
            className="reactPlayer" 
            url='/videos/demo.mp4' 
            width='100%' 
            height='100%' 
            controls
          />
        </div>
      </div>
    </section>
  );
}

export default Demonstration;