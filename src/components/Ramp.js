import React, { Component } from 'react'
import '../App.css'


export default class Ramp extends Component {
  render() {
    var style = (green) => {
      return {
        color: green ? '#3fb855' : 'black',
        fillColor: green ? '#3fb855' : 'black',
        fill: green ? '#3fb855' : 'black',
        stroke: green ? '#3fb855' : 'black'
      }
    }

  	return(
  		<g>
				<defs>
          <g id="Ramp">
            <rect width="24" height="24" fill="none" />
            <line x1="4" y1="20" x2="20" y2="20" />
            <polygon points="20,20.5 20.86,20 20,19.5" />
            <line x1="4" y1="20" x2="4" y2="4" />            
            <polygon points="4.5,4 4,3.13 3.5,4" />
            <polyline fill="none" points="4,20 7,20 7,17 10,17 10,14 13,14 13,11 16,11 16,8 19,8 19,5" />
            <line x1="14.5" y1="20" x2="14.5" y2="11" strokeDasharray="2" />
            <line x1="4" y1="11" x2="14.5" y2="11" strokeDasharray="2" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href="#Ramp" style={style(this.props.green)} /> 
  		</g>
  	)
  }
}