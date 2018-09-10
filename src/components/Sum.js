import React, { Component } from 'react'
import '../App.css'


export default class Sum extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggle: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return {
      green: nextProps.green,
    }
  }

  render() {

    var ID = "Sum" + Math.trunc(Math.random()*1000) + Math.trunc(Math.random()*1000)

    var style = (green) => {
      return {
        color: green ? '#bf360c' : '#78909c',
        fillColor: green ? '#bf360c' : '#78909c',
        fill: green ? '#bf360c' : '#78909c',
        stroke: green ? '#bf360c' : '#78909c'
      }
    }    
  	return(
  		<g>
				<defs>
          <g id={ID}>
            <circle  cx="6" cy="6" r="6" fillOpacity="0" />
          </g>
        </defs>
        <use x={this.props.x} y={this.props.y} href={ '#' + ID } style={style(this.state.green)} />
  		</g>
  	)
  }
}