import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
			<svg className="canv" width="800" height="600" viewBox="0 0 800 600" >
				<defs>
    <marker
       orient="auto"
       refY="0.0"
       refX="0.0"
       id="markerArrow"
       className="arrow">
      <path
         id="path4637"
         d="M 5.77,0.0 L -2.88,5.0 L -2.88,-5.0 L 5.77,0.0 z "
         className="arrow"
         transform="scale(0.2)" />
    </marker>
					<g id="Ramp">
					  <rect width="24" height="24" className="frame" />
					  <path d="M4 20 L20 20" className="arrow" />
					  <path d="M4 20 L4 4" className="arrow" />
					</g>
				</defs>

				<use x="20" y="20"  href="#Ramp" /> 
			</svg>
    );
  }
}

export default App;
